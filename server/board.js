'use strict';

function checkPoint(x, y, width, height) {
	return x >=0 && x < width && y >= 0 && y < height
}

function generateMines (board, width, height, maxMines) {
	let mines = 0
	let x = 0
	let y = 0

	const maxX = width - 1
	const maxY = height - 1

	const randomizeCoordinate = (maxNumber) => {
		return Math.floor(Math.random() * maxNumber)
	}

	const calculate = (x, y) => {
		if (board[x][y].state !== 'M') {
			++board[x][y].state
		}
	}

	while (mines < maxMines) {
		x = randomizeCoordinate(width)
		y = randomizeCoordinate(height)

		if (board[x][y].state !== 'M') {
			board[x][y].state = 'M'

			++mines

			//calculating mines
			//up
			if (x > 0) {
				calculate(x-1, y);
			}

			//down
			if (x < maxX) {
				calculate(x+1, y);
			}

			//left
			if (y > 0) {
				calculate(x, y-1);
			}

			//right
			if (y < maxY) {
				calculate(x, y+1);
			}

			//up left
			if (x > 0 && y > 0) {
				calculate(x-1, y-1);
			}

			//up right
			if (x > 0 && y < maxY) {
				calculate(x-1, y+1);
			}

			//down left
			if (x < maxX && y > 0) {
				calculate(x+1, y-1);
			}

			//down right
			if (x < maxX && y < maxY) {
				calculate(x+1, y+1);
			}
		}
	}

	return board
}

function generateBoard (session, width, height, maxMines, forceInit) {
	if (forceInit || !session.board) {
		let board = []
		for (let x = 0; x < width; ++x) {
			board.push(Array.apply(null, {length: height}).map(() => ({state: 0, shown: false, userMark: ''})))
		}

		board = generateMines(board, width, height, maxMines)

		session.board = board
		return []
	} else {
		return getShownCells(session)
	}
}

function getShownCells (session) {
	const board = session.board
	const width = board.length
	const height = board[0].length
	const ret = []

	for (let x = 0; x < width; ++x) {
		for (let y = 0; y < height; ++y) {
			const cell = board[x][y]
			if (cell.shown) {
				ret.push({point: {x, y}, state: cell.state, userMark: cell.userMark})
			} else if (cell.userMark) {
				ret.push({point: {x, y}, state: '', userMark: cell.userMark})
			}
		}
	}

	return ret
}

function getCellsState (session, clickX, clickY) {
	const board = session.board
	const maxX = board.length - 1
	const maxY = board[0].length - 1
	const checkedCells = []

	if (!checkPoint(clickX, clickY, maxX + 1, maxY + 1)) {
		return {error: 'Error coordinates'}
	}

	const getMines = () => {
		const ret = []

		for (let x = 0; x <= maxX; ++x) {
			for (let y = 0; y <= maxY; ++y) {
				const cell = board[x][y]
				if (cell.state === 'M') {
					ret.push({point: {x, y}, state: cell.state, userMark: ''})
					cell.shown = true
					cell.userMark = ''
				}
			}
		}

		return ret
	}

	const getCellState = (x, y, userClick) => {
		const cell = board[x][y]

		let ret = []

		if (!userClick && checkedCells.some(cell => cell.x === x && cell.y === y)) {
			return ret
		}

		if (userClick || cell.state !== 'M') {
			ret.push({point: {x, y}, state: cell.state})
			cell.shown = true
			checkedCells.push({x, y})
		}

		if (userClick && cell.state === 'M') {
			ret = getMines()
		} else if (!cell.state) {
			//up
			if (x > 0) {
				ret = ret.concat(getCellState(x-1, y));
			}

			//down
			if (x < maxX) {
				ret = ret.concat(getCellState(x+1, y));
			}

			//left
			if (y > 0) {
				ret = ret.concat(getCellState(x, y-1));
			}

			//right
			if (y < maxY) {
				ret = ret.concat(getCellState(x, y+1));
			}

			//up left
			if (x > 0 && y > 0) {
				ret = ret.concat(getCellState(x-1, y-1));
			}

			//up right
			if (x > 0 && y < maxY) {
				ret = ret.concat(getCellState(x-1, y+1));
			}

			//down left
			if (x < maxX && y > 0) {
				ret = ret.concat(getCellState(x+1, y-1));
			}

			//down right
			if (x < maxX && y < maxY) {
				ret = ret.concat(getCellState(x+1, y+1));
			}
		}

		return ret
	}

	return getCellState(clickX, clickY, true)
}

function setCellUserMark (session, x, y, userMark) {
	const board = session.board

	if (!checkPoint(x, y, board.length, board[0].length)) {
		return {error: 'Error coordinates'}
	}

	board[x][y].userMark = userMark

	return {point: {x, y}, state: '', userMark}
}

module.exports = {
	generateBoard,
	getCellsState,
	setCellUserMark
}
