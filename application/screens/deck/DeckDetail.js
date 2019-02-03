import React, { Component } from 'react'
import { View, Text, StyleSheet } from 'react-native'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'
import { Button } from 'react-native-paper'
import { info, primary, red, gray } from '@utils/colors'

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
										onPress={() =>
											console.log('remover deck')
										}
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

export default connect(mapStateToProps)(DeckDetail)

DeckDetail.propTypes = {
	navigation: PropTypes.object.isRequired,
	deck: PropTypes.object.isRequired
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
