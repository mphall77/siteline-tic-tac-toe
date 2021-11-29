//	-------*	S E L E C T O R S	*-------
const squares = Array.from(document.querySelectorAll(".square"));
const restartBtn = document.getElementById("restart-btn");
const showPlayer = document.querySelector(".show-player");
const winText = document.querySelector(".who-won");

let computer = "X";
let human = "O";
let board;

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
// activate the board
const startGame = () => {
	document.querySelector(".results").style.display = "none";
	board = Array.from(Array(9).keys());
	for (let i = 0; i < squares.length; i++) {
		squares[i].innerText = "";
		squares[i].style.removeProperty("background-color");
		squares[i].addEventListener("click", handleClick, { once: true });
	}
};

const handleClick = (square) => {
	// const squareClicked = e.target;

	// // if the game is in play and square clicked is empty
	// if (squareClicked.classList.length === 1) {
	// 	setMark(squareClicked.id, human);
	// 	// if no winner and not a tie
	// 	if (!didWin(board, human) && !isTie()) setMark(bestPlay(), computer);
	// }
	if (typeof board[square.target.id] == "number") {
		setMark(square.target.id, human);
		if (!didWin(board, human) && !isTie()) setMark(bestPlay(), computer);
	}
};

// play
const setMark = (squareId, player) => {
	board[squareId] = player;
	document.getElementById(squareId).innerText = player;
	let gameWon = didWin(board, player);
	if (gameWon) gameOver(gameWon);
};

// is the game over?
const didWin = (board, player) => {
	let plays = board.reduce(
		(acc, el, idx) => (el === player ? acc.concat(idx) : acc),
		[]
	);
	let gameWon = null;
	for (let [index, set] of winCombos.entries()) {
		if (set.every((elem) => plays.indexOf(elem) > -1)) {
			gameWon = { index, player };
			break;
		}
	}
	return gameWon;
};

const isTie = () => {
	if (emptySquares().length == 0) {
		for (let i = 0; i < squares.length; i++) {
			squares[i].style.backgroundColor = "green";
			squares[i].removeEventListener("click", handleClick, false);
		}
		declareWinner(`It's a draw! 🥸 `);
		return true;
	}
	return false;
};

// gameOver
const gameOver = (gameWon) => {
	for (let index of winCombos[gameWon.index]) {
		document.getElementById(index).style.backgroundColor =
			gameWon.player == human ? "green" : "orange";
	}
	for (let i = 0; i < squares.length; i++) {
		squares[i].removeEventListener("click", handleClick, false);
	}
	declareWinner(
		gameWon.player == human ? `You win human! 🥳 ` : `You lose human! ☹️`
	);
};

// show winner
const declareWinner = (who) => {
	document.querySelector(".results").style.display = "flex";
	document.querySelector(".results .text").innerText = who;
};

// computer plays
const bestPlay = () => {
	return minimax(board, computer).index;
};

const emptySquares = () => {
	return board.filter((square) => typeof square == "number");
};

const minimax = (virtualBoard, player) => {
	let choicesArr = emptySquares();

	// check for the win
	if (didWin(virtualBoard, human)) {
		return { score: -10 };
	} else if (didWin(virtualBoard, computer)) {
		return { score: 10 };
	} else if (choicesArr.length === 0) {
		return { score: 0 };
	}

	// scan the results tree to find all the possible moves
	let moves = [];
	for (let i = 0; i < choicesArr.length; i++) {
		let move = {};
		move.index = virtualBoard[choicesArr[i]];
		virtualBoard[choicesArr[i]] = player;

		if (player == computer) {
			let result = minimax(virtualBoard, human);
			move.score = result.score;
		} else {
			let result = minimax(virtualBoard, computer);
			move.score = result.score;
		}

		virtualBoard[choicesArr[i]] = move.index;

		moves.push(move);
	}

	let bestMove;
	if (player === computer) {
		let bestScore = -Infinity;
		for (let i = 0; i < moves.length; i++) {
			if (moves[i].score > bestScore) {
				bestScore = moves[i].score;
				bestMove = i;
			}
		}
	} else {
		let bestScore = Infinity;
		for (var i = 0; i < moves.length; i++) {
			if (moves[i].score < bestScore) {
				bestScore = moves[i].score;
				bestMove = i;
			}
		}
	}

	// return the best move from the possible moves array
	return moves[bestMove];
};

//	-------*	 E V E N T  L I S T E N E R S	*-------
restartBtn.addEventListener("click", startGame);

startGame();
