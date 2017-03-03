import {Action, ActionStatus} from './actions'
import {MyDispatch} from '../utils/reduxUtils'
import Loader from '../utils/loader'
import {Point, CellState} from '../state/cell-state'

export const Actions = {
	GetNewBoard: 'GetNewBoard',
	GetCellState: 'GetCellState',
	SetCellUserMark: 'SetCellUserMark'
}

export type GetNewBoardPayload = {
	status: ActionStatus,
	cellsState?: CellState[]
}

export type GetNewBoardAction = Action<GetNewBoardPayload>

function getNewBoard(width: number, height: number, mines: number, forceInit: boolean) {
	return (dispatch: MyDispatch) => {
		let loader = new Loader()

		dispatch({
			type: Actions.GetNewBoard,
			payload: {
				status: ActionStatus.Started
			}
		} as GetNewBoardAction)

		loader.getNewBoard(width, height, mines, forceInit)
			.catch((err) => {
				dispatch({
					type: Actions.GetNewBoard,
					payload: {
						status: ActionStatus.Failed,
						message: err
					}
				} as GetNewBoardAction)
				throw err
			})
			.then(cellsState => {
				dispatch({
					type: Actions.GetNewBoard,
					payload: {
						status: ActionStatus.Completed,
						cellsState
					}
				} as GetNewBoardAction)
			})
	}
}

export type GetCellStatePayload = {
	status: ActionStatus
	cellsState?: CellState[]
}

export type GetCellStateAction = Action<GetCellStatePayload>

function getCellState(point: Point) {
	return (dispatch: MyDispatch) => {
		let loader = new Loader()

		dispatch({
			type: Actions.GetCellState,
			payload: {
				status: ActionStatus.Started
			}
		} as GetCellStateAction)

		loader.getCellsState(point.x, point.y)
			.catch((err) => {
				dispatch({
					type: Actions.GetCellState,
					payload: {
						status: ActionStatus.Failed,
						message: err
					}
				} as GetCellStateAction)
				throw err
			})
			.then(cellsState => {
				dispatch({
					type: Actions.GetCellState,
					payload: {
						status: ActionStatus.Completed,
						cellsState
					}
				} as GetCellStateAction)
			})
	}
}

export type SetCellUserMarkPayload = {
	status: ActionStatus
	cellState?: CellState
}

export type SetCellUserMarkAction = Action<SetCellUserMarkPayload>

function setCellUserMark(point: Point, userMark: string) {
	return (dispatch: MyDispatch) => {
		let loader = new Loader()

		dispatch({
			type: Actions.SetCellUserMark,
			payload: {
				status: ActionStatus.Started
			}
		} as SetCellUserMarkAction)

		loader.setCellUserMark(point.x, point.y, userMark)
			.catch((err) => {
				dispatch({
					type: Actions.SetCellUserMark,
					payload: {
						status: ActionStatus.Failed,
						message: err
					}
				} as SetCellUserMarkAction)
				throw err
			})
			.then(cellState => {
				dispatch({
					type: Actions.SetCellUserMark,
					payload: {
						status: ActionStatus.Completed,
						cellState
					}
				} as SetCellUserMarkAction)
			})
	}
}

export default {
	getNewBoard,
	getCellState,
	setCellUserMark
}
