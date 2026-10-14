import { useState } from "react";
import { Link } from "@tanstack/react-router";
import { ArrowLeft, Bookmark, Sparkles } from "lucide-react";
import { AppShell } from "@/components/AppShell";
import { FolderIcon } from "@/components/FolderIcon";
import { NoteContent } from "@/components/NoteContent";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { getFolder, revisionPack, type Note } from "@/data/notes";
import { cn } from "@/lib/utils";

function QACard({ q, a, i }: { q: string; a: string; i: number }) {
  const [open, setOpen] = useState(false);
  return (
    <button
      onClick={() => setOpen((o) => !o)}
      aria-expanded={open}
      className={cn(
        "w-full rounded-2xl border p-4 text-left transition-colors focus-visible:ring-2 focus-visible:ring-ring focus-visible:outline-none",
        open ? "border-primary/40 bg-accent" : "bg-card hover:bg-accent",
      )}
    >
      <span className="text-xs font-medium text-muted-foreground">Q{i + 1}</span>
      <p className="font-medium">{q}</p>
      {open ? (
        <p className="mt-2 text-primary animate-enter">{a}</p>
      ) : (
        <p className="mt-2 text-sm text-muted-foreground">Tap to reveal answer</p>
      )}
    </button>
  );
}

export default function NoteView({ note }: { note: Note }) {
  const folder = getFolder(note.folderId)!;
  const [state, setState] = useState<"idle" | "loading" | "ready">("idle");
  const pack = revisionPack(note);

  const generate = () => {
    setState("loading");
    setTimeout(() => setState("ready"), 1500);
  };

  return (
    <AppShell>
      <div className="mx-auto grid max-w-6xl gap-8 lg:grid-cols-[1.4fr_1fr]">
        <div>
          <Link to="/folders" search={{ folder: folder.id }} className="mb-6 inline-flex items-center gap-2 rounded-lg text-sm text-muted-foreground hover:text-foreground focus-visible:ring-2 focus-visible:ring-ring focus-visible:outline-none">
            <ArrowLeft className="size-4" /> <FolderIcon folder={folder} size="sm" /> {folder.name}
          </Link>
          <div className="rounded-2xl border bg-card p-6 shadow-soft md:p-10">
            <NoteContent note={note} />
          </div>
        </div>

        <aside className="lg:sticky lg:top-24 lg:self-start" aria-label="Revision pack">
          {state === "idle" && (
            <div className="rounded-2xl border bg-card p-6 shadow-soft">
              <h2 className="text-lg font-semibold">Revision pack</h2>
              <p className="mt-1 text-sm text-muted-foreground">Key pointers and a 10-question quiz, made from this note.</p>
              <Button size="xl" className="mt-6 w-full" onClick={generate}>
                <Sparkles /> Generate revision pack
              </Button>
            </div>
          )}
          {state === "loading" && (
            <div className="space-y-3 rounded-2xl border bg-card p-6 shadow-soft" role="status" aria-live="polite">
              <p className="text-sm font-medium">Building your revision pack…</p>
              <Skeleton className="h-9 rounded-xl" />
              {Array.from({ length: 5 }).map((_, i) => <Skeleton key={i} className="h-5" style={{ width: `${90 - i * 10}%` }} />)}
            </div>
          )}
          {state === "ready" && (
            <div className="rounded-2xl border bg-card p-6 shadow-soft animate-enter">
              <div className="mb-4 flex items-center justify-between">
                <h2 className="text-lg font-semibold">Revision pack</h2>
                <span className="inline-flex items-center gap-1 rounded-full bg-success/15 px-2.5 py-1 text-xs font-medium text-success-strong">
                  <Bookmark className="size-3" aria-hidden /> Saved with this note
                </span>
              </div>
              <Tabs defaultValue="pointers">
                <TabsList className="grid w-full grid-cols-2 rounded-xl">
                  <TabsTrigger value="pointers" className="rounded-lg">Key pointers</TabsTrigger>
                  <TabsTrigger value="questions" className="rounded-lg">Question bank</TabsTrigger>
                </TabsList>
                <TabsContent value="pointers" className="mt-4">
                  <ul className="space-y-3">
                    {pack.pointers.map((p) => (
                      <li key={p} className="flex gap-3 text-sm leading-relaxed">
                        <span className="mt-1 grid size-4 shrink-0 place-items-center rounded-full bg-primary text-[10px] text-primary-foreground" aria-hidden>✓</span>
                        {p}
                      </li>
                    ))}
                  </ul>
                </TabsContent>
                <TabsContent value="questions" className="mt-4 space-y-3">
                  {pack.qa.map((x, i) => <QACard key={i} {...x} i={i} />)}
                </TabsContent>
              </Tabs>
            </div>
          )}
        </aside>
      </div>
    </AppShell>
  );
}
