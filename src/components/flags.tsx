import * as React from 'react'

const block = require('./flags.css')

interface Prop {
	flagsLeft: number
}

export default class Flags extends React.Component<Prop, any> {
	render() {
		return (
			<div className={block.flags}>Flags left: {this.props.flagsLeft}</div>
		)
	}
}
