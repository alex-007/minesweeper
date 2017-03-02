import {Store, Dispatch} from 'redux'
import {createStore} from './createStore'
import {connect as reduxConnect} from 'react-redux'

import {AppState, defaultState} from '../state/app-state'
import {rootReducer} from '../reducers'

import {bindActionCreators} from 'redux'

export type GetState = () => AppState

export type MyStore = Store<AppState>
export type MyDispatch = Dispatch<AppState>

/**
 * usage:
 * @connect(mapStateToProps?, {usersActions})
 * class MyComponent {
 *  ...
 * }
 *  it creates bound actions creators in props.usersActions.*
 *
 *  somewhere in component:
 *   ...
 *   this.props.usersActions.doSomething()
 *   ...
 *
 */

type ActionCreatorsMap = Map<{}, Function>

//keyed by creators map only, since on client there is only one dispatcher
const boundCreators: WeakMap<MyDispatch, ActionCreatorsMap> = new WeakMap()

export function connect(stateToProps?: (state: AppState, props: any) => any, actionCreators?: any) {
	return (target: any) => reduxConnect(stateToProps, (dispatch: MyDispatch) => {
		const res = {} as any
		for (const key in actionCreators) {
			let dispatchMap = boundCreators.get(dispatch)
			if (!dispatchMap) {
				dispatchMap = new Map()
				boundCreators.set(dispatch, dispatchMap)
			}
			const saved = dispatchMap.get(actionCreators[key]) as any
			if (saved) {
				res[key] = saved
			} else {
				res[key] = bindActionCreators(actionCreators[key], dispatch)
				dispatchMap.set(actionCreators[key], res[key])
			}
		}
		return res
	})(target)
}

export function setupRedux(initialState: AppState): Store<AppState> {
	return createStore<AppState>(rootReducer, defaultState(initialState))
}
