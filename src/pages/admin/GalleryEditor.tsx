import {
  useRef,
  useState,
  type ChangeEvent,
  type DragEvent,
  type KeyboardEvent,
} from "react";
import { useTranslation } from "react-i18next";
import { Icon } from "./AdminUi";
import { input, pill } from "./adminStyles";

type Side = "left" | "right";

// Um bloco em edição: imagem já guardada (image = URL) ou ficheiro novo ainda por enviar (file)
export interface BlockDraft {
  key: string;
  image: string; // URL guardado, ou pré-visualização local se houver file
  file: File | null;
  captionPt: string;
  captionEn: string;
  side: Side;
}

interface Props {
  blocks: BlockDraft[];
  onChange: (blocks: BlockDraft[]) => void;
}

const iconBtn =
  "rounded-full p-2 text-slate-500 transition hover:bg-slate-100 hover:text-slate-900 disabled:opacity-30 disabled:hover:bg-transparent";

export default function GalleryEditor({ blocks, onChange }: Props) {
  const { t } = useTranslation();
  const fileInput = useRef<HTMLInputElement>(null);
  const [dragging, setDragging] = useState(false);

  function addFiles(list: File[]) {
    const files = list.filter((f) => f.type.startsWith("image/"));
    if (!files.length) return;

    let side: Side =
      blocks.length && blocks[blocks.length - 1].side === "left"
        ? "right"
        : "left";
    const added = files.map((file) => {
      const draft: BlockDraft = {
        key: crypto.randomUUID(),
        image: URL.createObjectURL(file),
        file,
        captionPt: "",
        captionEn: "",
        side,
      };
      side = side === "left" ? "right" : "left";
      return draft;
    });
    onChange([...blocks, ...added]);
  }

  function onPick(e: ChangeEvent<HTMLInputElement>) {
    const files = Array.from(e.target.files ?? []);
    e.target.value = "";
    addFiles(files);
  }

  function onDrop(e: DragEvent) {
    e.preventDefault();
    setDragging(false);
    addFiles(Array.from(e.dataTransfer.files));
  }

  function onDropzoneKey(e: KeyboardEvent) {
    if (e.key === "Enter" || e.key === " ") {
      e.preventDefault();
      fileInput.current?.click();
    }
  }

  function patch(index: number, change: Partial<BlockDraft>) {
    onChange(blocks.map((b, i) => (i === index ? { ...b, ...change } : b)));
  }

  function move(index: number, dir: -1 | 1) {
    const target = index + dir;
    if (target < 0 || target >= blocks.length) return;
    const next = [...blocks];
    [next[index], next[target]] = [next[target], next[index]];
    onChange(next);
  }

  function remove(index: number) {
    const block = blocks[index];
    if (block.file) URL.revokeObjectURL(block.image);
    onChange(blocks.filter((_, i) => i !== index));
  }

  return (
    <div className="space-y-4">
      <p className="text-sm text-slate-500">{t("admin.galleryHint")}</p>

      {blocks.length > 0 && (
        <ul className="space-y-4">
          {blocks.map((b, i) => (
            <li
              key={b.key}
              className="overflow-hidden rounded-xl border border-slate-200"
            >
              <div className="grid sm:grid-cols-[13rem_1fr]">
                <div className="relative bg-slate-100">
                  <img
                    src={b.image}
                    alt=""
                    className="h-full min-h-36 w-full object-cover"
                  />
                  <span className="absolute left-2 top-2 rounded-full bg-black/70 px-2.5 py-0.5 text-xs text-white">
                    {i === 0 ? t("admin.cover") : i + 1}
                  </span>
                </div>

                <div className="space-y-3 p-4">
                  <textarea
                    rows={2}
                    placeholder={t("admin.captionPt")}
                    value={b.captionPt}
                    onChange={(e) => patch(i, { captionPt: e.target.value })}
                    className={input}
                  />
                  <textarea
                    rows={2}
                    placeholder={t("admin.captionEn")}
                    value={b.captionEn}
                    onChange={(e) => patch(i, { captionEn: e.target.value })}
                    className={input}
                  />

                  <div className="flex flex-wrap items-center justify-between gap-3">
                    <div className="flex gap-2" role="group">
                      <button
                        type="button"
                        aria-pressed={b.side === "left"}
                        onClick={() => patch(i, { side: "left" })}
                        className={pill(b.side === "left")}
                      >
                        {t("admin.sideLeft")}
                      </button>
                      <button
                        type="button"
                        aria-pressed={b.side === "right"}
                        onClick={() => patch(i, { side: "right" })}
                        className={pill(b.side === "right")}
                      >
                        {t("admin.sideRight")}
                      </button>
                    </div>
                    <div className="flex">
                      <button
                        type="button"
                        onClick={() => move(i, -1)}
                        disabled={i === 0}
                        aria-label={t("admin.moveUp")}
                        title={t("admin.moveUp")}
                        className={iconBtn}
                      >
                        <Icon name="up" />
                      </button>
                      <button
                        type="button"
                        onClick={() => move(i, 1)}
                        disabled={i === blocks.length - 1}
                        aria-label={t("admin.moveDown")}
                        title={t("admin.moveDown")}
                        className={iconBtn}
                      >
                        <Icon name="down" />
                      </button>
                      <button
                        type="button"
                        onClick={() => remove(i)}
                        aria-label={t("admin.removeImage")}
                        title={t("admin.removeImage")}
                        className={`${iconBtn} hover:!bg-red-50 hover:!text-red-700`}
                      >
                        <Icon name="trash" />
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </li>
          ))}
        </ul>
      )}

      <div
        role="button"
        tabIndex={0}
        onClick={() => fileInput.current?.click()}
        onKeyDown={onDropzoneKey}
        onDragOver={(e) => {
          e.preventDefault();
          setDragging(true);
        }}
        onDragLeave={() => setDragging(false)}
        onDrop={onDrop}
        className={`flex cursor-pointer flex-col items-center gap-1 rounded-xl border-2 border-dashed px-4 text-center transition focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-slate-900 ${
          blocks.length ? "py-5" : "py-10"
        } ${
          dragging
            ? "border-slate-900 bg-slate-50"
            : "border-slate-200 text-slate-500 hover:border-slate-400"
        }`}
      >
        <Icon name="image" size={22} />
        <p className="text-sm font-medium text-slate-800">
          {t("admin.dropTitle")}
        </p>
        <p className="text-xs">{t("admin.dropOr")}</p>
        {!blocks.length && (
          <p className="mt-1 text-xs text-slate-400">{t("admin.dropHint")}</p>
        )}
        <input
          ref={fileInput}
          type="file"
          accept="image/*"
          multiple
          className="sr-only"
          tabIndex={-1}
          onChange={onPick}
        />
      </div>
    </div>
  );
}
