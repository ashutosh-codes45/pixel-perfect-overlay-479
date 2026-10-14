import { createFileRoute } from "@tanstack/react-router";
import Folders from "@/pages/Folders";

type S = { q?: string; folder?: string };

export const Route = createFileRoute("/folders")({
  validateSearch: (s: Record<string, unknown>): S => ({
    q: typeof s.q === "string" && s.q ? s.q : undefined,
    folder: typeof s.folder === "string" ? s.folder : undefined,
  }),
  head: () => ({
    meta: [
      { title: "Folders & search — Clearly" },
      { name: "description", content: "Browse your subject folders and search notes by name." },
      { property: "og:title", content: "Folders & search — Clearly" },
      { property: "og:description", content: "Browse your subject folders and search notes by name." },
    ],
  }),
  component: FoldersRoute,
});

function FoldersRoute() {
  const { q, folder } = Route.useSearch();
  return <Folders q={q} folder={folder} />;
}
