import {
  GraduationCap,
  KeyRound,
  Lightbulb,
  Mic,
  Phone,
  Shield,
  ShieldAlert,
  Smartphone,
  Video,
} from "lucide-react";
import { AccessibilityBar } from "@/components/accessibility-bar";
import { QuizCard } from "@/components/quiz-card";
import { Scene3D } from "@/components/scene-3d";
import { SpeakButton } from "@/components/speak-button";
import { cn } from "@/lib/utils";

const NAV = [
  { href: "#ia-golpes", label: "Golpes de IA", icon: Shield },
  { href: "#golpes-comuns", label: "Golpes do dia a dia", icon: Smartphone },
  { href: "#regras-ouro", label: "3 regras de ouro", icon: KeyRound },
  { href: "#simulador", label: "Teste seus conhecimentos", icon: GraduationCap },
  { href: "#emergencia", label: "Fui vítima? O que fazer", icon: ShieldAlert, alert: true },
] as const;

function SectionHeading({
  id,
  icon: Icon,
  title,
  speakId,
  speakLabel,
  alert = false,
}: {
  id?: string;
  icon: typeof Shield;
  title: string;
  speakId?: string;
  speakLabel?: string;
  alert?: boolean;
}) {
  return (
    <div className="mb-5 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
      <h2
        id={id}
        className={cn(
          "flex items-start gap-3 text-2xl font-semibold",
          alert ? "text-crimson" : "text-forest",
        )}
      >
        <Icon className="mt-1 size-6 shrink-0" aria-hidden />
        <span>{title}</span>
      </h2>
      {speakId && speakLabel ? <SpeakButton targetId={speakId} label={speakLabel} /> : null}
    </div>
  );
}

export function GuidePage() {
  return (
    <div className="relative min-h-dvh">
      <Scene3D />
      <a
        href="#conteudo"
        className="sr-only focus:not-sr-only focus:absolute focus:left-4 focus:top-20 focus:z-[60] focus:rounded-md focus:bg-paper focus:px-4 focus:py-2 focus:text-fg"
      >
        Pular para o conteúdo
      </a>
      <AccessibilityBar />

      <header className="relative z-20 px-5 pb-10 pt-10 text-center">
        <p className="mb-3 text-sm font-bold tracking-[0.18em] text-on-ink/70 uppercase">
          Proteção digital para a terceira idade
        </p>
        <h1 className="hero-title mx-auto max-w-4xl font-display text-4xl font-semibold text-on-ink sm:text-5xl md:text-6xl">
          Guia Digital Seguro
        </h1>
        <p className="hero-lead mx-auto mt-5 max-w-2xl text-lg text-on-ink/88 sm:text-xl">
          Aprenda a navegar na internet com tranquilidade, reconhecer golpes digitais e se proteger
          contra fraudes de inteligência artificial.
        </p>
      </header>

      <main id="conteudo" className="relative z-20 mx-auto max-w-4xl px-4 pb-20">
        <nav className="mb-8 grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-3" aria-label="Navegação rápida de seções">
          {NAV.map((item) => {
            const Icon = item.icon;
            const alert = "alert" in item && item.alert;
            return (
              <a
                key={item.href}
                href={item.href}
                className={cn(
                  "flex min-h-16 items-center gap-3 rounded-lg bg-paper px-4 py-4 font-bold text-forest",
                  "shadow-[var(--shadow-card)] transition-[box-shadow,transform,background-color] duration-150 ease-out",
                  "hover:shadow-[var(--shadow-card-hover)] active:scale-[0.99]",
                  alert && "text-crimson",
                )}
              >
                <Icon className="size-5 shrink-0" aria-hidden />
                {item.label}
              </a>
            );
          })}
        </nav>

        <section id="ia-golpes" className="guide-card mb-7 scroll-mt-24">
          <SectionHeading
            icon={Shield}
            title="Como reconhecer golpes com inteligência artificial"
            speakId="ia-content"
            speakLabel="Ouvir conteúdo sobre golpes com IA"
          />
          <div id="ia-content">
            <p className="mb-4">
              Criminosos usam programas avançados de computador (inteligência artificial) para imitar
              a <strong>voz</strong> e até o <strong>rosto</strong> de parentes, amigos e pessoas
              conhecidas.
            </p>
            <div className="alert-panel mb-5">
              <h3 className="mb-2 flex items-center gap-2 text-lg font-semibold text-crimson">
                <ShieldAlert className="size-5" aria-hidden />
                Atenção: nem tudo que você ouve ou vê na tela é real
              </h3>
              <p>
                Os golpistas conseguem criar áudios com a voz idêntica à de um familiar pedindo
                dinheiro em situação de emergência.
              </p>
            </div>
            <div className="grid gap-4 sm:grid-cols-2">
              <article className="ia-tile">
                <h4 className="mb-2 flex items-center gap-2 text-lg font-semibold text-forest">
                  <Mic className="size-5" aria-hidden />
                  Clonagem de voz
                </h4>
                <p className="mb-3">
                  <strong>Como funciona:</strong> Você recebe uma ligação ou mensagem de áudio no
                  WhatsApp. A voz é igual à do seu filho ou neto dizendo que sofreu um acidente ou
                  precisa pagar uma conta urgente.
                </p>
                <p>
                  <strong>Como identificar:</strong> A voz pode parecer ligeiramente robótica, com
                  pausas incomuns ou ruídos estranhos. A ligação é sempre feita em tom de extrema
                  urgência.
                </p>
              </article>
              <article className="ia-tile">
                <h4 className="mb-2 flex items-center gap-2 text-lg font-semibold text-forest">
                  <Video className="size-5" aria-hidden />
                  Vídeos falsos (deepfake)
                </h4>
                <p className="mb-3">
                  <strong>Como funciona:</strong> Um vídeo de um médico famoso, apresentador de TV ou
                  do seu banco aparece nas redes sociais prometendo prêmios, remédios milagrosos ou
                  desconto em dívidas.
                </p>
                <p>
                  <strong>Como identificar:</strong> Observe a boca da pessoa: o movimento dos lábios
                  costuma não coincidir perfeitamente com a fala, e o piscar de olhos pode parecer
                  artificial.
                </p>
              </article>
            </div>
            <div className="tip-panel mt-5">
              <h3 className="mb-2 flex items-center gap-2 text-lg font-semibold text-forest">
                <Lightbulb className="size-5" aria-hidden />A regra da palavra-chave familiar
              </h3>
              <p>
                Combine com sua família uma <strong>palavra secreta</strong> que só vocês conheçam
                (exemplo: <em>Biscoito de Fubá</em>). Se alguém ligar pedindo dinheiro, solicite a
                palavra secreta. Se não souberem, desligue imediatamente.
              </p>
            </div>
          </div>
        </section>

        <section id="golpes-comuns" className="guide-card mb-7 scroll-mt-24">
          <SectionHeading
            icon={Smartphone}
            title="Golpes digitais frequentes no dia a dia"
            speakId="comuns-content"
            speakLabel="Ouvir conteúdo sobre golpes frequentes"
          />
          <div id="comuns-content">
            <p className="mb-4">Fique atento aos truques mais utilizados por golpistas na internet e no celular:</p>
            <ul className="list-disc space-y-3 pl-6">
              <li>
                <strong>Falso parente no WhatsApp:</strong> mensagem recebida de um número
                desconhecido utilizando a foto de um familiar dizendo: <em>Troquei de número, salve
                aí</em>. Logo em seguida, pede um Pix.
              </li>
              <li>
                <strong>Falso funcionário de banco:</strong> ligação informando sobre compras
                suspeitas no seu cartão e solicitando senhas, confirmação de dados ou transferências
                de teste.
              </li>
              <li>
                <strong>Links de prêmios e benefícios:</strong> mensagens afirmando que você ganhou
                um prêmio ou que seu benefício foi bloqueado, solicitando cliques em links suspeitos.
              </li>
            </ul>
          </div>
        </section>

        <section id="regras-ouro" className="guide-card mb-7 scroll-mt-24">
          <SectionHeading
            icon={KeyRound}
            title="As 3 regras de ouro para sua segurança"
            speakId="regras-content"
            speakLabel="Ouvir as regras de ouro"
          />
          <div id="regras-content">
            <ol className="list-decimal space-y-3 pl-6">
              <li>
                <strong>Nunca informe senhas ou códigos por telefone:</strong> bancos e órgãos
                oficiais jamais solicitam senhas ou códigos enviados por SMS.
              </li>
              <li>
                <strong>Desligue e retorne a ligação:</strong> caso receba uma ligação do banco,
                desligue. Pegue seu cartão, verifique o telefone oficial no verso e ligue você mesmo.
              </li>
              <li>
                <strong>Não aja com pressa:</strong> os criminosos usam o medo e o senso de urgência.
                Respire fundo e converse com alguém de confiança antes de realizar qualquer
                transferência.
              </li>
            </ol>
          </div>
        </section>

        <section id="simulador" className="guide-card mb-7 scroll-mt-24">
          <SectionHeading icon={GraduationCap} title="Teste seus conhecimentos" />
          <p className="mb-4">Clique na opção correta para treinar o que aprendeu:</p>
          <QuizCard />
        </section>

        <section id="emergencia" className="guide-card scroll-mt-24">
          <SectionHeading
            icon={ShieldAlert}
            title="Fui vítima de um golpe? Mantenha a calma e siga os passos"
            alert
          />
          <p className="mb-4">
            Se você realizou transferências ou forneceu senhas, tome estas providências imediatamente:
          </p>
          <ol className="mb-6 list-decimal space-y-3 pl-6">
            <li>
              <strong>Ligue imediatamente para o seu banco:</strong> solicite o bloqueio de
              contas/cartões e peça o acionamento do MED (Mecanismo Especial de Devolução do Pix).
            </li>
            <li>
              <strong>Comunique sua família:</strong> informe o ocorrido para evitar que outros
              contatos sejam abordados.
            </li>
            <li>
              <strong>Registre um B.O. (Boletim de Ocorrência):</strong> procure a Delegacia de
              Polícia Civil mais próxima ou faça o registro online com o auxílio de alguém de
              confiança.
            </li>
          </ol>
          <div className="text-center">
            <a
              href="tel:190"
              className={cn(
                "inline-flex min-h-14 items-center gap-2 rounded-md bg-crimson px-6 py-3.5",
                "text-lg font-bold text-on-ink transition-[background-color,transform] duration-150 ease-out",
                "hover:bg-crimson-hover active:scale-[0.96]",
              )}
            >
              <Phone className="size-5" aria-hidden />
              Ligar para a polícia (190)
            </a>
          </div>
        </section>
      </main>

      <footer className="relative z-20 border-t border-on-ink/15 bg-ink px-5 py-10 text-center text-on-ink/80">
        <p className="font-display text-lg font-semibold text-on-ink">Guia Digital Seguro</p>
        <p className="mt-2">Desenvolvido para proteger e empoderar a terceira idade na internet.</p>
        <p className="mt-1">Compartilhe este conhecimento com seus amigos e familiares.</p>
      </footer>
    </div>
  );
}
