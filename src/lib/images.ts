import { supabase } from "./supabase";

export const BUCKET = "project-images";
const MAX_WIDTH = 1600;

// Reduz a imagem (largura máx. 1600px) e converte para webp antes de enviar
async function toWebp(file: File): Promise<Blob> {
  const bitmap = await createImageBitmap(file);
  const scale = Math.min(1, MAX_WIDTH / bitmap.width);
  const canvas = document.createElement("canvas");
  canvas.width = Math.round(bitmap.width * scale);
  canvas.height = Math.round(bitmap.height * scale);
  const ctx = canvas.getContext("2d");
  if (!ctx) throw new Error("Não foi possível processar a imagem.");
  ctx.drawImage(bitmap, 0, 0, canvas.width, canvas.height);
  bitmap.close();
  return new Promise((resolve, reject) =>
    canvas.toBlob(
      (blob) =>
        blob
          ? resolve(blob)
          : reject(new Error("Não foi possível converter a imagem.")),
      "image/webp",
      0.85,
    ),
  );
}

// Envia uma imagem para o Storage e devolve o URL público
export async function uploadProjectImage(
  file: File,
  slug: string,
): Promise<string> {
  if (!supabase) throw new Error("Supabase não configurado.");
  const blob = await toWebp(file);
  const path = `${slug}/${crypto.randomUUID()}.webp`;
  const { error } = await supabase.storage
    .from(BUCKET)
    .upload(path, blob, {
      contentType: "image/webp",
      cacheControl: "31536000",
    });
  if (error) throw error;
  return supabase.storage.from(BUCKET).getPublicUrl(path).data.publicUrl;
}

// Apaga do Storage as imagens que estejam no bucket (ignora as restantes, como /projects/x.webp)
export async function removeProjectImages(urls: string[]) {
  if (!supabase) return;
  const marker = `/${BUCKET}/`;
  const paths = urls
    .map((u) => {
      const i = u.indexOf(marker);
      return i === -1 ? null : decodeURIComponent(u.slice(i + marker.length));
    })
    .filter((p): p is string => p !== null);
  if (paths.length) await supabase.storage.from(BUCKET).remove(paths);
}
