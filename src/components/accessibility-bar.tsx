import { Contrast, Pause, Play } from "lucide-react";
import { useSettings } from "@/components/settings-provider";
import { cn } from "@/lib/utils";

const btnClass = cn(
  "inline-flex min-h-12 min-w-12 items-center justify-center gap-2 rounded-md",
  "border border-on-ink/35 bg-ink-soft px-3.5 text-base font-bold text-on-ink",
  "transition-[background-color,transform] duration-150 ease-out",
  "hover:bg-forest hover:text-on-ink active:not-disabled:scale-[0.96]",
);

export function AccessibilityBar() {
  const { bumpFont, resetFont, toggleContrast, toggleMotion, highContrast, motionPaused } =
    useSettings();

  return (
    <div
      className="sticky top-0 z-50 border-b border-on-ink/15 bg-ink/92 px-4 py-3 shadow-[0_8px_28px_-18px_rgb(0_0_0_/_0.7)]"
      role="region"
      aria-label="Controles de acessibilidade"
    >
      <div className="mx-auto flex max-w-5xl flex-wrap items-center justify-between gap-3">
        <p className="font-display text-lg font-semibold tracking-tight text-on-ink">Acessibilidade</p>
        <div className="flex flex-wrap items-center gap-2">
          <button type="button" className={btnClass} onClick={() => bumpFont(-1)} aria-label="Diminuir tamanho do texto" title="Diminuir tamanho do texto">
            A-
          </button>
          <button type="button" className={btnClass} onClick={resetFont} aria-label="Tamanho normal do texto" title="Tamanho normal do texto">
            A
          </button>
          <button type="button" className={btnClass} onClick={() => bumpFont(1)} aria-label="Aumentar tamanho do texto" title="Aumentar tamanho do texto">
            A+
          </button>
          <button
            type="button"
            className={btnClass}
            onClick={toggleContrast}
            aria-pressed={highContrast}
            aria-label="Alternar alto contraste"
            title="Alternar alto contraste"
          >
            <Contrast className="size-4" aria-hidden />
            Contraste
          </button>
          <button
            type="button"
            className={btnClass}
            onClick={toggleMotion}
            aria-pressed={motionPaused}
            aria-label={motionPaused ? "Retomar movimento do fundo" : "Pausar movimento do fundo"}
            title={motionPaused ? "Retomar movimento" : "Pausar movimento"}
          >
            {motionPaused ? <Play className="size-4" aria-hidden /> : <Pause className="size-4" aria-hidden />}
            {motionPaused ? "Mover" : "Pausar"}
          </button>
        </div>
      </div>
    </div>
  );
}
