import { useState, type FormEvent } from "react";
import { useTranslation } from "react-i18next";
import type { GalleryBlock, Project, ProjectStatus } from "../../data/types";
import { type Lang, type Localizable } from "../../i18n/useLocalized";
import { removeProjectImages, uploadProjectImage } from "../../lib/images";
import { supabase } from "../../lib/supabase";
import { Card, Icon } from "./AdminUi";
import GalleryEditor, { type BlockDraft } from "./GalleryEditor";
import SkillPicker from "./SkillPicker";
import { input, labelCls, pill, primaryBtn, secondaryBtn } from "./adminStyles";

const STATUSES: ProjectStatus[] = ["desenvolvimento", "concluido", "inacabado"];

type LinkType = "repo" | "demo" | "site" | "other";

// Tipos de link com texto já definido (só é preciso escrever o endereço)
const PRESETS: Record<
  Exclude<LinkType, "other">,
  { pt: string; en: string }
> = {
  repo: { pt: "Código", en: "Code" },
  demo: { pt: "Demo", en: "Demo" },
  site: { pt: "Website", en: "Website" },
};
const LINK_TYPES: LinkType[] = ["repo", "demo", "site", "other"];
const LINK_KEYS: Record<LinkType, string> = {
  repo: "admin.linkRepo",
  demo: "admin.linkDemo",
  site: "admin.linkSite",
  other: "admin.linkOther",
};

interface LinkRow {
  type: LinkType;
  labelPt: string;
  labelEn: string;
  url: string;
}

const pick = (v: Localizable, lang: Lang) =>
  typeof v === "string" ? v : v[lang];
const thisMonth = () => new Date().toISOString().slice(0, 7);
const slugify = (s: string) =>
  s
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");

const toCaption = (pt: string, en: string): Localizable => {
  const p = pt.trim();
  const e = en.trim();
  if (!p && !e) return "";
  return { pt: p || e, en: e || p };
};

// Reconhece links guardados antes dos tipos existirem
function toLinkRow(k: Project["links"][number]): LinkRow {
  const labelPt = pick(k.label, "pt");
  const labelEn = pick(k.label, "en");
  const type =
    (Object.keys(PRESETS) as (keyof typeof PRESETS)[]).find(
      (p) => PRESETS[p].pt === labelPt,
    ) ?? "other";
  return { type, labelPt, labelEn, url: k.url };
}

function toLink(k: LinkRow): Project["links"][number] {
  if (k.type !== "other") {
    const { pt, en } = PRESETS[k.type];
    return { label: pt === en ? pt : { pt, en }, url: k.url.trim() };
  }
  const pt = k.labelPt.trim() || "Link";
  const en = k.labelEn.trim();
  return { label: en && en !== pt ? { pt, en } : pt, url: k.url.trim() };
}

const messageOf = (err: unknown) =>
  err && typeof err === "object" && "message" in err
    ? String(err.message)
    : "Erro desconhecido";

interface Props {
  project?: Project; // sem project = novo
  onSaved: () => void | Promise<void>;
  onCancel: () => void;
}

export default function ProjectForm({ project, onSaved, onCancel }: Props) {
  const { t } = useTranslation();

  const [name, setName] = useState(project ? pick(project.name, "pt") : "");
  const [slug, setSlug] = useState(project?.slug ?? "");
  const [editingSlug, setEditingSlug] = useState(false);
  const [descPt, setDescPt] = useState(
    project ? pick(project.description, "pt") : "",
  );
  const [descEn, setDescEn] = useState(
    project ? pick(project.description, "en") : "",
  );
  const [status, setStatus] = useState<ProjectStatus>(
    project?.status ?? "desenvolvimento",
  );
  const [date, setDate] = useState(project?.date ?? thisMonth());
  const [endDate, setEndDate] = useState(project?.endDate ?? "");
  const [featured, setFeatured] = useState(project?.featured ?? false);
  const [selected, setSelected] = useState<Set<string>>(
    new Set(project?.skills ?? []),
  );
  const [links, setLinks] = useState<LinkRow[]>(
    project?.links.map(toLinkRow) ?? [],
  );
  const [blocks, setBlocks] = useState<BlockDraft[]>(() =>
    (project?.gallery ?? []).map((b) => ({
      key: crypto.randomUUID(),
      image: b.image,
      file: null,
      captionPt: pick(b.caption, "pt"),
      captionEn: pick(b.caption, "en"),
      side: b.side,
    })),
  );
  const [busy, setBusy] = useState(false);
  const [progress, setProgress] = useState("");
  const [error, setError] = useState("");

  const hasEnd = status !== "desenvolvimento";
  const dateInvalid = hasEnd && endDate !== "" && endDate < date;

  function changeName(value: string) {
    setName(value);
    if (!project && !editingSlug) setSlug(slugify(value));
  }

  function changeStatus(next: ProjectStatus) {
    setStatus(next);
    if (next !== "desenvolvimento" && !endDate) setEndDate(thisMonth());
  }

  function toggleSkill(id: string) {
    setSelected((prev) => {
      const next = new Set(prev);
      if (next.has(id)) next.delete(id);
      else next.add(id);
      return next;
    });
  }

  function changeLink(index: number, patch: Partial<LinkRow>) {
    setLinks((prev) =>
      prev.map((row, i) => (i === index ? { ...row, ...patch } : row)),
    );
  }

  async function handleSubmit(e: FormEvent) {
    e.preventDefault();
    if (!supabase || dateInvalid) return;
    setBusy(true);
    setError("");

    const uploaded: string[] = []; // imagens enviadas nesta tentativa (apagadas se falhar)
    const gallery: GalleryBlock[] = [];
    const toUpload = blocks.filter((b) => b.file).length;
    let sent = 0;

    try {
      // 1. Envia as imagens novas, por ordem
      for (const b of blocks) {
        let image = b.image;
        if (b.file) {
          setProgress(
            t("admin.uploading", { current: ++sent, total: toUpload }),
          );
          image = await uploadProjectImage(b.file, slug);
          uploaded.push(image);
        }
        gallery.push({
          image,
          caption: toCaption(b.captionPt, b.captionEn),
          side: b.side,
        });
      }
      setProgress("");

      // 2. Guarda o projeto
      const row: Project = {
        slug,
        name: name.trim(),
        description: { pt: descPt.trim(), en: descEn.trim() || descPt.trim() },
        status,
        gallery,
        links: links.filter((k) => k.url.trim()).map(toLink),
        skills: [...selected],
        date,
        endDate: hasEnd ? endDate || null : null,
        featured,
      };

      const { error: err } = project
        ? await supabase.from("projects").update(row).eq("slug", project.slug)
        : await supabase.from("projects").insert(row);
      if (err) throw err;
    } catch (err) {
      await removeProjectImages(uploaded);
      setProgress("");
      setError(messageOf(err));
      setBusy(false);
      return;
    }

    // 3. Apaga do Storage as imagens que foram retiradas da galeria
    const kept = new Set(gallery.map((g) => g.image));
    await removeProjectImages(
      (project?.gallery ?? [])
        .map((g) => g.image)
        .filter((url) => !kept.has(url)),
    );
    await onSaved();
  }

  return (
    <form onSubmit={(e) => void handleSubmit(e)} className="mt-6 space-y-6">
      <div>
        <button
          type="button"
          onClick={onCancel}
          className="text-sm text-slate-500 transition hover:text-slate-900"
        >
          ← {t("admin.back")}
        </button>
        <h2 className="font-display mt-2 text-2xl font-semibold tracking-tight">
          {project ? t("admin.editProject") : t("admin.newProject")}
        </h2>
      </div>

      <Card title={t("admin.sectionBasics")}>
        <div>
          <label className={labelCls} htmlFor="p-name">
            {t("admin.fieldName")}
          </label>
          <input
            id="p-name"
            required
            value={name}
            onChange={(e) => changeName(e.target.value)}
            className={input}
          />
          <div className="mt-2 text-xs text-slate-500">
            {editingSlug && !project ? (
              <input
                aria-label={t("admin.fieldSlug")}
                required
                value={slug}
                pattern="[a-z0-9\-]+"
                onChange={(e) => setSlug(slugify(e.target.value))}
                className={`${input} !py-1.5`}
              />
            ) : (
              <p>
                {t("admin.slugPreview")}:{" "}
                <span className="font-mono">/projetos/{slug || "..."}</span>
                {!project && (
                  <button
                    type="button"
                    onClick={() => setEditingSlug(true)}
                    className="ml-2 underline underline-offset-2"
                  >
                    {t("admin.slugEdit")}
                  </button>
                )}
              </p>
            )}
          </div>
        </div>

        <div>
          <label className={labelCls} htmlFor="p-pt">
            {t("admin.fieldDescPt")}
          </label>
          <textarea
            id="p-pt"
            required
            rows={4}
            value={descPt}
            onChange={(e) => setDescPt(e.target.value)}
            className={input}
          />
        </div>

        <div>
          <label className={labelCls} htmlFor="p-en">
            {t("admin.fieldDescEn")}
          </label>
          <textarea
            id="p-en"
            rows={4}
            value={descEn}
            onChange={(e) => setDescEn(e.target.value)}
            className={input}
          />
          <p className="mt-1.5 text-xs text-slate-500">
            {t("admin.descEnHint")}
          </p>
        </div>
      </Card>

      <Card title={t("admin.sectionStatus")}>
        <div
          role="radiogroup"
          aria-label={t("admin.fieldStatus")}
          className="grid gap-3 sm:grid-cols-3"
        >
          {STATUSES.map((s) => {
            const on = status === s;
            return (
              <button
                key={s}
                type="button"
                role="radio"
                aria-checked={on}
                onClick={() => changeStatus(s)}
                className={`rounded-xl border p-4 text-left transition focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-slate-900 ${
                  on
                    ? "border-slate-900 bg-slate-900 text-white"
                    : "border-slate-200 hover:border-slate-400"
                }`}
              >
                <span className="block text-sm font-medium">
                  {t(`status.${s}`)}
                </span>
                <span
                  className={`mt-1 block text-xs ${on ? "text-slate-300" : "text-slate-500"}`}
                >
                  {t(`projects.hints.${s}`)}
                </span>
              </button>
            );
          })}
        </div>

        <div
          className={`grid gap-4 ${hasEnd ? "sm:grid-cols-2" : "sm:max-w-xs"}`}
        >
          <div>
            <label className={labelCls} htmlFor="p-start">
              {t("admin.fieldStart")}
            </label>
            <input
              id="p-start"
              required
              type="month"
              pattern="\d{4}-\d{2}"
              value={date}
              onChange={(e) => setDate(e.target.value)}
              className={input}
            />
          </div>
          {hasEnd && (
            <div>
              <label className={labelCls} htmlFor="p-end">
                {status === "concluido"
                  ? t("admin.fieldEndDone")
                  : t("admin.fieldEndStopped")}
              </label>
              <input
                id="p-end"
                required
                type="month"
                pattern="\d{4}-\d{2}"
                min={date}
                value={endDate}
                onChange={(e) => setEndDate(e.target.value)}
                className={input}
              />
            </div>
          )}
        </div>
        {dateInvalid && (
          <p role="alert" className="text-sm text-red-700">
            {t("admin.dateError")}
          </p>
        )}

        <label className="flex cursor-pointer items-center gap-2.5 text-sm">
          <input
            type="checkbox"
            checked={featured}
            onChange={(e) => setFeatured(e.target.checked)}
            className="h-4 w-4 accent-slate-900"
          />
          {t("admin.fieldFeatured")}
        </label>
      </Card>

      <Card title={t("admin.fieldGallery")}>
        <GalleryEditor blocks={blocks} onChange={setBlocks} />
      </Card>

      <Card title={t("admin.fieldSkills")}>
        <SkillPicker selected={selected} onToggle={toggleSkill} />
      </Card>

      <Card title={t("admin.fieldLinks")}>
        {links.length > 0 && (
          <ul className="space-y-4">
            {links.map((k, i) => (
              <li
                key={i}
                className="space-y-2 rounded-xl border border-slate-200 p-3"
              >
                <div className="flex items-center justify-between gap-3">
                  <div className="flex flex-wrap gap-2" role="group">
                    {LINK_TYPES.map((type) => (
                      <button
                        key={type}
                        type="button"
                        aria-pressed={k.type === type}
                        onClick={() => changeLink(i, { type })}
                        className={pill(k.type === type)}
                      >
                        {t(LINK_KEYS[type])}
                      </button>
                    ))}
                  </div>
                  <button
                    type="button"
                    onClick={() =>
                      setLinks((prev) => prev.filter((_, j) => j !== i))
                    }
                    aria-label={t("admin.removeLink")}
                    title={t("admin.removeLink")}
                    className="rounded-full p-2 text-slate-500 transition hover:bg-red-50 hover:text-red-700"
                  >
                    <Icon name="trash" />
                  </button>
                </div>
                {k.type === "other" && (
                  <div className="grid gap-2 sm:grid-cols-2">
                    <input
                      placeholder={t("admin.linkLabelPt")}
                      value={k.labelPt}
                      onChange={(e) =>
                        changeLink(i, { labelPt: e.target.value })
                      }
                      className={input}
                    />
                    <input
                      placeholder={t("admin.linkLabelEn")}
                      value={k.labelEn}
                      onChange={(e) =>
                        changeLink(i, { labelEn: e.target.value })
                      }
                      className={input}
                    />
                  </div>
                )}
                <input
                  type="url"
                  placeholder={t("admin.linkUrl")}
                  value={k.url}
                  onChange={(e) => changeLink(i, { url: e.target.value })}
                  className={input}
                />
              </li>
            ))}
          </ul>
        )}
        <div className="flex flex-wrap gap-2">
          {LINK_TYPES.map((type) => (
            <button
              key={type}
              type="button"
              onClick={() =>
                setLinks((prev) => [
                  ...prev,
                  { type, labelPt: "", labelEn: "", url: "" },
                ])
              }
              className="inline-flex items-center gap-1.5 rounded-full border border-dashed border-slate-300 px-3.5 py-1.5 text-xs font-medium text-slate-600 transition hover:border-slate-900 hover:text-slate-900"
            >
              <Icon name="plus" size={12} />
              {t(LINK_KEYS[type])}
            </button>
          ))}
        </div>
      </Card>

      {error && (
        <div
          role="alert"
          className="rounded-xl border border-red-200 bg-red-50 p-4 text-sm text-red-800"
        >
          {t("admin.saveError", { message: error })}
        </div>
      )}

      <div className="sticky bottom-0 -mx-4 flex flex-wrap items-center gap-3 border-t border-slate-200 bg-white/90 px-4 py-3 backdrop-blur">
        <button
          type="submit"
          disabled={busy || dateInvalid}
          className={primaryBtn}
        >
          {busy ? t("admin.saving") : t("admin.save")}
        </button>
        <button
          type="button"
          onClick={onCancel}
          disabled={busy}
          className={secondaryBtn}
        >
          {t("admin.cancel")}
        </button>
        {progress && <span className="text-sm text-slate-500">{progress}</span>}
      </div>
    </form>
  );
}
