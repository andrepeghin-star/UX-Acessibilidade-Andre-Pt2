import { i as __toESM } from "../_runtime.mjs";
import { c as require_jsx_runtime, l as require_react } from "../_libs/@react-three/fiber+[...].mjs";
import { _ as CircleCheck, a as Smartphone, c as Play, d as Mic, f as Lightbulb, g as CircleX, h as Contrast, i as Square, l as Phone, m as GraduationCap, n as Video, o as Shield, p as KeyRound, s as ShieldAlert, t as Volume2, u as Pause } from "../_libs/lucide-react.mjs";
import { n as useSettings } from "./router-Da_IHvRJ.mjs";
import { t as clsx } from "../_libs/clsx.mjs";
import { t as twMerge } from "../_libs/tailwind-merge.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/routes-5cxAbz2T.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
function cn(...inputs) {
	return twMerge(clsx(inputs));
}
var btnClass = cn("inline-flex min-h-12 min-w-12 items-center justify-center gap-2 rounded-md", "border border-on-ink/35 bg-ink-soft px-3.5 text-base font-bold text-on-ink", "transition-[background-color,transform] duration-150 ease-out", "hover:bg-forest hover:text-on-ink active:not-disabled:scale-[0.96]");
function AccessibilityBar() {
	const { bumpFont, resetFont, toggleContrast, toggleMotion, highContrast, motionPaused } = useSettings();
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		className: "sticky top-0 z-50 border-b border-on-ink/15 bg-ink/92 px-4 py-3 shadow-[0_8px_28px_-18px_rgb(0_0_0_/_0.7)]",
		role: "region",
		"aria-label": "Controles de acessibilidade",
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "mx-auto flex max-w-5xl flex-wrap items-center justify-between gap-3",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "font-display text-lg font-semibold tracking-tight text-on-ink",
				children: "Acessibilidade"
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "flex flex-wrap items-center gap-2",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
						type: "button",
						className: btnClass,
						onClick: () => bumpFont(-1),
						"aria-label": "Diminuir tamanho do texto",
						title: "Diminuir tamanho do texto",
						children: "A-"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
						type: "button",
						className: btnClass,
						onClick: resetFont,
						"aria-label": "Tamanho normal do texto",
						title: "Tamanho normal do texto",
						children: "A"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
						type: "button",
						className: btnClass,
						onClick: () => bumpFont(1),
						"aria-label": "Aumentar tamanho do texto",
						title: "Aumentar tamanho do texto",
						children: "A+"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
						type: "button",
						className: btnClass,
						onClick: toggleContrast,
						"aria-pressed": highContrast,
						"aria-label": "Alternar alto contraste",
						title: "Alternar alto contraste",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Contrast, {
							className: "size-4",
							"aria-hidden": true
						}), "Contraste"]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
						type: "button",
						className: btnClass,
						onClick: toggleMotion,
						"aria-pressed": motionPaused,
						"aria-label": motionPaused ? "Retomar movimento do fundo" : "Pausar movimento do fundo",
						title: motionPaused ? "Retomar movimento" : "Pausar movimento",
						children: [motionPaused ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Play, {
							className: "size-4",
							"aria-hidden": true
						}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Pause, {
							className: "size-4",
							"aria-hidden": true
						}), motionPaused ? "Mover" : "Pausar"]
					})
				]
			})]
		})
	});
}
var OPTIONS = [
	{
		id: 1,
		label: "Fazer o Pix imediatamente para ajudar meu filho.",
		correct: false
	},
	{
		id: 2,
		label: "Manter a calma, desligar a ligação, ligar para o número antigo do meu filho ou pedir a palavra-chave secreta.",
		correct: true
	},
	{
		id: 3,
		label: "Enviar os dados do meu cartão de crédito por mensagem para resolver logo.",
		correct: false
	}
];
function QuizCard() {
	const [picked, setPicked] = (0, import_react.useState)(null);
	const selected = OPTIONS.find((o) => o.id === picked);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "quiz-shell",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
				className: "mb-3",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("strong", { children: "Situação:" }), " Você recebe uma ligação de alguém com a voz idêntica à do seu filho, chorando e dizendo que perdeu o celular e precisa de um Pix urgente de R$ 500 para uma conta desconhecida."]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "mb-4 font-bold",
				children: "O que você deve fazer?"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "flex flex-col gap-3",
				role: "group",
				"aria-label": "Opções do simulador",
				children: OPTIONS.map((option, index) => {
					const letter = String.fromCharCode(65 + index);
					const isPicked = picked === option.id;
					return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
						type: "button",
						onClick: () => setPicked(option.id),
						className: cn("min-h-14 w-full rounded-md px-4 py-3.5 text-left text-base leading-snug", "bg-paper text-fg shadow-[0_0_0_1px_rgb(28_27_24_/_0.14)]", "transition-[background-color,box-shadow,transform] duration-150 ease-out", "hover:shadow-[0_0_0_2px_var(--color-forest)] active:not-disabled:scale-[0.99]", isPicked && option.correct && "bg-forest-soft shadow-[0_0_0_2px_var(--color-forest)]", isPicked && !option.correct && "bg-crimson-soft shadow-[0_0_0_2px_var(--color-crimson)]"),
						"aria-pressed": isPicked,
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
								className: "font-bold",
								children: [letter, ")"]
							}),
							" ",
							option.label
						]
					}, option.id);
				})
			}),
			selected ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: cn("mt-5 rounded-md px-4 py-4", selected.correct ? "bg-forest-soft" : "bg-crimson-soft"),
				role: "status",
				"aria-live": "polite",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
					className: "flex items-start gap-2 font-bold",
					children: [selected.correct ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(CircleCheck, {
						className: "mt-0.5 size-5 shrink-0 text-forest",
						"aria-hidden": true
					}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)(CircleX, {
						className: "mt-0.5 size-5 shrink-0 text-crimson",
						"aria-hidden": true
					}), selected.correct ? "Resposta correta" : "Esta não é a escolha mais segura"]
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "mt-2",
					children: selected.correct ? "Criminosos usam a inteligência artificial para clonar vozes e o desespero para causar pânico. Sempre desligue e confirme a informação com o familiar antes de enviar qualquer valor." : "A voz pode ser simulada por inteligência artificial. Nunca faça transferências com pressa sem antes desligar e falar diretamente com o seu parente pelo número de costume."
				})]
			}) : null
		]
	});
}
function Scene3D() {
	const { motionPaused } = useSettings();
	const [Canvas, setCanvas] = (0, import_react.useState)(null);
	const [reduced, setReduced] = (0, import_react.useState)(false);
	(0, import_react.useEffect)(() => {
		const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
		const sync = () => setReduced(mq.matches);
		sync();
		mq.addEventListener("change", sync);
		return () => mq.removeEventListener("change", sync);
	}, []);
	(0, import_react.useEffect)(() => {
		let alive = true;
		import("./scene-canvas-Cwaomj31.mjs").then((mod) => {
			if (alive) setCanvas(() => mod.SceneCanvas);
		}).catch(() => {});
		return () => {
			alive = false;
		};
	}, []);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		className: "scene-root bg-ink",
		"aria-hidden": "true",
		children: Canvas ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Canvas, { paused: motionPaused || reduced }) : null
	}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		className: "scene-vignette",
		"aria-hidden": "true"
	})] });
}
function pickPortugueseVoice() {
	const voices = window.speechSynthesis.getVoices();
	return voices.find((v) => v.lang.toLowerCase() === "pt-br") ?? voices.find((v) => v.lang.toLowerCase().startsWith("pt")) ?? null;
}
function SpeakButton({ targetId, label }) {
	const [speaking, setSpeaking] = (0, import_react.useState)(false);
	(0, import_react.useEffect)(() => {
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
		utterance.rate = .9;
		const voice = pickPortugueseVoice();
		if (voice) utterance.voice = voice;
		utterance.onend = () => setSpeaking(false);
		utterance.onerror = () => setSpeaking(false);
		setSpeaking(true);
		window.speechSynthesis.speak(utterance);
	}
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
		type: "button",
		onClick: toggle,
		className: cn("inline-flex min-h-11 items-center gap-2 rounded-md bg-forest px-3.5 py-2", "text-sm font-bold text-on-ink transition-transform duration-150 ease-out", "hover:bg-forest-hover active:not-disabled:scale-[0.96]"),
		"aria-label": speaking ? `Parar leitura: ${label}` : label,
		children: [speaking ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Square, {
			className: "size-4",
			"aria-hidden": true
		}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Volume2, {
			className: "size-4",
			"aria-hidden": true
		}), speaking ? "Parar" : "Ouvir"]
	});
}
var NAV = [
	{
		href: "#ia-golpes",
		label: "Golpes de IA",
		icon: Shield
	},
	{
		href: "#golpes-comuns",
		label: "Golpes do dia a dia",
		icon: Smartphone
	},
	{
		href: "#regras-ouro",
		label: "3 regras de ouro",
		icon: KeyRound
	},
	{
		href: "#simulador",
		label: "Teste seus conhecimentos",
		icon: GraduationCap
	},
	{
		href: "#emergencia",
		label: "Fui vítima? O que fazer",
		icon: ShieldAlert,
		alert: true
	}
];
function SectionHeading({ id, icon: Icon, title, speakId, speakLabel, alert = false }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "mb-5 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("h2", {
			id,
			className: cn("flex items-start gap-3 text-2xl font-semibold", alert ? "text-crimson" : "text-forest"),
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Icon, {
				className: "mt-1 size-6 shrink-0",
				"aria-hidden": true
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: title })]
		}), speakId && speakLabel ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SpeakButton, {
			targetId: speakId,
			label: speakLabel
		}) : null]
	});
}
function GuidePage() {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "relative min-h-dvh",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Scene3D, {}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("a", {
				href: "#conteudo",
				className: "sr-only focus:not-sr-only focus:absolute focus:left-4 focus:top-20 focus:z-[60] focus:rounded-md focus:bg-paper focus:px-4 focus:py-2 focus:text-fg",
				children: "Pular para o conteúdo"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(AccessibilityBar, {}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("header", {
				className: "relative z-20 px-5 pb-10 pt-10 text-center",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "mb-3 text-sm font-bold tracking-[0.18em] text-on-ink/70 uppercase",
						children: "Proteção digital para a terceira idade"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
						className: "hero-title mx-auto max-w-4xl font-display text-4xl font-semibold text-on-ink sm:text-5xl md:text-6xl",
						children: "Guia Digital Seguro"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "hero-lead mx-auto mt-5 max-w-2xl text-lg text-on-ink/88 sm:text-xl",
						children: "Aprenda a navegar na internet com tranquilidade, reconhecer golpes digitais e se proteger contra fraudes de inteligência artificial."
					})
				]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("main", {
				id: "conteudo",
				className: "relative z-20 mx-auto max-w-4xl px-4 pb-20",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("nav", {
						className: "mb-8 grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-3",
						"aria-label": "Navegação rápida de seções",
						children: NAV.map((item) => {
							const Icon = item.icon;
							const alert = "alert" in item && item.alert;
							return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("a", {
								href: item.href,
								className: cn("flex min-h-16 items-center gap-3 rounded-lg bg-paper px-4 py-4 font-bold text-forest", "shadow-[var(--shadow-card)] transition-[box-shadow,transform,background-color] duration-150 ease-out", "hover:shadow-[var(--shadow-card-hover)] active:scale-[0.99]", alert && "text-crimson"),
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Icon, {
									className: "size-5 shrink-0",
									"aria-hidden": true
								}), item.label]
							}, item.href);
						})
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
						id: "ia-golpes",
						className: "guide-card mb-7 scroll-mt-24",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SectionHeading, {
							icon: Shield,
							title: "Como reconhecer golpes com inteligência artificial",
							speakId: "ia-content",
							speakLabel: "Ouvir conteúdo sobre golpes com IA"
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							id: "ia-content",
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
									className: "mb-4",
									children: [
										"Criminosos usam programas avançados de computador (inteligência artificial) para imitar a ",
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("strong", { children: "voz" }),
										" e até o ",
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("strong", { children: "rosto" }),
										" de parentes, amigos e pessoas conhecidas."
									]
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "alert-panel mb-5",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("h3", {
										className: "mb-2 flex items-center gap-2 text-lg font-semibold text-crimson",
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ShieldAlert, {
											className: "size-5",
											"aria-hidden": true
										}), "Atenção: nem tudo que você ouve ou vê na tela é real"]
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", { children: "Os golpistas conseguem criar áudios com a voz idêntica à de um familiar pedindo dinheiro em situação de emergência." })]
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "grid gap-4 sm:grid-cols-2",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("article", {
										className: "ia-tile",
										children: [
											/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("h4", {
												className: "mb-2 flex items-center gap-2 text-lg font-semibold text-forest",
												children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Mic, {
													className: "size-5",
													"aria-hidden": true
												}), "Clonagem de voz"]
											}),
											/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
												className: "mb-3",
												children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("strong", { children: "Como funciona:" }), " Você recebe uma ligação ou mensagem de áudio no WhatsApp. A voz é igual à do seu filho ou neto dizendo que sofreu um acidente ou precisa pagar uma conta urgente."]
											}),
											/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("strong", { children: "Como identificar:" }), " A voz pode parecer ligeiramente robótica, com pausas incomuns ou ruídos estranhos. A ligação é sempre feita em tom de extrema urgência."] })
										]
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("article", {
										className: "ia-tile",
										children: [
											/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("h4", {
												className: "mb-2 flex items-center gap-2 text-lg font-semibold text-forest",
												children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Video, {
													className: "size-5",
													"aria-hidden": true
												}), "Vídeos falsos (deepfake)"]
											}),
											/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
												className: "mb-3",
												children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("strong", { children: "Como funciona:" }), " Um vídeo de um médico famoso, apresentador de TV ou do seu banco aparece nas redes sociais prometendo prêmios, remédios milagrosos ou desconto em dívidas."]
											}),
											/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("strong", { children: "Como identificar:" }), " Observe a boca da pessoa: o movimento dos lábios costuma não coincidir perfeitamente com a fala, e o piscar de olhos pode parecer artificial."] })
										]
									})]
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "tip-panel mt-5",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("h3", {
										className: "mb-2 flex items-center gap-2 text-lg font-semibold text-forest",
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Lightbulb, {
											className: "size-5",
											"aria-hidden": true
										}), "A regra da palavra-chave familiar"]
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", { children: [
										"Combine com sua família uma ",
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("strong", { children: "palavra secreta" }),
										" que só vocês conheçam (exemplo: ",
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("em", { children: "Biscoito de Fubá" }),
										"). Se alguém ligar pedindo dinheiro, solicite a palavra secreta. Se não souberem, desligue imediatamente."
									] })]
								})
							]
						})]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
						id: "golpes-comuns",
						className: "guide-card mb-7 scroll-mt-24",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SectionHeading, {
							icon: Smartphone,
							title: "Golpes digitais frequentes no dia a dia",
							speakId: "comuns-content",
							speakLabel: "Ouvir conteúdo sobre golpes frequentes"
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							id: "comuns-content",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "mb-4",
								children: "Fique atento aos truques mais utilizados por golpistas na internet e no celular:"
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("ul", {
								className: "list-disc space-y-3 pl-6",
								children: [
									/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("li", { children: [
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("strong", { children: "Falso parente no WhatsApp:" }),
										" mensagem recebida de um número desconhecido utilizando a foto de um familiar dizendo: ",
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("em", { children: "Troquei de número, salve aí" }),
										". Logo em seguida, pede um Pix."
									] }),
									/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("li", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("strong", { children: "Falso funcionário de banco:" }), " ligação informando sobre compras suspeitas no seu cartão e solicitando senhas, confirmação de dados ou transferências de teste."] }),
									/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("li", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("strong", { children: "Links de prêmios e benefícios:" }), " mensagens afirmando que você ganhou um prêmio ou que seu benefício foi bloqueado, solicitando cliques em links suspeitos."] })
								]
							})]
						})]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
						id: "regras-ouro",
						className: "guide-card mb-7 scroll-mt-24",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SectionHeading, {
							icon: KeyRound,
							title: "As 3 regras de ouro para sua segurança",
							speakId: "regras-content",
							speakLabel: "Ouvir as regras de ouro"
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							id: "regras-content",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("ol", {
								className: "list-decimal space-y-3 pl-6",
								children: [
									/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("li", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("strong", { children: "Nunca informe senhas ou códigos por telefone:" }), " bancos e órgãos oficiais jamais solicitam senhas ou códigos enviados por SMS."] }),
									/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("li", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("strong", { children: "Desligue e retorne a ligação:" }), " caso receba uma ligação do banco, desligue. Pegue seu cartão, verifique o telefone oficial no verso e ligue você mesmo."] }),
									/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("li", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("strong", { children: "Não aja com pressa:" }), " os criminosos usam o medo e o senso de urgência. Respire fundo e converse com alguém de confiança antes de realizar qualquer transferência."] })
								]
							})
						})]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
						id: "simulador",
						className: "guide-card mb-7 scroll-mt-24",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SectionHeading, {
								icon: GraduationCap,
								title: "Teste seus conhecimentos"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "mb-4",
								children: "Clique na opção correta para treinar o que aprendeu:"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(QuizCard, {})
						]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
						id: "emergencia",
						className: "guide-card scroll-mt-24",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SectionHeading, {
								icon: ShieldAlert,
								title: "Fui vítima de um golpe? Mantenha a calma e siga os passos",
								alert: true
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "mb-4",
								children: "Se você realizou transferências ou forneceu senhas, tome estas providências imediatamente:"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("ol", {
								className: "mb-6 list-decimal space-y-3 pl-6",
								children: [
									/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("li", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("strong", { children: "Ligue imediatamente para o seu banco:" }), " solicite o bloqueio de contas/cartões e peça o acionamento do MED (Mecanismo Especial de Devolução do Pix)."] }),
									/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("li", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("strong", { children: "Comunique sua família:" }), " informe o ocorrido para evitar que outros contatos sejam abordados."] }),
									/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("li", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("strong", { children: "Registre um B.O. (Boletim de Ocorrência):" }), " procure a Delegacia de Polícia Civil mais próxima ou faça o registro online com o auxílio de alguém de confiança."] })
								]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
								className: "text-center",
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("a", {
									href: "tel:190",
									className: cn("inline-flex min-h-14 items-center gap-2 rounded-md bg-crimson px-6 py-3.5", "text-lg font-bold text-on-ink transition-[background-color,transform] duration-150 ease-out", "hover:bg-crimson-hover active:scale-[0.96]"),
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Phone, {
										className: "size-5",
										"aria-hidden": true
									}), "Ligar para a polícia (190)"]
								})
							})
						]
					})
				]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("footer", {
				className: "relative z-20 border-t border-on-ink/15 bg-ink px-5 py-10 text-center text-on-ink/80",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "font-display text-lg font-semibold text-on-ink",
						children: "Guia Digital Seguro"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "mt-2",
						children: "Desenvolvido para proteger e empoderar a terceira idade na internet."
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "mt-1",
						children: "Compartilhe este conhecimento com seus amigos e familiares."
					})
				]
			})
		]
	});
}
function Home() {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(GuidePage, {});
}
//#endregion
export { Home as component };
