import {AppState} from '../state/app-state'
import {Column, BoardState} from '../state/board-state'
import {CellState} from '../state/cell-state'

import {
	GetNewBoardAction, GetNewBoardPayload,
	GetCellStateAction, GetCellStatePayload,
	SetCellUserMarkAction, SetCellUserMarkPayload,
	Actions as AppActions
} from '../actions/app-actions'
import {ActionStatus} from '../actions/actions'

function markShownCells(
	board: BoardState,
	gameOver: boolean,
	cellsLeft: number,
	userMarksLeft: number,
	cellsState: CellState[])
{
	const newBoard = Object.assign({}, board)

	cellsState.forEach(({point, state, userMark}) => {
		const cell = newBoard.columns[point.x].cells[point.y]

		if (state === 'M') {
			gameOver = true
		} else if (cell.state === '' && state !== '') {
			--cellsLeft
		}

		if (userMark) {
			cell.userMark = userMark
			--userMarksLeft
		}

		if (cell.userMark && state) {
			cell.userMark = ''
			++userMarksLeft
		}

		cell.state = state
	})

	board = newBoard

	return {
		board,
		gameOver,
		cellsLeft,
		userMarksLeft
	}
}

function getNewBoard(state: AppState, action: GetNewBoardAction) {
	const payload = action.payload as GetNewBoardPayload
	const {width, height, maxMines} = state
	let {board, gameOver, cellsLeft, userMarksLeft} = state

	switch (payload.status) {
		case ActionStatus.Started:
			//TODO: set is loading
			break

		case ActionStatus.Completed:
			let columns: Column[] = []
			for (let x = 0; x < width; ++x) {
				let column = {id: x, cells: []} as Column
				for (let y = 0; y < height; ++y) {
					column.cells.push({point: {x, y}, state: ''})
				}
				columns.push(column)
			}
			board = {columns}
			gameOver = false
			cellsLeft = width * height - maxMines
			userMarksLeft = maxMines
			if (payload.cellsState.length) {
				const res = markShownCells(board, gameOver, cellsLeft, userMarksLeft, payload.cellsState)
				board = res.board
				gameOver = res.gameOver
				cellsLeft = res.cellsLeft
				userMarksLeft = res.userMarksLeft
			}
			break

		case ActionStatus.Failed:
			console.error((action.payload as Error).message)
			break
	}

	return Object.assign({}, state, {
		board,
		gameOver,
		cellsLeft,
		userMarksLeft
	})
}

function getCellState(state: AppState, action: GetCellStateAction) {
	const payload = action.payload as GetCellStatePayload
	let {board, gameOver, cellsLeft, userMarksLeft} = state

	switch (payload.status) {
		case ActionStatus.Started:
			//TODO: set is loading
			break

		case ActionStatus.Completed:
			const res = markShownCells(board, gameOver, cellsLeft, userMarksLeft, payload.cellsState)
			board = res.board
			gameOver = res.gameOver
			cellsLeft = res.cellsLeft
			userMarksLeft = res.userMarksLeft
			break

		case ActionStatus.Failed:
			console.error((action.payload as Error).message)
			break
	}

	return Object.assign({}, state, {
		board,
		gameOver,
		cellsLeft,
		userMarksLeft
	})
}

function setCellUserMark(state: AppState, action: SetCellUserMarkAction) {
	const payload = action.payload as SetCellUserMarkPayload
	let {board, userMarksLeft} = state

	switch (payload.status) {
		case ActionStatus.Started:
			//TODO: set is loading
			break

		case ActionStatus.Completed:
			const newBoard = Object.assign({}, board)
			const {point, userMark} = payload.cellState
			const cell = newBoard.columns[point.x].cells[point.y]
			cell.userMark = userMark
			if (userMark) {
				--userMarksLeft
			} else {
				++userMarksLeft
			}
			board = newBoard
			break

		case ActionStatus.Failed:
			console.error((action.payload as Error).message)
			break
	}

	return Object.assign({}, state, {
		board,
		userMarksLeft
	})
}

export default {
	[AppActions.GetNewBoard]: getNewBoard,
	[AppActions.GetCellState]: getCellState,
	[AppActions.SetCellUserMark]: setCellUserMark
}
