// CONTROLE DA ESCALA DE FONTE
let fontScale = 1;

function changeFontSize(delta) {
  fontScale += delta * 0.15;
  // Limites mínimo (0.85) e máximo (1.6)
  if (fontScale < 0.85) fontScale = 0.85;
  if (fontScale > 1.6) fontScale = 1.6;
  
  document.documentElement.style.setProperty('--font-scale', fontScale);
}

function resetFontSize() {
  fontScale = 1;
  document.documentElement.style.setProperty('--font-scale', fontScale);
}

// ALTERNAR MODO DE ALTO CONTRASTE
function toggleHighContrast() {
  document.body.classList.toggle('high-contrast');
}

// RESPOSTA DO SIMULADOR INTERATIVO
function checkQuiz(option) {
  const feedback = document.getElementById('quiz-feedback');
  feedback.style.display = 'block';

  if (option === 2) {
    feedback.style.backgroundColor = '#E8F5E9';
    feedback.style.borderColor = '#2E7D32';
    feedback.style.color = '#1B5E20';
    feedback.innerHTML = '<strong>PARABÉNS! Resposta Correta! 🎉</strong><br>Criminosos usam a IA para clonar vozes e o desespero para causar pânico. Sempre desligue e confirme a informação com o familiar antes de enviar qualquer valor.';
  } else {
    feedback.style.backgroundColor = '#FFEBEE';
    feedback.style.borderColor = '#C62828';
    feedback.style.color = '#B71C1C';
    feedback.innerHTML = '<strong>Atenção! Esta não é a escolha mais segura. ⚠️</strong><br>A voz pode ser simulada por Inteligência Artificial! Nunca faça transferências com pressa sem antes desligar e falar diretamente com o seu parente pelo número de costume.';
  }
}

// LEITURA DE VOZ (SÍNTESE DE FALA DO NAVEGADOR)
function readText(elementId) {
  if ('speechSynthesis' in window) {
    // Interrompe leituras anteriores para evitar sobreposição
    window.speechSynthesis.cancel();

    const textToRead = document.getElementById(elementId).innerText;
    const utterance = new SpeechSynthesisUtterance(textToRead);
    utterance.lang = 'pt-BR';
    utterance.rate = 0.9; // Velocidade ligeiramente mais pausada para melhor compreensão

    window.speechSynthesis.speak(utterance);
  } else {
    alert('O seu navegador não suporta a funcionalidade de leitura por áudio.');
  }
}
