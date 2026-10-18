import { Accessibility } from "lucide-react";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Switch } from "@/components/ui/switch";
import { Button } from "@/components/ui/button";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { usePrefs } from "./preferences";
import { cn } from "@/lib/utils";

export function AccessibilityPanel() {
  const { prefs, set } = usePrefs();
  const rows = [
    { key: "dyslexic", label: "Dyslexia-friendly font", hint: "Easier-to-read letter shapes" },
    { key: "contrast", label: "High contrast", hint: "Stronger colours and borders" },
    { key: "reduceMotion", label: "Reduce motion", hint: "Turns off animations" },
  ] as const;

  return (
    <TooltipProvider>
      <Popover>
        <Tooltip>
          <TooltipTrigger asChild>
            <PopoverTrigger asChild>
              <Button variant="ghost" size="icon" aria-label="Accessibility settings">
                <Accessibility />
              </Button>
            </PopoverTrigger>
          </TooltipTrigger>
          <TooltipContent>Accessibility settings</TooltipContent>
        </Tooltip>
        <PopoverContent align="end" className="w-80 rounded-2xl p-4">
        <h2 className="text-base font-semibold">Accessibility</h2>
        <p className="mb-4 text-sm text-muted-foreground">Make Clearly comfortable for you.</p>
        <div className="space-y-4">
          {rows.map((r) => (
            <div key={r.key} className="flex items-center justify-between gap-4">
              <label htmlFor={`a11y-${r.key}`} className="text-sm">
                <span className="block font-medium">{r.label}</span>
                <span className="text-muted-foreground">{r.hint}</span>
              </label>
              <Switch
                id={`a11y-${r.key}`}
                checked={prefs[r.key]}
                onCheckedChange={(v) => set({ [r.key]: v })}
              />
            </div>
          ))}
          <div>
            <span id="text-size-label" className="mb-2 block text-sm font-medium">
              Text size
            </span>
            <div role="radiogroup" aria-labelledby="text-size-label" className="grid grid-cols-3 gap-2">
              {(["Default", "Large", "Largest"] as const).map((l, i) => (
                <button
                  key={l}
                  role="radio"
                  aria-checked={prefs.textSize === i}
                  onClick={() => set({ textSize: i as 0 | 1 | 2 })}
                  className={cn(
                    "rounded-xl border px-2 py-2 text-sm transition-colors focus-visible:ring-2 focus-visible:ring-ring focus-visible:outline-none",
                    prefs.textSize === i
                      ? "border-primary bg-primary text-primary-foreground"
                      : "hover:bg-accent",
                  )}
                >
                  <span style={{ fontSize: `${0.8 + i * 0.15}rem` }}>{l}</span>
                </button>
              ))}
            </div>
          </div>
        </div>
      </PopoverContent>
    </Popover>
    </TooltipProvider>
  );
}
