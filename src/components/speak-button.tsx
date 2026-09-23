import { useEffect, useState } from "react";
import { Volume2, Square } from "lucide-react";
import { cn } from "@/lib/utils";

type SpeakButtonProps = {
  targetId: string;
  label: string;
};

function pickPortugueseVoice(): SpeechSynthesisVoice | null {
  const voices = window.speechSynthesis.getVoices();
  return (
    voices.find((v) => v.lang.toLowerCase() === "pt-br") ??
    voices.find((v) => v.lang.toLowerCase().startsWith("pt")) ??
    null
  );
}

export function SpeakButton({ targetId, label }: SpeakButtonProps) {
  const [speaking, setSpeaking] = useState(false);

  useEffect(() => {
    return () => {
      if ("speechSynthesis" in window) window.speechSynthesis.cancel();
    };
  }, []);

  function toggle() {
    if (!("speechSynthesis" in window)) {
      globalThis.alert("O seu navegador não suporta a funcionalidade de leitura por áudio.");
      return;
    }

    if (speaking) {
      window.speechSynthesis.cancel();
      setSpeaking(false);
      return;
    }

    const el = document.getElementById(targetId);
    if (!el) return;

    window.speechSynthesis.cancel();
    const utterance = new SpeechSynthesisUtterance(el.innerText);
    utterance.lang = "pt-BR";
    utterance.rate = 0.9;
    const voice = pickPortugueseVoice();
    if (voice) utterance.voice = voice;
    utterance.onend = () => setSpeaking(false);
    utterance.onerror = () => setSpeaking(false);
    setSpeaking(true);
    window.speechSynthesis.speak(utterance);
  }

  return (
    <button
      type="button"
      onClick={toggle}
      className={cn(
        "inline-flex min-h-11 items-center gap-2 rounded-md bg-forest px-3.5 py-2",
        "text-sm font-bold text-on-ink transition-transform duration-150 ease-out",
        "hover:bg-forest-hover active:not-disabled:scale-[0.96]",
      )}
      aria-label={speaking ? `Parar leitura: ${label}` : label}
    >
      {speaking ? <Square className="size-4" aria-hidden /> : <Volume2 className="size-4" aria-hidden />}
      {speaking ? "Parar" : "Ouvir"}
    </button>
  );
}
