const channel = new BroadcastChannel("contagem");

// Get e Set do localStorage
function getCount() {
    return parseInt(localStorage.getItem("container") || "0");
}
function setCount(value) {
    localStorage.setItem("container", value);
    channel.postMessage("update"); // avisa outras abas para atualizar contagem
}

// Botão de adicionar
const addButton = document.getElementById("add-number");
if (addButton) {
    addButton.addEventListener("click", () => {
        let count = getCount();
        count++;
        setCount(count);
    });
}

// Botão de reset (zerar contagem)
const resetButton = document.getElementById("reset");
if (resetButton) {
    resetButton.addEventListener("click", () => {
        setCount(0);
    });
}

// Checkbox para ativar/desativar exibição
const activeCount = document.getElementById("active-chk");
if (activeCount) {
    activeCount.addEventListener("change", () => {
        const checked = activeCount.checked;
        channel.postMessage(checked ? "ativar" : "desativar");
    });
}

const activeTimer = document.getElementById("active-timer");
if (activeTimer) {
    activeTimer.addEventListener("change", () => {
        const checked = activeTimer.checked;
        channel.postMessage(checked ? "ativarTimer" : "desativarTimer");
    });
}

function startCountdown() {
    const input = document.getElementById("input-timer").value;

    if (!input) {
        channel.postMessage("no-value")
        return
    }

    channel.postMessage(input)
}
