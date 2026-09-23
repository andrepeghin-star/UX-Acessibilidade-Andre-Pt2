import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from "react";

const FONT_MIN = 0.85;
const FONT_MAX = 1.6;
const STORAGE_KEY = "gds-settings-v1";

type Settings = {
  fontScale: number;
  highContrast: boolean;
  motionPaused: boolean;
  bumpFont: (delta: number) => void;
  resetFont: () => void;
  toggleContrast: () => void;
  toggleMotion: () => void;
};

const SettingsContext = createContext<Settings | null>(null);

function applyDom(fontScale: number, highContrast: boolean) {
  const root = document.documentElement;
  root.style.setProperty("--font-scale", String(fontScale));
  if (highContrast) root.setAttribute("data-contrast", "high");
  else root.removeAttribute("data-contrast");
}

export function SettingsProvider({ children }: { children: ReactNode }) {
  const [fontScale, setFontScale] = useState(1);
  const [highContrast, setHighContrast] = useState(false);
  const [motionPaused, setMotionPaused] = useState(false);

  useEffect(() => {
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      if (!raw) return;
      const parsed = JSON.parse(raw) as Partial<{
        fontScale: number;
        highContrast: boolean;
        motionPaused: boolean;
      }>;
      const scale =
        typeof parsed.fontScale === "number"
          ? Math.min(FONT_MAX, Math.max(FONT_MIN, parsed.fontScale))
          : 1;
      const contrast = Boolean(parsed.highContrast);
      const paused = Boolean(parsed.motionPaused);
      setFontScale(scale);
      setHighContrast(contrast);
      setMotionPaused(paused);
      applyDom(scale, contrast);
    } catch {
      /* ignore corrupt storage */
    }
  }, []);

  useEffect(() => {
    applyDom(fontScale, highContrast);
    try {
      localStorage.setItem(
        STORAGE_KEY,
        JSON.stringify({ fontScale, highContrast, motionPaused }),
      );
    } catch {
      /* private mode */
    }
  }, [fontScale, highContrast, motionPaused]);

  const bumpFont = useCallback((delta: number) => {
    setFontScale((prev) => {
      const next = prev + delta * 0.15;
      return Math.min(FONT_MAX, Math.max(FONT_MIN, next));
    });
  }, []);

  const resetFont = useCallback(() => setFontScale(1), []);
  const toggleContrast = useCallback(() => setHighContrast((v) => !v), []);
  const toggleMotion = useCallback(() => setMotionPaused((v) => !v), []);

  const value = useMemo(
    () => ({
      fontScale,
      highContrast,
      motionPaused,
      bumpFont,
      resetFont,
      toggleContrast,
      toggleMotion,
    }),
    [fontScale, highContrast, motionPaused, bumpFont, resetFont, toggleContrast, toggleMotion],
  );

  return <SettingsContext.Provider value={value}>{children}</SettingsContext.Provider>;
}

export function useSettings() {
  const ctx = useContext(SettingsContext);
  if (!ctx) throw new Error("useSettings must be used within SettingsProvider");
  return ctx;
}
