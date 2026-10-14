import type { Note } from "@/data/notes";

export function NoteContent({ note, compact = false }: { note: Note; compact?: boolean }) {
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
