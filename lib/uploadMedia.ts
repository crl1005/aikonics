import { supabase } from "./supabase";

const CLOUD_NAME    = "dp1orfrcr";
const UPLOAD_PRESET = "kq9wwglf";

export interface UploadResult {
  url: string;
  id: number;
}

export function uploadMedia(
  file: File,
  title: string,
  onProgress: (pct: number) => void
): Promise<UploadResult> {
  return new Promise((resolve, reject) => {
    const type     = file.type.startsWith("video/") ? "video" : "image";
    const endpoint = `https://api.cloudinary.com/v1_1/${CLOUD_NAME}/${type}/upload`;

    const formData = new FormData();
    formData.append("file", file);
    formData.append("upload_preset", UPLOAD_PRESET);

    const xhr = new XMLHttpRequest();

    xhr.upload.addEventListener("progress", e => {
      if (e.lengthComputable) {
        onProgress(Math.round((e.loaded / e.total) * 100));
      }
    });

    xhr.addEventListener("load", async () => {
      if (xhr.status === 200) {
        try {
          const data      = JSON.parse(xhr.responseText);
          const url       = data.secure_url;
          const mediaType = file.type.startsWith("video/") ? "video" : "photo";

          const { data: row, error } = await supabase
            .from("moments")
            .insert({ title, url, type: mediaType })
            .select()
            .single();

          if (error) throw error;
          resolve({ url, id: row.id });
        } catch (err) {
          reject(err);
        }
      } else {
        reject(new Error(`Cloudinary upload failed: ${xhr.statusText}`));
      }
    });

    xhr.addEventListener("error", () => reject(new Error("Network error")));
    xhr.open("POST", endpoint);
    xhr.send(formData);
  });
}