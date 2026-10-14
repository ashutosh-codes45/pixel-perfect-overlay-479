import { Link } from "@tanstack/react-router";
import { getFolder, type Note } from "@/data/notes";
import { FolderIcon } from "./FolderIcon";
import { Highlight } from "./Highlight";

export function NoteCard({ note, query = "" }: { note: Note; query?: string }) {
  const folder = getFolder(note.folderId)!;
  return (
    <Link
      to="/notes/$id"
      params={{ id: note.id }}
      className="group flex flex-col gap-3 rounded-2xl border bg-card p-5 shadow-soft transition-all hover:-translate-y-0.5 hover:shadow-lift focus-visible:ring-2 focus-visible:ring-ring focus-visible:outline-none active:translate-y-0"
    >
      <div className="flex items-center gap-2 text-xs text-muted-foreground">
        <FolderIcon folder={folder} size="sm" />
        {folder.name} · {note.updated}
      </div>
      <h3 className="font-semibold leading-snug group-hover:text-primary">
        <Highlight text={note.title} query={query} />
      </h3>
      <p className="line-clamp-2 text-sm text-muted-foreground">{note.summary}</p>
    </Link>
  );
}
