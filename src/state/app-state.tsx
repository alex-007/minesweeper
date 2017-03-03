import {BoardState} from './board-state'

export interface AppState {
	maxMines: number
	width: number
	height: number
	gameOver: boolean
	cellsLeft: number
	userMarksLeft: number
	timer: number
	time: number
	board?: BoardState
}

export function defaultState (initialState: AppState): AppState {
	return Object.assign({}, initialState, {
		maxMines: 30,
		width: 20,
		height: 15,
		timer: 0,
		time: 0
	})
}
