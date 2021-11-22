// SELECTORS
const squares = Array.from(document.querySelectorAll(".square"));
const restartBtn = document.getElementById("restart-btn");
const showPlayer = document.querySelector(".show-player");
const winText = document.querySelector(".who-won");

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

	// computer choices
	computerPlay();

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

const didWin = () => {
	for (let i = 0; i < winCombos.length; i++) {
		let check = [];

		// refactor with some and every == won't need to store in an array???
		let look = winCombos[i].forEach((idx) => {
			check.push(squares[idx].classList[1]);
		});

		// win or loose
		if (
			check.every((el) => {
				return el === currPlayer;
			})
		) {
			showPlayer.parentNode.classList.add("hide");
			winText.innerText = `Player ${currPlayer} won! 🥳 `;
			break;
		}

		// tie
		if (
			squares.every((el) => {
				return el.classList.length >= 2;
			})
		) {
			showPlayer.parentNode.classList.add("hide");
			winText.innerText = `It's a draw! 🥸 `;
		}
	}
};

const minimax = (choicesArr, currPlayer) => {
	// how do I know when computer wins?
	// how do i switch between players?  -- do i need to?
	// save all the outcomes ===> -10, 10, 0
	// choose the best move for the computer to win
	// loop through the choices ===> decision tree ===>
	// return early if easiest path to win is found
	// need index of the square and set the mark
	for (let i = 0; i < choicesArr.length; i++) {
		if (computer - is - player) {
			// bestMove = ???;
			// move = want to return maximizer
			// Math.max(bestMove,move)
		} else if (human - is - player) {
			// bestMove = ???;
			// move = want to return minimizer
			// Math.min(bestMove,move )
		} else if (choicesArr.length === 0) {
			return 0;
		}
	}
};

// computer's selection
const computerPlay = () => {
	let choicesArr = [];
	let move;
	for (let i = 0; i < squares.length; i++) {
		// console.log(squares[i].classList);
		if (squares[i].classList.length == 1 || squares[i].classList.length == 1) {
			choicesArr.push(squares[i].id); //index
		}
	}
	// pick an available spot to mark
	move = Math.floor(Math.random() * choicesArr.length);
	console.log("move", move);

	// ... how do I set the mark?
	squares[move].classList.add(currPlayer);
	squares[move].innerText = currPlayer; //not putting the correct mark

	// choose the best move ===> recursion???
	// move this function up (before we set the mark)
	// minimax(choicesArr, currPlayer);
};

// activate the board
const startGame = () => {
	squares.forEach((square) => {
		square.addEventListener("click", handleClick, { once: true });
	});
};

// reset board
const resetBoard = () => {
	showPlayer.innerText = "";
	showPlayer.parentNode.classList.remove("hide");
	winText.classList.add("hide");
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

// bugs:
// won't show the win after hitting resset button
