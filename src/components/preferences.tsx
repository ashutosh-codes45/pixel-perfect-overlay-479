import { createContext, useContext, useEffect, useState, type ReactNode } from "react";

export interface Prefs {
  dark: boolean;
  dyslexic: boolean;
  contrast: boolean;
  textSize: 0 | 1 | 2;
  reduceMotion: boolean;
}

const defaults: Prefs = { dark: false, dyslexic: false, contrast: false, textSize: 0, reduceMotion: false };
const Ctx = createContext<{ prefs: Prefs; set: (p: Partial<Prefs>) => void }>({
  prefs: defaults,
  set: () => {},
});

export function PrefsProvider({ children }: { children: ReactNode }) {
  const [prefs, setPrefs] = useState<Prefs>(defaults);

  useEffect(() => {
    try {
      const saved = localStorage.getItem("clearly-prefs");
      if (saved) setPrefs({ ...defaults, ...JSON.parse(saved) });
    } catch {
      /* ignore */
    }
  }, []);

  useEffect(() => {
    const el = document.documentElement;
    el.classList.toggle("dark", prefs.dark);
    el.classList.toggle("a11y-dyslexic", prefs.dyslexic);
    el.classList.toggle("a11y-contrast", prefs.contrast);
    el.classList.toggle("a11y-reduce-motion", prefs.reduceMotion);
    el.dataset["textSize"] = String(prefs.textSize);
    localStorage.setItem("clearly-prefs", JSON.stringify(prefs));
  }, [prefs]);

  return (
    <Ctx.Provider value={{ prefs, set: (p) => setPrefs((s) => ({ ...s, ...p })) }}>
      {children}
    </Ctx.Provider>
  );
}

export const usePrefs = () => useContext(Ctx);
