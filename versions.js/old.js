//	-------*	S E L E C T O R S	*-------
const squares = Array.from(document.querySelectorAll(".square"));
const restartBtn = document.getElementById("restart-btn");
const showPlayer = document.querySelector(".show-player");
const winText = document.querySelector(".who-won");

let computer = "X";
let human = "O";
let board;
let who;
let over = false; //game over flag

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

//	-------*	F U N C T I O N S	*-------
const handleClick = (e) => {
	const squareClicked = e.target;
	currPlayer = who ? computer : human;

	// place the mark for the player
	// setMark(squareClicked, currPlayer);

	// if the game is in play and square clicked is empty
	if (!over && squareClicked.classList.length === 1) {
		setMark(squareClicked, human);
		// if no winner and not a tie
		if (!didWin(board, human) && !isTie()) setMark(bestPlay(), computer);
	}

	// is game over?
	// didWin();

	// it it a tie?
	// isTie();

	// switch turns
	// toggleTurns();

	// computer choices
	// computerPlay();
};

const setMark = (squareClicked, currPlayer) => {
	squareClicked.classList.add(currPlayer);
	squareClicked.innerText = currPlayer;
};

const toggleTurns = () => {
	who = !who;
	showPlayer.innerText = currPlayer;
};

// ❌
const showMessage = () => {
	winText.innerText = `Game Over `;
};

const gameOver = () => {
	over = true;
	squares.forEach((square) => {
		square.removeEventListener("click", setMark, false);
	});
};

const didWin = () => {
	// let checkBoard = [];
	// let look = winCombos[i].forEach((idx) => {
	// 	check.push(squares[idx].classList[1]);
	// });

	// get the sets with the player symbol
	for (const set of winCombos) {
		if (set.every((el) => squares[el].classList[1])) {
			winFound = { set, currPlayer };
			showPlayer.parentNode.classList.add("hide");
			winText.classList.remove("hide");
			winText.innerText = `Player ${currPlayer} won! 🥳 `;
			over = false;
			break;
		}
	}
	// debugger;
	// look = winCombos.some((set) => set.every((el) => el === currPlayer));
	// look ? console.log(`look is win`) : console.log(`look is loose`);

	// loop the board combos and see if all 3 elements are the same player
	// let res = check.every((el) => {
	// 	return el === currPlayer;
	// });

	// win or loose
	// if (res) {
	// 	console.log("in win");
	// 	showPlayer.parentNode.classList.add("hide");
	// 	winText.classList.remove("hide");
	// 	winText.innerText = `Player ${currPlayer} won! 🥳 `;
	// 	over = true;
	// 	gameOver();
	// }

	return (over = false);
};

const isTie = () => {
	if (emptySquares().length === 0) {
		showPlayer.parentNode.classList.add("hide");
		winText.innerText = `It's a draw! 🥸 `;
		// winner("Tie Game!");
		return true;
	}

	return false;
};

const bestPlay = () => {
	return minimax(board, computer)[index];
};

const emptySquares = () => {
	return squares.filter((square) => square.classList.length === 1);
};

const minimax = (virtualBoard, currPlayer) => {
	let choicesArr = emptySquares();

	// check for the win
	if (didWin(virtualBoard, computer)) {
		return { score: 10 };
	} else if (didWin(virtualBoard, human)) {
		return { score: -10 };
	} else if (choicesArr.length === 0) {
		return { score: 0 };
	}

	// scan the results tree to find all the possible moves
	let virtualMoves = [];
	for (let i = 0; i < choicesArr.length; i++) {
		let move = {};
		move.index = virtualBoard[choicesArr[i].id];
		virtualBoard[choicesArr[i].id] = currPlayer;

		if (currPlayer == computer) {
			let res = minimax(virtualBoard, human);
			move[score] = res[score];
		} else {
			let res = minimax(virtualBoard, computer);
			move[score] = res[score];
		}
		virtualBoard[choicesArr[i]] = move.index;
		virtualMoves.push(move);
	}

	// choose the best move for the computer
	let bestMove;
	if (currPlayer === computer) {
		let bestScore = -Infinity;
		for (let i = 0; i < virtualMoves.length; i++) {
			if (virtualMoves[i][score] > bestScore) {
				bestScore = virtualMoves[i][score];
				bestMove = i;
			}
		}
	} else {
		var bestScore = Infinity;
		for (let i = 0; i < virtualMoves.length; i++) {
			if (virtualMoves[i][score] < bestScore) {
				bestScore = virtualMoves[i][score];
				bestMove = i;
			}
		}
	}

	// return the best move from the possible moves array
	return virtualMoves[bestMove];
};

// computer's selection
// const computerPlay = () => {
// 	let choices = emptySquares();
// 	let i;

// 	// minimax(choicesArr, currPlayer);

// 	// pick an available spot to mark -- index in choices array
// 	// if (choices.length) {
// 	// 	i = Math.floor(Math.random() * choices.length);

// 	// 	squares[choices[i].id].classList.add(computer);
// 	// 	squares[choices[i].id].innerText = computer;
// 	// 	didWin();
// 	// }
// };

// activate the board
const startGame = () => {
	board = Array.from(Array(9).keys());
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

//	-------*	 E V E N T  L I S T E N E R S	*-------
restartBtn.addEventListener("click", resetBoard);

startGame();

// bugs:
// 1.
// 2.
