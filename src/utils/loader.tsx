import {SuperAgent, SuperAgentRequest, Response as SuperAgentResponse} from 'superagent'
import * as superagent from 'superagent'
import {CellState} from '../state/cell-state'

export type Agent = SuperAgent<SuperAgentRequest>

export default class Loader {
	public agent: Agent

	constructor() {
		this.agent = superagent.agent
			? superagent.agent()
			: superagent
	}

	send(req: SuperAgentRequest): Promise<SuperAgentResponse> {
		req.timeout(20 * 1000)

		return new Promise((resolve, reject) => {
			req.end((err, res) => {
				err = err || res.error
				if (err) {
					if (res.body.error) {
						err.message = res.body.error
					}
					reject(err)
				} else {
					resolve(res)
				}
			})
		})
	}

	getNewBoard(width: number, height: number, mines: number, forceInit: boolean) {
		let req = this.agent
			.get(`/getNewBoard/`)
			.query({
				width, height, mines,
				forceInit: forceInit ? 1 : 0
			})
			.withCredentials()
			.type('json')

		return this.send(req).then(res => res.body as CellState[])
	}

	getCellsState(x: number, y: number) {
		let req = this.agent
			.get(`/getCellsState/`)
			.query({
				x, y
			})
			.withCredentials()
			.type('json')

		return this.send(req).then(res => res.body as CellState[])
	}

	setCellUserMark(x: number, y: number, userMark: string) {
		let req = this.agent
			.get(`/setCellUserMark/`)
			.query({
				x, y, userMark
			})
			.withCredentials()
			.type('json')

		return this.send(req).then(res => res.body as CellState)
	}
}
