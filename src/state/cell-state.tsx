export interface Point {
	x: number
	y: number
}

export interface CellState {
	point: Point
	state: string
	userMark?: string
}
