/* Extensões: modo escuro, preferências e quizzes extras */
(function () {
  function savePrefs() {
    try {
      localStorage.setItem("gds-prefs", JSON.stringify({
        fontScale: typeof fontScale === "number" ? fontScale : 1,
        highContrast: document.body.classList.contains("high-contrast"),
        darkMode: document.body.classList.contains("dark-mode"),
        motionPaused: typeof motionPaused === "boolean" ? motionPaused : false
      }));
    } catch (e) {}
  }

  function loadPrefs() {
    try {
      const raw = localStorage.getItem("gds-prefs");
      if (!raw) return;
      const p = JSON.parse(raw);
      if (typeof p.fontScale === "number") {
        fontScale = p.fontScale;
        document.documentElement.style.setProperty("--font-scale", fontScale);
      }
      if (p.highContrast) document.body.classList.add("high-contrast");
      if (p.darkMode) document.body.classList.add("dark-mode");
      if (p.motionPaused) {
        motionPaused = true;
        const btn = document.getElementById("btn-motion");
        if (btn) {
          btn.textContent = "Mover";
          btn.setAttribute("aria-pressed", "true");
          btn.setAttribute("aria-label", "Retomar movimento do fundo");
        }
      }
      const darkBtn = document.getElementById("btn-dark");
      if (darkBtn) {
        const on = document.body.classList.contains("dark-mode");
        darkBtn.setAttribute("aria-pressed", on ? "true" : "false");
        darkBtn.textContent = on ? "Claro" : "Escuro";
      }
    } catch (e) {}
  }

  var _changeFontSize = typeof changeFontSize === "function" ? changeFontSize : null;
  window.changeFontSize = function (delta) {
    if (_changeFontSize) _changeFontSize(delta);
    else {
      fontScale = (fontScale || 1) + delta * 0.15;
      if (fontScale < 0.85) fontScale = 0.85;
      if (fontScale > 1.6) fontScale = 1.6;
      document.documentElement.style.setProperty("--font-scale", fontScale);
    }
    savePrefs();
  };

  var _resetFontSize = typeof resetFontSize === "function" ? resetFontSize : null;
  window.resetFontSize = function () {
    if (_resetFontSize) _resetFontSize();
    else {
      fontScale = 1;
      document.documentElement.style.setProperty("--font-scale", 1);
    }
    savePrefs();
  };

  var _toggleHighContrast = typeof toggleHighContrast === "function" ? toggleHighContrast : null;
  window.toggleHighContrast = function () {
    if (_toggleHighContrast) _toggleHighContrast();
    else document.body.classList.toggle("high-contrast");
    savePrefs();
  };

  window.toggleDarkMode = function () {
    document.body.classList.toggle("dark-mode");
    var on = document.body.classList.contains("dark-mode");
    var btn = document.getElementById("btn-dark");
    if (btn) {
      btn.setAttribute("aria-pressed", on ? "true" : "false");
      btn.textContent = on ? "Claro" : "Escuro";
      btn.setAttribute("aria-label", on ? "Ativar modo claro" : "Ativar modo escuro");
    }
    savePrefs();
  };

  var _toggleMotion = typeof toggleMotion === "function" ? toggleMotion : null;
  window.toggleMotion = function () {
    if (_toggleMotion) _toggleMotion();
    savePrefs();
  };

  window.showQuizFeedback = function (id, ok, okMsg, badMsg) {
    var feedback = document.getElementById(id);
    if (!feedback) return;
    feedback.style.display = "block";
    if (ok) {
      feedback.style.backgroundColor = "#E8F5E9";
      feedback.style.borderColor = "#2E7D32";
      feedback.style.color = "#1B5E20";
      feedback.innerHTML = okMsg;
    } else {
      feedback.style.backgroundColor = "#FFEBEE";
      feedback.style.borderColor = "#C62828";
      feedback.style.color = "#B71C1C";
      feedback.innerHTML = badMsg;
    }
  };

  window.checkQuiz2 = function (option) {
    showQuizFeedback(
      "quiz-feedback-2",
      option === 2,
      "<strong>Resposta correta.</strong><br>Número novo pedindo Pix é um dos golpes mais comuns. Confirme sempre por outro canal.",
      "<strong>Atenção. Esta não é a escolha mais segura.</strong><br>Não envie dinheiro a número novo. Confirme com o familiar pelo contato antigo."
    );
  };

  window.checkQuiz3 = function (option) {
    showQuizFeedback(
      "quiz-feedback-3",
      option === 2,
      "<strong>Resposta correta.</strong><br>Desligar e retornar pelo número oficial do cartão é a forma segura de falar com o banco.",
      "<strong>Atenção. Esta não é a escolha mais segura.</strong><br>Nunca passe códigos de SMS nem instale apps pedidos em ligação surpresa."
    );
  };

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", loadPrefs);
  } else {
    loadPrefs();
  }
})();
