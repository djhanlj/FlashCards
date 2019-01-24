import React from 'react'
import { StatusBar, View } from 'react-native'
import {
	createMaterialTopTabNavigator,
	createStackNavigator,
	createAppContainer
} from 'react-navigation'
import PropTypes from 'prop-types'
import { Constants } from 'expo'
import Deck from '@screens/Deck'
import DeckDetail from '@screens/DeckDetail'
import NewDeck from '@screens/NewDeck'
import NewCard from '@screens/NewCard'
import { white, blue } from '@utils/colors'

const Tabs = createMaterialTopTabNavigator(
	{
		Deck: {
			screen: Deck,
			navigationOptions: {
				tabBarLabel: 'Deck'
			}
		},
		NewDeck: {
			screen: NewDeck,
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
				backgroundColor: blue,
				shadowColor: 'rgba(0, 0, 0, 0.24)',
				shadowOffset: {
					width: 0,
					height: 3
				},
				shadowRadius: 6,
				shadowOpacity: 1
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
				backgroundColor: blue
			}
		}
	},
	NewCard: {
		screen: NewCard,
		navigationOptions: {
			headerTintColor: white,
			headerStyle: {
				backgroundColor: blue
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
