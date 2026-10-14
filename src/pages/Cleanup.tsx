import { useEffect, useState } from "react";
import { useNavigate } from "@tanstack/react-router";
import { Check, Pencil, Sparkles } from "lucide-react";
import { toast } from "sonner";
import { AppShell } from "@/components/AppShell";
import { CompareSlider } from "@/components/CompareSlider";
import { NoteContent } from "@/components/NoteContent";
import { Button } from "@/components/ui/button";
import { getNote } from "@/data/notes";
import messy from "@/assets/messy-notes.jpg";

export default function Cleanup() {
  const navigate = useNavigate();
  const [scanning, setScanning] = useState(true);
  const note = getNote("thermodynamics")!;

  useEffect(() => {
    const t = setTimeout(() => setScanning(false), 2200);
    return () => clearTimeout(t);
  }, []);

  return (
    <AppShell>
      <div className="mx-auto max-w-4xl">
        {scanning ? (
          <div className="flex flex-col items-center py-8 text-center" role="status" aria-live="polite">
            <div className="relative w-full max-w-sm overflow-hidden rounded-2xl border shadow-lift">
              <img src={messy} width={1024} height={1280} alt="Your uploaded handwritten page" className="w-full" />
              <div className="scan-line absolute inset-x-0 h-24" aria-hidden />
            </div>
            <h1 className="mt-8 text-2xl font-semibold">Reading your handwriting…</h1>
            <p className="mt-2 text-muted-foreground">Fixing structure, equations and headings.</p>
          </div>
        ) : (
          <div className="animate-enter">
            <span className="inline-flex items-center gap-2 rounded-full bg-success/15 px-3 py-1 text-sm font-medium text-success-strong">
              <Sparkles className="size-4" aria-hidden /> AI cleaned your notes
            </span>
            <h1 className="mt-4 text-3xl font-bold tracking-tight">Before & after</h1>
            <p className="mt-2 text-muted-foreground">Drag the handle to compare. Nothing's lost — just tidied up.</p>
            <div className="mt-6">
              <CompareSlider
                before={<img src={messy} alt="Original handwritten thermodynamics notes" className="size-full object-cover object-top" draggable={false} />}
                after={<NoteContent note={note} compact />}
              />
            </div>
            <div className="mt-6 flex flex-col gap-3 sm:flex-row">
              <Button size="xl" onClick={() => navigate({ to: "/filed" })}>
                <Check /> Looks good
              </Button>
              <Button variant="outline" size="xl" onClick={() => toast("Quick edit is coming soon", { description: "For now, your notes are saved as-is." })}>
                <Pencil /> Quick edit
              </Button>
            </div>
          </div>
        )}
      </div>
    </AppShell>
  );
}
