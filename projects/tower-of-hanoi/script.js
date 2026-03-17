const input = document.getElementById("diskInput");
const movesText = document.getElementById("moves");
const stepsText = document.getElementById("steps");

input.addEventListener("input", () => {
    const n = parseInt(input.value);

    stepsText.textContent = "";
    movesText.textContent = "";

    if (isNaN(n) || n <= 0) return;

    const totalMoves = Math.pow(2, n) - 1;
    movesText.textContent = "Total moves: " + totalMoves;

    solveHanoi(n, "BEG", "AUX", "END");
});

function solveHanoi(n, from, aux, to) {
    if (n === 1) {
        stepsText.textContent += `Move disk 1 from ${from} to ${to}\n`;
        return;
    }
    solveHanoi(n - 1, from, to, aux);
    stepsText.textContent += `Move disk ${n} from ${from} to ${to}\n`;
    solveHanoi(n - 1, aux, from, to);
}