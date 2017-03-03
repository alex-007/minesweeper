import {AppState} from '../state/app-state'
import {
	StartTimerAction, StartTimerPayload,
	StopTimerAction, StopTimerPayload,
	Actions as TimerActions
} from '../actions/timer-actions'

function startTimer(state: AppState, action: StartTimerAction) {
	const payload = action.payload as StartTimerPayload

	const timer = setInterval(payload.callBack, 1000)

	return Object.assign({}, state, {
		timer,
		time: 0
	})
}

function stopTimer(state: AppState, action: StopTimerAction) {
	const payload = action.payload as StopTimerPayload

	clearInterval(payload.timer)

	return Object.assign({}, state, {
		timer: 0
	})
}

function tick(state: AppState) {
	return Object.assign({}, state, {
		time: state.time + 1
	})
}

function resetTimer(state: AppState) {
	return Object.assign({}, state, {
		time: 0
	})
}

export default {
	[TimerActions.StartTimer]: startTimer,
	[TimerActions.StopTimer]: stopTimer,
	[TimerActions.TimerTick]: tick,
	[TimerActions.ResetTimer]: resetTimer
}
