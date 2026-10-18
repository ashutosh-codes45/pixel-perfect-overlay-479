import type { Note } from "@/data/notes";

export function NoteContent({
  note,
  compact = false,
  aligned = false,
}: {
  note: Note;
  compact?: boolean;
  aligned?: boolean;
}) {
  if (aligned) {
    return (
      <article className="space-y-2.5 sm:space-y-3">
        <div className="border-b pb-1.5 mb-2">
          <h2 className="text-lg sm:text-xl font-bold tracking-tight text-foreground">
            {note.title.split("–")[0].trim()}
            {note.title.includes("–") && (
              <span className="ml-2 text-xs font-normal text-muted-foreground">
                — {note.title.split("–")[1].trim()}
              </span>
            )}
          </h2>
        </div>
        {note.sections.map((s) => (
          <section key={s.heading} className="space-y-1">
            <h3 className="text-xs font-bold uppercase tracking-wide text-primary">
              {s.heading}
            </h3>
            <ul className="space-y-1">
              {s.bullets.map((b) => {
                const [term, ...rest] = b.split(":");
                return (
                  <li key={b} className="flex gap-2 text-xs sm:text-sm leading-relaxed">
                    <span className="mt-1.5 size-1.5 shrink-0 rounded-full bg-primary/70" aria-hidden />
                    <span>
                      {rest.length ? (
                        <>
                          <strong className="font-semibold text-foreground">{term}:</strong>
                          <span className="text-foreground/90">{rest.join(":")}</span>
                        </>
                      ) : (
                        b
                      )}
                    </span>
                  </li>
                );
              })}
            </ul>
          </section>
        ))}
      </article>
    );
  }

  return (
    <article className={compact ? "space-y-4" : "space-y-8"}>
      <h2 className={compact ? "text-xl font-bold" : "text-2xl font-bold md:text-3xl"}>{note.title}</h2>
      {note.sections.map((s) => (
        <section key={s.heading}>
          <h3 className="mb-2 font-semibold text-primary">{s.heading}</h3>
          <ul className="space-y-1.5">
            {s.bullets.map((b) => {
              const [term, ...rest] = b.split(":");
              return (
                <li key={b} className="flex gap-2 leading-relaxed">
                  <span className="mt-2.5 size-1.5 shrink-0 rounded-full bg-primary/60" aria-hidden />
                  <span>
                    {rest.length ? (
                      <>
                        <strong className="font-semibold">{term}:</strong>
                        {rest.join(":")}
                      </>
                    ) : (
                      b
                    )}
                  </span>
                </li>
              );
            })}
          </ul>
        </section>
      ))}
    </article>
  );
}
