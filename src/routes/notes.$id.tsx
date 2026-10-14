import { createFileRoute, notFound } from "@tanstack/react-router";
import NoteView from "@/pages/NoteView";
import { getNote } from "@/data/notes";

export const Route = createFileRoute("/notes/$id")({
  loader: ({ params }) => {
    const note = getNote(params.id);
    if (!note) throw notFound();
    return { note };
  },
  head: ({ loaderData }) => ({
    meta: loaderData
      ? [
          { title: `${loaderData.note.title} — Clearly` },
          { name: "description", content: loaderData.note.summary },
          { property: "og:title", content: `${loaderData.note.title} — Clearly` },
          { property: "og:description", content: loaderData.note.summary },
        ]
      : [{ title: "Note not found — Clearly" }, { name: "robots", content: "noindex" }],
  }),
  component: NoteRoute,
});

function NoteRoute() {
  const { note } = Route.useLoaderData();
  return <NoteView key={note.id} note={note} />;
}
