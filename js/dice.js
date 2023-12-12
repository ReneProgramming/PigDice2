let currentPlayer = 1;
let currentPlayerName;

let player1Score = 0;
let player2Score = 0;
let currentTurnTotal = 0;

function generateRandomValue(minValue, maxValue) {
    return Math.floor(Math.random() * (maxValue - minValue + 1) + minValue);
}

function changePlayers() {
    currentPlayer = currentPlayer === 1 ? 2 : 1;
    currentPlayerName = currentPlayer === 1
        ? document.getElementById("player1").value
        : document.getElementById("player2").value;

    document.getElementById("current").innerText = `${currentPlayerName}'s turn`;
}

function createNewGame() {
    player1Score = 0;
    player2Score = 0;
    currentTurnTotal = 0;

    const player1Name = document.getElementById("player1").value;
    const player2Name = document.getElementById("player2").value;

    if (player1Name.trim() === "" || player2Name.trim() === "") {
        alert("Both players must have a name.");
        return;
    }

    currentPlayer = 1;
    currentPlayerName = player1Name;

    document.getElementById("player1").setAttribute("disabled", "disabled");
    document.getElementById("player2").setAttribute("disabled", "disabled");

    document.getElementById("turn").classList.add("open");
    document.getElementById("current").innerText = `${currentPlayerName}'s turn`;
    document.getElementById("total").value = "0";
}

function rollDie() {
    let currTotal = parseInt(document.getElementById("total").value);
    let rollValue = generateRandomValue(1, 6);

    if (rollValue === 1) {
        currTotal = 0;
    } else {
        currTotal += rollValue;
    }

    updateDisplay(rollValue, currTotal);
}

function updateDisplay(rollValue, currentTotal) {
    document.getElementById("die").value = rollValue.toString();
    document.getElementById("total").value = currentTotal.toString();
}

function holdDie() {
    let currentTotal = parseInt(document.getElementById("total").value);
    let currentPlayerScoreId = "score" + currentPlayer;
    let currentPlayerScore = parseInt(document.getElementById(currentPlayerScoreId).value);

    currentPlayerScore += currentTotal;
    document.getElementById(currentPlayerScoreId).value = currentPlayerScore.toString();

    if (currentPlayerScore >= 100) {
        alert(`${currentPlayerName} wins!`);
        createNewGame();
    } else {
        currentTotal = 0;
        updateDisplay(0, currentTotal); // Display the rollValue as 0 when changing players
    }
}

function switchTurns() {
    changePlayers();
    currentTurnTotal = 0;
    document.getElementById("total").value = "0";
    document.getElementById("die").value = "";
}

window.onload = function () {
    const newGameBtn = document.getElementById("new_game");
    newGameBtn.onclick = createNewGame;

    const rollBtn = document.getElementById("roll");
    rollBtn.onclick = rollDie;

    const holdBtn = document.getElementById("hold");
    holdBtn.onclick = holdDie;

    const switchBtn = document.getElementById("switch");
    switchBtn.onclick = switchTurns;
};
