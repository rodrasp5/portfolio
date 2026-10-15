import type { ChangeEvent } from "react";
import { useTranslation } from "react-i18next";

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

const input = "w-full rounded border border-slate-300 px-3 py-2 text-sm";

export default function GalleryEditor({ blocks, onChange }: Props) {
  const { t } = useTranslation();

  function addFiles(e: ChangeEvent<HTMLInputElement>) {
    const files = Array.from(e.target.files ?? []);
    e.target.value = "";
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
    <div>
      <p className="mb-3 text-xs text-slate-500">{t("admin.galleryHint")}</p>

      <ul className="space-y-4">
        {blocks.map((b, i) => (
          <li key={b.key} className="rounded border border-slate-200 p-3">
            <div className="grid gap-3 sm:grid-cols-[10rem_1fr]">
              <img
                src={b.image}
                alt=""
                className="aspect-video w-full rounded bg-slate-100 object-cover"
              />
              <div className="space-y-2">
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
                <select
                  value={b.side}
                  onChange={(e) => patch(i, { side: e.target.value as Side })}
                  className={input}
                >
                  <option value="left">{t("admin.sideLeft")}</option>
                  <option value="right">{t("admin.sideRight")}</option>
                </select>
              </div>
            </div>
            <div className="mt-3 flex gap-4 text-sm">
              <button
                type="button"
                onClick={() => move(i, -1)}
                disabled={i === 0}
                className="underline disabled:opacity-30"
              >
                {t("admin.moveUp")}
              </button>
              <button
                type="button"
                onClick={() => move(i, 1)}
                disabled={i === blocks.length - 1}
                className="underline disabled:opacity-30"
              >
                {t("admin.moveDown")}
              </button>
              <button
                type="button"
                onClick={() => remove(i)}
                className="text-red-700 underline"
              >
                {t("admin.removeImage")}
              </button>
            </div>
          </li>
        ))}
      </ul>

      <label className="mt-3 inline-block cursor-pointer text-sm underline">
        {t("admin.addImages")}
        <input
          type="file"
          accept="image/*"
          multiple
          className="sr-only"
          onChange={addFiles}
        />
      </label>
    </div>
  );
}
