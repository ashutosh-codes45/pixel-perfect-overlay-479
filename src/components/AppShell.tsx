import { useState, type ReactNode } from "react";
import { Link } from "@tanstack/react-router";
import { FolderOpen, Home, Menu, Moon, Sun, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { folders, notesInFolder } from "@/data/notes";
import { AccessibilityPanel } from "./AccessibilityPanel";
import { usePrefs } from "./preferences";
import { Logo } from "./Logo";
import { FolderIcon } from "./FolderIcon";
import { cn } from "@/lib/utils";

function SidebarContent({ onNavigate }: { onNavigate?: () => void }) {
  const linkCls =
    "flex items-center gap-3 rounded-xl px-3 py-2 text-sm text-muted-foreground transition-colors hover:bg-accent hover:text-foreground focus-visible:ring-2 focus-visible:ring-ring focus-visible:outline-none";
  const active = { className: "bg-accent text-foreground font-medium" };
  return (
    <nav aria-label="Main" className="flex flex-col gap-1 p-4">
      <Link to="/home" className={linkCls} activeProps={active} onClick={onNavigate}>
        <Home className="size-4" /> Home
      </Link>
      <Link to="/folders" className={linkCls} activeProps={active} activeOptions={{ includeSearch: false }} onClick={onNavigate}>
        <FolderOpen className="size-4" /> All folders
      </Link>
      <p className="mt-6 mb-2 px-3 text-xs font-medium tracking-wide text-muted-foreground uppercase">Folders</p>
      {folders.map((f) => (
        <Link
          key={f.id}
          to="/folders"
          search={{ folder: f.id }}
          className={linkCls}
          onClick={onNavigate}
        >
          <FolderIcon folder={f} size="sm" />
          <span className="flex-1 truncate">{f.name}</span>
          <span className="text-xs">{notesInFolder(f.id).length}</span>
        </Link>
      ))}
    </nav>
  );
}

export function AppShell({ children }: { children: ReactNode }) {
  const [open, setOpen] = useState(false);
  const { prefs, set } = usePrefs();
  return (
    <div className="min-h-screen bg-background">
      <header className="sticky top-0 z-30 flex h-16 items-center gap-2 border-b bg-background/85 px-4 backdrop-blur md:px-6">
        <Button variant="ghost" size="icon" className="md:hidden" aria-label="Open menu" onClick={() => setOpen(true)}>
          <Menu />
        </Button>
        <Logo />
        <div className="ml-auto flex items-center gap-1">
          <AccessibilityPanel />
          <Button
            variant="ghost"
            size="icon"
            aria-label={prefs.dark ? "Switch to light mode" : "Switch to dark mode"}
            onClick={() => set({ dark: !prefs.dark })}
          >
            {prefs.dark ? <Sun /> : <Moon />}
          </Button>
          <span className="ml-2 grid size-9 place-items-center rounded-full bg-secondary text-sm font-semibold" aria-label="Signed in as Aanya">
            A
          </span>
        </div>
      </header>
      <div className="flex">
        <aside className="sticky top-16 hidden h-[calc(100vh-4rem)] w-64 shrink-0 border-r md:block">
          <SidebarContent />
        </aside>
        {/* mobile drawer */}
        <div
          className={cn("fixed inset-0 z-40 md:hidden", open ? "pointer-events-auto" : "pointer-events-none")}
          aria-hidden={!open}
        >
          <div
            className={cn("absolute inset-0 bg-foreground/30 transition-opacity", open ? "opacity-100" : "opacity-0")}
            onClick={() => setOpen(false)}
          />
          <div
            className={cn(
              "absolute inset-y-0 left-0 w-72 bg-background shadow-soft transition-transform",
              open ? "translate-x-0" : "-translate-x-full",
            )}
          >
            <div className="flex h-16 items-center justify-between border-b px-4">
              <Logo />
              <Button variant="ghost" size="icon" aria-label="Close menu" onClick={() => setOpen(false)}>
                <X />
              </Button>
            </div>
            <SidebarContent onNavigate={() => setOpen(false)} />
          </div>
        </div>
        <main className="min-w-0 flex-1 px-4 py-8 md:px-10 animate-enter">{children}</main>
      </div>
    </div>
  );
}
