import path from 'path'
import {Server} from 'http'
import Express from 'express'
import webpack from 'webpack'
import Session from 'express-session'
import webpackConfig from '../webpack.config'
import bodyParser from 'body-parser'

//import board from 'board'

const app = new Express()
const compiler = webpack(webpackConfig)

const server = new Server(app)

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))
app.use(require('webpack-dev-middleware')(compiler, {
	publicPath: webpackConfig.output.publicPath
}))

app.use(require('webpack-hot-middleware')(compiler))

app.use(Express.static(path.join(__dirname, '../public')))
app.use(Session({secret:'XASDASDA'}));

app.get('/getNewBoard', function (req, res) {
	const session = req.session;

	return res.sendFile(path.join(__dirname, '../view', 'index.html'))
})

app.get('/', function (req, res) {
	return res.sendFile(path.join(__dirname, '../view', 'index.html'))
})

const port = process.env.PORT || 3000
const env = process.env.NODE_ENV || 'production'
server.listen(port, err => {
	if (err) {
		return console.error(err)
	}
	console.info(`Server running on http://localhost:${port} [${env}]`)
})
