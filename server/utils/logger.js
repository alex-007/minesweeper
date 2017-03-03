'use strict';

import bunyan from 'bunyan'

let instance

module.exports = function create(options) {
	if (instance) {
		return instance
	}

	options = Object.assign({}, options, {
		serializers: bunyan.stdSerializers,
		stream: process.stdout
	})

	instance = bunyan.createLogger(options)

	return instance
}
