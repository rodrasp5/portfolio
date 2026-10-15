import { useState, type FormEvent } from "react";
import { useTranslation } from "react-i18next";
import { fields } from "../../data/fields";
import { skills } from "../../data/skills";
import type { Project, ProjectStatus } from "../../data/types";
import {
  useLocalized,
  type Lang,
  type Localizable,
} from "../../i18n/useLocalized";
import { supabase } from "../../lib/supabase";

const input = "w-full rounded border border-slate-300 px-3 py-2";
const label = "mb-1 block text-sm font-medium";

const STATUSES: ProjectStatus[] = ["producao", "concluido"];

interface LinkRow {
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

interface Props {
  project?: Project; // sem project = novo
  onSaved: () => void | Promise<void>;
  onCancel: () => void;
}

export default function ProjectForm({ project, onSaved, onCancel }: Props) {
  const { t } = useTranslation();
  const { l } = useLocalized();

  const [name, setName] = useState(project ? pick(project.name, "pt") : "");
  const [slug, setSlug] = useState(project?.slug ?? "");
  const [slugTouched, setSlugTouched] = useState(false);
  const [descPt, setDescPt] = useState(
    project ? pick(project.description, "pt") : "",
  );
  const [descEn, setDescEn] = useState(
    project ? pick(project.description, "en") : "",
  );
  const [status, setStatus] = useState<ProjectStatus>(
    project?.status ?? "producao",
  );
  const [date, setDate] = useState(project?.date ?? thisMonth());
  const [featured, setFeatured] = useState(project?.featured ?? false);
  const [selected, setSelected] = useState<Set<string>>(
    new Set(project?.skills ?? []),
  );
  const [links, setLinks] = useState<LinkRow[]>(
    project?.links.map((k) => ({
      labelPt: pick(k.label, "pt"),
      labelEn: pick(k.label, "en"),
      url: k.url,
    })) ?? [],
  );
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState("");

  function changeName(value: string) {
    setName(value);
    if (!project && !slugTouched) setSlug(slugify(value));
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
    if (!supabase) return;
    setBusy(true);
    setError("");

    const row: Project = {
      slug,
      name: name.trim(),
      description: { pt: descPt.trim(), en: descEn.trim() || descPt.trim() },
      status,
      gallery: project?.gallery ?? [], // a galeria é editada no passo das imagens
      links: links
        .filter((k) => k.url.trim())
        .map((k) => {
          const pt = k.labelPt.trim() || "Link";
          const en = k.labelEn.trim();
          return {
            label: en && en !== pt ? { pt, en } : pt,
            url: k.url.trim(),
          };
        }),
      skills: [...selected],
      date,
      featured,
    };

    const { error: err } = project
      ? await supabase.from("projects").update(row).eq("slug", project.slug)
      : await supabase.from("projects").insert(row);

    setBusy(false);
    if (err) setError(err.message);
    else await onSaved();
  }

  return (
    <form onSubmit={(e) => void handleSubmit(e)} className="mt-8 space-y-5">
      <h2 className="text-lg font-semibold">
        {project ? t("admin.editProject") : t("admin.newProject")}
      </h2>

      <div>
        <label className={label}>{t("admin.fieldName")}</label>
        <input
          required
          value={name}
          onChange={(e) => changeName(e.target.value)}
          className={input}
        />
      </div>

      <div>
        <label className={label}>{t("admin.fieldSlug")}</label>
        <input
          required
          value={slug}
          disabled={Boolean(project)}
          pattern="[a-z0-9\-]+"
          onChange={(e) => {
            setSlugTouched(true);
            setSlug(slugify(e.target.value));
          }}
          className={`${input} disabled:bg-slate-100 disabled:text-slate-500`}
        />
      </div>

      <div>
        <label className={label}>{t("admin.fieldDescPt")}</label>
        <textarea
          required
          rows={4}
          value={descPt}
          onChange={(e) => setDescPt(e.target.value)}
          className={input}
        />
      </div>

      <div>
        <label className={label}>{t("admin.fieldDescEn")}</label>
        <textarea
          rows={4}
          value={descEn}
          onChange={(e) => setDescEn(e.target.value)}
          className={input}
        />
      </div>

      <div className="grid gap-4 sm:grid-cols-2">
        <div>
          <label className={label}>{t("admin.fieldStatus")}</label>
          <select
            value={status}
            onChange={(e) => setStatus(e.target.value as ProjectStatus)}
            className={input}
          >
            {STATUSES.map((s) => (
              <option key={s} value={s}>
                {t(`status.${s}`)}
              </option>
            ))}
          </select>
        </div>
        <div>
          <label className={label}>{t("admin.fieldDate")}</label>
          <input
            required
            type="month"
            pattern="\d{4}-\d{2}"
            value={date}
            onChange={(e) => setDate(e.target.value)}
            className={input}
          />
        </div>
      </div>

      <label className="flex items-center gap-2 text-sm">
        <input
          type="checkbox"
          checked={featured}
          onChange={(e) => setFeatured(e.target.checked)}
        />
        {t("admin.fieldFeatured")}
      </label>

      <fieldset>
        <legend className={label}>{t("admin.fieldSkills")}</legend>
        <div className="space-y-3">
          {fields.map((f) => (
            <div key={f.id}>
              <p
                className="mb-1 text-xs font-medium"
                style={{ color: f.color }}
              >
                {f.icon} {l(f.name)}
              </p>
              <div className="flex flex-wrap gap-2">
                {skills
                  .filter((s) => s.field === f.id)
                  .map((s) => (
                    <label
                      key={s.id}
                      className={`cursor-pointer rounded border px-2 py-1 text-xs ${
                        selected.has(s.id)
                          ? "border-black bg-black text-white"
                          : "border-slate-300"
                      }`}
                    >
                      <input
                        type="checkbox"
                        className="sr-only"
                        checked={selected.has(s.id)}
                        onChange={() => toggleSkill(s.id)}
                      />
                      {s.name}
                    </label>
                  ))}
              </div>
            </div>
          ))}
        </div>
      </fieldset>

      <fieldset>
        <legend className={label}>{t("admin.fieldLinks")}</legend>
        <div className="space-y-3">
          {links.map((k, i) => (
            <div key={i} className="grid gap-2 sm:grid-cols-[1fr_1fr_2fr_auto]">
              <input
                placeholder={t("admin.linkLabelPt")}
                value={k.labelPt}
                onChange={(e) => changeLink(i, { labelPt: e.target.value })}
                className={input}
              />
              <input
                placeholder={t("admin.linkLabelEn")}
                value={k.labelEn}
                onChange={(e) => changeLink(i, { labelEn: e.target.value })}
                className={input}
              />
              <input
                type="url"
                placeholder={t("admin.linkUrl")}
                value={k.url}
                onChange={(e) => changeLink(i, { url: e.target.value })}
                className={input}
              />
              <button
                type="button"
                onClick={() =>
                  setLinks((prev) => prev.filter((_, j) => j !== i))
                }
                className="text-sm underline"
              >
                {t("admin.removeLink")}
              </button>
            </div>
          ))}
        </div>
        <button
          type="button"
          onClick={() =>
            setLinks((prev) => [...prev, { labelPt: "", labelEn: "", url: "" }])
          }
          className="mt-3 text-sm underline"
        >
          {t("admin.addLink")}
        </button>
      </fieldset>

      {error && (
        <div
          role="alert"
          className="rounded border border-red-300 bg-red-50 p-3 text-sm text-red-800"
        >
          {t("admin.saveError", { message: error })}
        </div>
      )}

      <div className="flex gap-3">
        <button
          type="submit"
          disabled={busy}
          className="rounded bg-black px-4 py-2 text-white disabled:opacity-50"
        >
          {busy ? t("admin.saving") : t("admin.save")}
        </button>
        <button
          type="button"
          onClick={onCancel}
          className="rounded border border-slate-300 px-4 py-2"
        >
          {t("admin.cancel")}
        </button>
      </div>
    </form>
  );
}
