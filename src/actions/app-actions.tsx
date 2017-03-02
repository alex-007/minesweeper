import {Action, ActionStatus} from './actions'
import {MyDispatch} from '../utils/reduxUtils'
import Loader from '../utils/loader'

export const Actions = {
	GetNewBoard: 'GetNewBoard',
	GetFieldState: 'GetFieldState'
}

export type GetNewBoardPayload = {
	status: ActionStatus
}

export type GetNewBoardAction = Action<GetNewBoardPayload>

function getNewBoard(width: number, height: number) {
	return (dispatch: MyDispatch) => {
		let loader = new Loader()

		dispatch({
			type: Actions.GetNewBoard,
			payload: {
				status: ActionStatus.Started
			}
		} as GetNewBoardAction)

		loader.getNewBoard(width, height)
			.catch((err) => {
				dispatch({
					type: Actions.GetNewBoard,
					payload: {
						status: ActionStatus.Failed
					}
				} as GetNewBoardAction)
				throw err
			})
			.then(() => {
				dispatch({
					type: Actions.GetNewBoard,
					payload: {
						status: ActionStatus.Completed
					}
				} as GetNewBoardAction)
			})
	}
}

export type GetFieldStatePayload = {
	status: ActionStatus
	fieldState?: string
}

export type GetFieldStateAction = Action<GetFieldStatePayload>

function getFieldState(x: number, y: number) {
	return (dispatch: MyDispatch) => {
		let loader = new Loader()

		dispatch({
			type: Actions.GetFieldState,
			payload: {
				status: ActionStatus.Started
			}
		} as GetFieldStateAction)

		loader.getFieldState(x, y)
			.catch((err) => {
				dispatch({
					type: Actions.GetFieldState,
					payload: {
						status: ActionStatus.Failed
					}
				} as GetFieldStateAction)
				throw err
			})
			.then(fieldState => {
				dispatch({
					type: Actions.GetFieldState,
					payload: {
						status: ActionStatus.Completed,
						fieldState: fieldState as string
					}
				} as GetFieldStateAction)
			})
	}
}

export default {
	getNewBoard,
	getFieldState
}
