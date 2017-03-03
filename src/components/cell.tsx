import * as React from 'react'
import autobind from '../utils/autobind'
import {CellState, Point} from '../state/cell-state'

export interface Props extends CellState{
	onClick: (point: Point) => void
	onRightClick: (point: Point, userMark: string) => void
}

const block = require('./cell.css')

export class Cell extends React.Component<Props, any> {
	render() {
		const {state, userMark} = this.props
		return (
			<div className={block.cell + ' ' + (state === '' ? block.unknown : '')}
				onClick={this.onClick} onContextMenu={this.onContextMenu}
			>
				{state ? state : (userMark ? userMark : '')}
			</div>
		)
	}

	@autobind
	onClick() {
		const {point, state, onClick} = this.props
		if (state === '') {
			onClick(point)
		}
	}

	@autobind
	onContextMenu(e: any) {
		const {point, state, userMark, onRightClick} = this.props
		e.preventDefault()
		if (state === '') {
			onRightClick(point, !userMark ? '!' : '')
		}
	}
}
