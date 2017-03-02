import * as React from 'react'
import {setupRedux, MyStore, connect} from '../utils/reduxUtils'
import { Provider } from 'react-redux'

import {AppState} from '../state/app-state'
import appActions from '../actions/app-actions'

interface Props {
	appActions?: typeof appActions
}

const block = require('./app.css')

@connect(
	(state: AppState) => {
		return {

		}
	}, {appActions}
)
export class App extends React.Component<Props, any> {
	componentWillMount() {
		this.props.appActions.getNewBoard(40, 40)
	}

	render() {
		return (
			<div className={block.container}>Text here</div>
		)
	}
}

export default class AppProvider extends React.Component<Props, void> {
	store: MyStore

	constructor(props: Props, context: any) {
		super(props, context)

		this.store = setupRedux({
		} as AppState)
	}

	render() {
		return (
			<Provider store={ this.store }>
				<App { ...this.props } />
			</Provider>
		)
	}
}
