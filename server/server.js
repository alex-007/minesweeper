'use strict';

import path from 'path'
import {Server} from 'http'
import Express from 'express'
import webpack from 'webpack'
import expressSession from 'express-session'
import webpackConfig from '../webpack.config'
import bodyParser from 'body-parser'
import myRouter from './utils/router'
import routes from './utils/routes'
import logger from './utils/logger'

const port = process.env.PORT || 3000
const env = process.env.NODE_ENV || 'production'

const app = new Express()
const compiler = webpack(webpackConfig)
const loggerOptions = {
	name: 'minesweeper'
}
if (env !== 'production') {
	loggerOptions.level = 'debug'
}

app.logger = logger(loggerOptions)

const router = myRouter()
const server = new Server(app)

const sessConfig = {
	secret: 'someSecret',
	name: 'sessionId',
	proxy: true,
	resave: true,
	saveUninitialized: true,
	cookie: {
		'name': 'test',
		httpOnly: false,
		secure: false,
		maxAge: ((60 * 1000) * 60)
	}
}

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))
app.use(require('webpack-dev-middleware')(compiler, {
	publicPath: webpackConfig.output.publicPath
}))

app.use(require('webpack-hot-middleware')(compiler))

app.use(Express.static(path.join(__dirname, '../public')))

app.use(expressSession(sessConfig))

router.map(routes)

app.use('/', router)

app.get('/', function (req, res) {
	res.sendFile(path.join(__dirname, '../view', 'index.html'))
})

server.listen(port, err => {
	if (err) {
		return app.logger.error(err)
	}
	app.logger.info(`Server running on http://localhost:${port} [${env}]`)
})
