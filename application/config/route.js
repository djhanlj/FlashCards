import React from 'react'
import { StatusBar, View } from 'react-native'
import {
	createMaterialTopTabNavigator,
	createStackNavigator,
	createAppContainer
} from 'react-navigation'
import PropTypes from 'prop-types'
import { Constants } from 'expo'
import Home from '@screens/home'
import DeckNew from '@screens/deck/DeckNew'
import DeckDetail from '@screens/deck/DeckDetail'
import CardNew from '@screens/card/CardNew'
import Quiz from '@screens/quiz/Quiz'
import { white, primaryMenu } from '@utils/colors'

const Tabs = createMaterialTopTabNavigator(
	{
		Deck: {
			screen: Home,
			navigationOptions: {
				tabBarLabel: 'List Deck'
			}
		},
		DeckNew: {
			screen: DeckNew,
			navigationOptions: {
				tabBarLabel: 'New Deck'
			}
		}
	},
	{
		navigationOptions: {
			header: null
		},
		tabBarOptions: {
			activeTintColor: white,
			style: {
				height: 56,
				backgroundColor: primaryMenu,
				shadowColor: 'rgba(0, 0, 0, 0.24)',
				shadowOffset: {
					width: 0,
					height: 3
				},
				shadowRadius: 6,
				shadowOpacity: 1
			},
			indicatorStyle: {
				backgroundColor: white
			}
		}
	}
)

const MainNavigator = createStackNavigator({
	Home: {
		screen: Tabs,
		navigationOptions: {
			header: null
		}
	},
	DeckDetail: {
		screen: DeckDetail,
		navigationOptions: {
			headerTintColor: white,
			headerStyle: {
				backgroundColor: primaryMenu
			}
		}
	},
	CardNew: {
		screen: CardNew,
		navigationOptions: {
			headerTintColor: white,
			headerStyle: {
				backgroundColor: primaryMenu
			}
		}
	},
	Quiz: {
		screen: Quiz,
		navigationOptions: {
			headerTintColor: white,
			headerStyle: {
				backgroundColor: primaryMenu
			}
		}
	}
})

export const RouteStatusBar = ({ backgroundColor, ...props }) => {
	return (
		<View style={{ backgroundColor, height: Constants.statusBarHeight }}>
			<StatusBar
				translucent
				backgroundColor={backgroundColor}
				{...props}
			/>
		</View>
	)
}

export const Route = createAppContainer(MainNavigator)

RouteStatusBar.propTypes = {
	backgroundColor: PropTypes.string.isRequired
}
