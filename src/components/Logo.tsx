import { Link } from "@tanstack/react-router";

export function Logo() {
  return (
    <Link to="/" className="flex items-center gap-2 rounded-lg font-semibold tracking-tight focus-visible:ring-2 focus-visible:ring-ring focus-visible:outline-none">
      <span className="grid size-8 place-items-center rounded-xl bg-primary text-primary-foreground" aria-hidden>
        ✦
      </span>
      <span className="text-lg">Clearly</span>
    </Link>
  );
}
