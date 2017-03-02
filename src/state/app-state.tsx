import {BoardState} from './board-state'

export interface AppState {
	width: number
	height: number
	board?: BoardState
}

export function defaultState (initialState: AppState): AppState {
	return Object.assign({}, initialState, {
		width: 40,
		height: 40
	})
}
