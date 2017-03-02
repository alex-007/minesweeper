import 'babel-polyfill'
import * as React from 'react'
import * as ReactDOM from 'react-dom'
import App from './containers/app'

function runApp() {
	let reactApp = document.createElement('div')
	reactApp.id = 'react-app'
	document.body.appendChild(reactApp)

	render(reactApp)
}

export function render(reactApp: HTMLElement) {
	ReactDOM.render(
		React.createElement(App),
		reactApp
	)
}

document.addEventListener('DOMContentLoaded', () => runApp())
