import { useState } from "react";
import { Link } from "@tanstack/react-router";
import { ArrowRight, Check, FolderInput, Pencil } from "lucide-react";
import { AppShell } from "@/components/AppShell";
import { FolderIcon } from "@/components/FolderIcon";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { folders, getFolder } from "@/data/notes";
import { cn } from "@/lib/utils";

export default function Filed() {
  const [title, setTitle] = useState("Thermodynamics – Laws & Entropy");
  const [editing, setEditing] = useState(false);
  const [folderId, setFolderId] = useState("physics");
  const [picking, setPicking] = useState(false);
  const folder = getFolder(folderId)!;

  return (
    <AppShell>
      <div className="mx-auto flex max-w-lg flex-col items-center py-8 text-center">
        <div className="grid size-20 place-items-center rounded-full bg-success/15 animate-pop">
          <span className="grid size-14 place-items-center rounded-full bg-success text-success-foreground">
            <Check className="size-8" strokeWidth={3} aria-hidden />
          </span>
        </div>
        <h1 className="mt-6 text-3xl font-bold tracking-tight">All sorted!</h1>
        <p className="mt-2 text-muted-foreground">We named and filed your note for you.</p>

        <div className="mt-8 w-full rounded-2xl border bg-card p-6 text-left shadow-soft">
          <p className="text-xs font-medium tracking-wide text-muted-foreground uppercase">Named</p>
          {editing ? (
            <form className="mt-2 flex gap-2" onSubmit={(e) => { e.preventDefault(); setEditing(false); }}>
              <label htmlFor="rename" className="sr-only">Note name</label>
              <Input id="rename" value={title} onChange={(e) => setTitle(e.target.value)} autoFocus className="rounded-xl" />
              <Button type="submit">Save</Button>
            </form>
          ) : (
            <div className="mt-1 flex items-center justify-between gap-2">
              <p className="text-lg font-semibold">{title}</p>
              <Button variant="ghost" size="sm" onClick={() => setEditing(true)}><Pencil /> Rename</Button>
            </div>
          )}

          <p className="mt-6 text-xs font-medium tracking-wide text-muted-foreground uppercase">Filed in</p>
          <div className="mt-2 flex items-center justify-between gap-2">
            <span className="flex items-center gap-3 font-medium"><FolderIcon folder={folder} /> {folder.name}</span>
            <Button variant="ghost" size="sm" onClick={() => setPicking((p) => !p)} aria-expanded={picking}>
              <FolderInput /> Change folder
            </Button>
          </div>
          {picking && (
            <div className="mt-4 grid grid-cols-2 gap-2 animate-enter" role="radiogroup" aria-label="Choose folder">
              {folders.map((f) => (
                <button
                  key={f.id}
                  role="radio"
                  aria-checked={f.id === folderId}
                  onClick={() => { setFolderId(f.id); setPicking(false); }}
                  className={cn(
                    "flex items-center gap-2 rounded-xl border p-2 text-sm transition-colors hover:bg-accent focus-visible:ring-2 focus-visible:ring-ring focus-visible:outline-none",
                    f.id === folderId && "border-primary bg-accent",
                  )}
                >
                  <FolderIcon folder={f} size="sm" /> {f.name}
                </button>
              ))}
            </div>
          )}
        </div>

        <Button asChild size="xl" className="mt-8 w-full">
          <Link to="/notes/$id" params={{ id: "thermodynamics" }}>View note <ArrowRight /></Link>
        </Button>
      </div>
    </AppShell>
  );
}
