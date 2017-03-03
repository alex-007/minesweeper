import * as React from 'react'
import {BoardState} from '../state/board-state'
import {Cell} from './cell'
import {Point} from '../state/cell-state'

interface Props extends BoardState{
	onCellClick: (point: Point) => void
	onCellRightClick: (point: Point, userMark: string) => void
}

const block = require('./board.css')

export class Board extends React.Component<Props, any> {
	render() {
		const {columns, onCellClick, onCellRightClick} = this.props

		return (
			<div className={block.board}>
				{columns.map(column =>
					<div key={column.id}>{column.cells.map(cell =>
						<Cell key={cell.point.x + ':' + cell.point.y} onClick={onCellClick} onRightClick={onCellRightClick} {...cell}/>
					)}</div>
				)}
			</div>
		)
	}
}
