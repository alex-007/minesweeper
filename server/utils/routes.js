'use strict';
import board from '../board'

module.exports = {
	'/getNewBoard': {
		get: function(req, res) {
			const session = req.session;

			const ret = board.generateBoard(session,
				parseInt(req.query.width),
				parseInt(req.query.height),
				parseInt(req.query.mines),
				parseInt(req.query.forceInit)
			)

			res.json(ret)
		}
	},

	'/getCellsState': {
		get: function (req, res) {
			const session = req.session;

			const ret = board.getCellsState(
				session,
				parseInt(req.query.x),
				parseInt(req.query.y)
			)

			if (ret.error) {
				res.status(400).send({ error: ret.error });
			} else {
				res.json(ret)
			}
		}
	},

	'/setCellUserMark': {
		get: function (req, res) {
			const session = req.session;

			const ret = board.setCellUserMark(
				session,
				parseInt(req.query.x),
				parseInt(req.query.y),
				req.query.userMark
			)

			if (ret.error) {
				res.status(400).send({ error: ret.error });
			} else {
				res.json(ret)
			}
			res.json(ret)
		}
	}
}
