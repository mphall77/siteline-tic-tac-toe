// SELECTORS
const squares = Array.from(document.querySelectorAll(".square"));
const restartBtn = document.getElementById("restart-btn");

let computer = "X"; // = "X"
let human; //= "O"
let currPlayer = computer;

// how do I know when a player wins?
const winCombos = [
	[0, 1, 2],
	[3, 4, 5],
	[6, 7, 8],
	[0, 3, 6],
	[1, 4, 7],
	[2, 5, 8],
	[0, 4, 8],
	[2, 4, 6],
];

// FUNCTIONS
const handleClick = (e) => {
	squareClicked = e.target;
	currPlayer = computer ? "X" : "O";

	// place the mark for the player
	setMark(squareClicked, currPlayer);

	// is game over?
    didWin();

	// switch turns
	toggleTurns();
};

const setMark = () => {
	squareClicked.classList.add(currPlayer);
	squareClicked.innerText = currPlayer;
};

const toggleTurns = () => {
	computer = !computer;
	showPlayer.innerText = currPlayer;
};

const didwin=()={}

// activate the board
const startGame = () => {
	squares.forEach((square) => {
		square.addEventListener("click", handleClick, { once: true });
	});
};

// reset board
const resetBoard = () => {
	squares.forEach((square) => {
		square.innerText = "";
		square.classList.remove("X");
		square.classList.remove("O");
	});
	startGame();
};

// EVENT LISTENERS
restartBtn.addEventListener("click", resetBoard);

startGame();
