import { useState } from "react";
import { CheckCircle2, XCircle } from "lucide-react";
import { cn } from "@/lib/utils";

const OPTIONS = [
  {
    id: 1,
    label: "Fazer o Pix imediatamente para ajudar meu filho.",
    correct: false,
  },
  {
    id: 2,
    label:
      "Manter a calma, desligar a ligação, ligar para o número antigo do meu filho ou pedir a palavra-chave secreta.",
    correct: true,
  },
  {
    id: 3,
    label: "Enviar os dados do meu cartão de crédito por mensagem para resolver logo.",
    correct: false,
  },
] as const;

export function QuizCard() {
  const [picked, setPicked] = useState<number | null>(null);
  const selected = OPTIONS.find((o) => o.id === picked);

  return (
    <div className="quiz-shell">
      <p className="mb-3">
        <strong>Situação:</strong> Você recebe uma ligação de alguém com a voz idêntica à do seu
        filho, chorando e dizendo que perdeu o celular e precisa de um Pix urgente de R$ 500 para
        uma conta desconhecida.
      </p>
      <p className="mb-4 font-bold">O que você deve fazer?</p>

      <div className="flex flex-col gap-3" role="group" aria-label="Opções do simulador">
        {OPTIONS.map((option, index) => {
          const letter = String.fromCharCode(65 + index);
          const isPicked = picked === option.id;
          return (
            <button
              key={option.id}
              type="button"
              onClick={() => setPicked(option.id)}
              className={cn(
                "min-h-14 w-full rounded-md px-4 py-3.5 text-left text-base leading-snug",
                "bg-paper text-fg shadow-[0_0_0_1px_rgb(28_27_24_/_0.14)]",
                "transition-[background-color,box-shadow,transform] duration-150 ease-out",
                "hover:shadow-[0_0_0_2px_var(--color-forest)] active:not-disabled:scale-[0.99]",
                isPicked && option.correct && "bg-forest-soft shadow-[0_0_0_2px_var(--color-forest)]",
                isPicked && !option.correct && "bg-crimson-soft shadow-[0_0_0_2px_var(--color-crimson)]",
              )}
              aria-pressed={isPicked}
            >
              <span className="font-bold">{letter})</span> {option.label}
            </button>
          );
        })}
      </div>

      {selected ? (
        <div
          className={cn(
            "mt-5 rounded-md px-4 py-4",
            selected.correct ? "bg-forest-soft" : "bg-crimson-soft",
          )}
          role="status"
          aria-live="polite"
        >
          <p className="flex items-start gap-2 font-bold">
            {selected.correct ? (
              <CheckCircle2 className="mt-0.5 size-5 shrink-0 text-forest" aria-hidden />
            ) : (
              <XCircle className="mt-0.5 size-5 shrink-0 text-crimson" aria-hidden />
            )}
            {selected.correct ? "Resposta correta" : "Esta não é a escolha mais segura"}
          </p>
          <p className="mt-2">
            {selected.correct
              ? "Criminosos usam a inteligência artificial para clonar vozes e o desespero para causar pânico. Sempre desligue e confirme a informação com o familiar antes de enviar qualquer valor."
              : "A voz pode ser simulada por inteligência artificial. Nunca faça transferências com pressa sem antes desligar e falar diretamente com o seu parente pelo número de costume."}
          </p>
        </div>
      ) : null}
    </div>
  );
}
