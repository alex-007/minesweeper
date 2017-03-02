import * as React from 'react'
import autobind from '../utils/autobind'
import {FieldState} from '../state/field-state'

export interface Props extends FieldState{
	onClick: (x: number, y: number) => void
}

const block = require('./field.css')

export class Field extends React.Component<Props, any> {
	render() {
		const {state} = this.props
		return (
			<div className={block.field} onClick={this.onClick}>{state}</div>
		)
	}

	@autobind
	onClick() {
		this.props.onClick(this.props.x, this.props.y)
	}
}
