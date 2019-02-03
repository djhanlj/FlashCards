import React, { Component } from 'react'
import { View, Text, StyleSheet } from 'react-native'
import { connect } from 'react-redux'
import { handleInitialData } from '@actions'
import PropTypes from 'prop-types'
import { Button } from 'react-native-paper'
import { info, primary, red, gray } from '@utils/colors'
import { removeDeck } from '@api/api'

class DeckDetail extends Component {
	static navigationOptions = ({ navigation }) => {
		const { title } = navigation.state.params
		return {
			title
		}
	}

	removeDeck = title => {
		const { loadData } = this.props
		setTimeout(() => {
			removeDeck(title)
		}, 1000)

		//loadData()
		this.toHome()
	}

	toHome = () => {
		const { navigation } = this.props
		navigation.navigate('Home')
	}

	render() {
		const { navigation, deck } = this.props
		const { title, questions } = deck
		return (
			<View style={styles.container}>
				{deck ? (
					<View>
						<View style={styles.alignView}>
							<Text style={styles.text}>Deck {title} </Text>
							<Text style={styles.text}>
								{questions && questions.length > 0
									? questions.length
									: 0}{' '}
								Cartões{' '}
							</Text>
						</View>
						<View>
							{questions && questions.length > 0 && (
								<View style={styles.alignButton}>
									<Button
										icon="question-answer"
										mode="contained"
										style={styles.colorButtonQuiz}
										onPress={() =>
											navigation.navigate('Quiz', {
												deck
											})
										}
									>
										Iniciar Quiz
									</Button>
								</View>
							)}
							<View style={styles.alignButton}>
								<Button
									icon="add-box"
									mode="contained"
									style={styles.colorButtonNewCard}
									onPress={() =>
										navigation.navigate('CardNew', { deck })
									}
								>
									Adicionar Cartão
								</Button>

								<View style={styles.alignButton}>
									<Button
										icon="clear"
										mode="contained"
										style={styles.colorButtonRemoveDeck}
										onPress={() => this.removeDeck(title)}
									>
										Remover Deck
									</Button>
								</View>
							</View>
						</View>
					</View>
				) : null}
			</View>
		)
	}
}

function mapStateToProps(decks, { navigation }) {
	const { title } = navigation.state.params
	const decksArray = Object.keys(decks).map(i => decks[i])

	return {
		deck: decksArray.find(d => d.title === title)
	}
}

function mapDispatchToProps(dispatch) {
	return {
		loadData: () => dispatch(handleInitialData())
	}
}

export default connect(
	mapStateToProps,
	mapDispatchToProps
)(DeckDetail)

DeckDetail.propTypes = {
	navigation: PropTypes.object.isRequired,
	deck: PropTypes.object.isRequired,
	loadData: PropTypes.func.isRequired
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		marginLeft: 10,
		marginRight: 10,
		justifyContent: 'center'
	},
	alignView: {
		alignItems: 'center'
	},
	text: {
		alignItems: 'center',
		fontSize: 25,
		color: gray
	},
	colorButtonQuiz: {
		backgroundColor: primary
	},
	colorButtonNewCard: {
		backgroundColor: info
	},

	colorButtonRemoveDeck: {
		backgroundColor: red
	},

	alignButton: {
		marginTop: 15
	}
})
