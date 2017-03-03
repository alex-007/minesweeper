import {CellState} from './cell-state'

export interface Column {
	id: number
	cells: CellState[]
}

export interface BoardState {
	columns: Column[]
}
