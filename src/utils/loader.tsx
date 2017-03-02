import {SuperAgent, SuperAgentRequest, Response as SuperAgentResponse} from 'superagent'
import * as superagent from 'superagent'

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

		// this.logger.trace({ data: req }, 'Request started')

		return new Promise((resolve, reject) => {
			req.end((err, res) => {
				err = err || res.error
				if (err) {
					err.response = res
					reject(err)
				} else {
					resolve(res)
				}
			})
		})
			.then(res => {
				// this.logger.trace({ data: res }, 'Request completed')
				return res
			})
			.catch(e => {
				// this.logger.error(e)
				throw e
			})
	}

	getNewBoard(width: number, height: number) {
		let req = this.agent
			.get(`/getNewBoard/`)
			.query({
				width, height
			})
			.withCredentials()
			.type('json')

		return this.send(req)
	}

	getFieldState(x: number, y: number) {
		let req = this.agent
			.get(`/getFieldState/`)
			.query({
				x, y
			})
			.withCredentials()
			.type('json')

		return this.send(req).then(res => res.body)
	}
}
