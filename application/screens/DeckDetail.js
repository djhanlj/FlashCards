import React, { Component } from 'react'
import { View, Text, StyleSheet } from 'react-native'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'
import { Button } from 'react-native-elements'
import { dodgerblue, seagreen } from '@utils/colors'

class DeckDetail extends Component {
	static navigationOptions = ({ navigation }) => {
		const { title } = navigation.state.params
		return {
			title
		}
	}

	render() {
		const { navigation } = this.props
		const { deck } = this.props
		const { title, questions } = deck
		return (
			<View style={styles.container}>
				{deck ? (
					<View>
						<View style={styles.text}>
							<Text>Deck {title} </Text>
							<Text>
								{questions && questions.length > 0
									? questions.length
									: 0}{' '}
								Cartões{' '}
							</Text>
						</View>
						<View>
							<View style={{ marginTop: 15 }}>
								<Button
									large
									backgroundColor={seagreen}
									title="Iniciar Quiz"
									onPress={() =>
										navigation.navigate('Quiz', { deck })
									}
								/>
							</View>
							<View style={{ marginTop: 15 }}>
								<Button
									large
									backgroundColor={dodgerblue}
									title="Add Card"
									onPress={() =>
										navigation.navigate('NewCard', { deck })
									}
								/>
							</View>
						</View>
					</View>
				) : null}
			</View>
		)
	}
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		justifyContent: 'center'
	},
	text: {
		alignItems: 'center'
	}
})

function mapStateToProps(decks, { navigation }) {
	const { title } = navigation.state.params
	const decksArray = Object.keys(decks).map(i => decks[i])

	return {
		deck: decksArray.find(d => d.title === title)
	}
}

export default connect(mapStateToProps)(DeckDetail)

DeckDetail.propTypes = {
	navigation: PropTypes.object.isRequired,
	deck: PropTypes.object.isRequired
}
