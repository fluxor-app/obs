const channel = new BroadcastChannel("contagem");
const container = document.getElementById("container");

function getCount() {
  return parseInt(localStorage.getItem("container") || "0");
}

function renderCount() {
  const numbersDiv = document.getElementById("numbers");
  if (numbersDiv) {
    const count = getCount();
    numbersDiv.innerHTML = `<p>${count}</p>`;
  }
}

function startTimer(hhmm) {
  const [hours, minutes] = hhmm.split(":").map(Number);
  let totalSeconds = (hours * 3600) + (minutes * 60);
  const timerDiv = document.getElementById("timer");

  const interval = setInterval(() => {
    if (totalSeconds <= 0) {
      clearInterval(interval);
      if (timerDiv) timerDiv.innerHTML = "Acabou o tempo jumento!";
      return;
    }

    totalSeconds--;
    const mins = Math.floor(totalSeconds / 60);
    const secs = totalSeconds % 60;
    if (timerDiv) {
      timerDiv.innerHTML = `${mins.toString().padStart(2, "0")}:${secs.toString().padStart(2, "0")}`;
    }
  }, 1000);
}

// Escuta mensagens vindas do controller
channel.onmessage = (event) => {
  const data = event.data;

  switch (true) {
    case data === "ativar":
      container.innerHTML = `
      <p>Contagem:</p>
      <div id="numbers"></div>
    `;
      renderCount();
      break;

    case data === "desativar":
      container.innerHTML = "";
      break;

    case data === "ativarTimer":
      container.innerHTML = "<p>Adianta nada ativar e não iniciar</p>";
      break;

    case data === "desativarTimer":
      container.innerHTML = "";
      break;

    case data === "update":
      renderCount();
      break;

    case /^\d{2}:\d{2}$/.test(data):
      container.innerHTML = `
      <div id="timer"></div>
    `;
      startTimer(data);
      break;

    case data === "no-value":
      container.innerHTML = `<p style="color: red;">E o timer animal tetudo?</p>`;
      break;

    default:
      console.warn("Sei que porra deu não, se resolve com o adm:", data);
  }
};
