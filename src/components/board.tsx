import * as React from 'react'
import {BoardState} from '../state/board-state'
import {Field} from "./field";

interface Props extends BoardState{
	onFieldClick: (x: number, y: number) => void
}

const block = require('./board.css')

export class Board extends React.Component<Props, any> {
	render() {
		return (
			<div className={block.board}>
				{this.props.fields.map(line => line.map(field => <Field onClick={this.props.onFieldClick} {...field}/>))}
			</div>
		)
	}
}
