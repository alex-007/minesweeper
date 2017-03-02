export { Provider } from 'react-redux'
import thunk from 'redux-thunk'
import {
	compose,
	createStore as createStore_,
	applyMiddleware,
	Store
} from 'redux'
let prevState: any = null
const logger = (store: any) => (next: any) => (action: any) => {
	console.log('dispatching', action)
	let result = next(action)
	let state = store.getState()
	console.debug('next state', state)
	prevState = state
	return result
}

export function createStore<S>(reducer: any, initialState: S): Store<S> {
	const finalCreateStore = compose(
		applyMiddleware(thunk, logger)
	)(createStore_)
	let store = finalCreateStore(
		reducer,
		initialState
	)
	return store
}
