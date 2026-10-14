import { useEffect, useState } from "react";
import { useNavigate } from "@tanstack/react-router";
import { Camera, Search, Upload } from "lucide-react";
import { AppShell } from "@/components/AppShell";
import { NoteCard } from "@/components/NoteCard";
import { Skeleton } from "@/components/ui/skeleton";
import { notes } from "@/data/notes";

export default function Home() {
  const navigate = useNavigate();
  const [q, setQ] = useState("");
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    const t = setTimeout(() => setLoading(false), 600);
    return () => clearTimeout(t);
  }, []);

  const actions = [
    { icon: Upload, title: "Upload photo/PDF", desc: "Drop in a picture or a scanned PDF", tone: "bg-folder-lavender" },
    { icon: Camera, title: "Scan with camera", desc: "Point, snap, done", tone: "bg-folder-mint" },
  ];

  return (
    <AppShell>
      <div className="mx-auto max-w-5xl">
        <h1 className="text-3xl font-bold tracking-tight md:text-4xl">Good evening, Aanya 👋</h1>
        <p className="mt-2 text-muted-foreground">What are we cleaning up today?</p>

        <form
          role="search"
          className="relative mt-8"
          onSubmit={(e) => {
            e.preventDefault();
            navigate({ to: "/folders", search: { q } });
          }}
        >
          <Search className="pointer-events-none absolute top-1/2 left-4 size-5 -translate-y-1/2 text-muted-foreground" aria-hidden />
          <label htmlFor="home-search" className="sr-only">Search your notes</label>
          <input
            id="home-search"
            value={q}
            onChange={(e) => setQ(e.target.value)}
            placeholder="Search your notes"
            className="h-14 w-full rounded-2xl border bg-card pr-4 pl-12 text-base shadow-soft transition-shadow placeholder:text-muted-foreground focus-visible:ring-2 focus-visible:ring-ring focus-visible:outline-none"
          />
        </form>

        <div className="mt-8 grid gap-4 sm:grid-cols-2">
          {actions.map((a) => (
            <button
              key={a.title}
              onClick={() => navigate({ to: "/cleanup" })}
              className="group flex items-center gap-4 rounded-2xl border bg-card p-6 text-left shadow-soft transition-all hover:-translate-y-0.5 hover:shadow-lift focus-visible:ring-2 focus-visible:ring-ring focus-visible:outline-none active:translate-y-0 md:p-8"
            >
              <span className={`grid size-14 shrink-0 place-items-center rounded-2xl ${a.tone}`}>
                <a.icon className="size-6 text-foreground" aria-hidden />
              </span>
              <span>
                <span className="block text-lg font-semibold group-hover:text-primary">{a.title}</span>
                <span className="text-sm text-muted-foreground">{a.desc}</span>
              </span>
            </button>
          ))}
        </div>

        <h2 className="mt-12 mb-4 text-xl font-semibold">Recent notes</h2>
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {loading
            ? Array.from({ length: 3 }).map((_, i) => <Skeleton key={i} className="h-36 rounded-2xl" />)
            : notes.slice(0, 6).map((n) => <NoteCard key={n.id} note={n} />)}
        </div>
      </div>
    </AppShell>
  );
}
