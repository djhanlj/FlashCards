import React, { Component } from 'react'
import { StyleSheet, View } from 'react-native'
import { Route, RouteStatusBar } from './config/route'
import { lightPurp } from '@utils/colors'
import { createStore, applyMiddleware, compose } from 'redux'
import { Provider } from 'react-redux'
import thunk from 'redux-thunk'
import reducer from './reducers'
import { Provider as PaperProvider } from 'react-native-paper'

class App extends Component {
	render() {
		const composeEnhancers =
			window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose
		const store = createStore(
			reducer,
			composeEnhancers(applyMiddleware(thunk))
		)

		return (
			<Provider store={store}>
				<View style={styles.container}>
					<RouteStatusBar
						backgroundColor={lightPurp}
						barStyle="light-content"
					/>
					<PaperProvider>
						<Route />
					</PaperProvider>
				</View>
			</Provider>
		)
	}
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: '#fff'
	}
})

export default App
