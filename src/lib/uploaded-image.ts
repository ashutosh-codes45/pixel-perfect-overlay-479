import { useEffect, useState } from "react";

let uploadedImageUrl: string | null = null;
let uploadedFileType: string | null = null;
const listeners = new Set<(url: string | null) => void>();

export function setUploadedImage(url: string | null, fileType?: string | null) {
  uploadedImageUrl = url;
  uploadedFileType = fileType || (url && url.endsWith(".pdf") ? "application/pdf" : null);
  listeners.forEach((listener) => listener(url));
}

export function getUploadedImage(): string | null {
  return uploadedImageUrl;
}

export function getUploadedFileType(): string | null {
  return uploadedFileType;
}

export function useUploadedImage(): string | null {
  const [url, setUrl] = useState<string | null>(uploadedImageUrl);

  useEffect(() => {
    const listener = (newUrl: string | null) => setUrl(newUrl);
    listeners.add(listener);
    return () => {
      listeners.delete(listener);
    };
  }, []);

  return url;
}
