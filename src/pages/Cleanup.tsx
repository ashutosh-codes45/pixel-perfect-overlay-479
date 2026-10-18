import { useEffect, useState } from "react";
import { useNavigate } from "@tanstack/react-router";
import { Check, Pencil, Sparkles, X } from "lucide-react";
import { toast } from "sonner";
import { AppShell } from "@/components/AppShell";
import { CompareSlider } from "@/components/CompareSlider";
import { NoteContent } from "@/components/NoteContent";
import { Button } from "@/components/ui/button";
import { getNote, type Note } from "@/data/notes";
import { useUploadedImage, getUploadedFileType } from "@/lib/uploaded-image";
import messy from "@/assets/messy-notes.jpg";

function formatNoteToText(note: Note): string {
  const lines: string[] = [note.title, ""];
  for (const s of note.sections) {
    lines.push(s.heading + ":");
    for (const b of s.bullets) {
      lines.push(`• ${b}`);
    }
    lines.push("");
  }
  return lines.join("\n").trim();
}

function parseTextToNote(text: string, baseNote: Note): Note {
  const lines = text
    .split("\n")
    .map((l) => l.trim())
    .filter(Boolean);
  if (lines.length === 0) return baseNote;

  const title = lines[0] || baseNote.title;
  const sections: { heading: string; bullets: string[] }[] = [];
  let currentHeading = "Notes";
  let currentBullets: string[] = [];

  for (let i = 1; i < lines.length; i++) {
    const line = lines[i];
    if (
      line.endsWith(":") ||
      (!line.startsWith("•") && !line.startsWith("-") && !line.startsWith("*"))
    ) {
      if (currentBullets.length > 0) {
        sections.push({ heading: currentHeading, bullets: currentBullets });
        currentBullets = [];
      }
      currentHeading = line.replace(/:$/, "").trim();
    } else {
      const cleanBullet = line.replace(/^[•\-\*]\s*/, "").trim();
      if (cleanBullet) currentBullets.push(cleanBullet);
    }
  }
  if (currentBullets.length > 0) {
    sections.push({ heading: currentHeading, bullets: currentBullets });
  }

  return {
    ...baseNote,
    title,
    sections: sections.length > 0 ? sections : baseNote.sections,
  };
}

export default function Cleanup() {
  const navigate = useNavigate();
  const [scanning, setScanning] = useState(true);
  const uploadedImage = useUploadedImage();
  const [imageError, setImageError] = useState(false);

  const isPdf = Boolean(
    getUploadedFileType() === "application/pdf" ||
      (uploadedImage &&
        (uploadedImage.endsWith(".pdf") ||
          uploadedImage.includes("application/pdf") ||
          uploadedImage.includes(".pdf?")))
  );

  const beforeImage = !imageError && uploadedImage && !isPdf ? uploadedImage : messy;

  const [note, setNote] = useState<Note>(() => getNote("thermodynamics")!);
  const [isEditing, setIsEditing] = useState(false);
  const [editText, setEditText] = useState(() => formatNoteToText(note));
  const [sliderPos, setSliderPos] = useState(50);

  useEffect(() => {
    const t = setTimeout(() => setScanning(false), 2200);
    return () => clearTimeout(t);
  }, []);

  const handleStartEdit = () => {
    setEditText(formatNoteToText(note));
    setIsEditing(true);
    setSliderPos(0);
  };

  const handleSave = () => {
    const updated = parseTextToNote(editText, note);
    setNote(updated);
    setIsEditing(false);
    setSliderPos(50);
    toast("Changes saved");
  };

  const handleCancel = () => {
    setEditText(formatNoteToText(note));
    setIsEditing(false);
    setSliderPos(50);
  };

  return (
    <AppShell>
      <div className="mx-auto max-w-4xl">
        {scanning ? (
          <div className="flex flex-col items-center py-6 text-center" role="status" aria-live="polite">
            <div
              className="mb-6 flex w-full max-w-sm flex-col gap-1.5 text-left"
              role="progressbar"
              aria-valuenow={2}
              aria-valuemin={1}
              aria-valuemax={4}
              aria-label="Step 2 of 4"
            >
              <div className="flex items-center justify-between text-xs font-medium text-muted-foreground">
                <span className="font-semibold text-foreground">Step 2 of 4</span>
                <span>Reading note</span>
              </div>
              <div className="flex h-1.5 w-full gap-1.5 overflow-hidden rounded-full">
                <div className="h-full flex-1 rounded-full bg-primary" />
                <div className="h-full flex-1 rounded-full bg-primary" />
                <div className="h-full flex-1 rounded-full bg-muted" />
                <div className="h-full flex-1 rounded-full bg-muted" />
              </div>
            </div>

            <div className="relative w-full max-w-sm overflow-hidden rounded-2xl border shadow-lift">
              <img
                src={beforeImage}
                width={1024}
                height={1280}
                alt="Your uploaded handwritten page"
                className="w-full"
                onError={(e) => {
                  setImageError(true);
                  e.currentTarget.onerror = null;
                  e.currentTarget.src = messy;
                }}
              />
              <div className="scan-line absolute inset-x-0 h-24" aria-hidden />
            </div>
            <h1 className="mt-8 text-2xl font-semibold">Reading your handwriting…</h1>
            <p className="mt-2 text-muted-foreground">Fixing structure, equations and headings.</p>
          </div>
        ) : (
          <div className="animate-enter">
            <div
              className="mb-4 flex flex-col gap-1.5"
              role="progressbar"
              aria-valuenow={2}
              aria-valuemin={1}
              aria-valuemax={4}
              aria-label="Step 2 of 4"
            >
              <div className="flex items-center justify-between text-xs font-medium text-muted-foreground">
                <span className="font-semibold text-foreground">Step 2 of 4</span>
                <span>Review cleanup</span>
              </div>
              <div className="flex h-1.5 w-full gap-1.5 overflow-hidden rounded-full">
                <div className="h-full flex-1 rounded-full bg-primary" />
                <div className="h-full flex-1 rounded-full bg-primary" />
                <div className="h-full flex-1 rounded-full bg-muted" />
                <div className="h-full flex-1 rounded-full bg-muted" />
              </div>
            </div>

            <span className="inline-flex items-center gap-2 rounded-full bg-success/15 px-3 py-1 text-sm font-medium text-success-strong">
              <Sparkles className="size-4" aria-hidden /> AI cleaned your notes
            </span>
            <h1 className="mt-2 text-2xl md:text-3xl font-bold tracking-tight">Before & after</h1>
            <p className="mt-1 text-sm text-muted-foreground">
              Drag the handle to compare. Nothing's lost — just tidied up.
            </p>
            <div className="mt-4">
              <CompareSlider
                className="h-[380px] md:h-[400px] w-full"
                position={sliderPos}
                onPositionChange={setSliderPos}
                afterClassName={isEditing ? "p-3 sm:p-4 md:p-4" : undefined}
                before={
                  <img
                    src={beforeImage}
                    alt="Original handwritten notes"
                    className="size-full object-cover object-top"
                    draggable={false}
                    onError={(e) => {
                      setImageError(true);
                      e.currentTarget.onerror = null;
                      e.currentTarget.src = messy;
                    }}
                  />
                }
                after={
                  isEditing ? (
                    <div className="flex h-full flex-col" data-prevent-slide="true">
                      <div className="flex items-center justify-between border-b pb-2 mb-2">
                        <span className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                          Quick edit
                        </span>
                        <div className="flex gap-2">
                          <Button size="sm" variant="outline" onClick={handleCancel}>
                            Cancel
                          </Button>
                          <Button size="sm" onClick={handleSave}>
                            Save
                          </Button>
                        </div>
                      </div>
                      <textarea
                        value={editText}
                        onChange={(e) => setEditText(e.target.value)}
                        className="flex-1 w-full min-h-[240px] resize-none rounded-xl border bg-background/80 p-3 font-mono text-xs sm:text-sm leading-relaxed focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
                        placeholder="Edit clean note..."
                        aria-label="Edit clean note"
                        autoFocus
                      />
                    </div>
                  ) : (
                    <NoteContent note={note} compact aligned />
                  )
                }
              />
            </div>
            <div className="mt-4 flex flex-col gap-3 sm:flex-row">
              {isEditing ? (
                <>
                  <Button size="xl" onClick={handleSave}>
                    <Check /> Save
                  </Button>
                  <Button variant="outline" size="xl" onClick={handleCancel}>
                    <X /> Cancel
                  </Button>
                </>
              ) : (
                <>
                  <Button size="xl" onClick={() => navigate({ to: "/filed" })}>
                    <Check /> Looks good
                  </Button>
                  <Button variant="outline" size="xl" onClick={handleStartEdit}>
                    <Pencil /> Quick edit
                  </Button>
                </>
              )}
            </div>
          </div>
        )}
      </div>
    </AppShell>
  );
}
