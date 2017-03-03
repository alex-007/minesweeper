'use strict';

const Router = require('express').Router;
import myLogger from './logger'

// Recursive hash-map of routes
// See original at: https://github.com/visionmedia/express/blob/master/examples/route-map/index.js
function map(app, route, config) {
	if (config === void 0) {
		config = route;
		route = '';
	}

	Object.keys(config).forEach(function (key) {
		const object = config[key];
		if (typeof object === 'function') {
			// get: function (req, res, next) { ... }
			app[key](route, object);
		} else {
			// '/path': { get: function() {}, post: function() {} }
			map(app, route + key, object);
		}
	});

	return this;
}

module.exports = function create(options) {
	const router = new Router(options);
	const logger = myLogger()

	router.use(function requestLogs(req, res, next) {
		logger.info({
			method: req.method,
			url: req.originalUrl
		})

		req.logger = req.logger || logger
		next()
	});

	// Provide #map()
	router.map = map.bind(router, router);


	return router;
};
