import * as React from 'react'
import {setupRedux, MyStore, connect} from '../utils/reduxUtils'
import { Provider } from 'react-redux'

import autobind from '../utils/autobind'
import {AppState} from '../state/app-state'
import {Point} from '../state/cell-state'
import {Board} from '../components/board'
import Timer from '../components/timer'
import Flags from '../components/flags'
import appActions from '../actions/app-actions'
import timerActions from '../actions/timer-actions'

interface Props extends AppState{
	appActions?: typeof appActions
	timerActions?: typeof timerActions
}

const block = require('./app.css')

@connect(
	(state: AppState) => {
		return state
	}, {appActions, timerActions}
)
export class App extends React.Component<Props, void> {
	componentWillMount() {
		const {width, height, maxMines, appActions} = this.props
		appActions.getNewBoard(width, height, maxMines, false)
	}

	render() {
		const {gameOver, board, cellsLeft, userMarksLeft, time, width} = this.props
		return (
			<div className={block.container} style={{width: width * 22 + 'px'}}>
				<div className={block.info}>
					<Timer time={time} />
					<Flags flagsLeft={userMarksLeft} />
				</div>
				<div className={block.newGame}><button onClick={this.onNewGame}>New Game</button></div>
				<Board onCellClick={this.onCellClick} onCellRightClick={this.onCellRightClick} {... board} />
				{gameOver ? <div className={block.gameOver}>Game Over!</div> : null}
				{cellsLeft ? null : <div className={block.congratulations}>Congratulations!</div>}
			</div>
		)
	}

	@autobind
	onCellClick(point: Point) {
		const {timer, appActions, timerActions, cellsLeft, gameOver} = this.props

		if (!gameOver && cellsLeft) {
			if (!timer) {
				timerActions.startTimer(this.tick)
			}

			appActions.getCellState(point)
		}
	}

	@autobind
	onCellRightClick(point: Point, userMark: string) {
		const {timer, appActions, timerActions, cellsLeft, userMarksLeft, gameOver} = this.props

		if (!gameOver && cellsLeft) {
			if (!timer) {
				timerActions.startTimer(this.tick)
			}

			if (userMarksLeft) {
				appActions.setCellUserMark(point, userMark)
			}
		}
	}

	@autobind
	tick() {
		const {cellsLeft, timer, timerActions, gameOver} = this.props
		if (cellsLeft > 0 && !gameOver){
			timerActions.timerTick()
		} else {
			timerActions.stopTimer(timer)
		}
	}

	@autobind
	onNewGame() {
		const {timer, timerActions} = this.props
		if (timer) {
			timerActions.stopTimer(timer)
		}

		const {width, height, maxMines, appActions} = this.props
		appActions.getNewBoard(width, height, maxMines, true)
	}
}

export default class AppProvider extends React.Component<Props, void> {
	store: MyStore

	constructor(props: Props, context: any) {
		super(props, context)

		this.store = setupRedux({
		} as AppState)
	}

	render() {
		return (
			<Provider store={ this.store }>
				<App { ...this.props } />
			</Provider>
		)
	}
}
