import type { Folder } from "@/data/notes";
import { cn } from "@/lib/utils";

const colorCls: Record<Folder["color"], string> = {
  lavender: "bg-folder-lavender",
  mint: "bg-folder-mint",
  peach: "bg-folder-peach",
  sky: "bg-folder-sky",
};

export function FolderIcon({ folder, size = "md" }: { folder: Folder; size?: "sm" | "md" | "lg" }) {
  return (
    <span
      aria-hidden
      className={cn(
        "grid shrink-0 place-items-center rounded-xl",
        colorCls[folder.color],
        size === "sm" && "size-6 rounded-lg text-xs",
        size === "md" && "size-10 text-lg",
        size === "lg" && "size-14 text-2xl",
      )}
    >
      {folder.emoji}
    </span>
  );
}
