import * as React from 'react'

const block = require('./timer.css')

interface Prop {
	time: number
}

export default class Timer extends React.Component<Prop, any> {
	render() {
		return (
			<div className={block.timer}>Timer: {this.props.time}</div>
		)
	}
}
