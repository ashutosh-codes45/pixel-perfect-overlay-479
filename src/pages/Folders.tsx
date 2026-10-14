import { Link, useNavigate } from "@tanstack/react-router";
import { Search, SearchX, X } from "lucide-react";
import { AppShell } from "@/components/AppShell";
import { FolderIcon } from "@/components/FolderIcon";
import { NoteCard } from "@/components/NoteCard";
import { Button } from "@/components/ui/button";
import { folders, getFolder, notes, notesInFolder } from "@/data/notes";
import { cn } from "@/lib/utils";

export default function Folders({ q = "", folder }: { q?: string | undefined; folder?: string | undefined }) {
  const navigate = useNavigate();
  const active = folder ? getFolder(folder) : undefined;
  const setQ = (v: string) =>
    navigate({ to: "/folders", search: { q: v || undefined, folder }, replace: true });

  const results = notes.filter(
    (n) => (!active || n.folderId === active.id) && n.title.toLowerCase().includes(q.trim().toLowerCase()),
  );

  return (
    <AppShell>
      <div className="mx-auto max-w-5xl">
        <h1 className="text-3xl font-bold tracking-tight md:text-4xl">{active ? active.name : "Folders"}</h1>
        <p className="mt-2 text-muted-foreground">Everything you've cleaned up, neatly in place.</p>

        <div className="relative mt-8">
          <Search className="pointer-events-none absolute top-1/2 left-4 size-5 -translate-y-1/2 text-muted-foreground" aria-hidden />
          <label htmlFor="folder-search" className="sr-only">Search notes by name</label>
          <input
            id="folder-search"
            value={q}
            onChange={(e) => setQ(e.target.value)}
            placeholder="Search notes by name"
            autoFocus={!!q}
            className="h-14 w-full rounded-2xl border bg-card pr-12 pl-12 text-base shadow-soft placeholder:text-muted-foreground focus-visible:ring-2 focus-visible:ring-ring focus-visible:outline-none"
          />
          {q && (
            <Button variant="ghost" size="icon" className="absolute top-1/2 right-2 -translate-y-1/2" aria-label="Clear search" onClick={() => setQ("")}>
              <X />
            </Button>
          )}
        </div>

        <div className="mt-8 grid grid-cols-2 gap-4 lg:grid-cols-4">
          {folders.map((f) => {
            const on = f.id === folder;
            return (
              <Link
                key={f.id}
                to="/folders"
                search={{ folder: on ? undefined : f.id, q: q || undefined }}
                aria-pressed={on}
                className={cn(
                  "flex flex-col gap-4 rounded-2xl border bg-card p-5 shadow-soft transition-all hover:-translate-y-0.5 hover:shadow-lift focus-visible:ring-2 focus-visible:ring-ring focus-visible:outline-none",
                  on && "border-primary ring-2 ring-primary/30",
                )}
              >
                <FolderIcon folder={f} size="lg" />
                <span>
                  <span className="block font-semibold">{f.name}</span>
                  <span className="text-sm text-muted-foreground">{notesInFolder(f.id).length} notes</span>
                </span>
              </Link>
            );
          })}
        </div>

        <h2 className="mt-12 mb-4 text-xl font-semibold" aria-live="polite">
          {q ? `${results.length} result${results.length === 1 ? "" : "s"} for “${q}”` : active ? `Notes in ${active.name}` : "All notes"}
        </h2>
        {results.length ? (
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {results.map((n) => <NoteCard key={n.id} note={n} query={q} />)}
          </div>
        ) : (
          <div className="flex flex-col items-center rounded-2xl border border-dashed p-12 text-center">
            <SearchX className="size-10 text-muted-foreground" aria-hidden />
            <p className="mt-4 font-semibold">No notes match “{q}”</p>
            <p className="mt-1 text-sm text-muted-foreground">Try a different word — or upload that lecture now.</p>
            <div className="mt-6 flex gap-2">
              <Button variant="outline" onClick={() => setQ("")}>Clear search</Button>
              <Button asChild><Link to="/cleanup">Upload notes</Link></Button>
            </div>
          </div>
        )}
      </div>
    </AppShell>
  );
}
