import {AppState} from '../state/app-state'
import {
	GetNewBoardAction, GetNewBoardPayload,
	Actions as AppActions
} from '../actions/app-actions'
import {ActionStatus} from '../actions/actions'

function getNewBoard(state: AppState, action: GetNewBoardAction) {
	const payload = action.payload as GetNewBoardPayload
	let {width, height, board} = state

	switch (payload.status) {
		case ActionStatus.Started:
			//TODO: set is loading
			break

		case ActionStatus.Completed:
			let line
			let fields = []
			for (let y = 0; y < height; ++y) {
				line = []
				for (let x = 0; x < width; ++x) {

					line.push({x, y, state: ''})
				}
				fields.push(line)
			}
			board = {fields}
			break

		case ActionStatus.Failed:
			//TODO: set is not loading and show the error
			break
	}

	return Object.assign({}, state, {
		board
	})
}

export default {
	[AppActions.GetNewBoard]: getNewBoard
}
