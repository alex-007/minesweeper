import {Action} from '../actions/actions'
import {AppState} from '../state/app-state'
import appReducer from './app-reducer'
import timerReducer from './timer-reducer'

const reducersMap = Object.assign({},
	appReducer,
	timerReducer
) as any

export function rootReducer(state: AppState, action: Action<any>): AppState {
	if (reducersMap[action.type]) {
		return reducersMap[action.type](state, action) as AppState
	}
	return state
}
