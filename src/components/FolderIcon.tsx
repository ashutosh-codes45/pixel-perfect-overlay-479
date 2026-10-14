import { Atom, FlaskConical, Leaf, Network } from "lucide-react";
import type { Folder } from "@/data/notes";

const icons = { atom: Atom, flask: FlaskConical, leaf: Leaf, network: Network };
import { cn } from "@/lib/utils";

const colorCls: Record<Folder["color"], string> = {
  lavender: "bg-folder-lavender",
  mint: "bg-folder-mint",
  peach: "bg-folder-peach",
  sky: "bg-folder-sky",
};

export function FolderIcon({ folder, size = "md" }: { folder: Folder; size?: "sm" | "md" | "lg" }) {
  const Icon = icons[folder.icon];
  return (
    <span
      aria-hidden
      className={cn(
        "grid shrink-0 place-items-center rounded-xl text-foreground/80",
        colorCls[folder.color],
        size === "sm" && "size-6 rounded-lg text-xs",
        size === "md" && "size-10 text-lg",
        size === "lg" && "size-14 text-2xl",
      )}
    >
      <Icon className={size === "sm" ? "size-3.5" : size === "md" ? "size-5" : "size-7"} />
    </span>
  );
}
