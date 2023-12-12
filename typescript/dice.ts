let currentPlayer: number = 1;
let currentPlayerName: string;

let player1Score: number = 0;
let player2Score: number = 0;
let currentTurnTotal: number = 0;

function generateRandomValue(minValue: number, maxValue: number): number {
    return Math.floor(Math.random() * (maxValue - minValue + 1) + minValue);
}

function changePlayers(): void {
    currentPlayer = currentPlayer === 1 ? 2 : 1;
    currentPlayerName = currentPlayer === 1
        ? (document.getElementById("player1") as HTMLInputElement).value
        : (document.getElementById("player2") as HTMLInputElement).value;

    document.getElementById("current").innerText = `${currentPlayerName}'s turn`;
}

function createNewGame(): void {
    player1Score = 0;
    player2Score = 0;
    currentTurnTotal = 0;

    const player1Name = (document.getElementById("player1") as HTMLInputElement).value;
    const player2Name = (document.getElementById("player2") as HTMLInputElement).value;

    if (player1Name.trim() === "" || player2Name.trim() === "") {
        alert("Both players must have a name.");
        return;
    }

    currentPlayer = 1;
    currentPlayerName = player1Name;

    (document.getElementById("player1") as HTMLInputElement).setAttribute("disabled", "disabled");
    (document.getElementById("player2") as HTMLInputElement).setAttribute("disabled", "disabled");

    document.getElementById("turn").classList.add("open");
    document.getElementById("current").innerText = `${currentPlayerName}'s turn`;
    (document.getElementById("total") as HTMLInputElement).value = "0";
}

function rollDie(): void {
    let currTotal = parseInt((document.getElementById("total") as HTMLInputElement).value);
    let rollValue = generateRandomValue(1, 6);

    if (rollValue === 1) {
        currTotal = 0;
    } else {
        currTotal += rollValue;
    }

    updateDisplay(rollValue, currTotal);
}

function updateDisplay(rollValue: number, currentTotal: number): void {
    (document.getElementById("die") as HTMLInputElement).value = rollValue.toString();
    (document.getElementById("total") as HTMLInputElement).value = currentTotal.toString();
}

function holdDie(): void {
    let currentTotal = parseInt((document.getElementById("total") as HTMLInputElement).value);
    let currentPlayerScoreId = "score" + currentPlayer;
    let currentPlayerScore = parseInt((document.getElementById(currentPlayerScoreId) as HTMLInputElement).value);

    currentPlayerScore += currentTotal;
    (document.getElementById(currentPlayerScoreId) as HTMLInputElement).value = currentPlayerScore.toString();

    if (currentPlayerScore >= 100) {
        alert(`${currentPlayerName} wins!`);
        createNewGame();
    } else {
        currentTotal = 0;
        updateDisplay(0, currentTotal); // Display the rollValue as 0 when changing players
    }
}

function switchTurns(): void {
    changePlayers();
    currentTurnTotal = 0;
    (document.getElementById("total") as HTMLInputElement).value = "0";
    (document.getElementById("die") as HTMLInputElement).value = "";
}

window.onload = function (): void {
    const newGameBtn = document.getElementById("new_game") as HTMLButtonElement;
    newGameBtn.onclick = createNewGame;

    const rollBtn = document.getElementById("roll") as HTMLButtonElement;
    rollBtn.onclick = rollDie;

    const holdBtn = document.getElementById("hold") as HTMLButtonElement;
    holdBtn.onclick = holdDie;

    const switchBtn = document.getElementById("switch") as HTMLButtonElement;
    switchBtn.onclick = switchTurns;
};
