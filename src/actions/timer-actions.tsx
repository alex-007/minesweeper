import {Action} from './actions'
import {MyDispatch} from '../utils/reduxUtils'
import {AppState} from '../state/app-state'

export const Actions = {
	StartTimer: 'StartTimer',
	StopTimer: 'StopTimer',
	TimerTick: 'TimerTick',
	ResetTimer: 'ResetTimer'
}

export type StartTimerPayload = {
	callBack: Function
}

export type StartTimerAction = Action<StartTimerPayload>

function startTimer(callBack: Function) {
	return (dispatch: MyDispatch, getState: () => AppState) => {
		const state = getState()
		const timer = state.timer

		if (timer) {
			stopTimer(timer)
		}

		dispatch({
			type: Actions.StartTimer,
			payload: {
				callBack
			}
		} as StartTimerAction)
	}
}

export type StopTimerPayload = {
	timer: number
}

export type StopTimerAction = Action<StopTimerPayload>

function stopTimer(timer: number) {
	return {
		type: Actions.StopTimer,
		payload: {
			timer
		}
	} as StopTimerAction
}

export type TimerTickAction = Action<{}>

function timerTick() {
	return {
		type: Actions.TimerTick
	} as TimerTickAction
}

export type ResetTimerAction = Action<{}>

function resetTimer() {
	return {
		type: Actions.ResetTimer
	} as ResetTimerAction
}

export default {
	startTimer,
	stopTimer,
	timerTick,
	resetTimer
}
