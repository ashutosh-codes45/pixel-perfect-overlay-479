import { Link, useNavigate } from "@tanstack/react-router";
import { Mail, Moon, Sun } from "lucide-react";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Logo } from "@/components/Logo";
import { AccessibilityPanel } from "@/components/AccessibilityPanel";
import { usePrefs } from "@/components/preferences";
import beforeAfter from "@/assets/before-after.jpg";

function GoogleMark() {
  return (
    <svg viewBox="0 0 24 24" aria-hidden className="size-5">
      <path fill="#4285F4" d="M22.5 12.3c0-.8-.1-1.6-.2-2.3H12v4.4h5.9a5 5 0 0 1-2.2 3.3v2.7h3.6c2-1.9 3.2-4.7 3.2-8.1z" />
      <path fill="#34A853" d="M12 23c3 0 5.5-1 7.3-2.7l-3.6-2.7c-1 .7-2.2 1.1-3.7 1.1-2.9 0-5.3-1.9-6.2-4.5H2.1v2.8A11 11 0 0 0 12 23z" />
      <path fill="#FBBC05" d="M5.8 14.2a6.6 6.6 0 0 1 0-4.3V7H2.1a11 11 0 0 0 0 9.9l3.7-2.7z" />
      <path fill="#EA4335" d="M12 5.4c1.6 0 3.1.6 4.2 1.7l3.2-3.2A11 11 0 0 0 2.1 7l3.7 2.9C6.7 7.3 9.1 5.4 12 5.4z" />
    </svg>
  );
}

export default function Landing() {
  const navigate = useNavigate();
  const [showEmail, setShowEmail] = useState(false);
  const { prefs, set } = usePrefs();
  const go = () => navigate({ to: "/home" });

  return (
    <div className="min-h-screen bg-background">
      <header className="mx-auto flex h-16 max-w-6xl items-center px-4 md:px-6">
        <Logo />
        <div className="ml-auto flex items-center gap-1">
          <AccessibilityPanel />
          <Button variant="ghost" size="icon" aria-label="Toggle dark mode" onClick={() => set({ dark: !prefs.dark })}>
            {prefs.dark ? <Sun /> : <Moon />}
          </Button>
        </div>
      </header>

      <main className="mx-auto grid max-w-6xl items-center gap-12 px-4 pt-8 pb-16 md:px-6 lg:grid-cols-[1fr_1.1fr] lg:pt-16">
        <section className="animate-enter">
          <span className="mb-6 inline-flex rounded-full bg-secondary px-3 py-1 text-sm font-medium text-secondary-foreground">
            ✦ Made for students
          </span>
          <h1 className="text-4xl leading-[1.1] font-bold tracking-tight text-balance md:text-6xl">
            From messy notes to exam-ready in one tap
          </h1>
          <p className="mt-6 max-w-md text-lg text-muted-foreground">
            Snap your handwritten lecture notes. Clearly cleans them up, files them, and builds your revision pack.
          </p>

          <div className="mt-10 flex max-w-sm flex-col gap-3">
            <Button size="xl" onClick={go}>
              <span className="grid size-7 place-items-center rounded-full bg-background">
                <GoogleMark />
              </span>
              Continue with Google
            </Button>
            {showEmail ? (
              <form
                className="flex gap-2 animate-enter"
                onSubmit={(e) => {
                  e.preventDefault();
                  go();
                }}
              >
                <label htmlFor="email" className="sr-only">Email address</label>
                <Input id="email" type="email" required placeholder="you@university.edu" className="h-12 rounded-xl" autoFocus />
                <Button type="submit" size="lg" className="h-12">Go</Button>
              </form>
            ) : (
              <Button variant="outline" size="xl" onClick={() => setShowEmail(true)}>
                <Mail /> Continue with email
              </Button>
            )}
            <p className="text-center text-xs text-muted-foreground">Free for students · No credit card</p>
          </div>
        </section>

        <figure className="animate-enter">
          <img
            src={beforeAfter}
            width={1536}
            height={960}
            alt="A messy handwritten photosynthesis page on the left and the same notes cleanly typed and organised on the right"
            className="w-full rounded-3xl border shadow-lift"
          />
          <figcaption className="mt-3 text-center text-sm text-muted-foreground">
            Before → after, in about 4 seconds. <Link to="/home" className="text-primary underline-offset-4 hover:underline">Try it</Link>
          </figcaption>
        </figure>
      </main>
    </div>
  );
}
