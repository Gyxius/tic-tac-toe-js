function createPlayer(name) {
    // Creates a new player
    // Factory Pattern
    let playerName = name;
    let marker = "";
    let X = 0;
    let Y = 0;
    let score = 0;
    const getName = () => playerName;
    const getScore = () => score;
    const setScore = (newScore) => score = newScore;
    const setName = (newName) => playerName = newName;
    const setMarker = (newMarker) => marker = newMarker;
    const getMarker = () => marker;
    const setX = (newX) => X = newX;
    const setY = (newY) => Y = newY;
    const getX = () => X;
    const getY = () => Y;

    return {getName, getScore, setScore, setName, setMarker, getMarker, setX, setY, getX, getY};
}

function gameBoard() {
    // Contains the grid
    // Autocheck if the game is over
    // Says who's the winner
    // Display the grid
    // Put marker on grid

    let grid = [["_", "_", "_"],
                  ["_", "_", "_"],
                  ["_", "_", "_"]];

    const isGameOver = function(mark) {
        // Verifica si el juego ha terminado probando todas las combinaciones
        if ((grid[0][0] === mark) && (grid[0][0] === grid[0][1]) && (grid[0][1] === grid[0][2])) return true;
        if ((grid[1][0] === mark) && (grid[1][0] === grid[1][1]) && (grid[1][1] === grid[1][2])) return true;
        if ((grid[2][0] === mark) && (grid[2][0] === grid[2][1]) && (grid[1][1] === grid[2][2])) return true;

        if ((grid[0][0] === mark) && (grid[0][0] === grid[1][0]) && (grid[1][0] === grid[2][0])) return true;
        if ((grid[0][1] === mark) && (grid[0][1] === grid[1][1]) && (grid[1][1] === grid[2][1])) return true;
        if ((grid[0][2] === mark) && (grid[0][2] === grid[1][2]) && (grid[1][2] === grid[2][2])) return true; 

        if ((grid[0][0] === mark) && (grid[0][0] === grid[1][1]) && (grid[1][1] === grid[2][2])) return true;
        if ((grid[2][0] === mark) && (grid[2][0] === grid[1][1]) && (grid[1][1] === grid[0][2])) return true;

        return false;
    }

    const displayGrid = function() {
        for (let i = 0; i < 3; i++) {
            console.log(grid[i][0] + " | " + grid[i][1] + " | " + grid[i][2]);
        }
    }

    const checkIfCellEmpty = (i,j) => (grid[i][j] === "_");

    const putMarker = function(i,j,marker) {
        if (checkIfCellEmpty(i, j)) {
            grid[i][j] = marker;
            return true;
        } else {
            return false;
        }
    }

    const resetGrid = function() {
        grid = [["_", "_", "_"],
                ["_", "_", "_"],
                ["_", "_", "_"]];
    }


    // return grid only for testing purposes 
    return {resetGrid, isGameOver, displayGrid, putMarker};
}

document.getElementById('button').onclick = function() {
    if(this.innerText === "Restart") {
        resetGame();
    }    
    else {
        this.innerText = "Restart";
    }
    console.log("Game started!");
    playGame();
};


const player1 = createPlayer("Player 1");
const player2 = createPlayer("Player 2");
player1.setMarker("X");
player2.setMarker("O");
player1.setName(prompt("Player1: Please enter your name", "Player 1"));
let player1Text = document.querySelector("#player1-name");
let player1Score = document.querySelector("#player1-score");
player1Text.innerText = player1.getName();
player2.setName(prompt("Player2: Please enter your name", "Player 2"));
let player2Text = document.querySelector("#player2-name");
let player2Score = document.querySelector("#player2-score");
player2Text.innerText = player2.getName();

playGame = function(){
    
    game = gameBoard();

    let currentPlayer = player1;

    const switchPlayer = () => {
        currentPlayer = (currentPlayer === player1) ? player2 : player1;
    }

    const handleCellClick = function(event) {
        const i = parseInt(event.target.dataset.x);
        const j = parseInt(event.target.dataset.y);

        if (game.putMarker(i, j, currentPlayer.getMarker())) {
            event.target.textContent = currentPlayer.getMarker();
            game.displayGrid();

            if (game.isGameOver(currentPlayer.getMarker())) {
                console.log(`${currentPlayer.getName()} wins!`);
                alert(`${currentPlayer.getName()} wins!`);
                currentPlayer.setScore(currentPlayer.getScore() + 1);
                player1Score.innerText = "Score: " + player1.getScore();
                player2Score.innerText =  "Score: " + player2.getScore();

            } else {
                switchPlayer();
            }
        } 
    }

    const cells = document.querySelectorAll(".cell");
    cells.forEach((cell) => {
        cell.addEventListener("click", handleCellClick);
    });
};

function resetGame() {
    console.log("Game reset!");

    // Reset the grid data
    game.resetGrid();

    // Clear the displayed markers from cells
    const cells = document.querySelectorAll(".cell");
    cells.forEach((cell) => {
        cell.textContent = ""; 
    });

    playGame();
}

//////////////////////////////////////////
////////////////  TEST   /////////////////
//////////////////////////////////////////

// const testGameBoard = (function(){
//     console.log("Testing the game board");
//     // Test the game board function
//     let gameTest = gameBoard();
//     // gameTest.displayGrid();
//     gameTest.grid = [["X", "X", "X"],
//                      ["_", "_", "_"],
//                      ["_", "_", "_"]];
//     gameTest.displayGrid();
//     console.log("Game over? : " + gameTest.isGameOver("X"));
//     gameTest.grid = [["_", "X", "X"],
//                         ["_", "_", "_"],
//                         ["_", "_", "_"]];
//     gameTest.displayGrid();
//     console.log("Game over? : " + gameTest.isGameOver("X"));
//     gameTest.grid = [["X", "_", "_"],
//                     ["_", "X", "_"],
//                     ["_", "_", "X"]];
//     gameTest.displayGrid();
//     console.log("Game over? : " + gameTest.isGameOver("X"));
    
// })();