import React, { Component } from 'react'
import { View, Text, StyleSheet } from 'react-native'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'
import Swiper from 'react-native-deck-swiper'
import QuizItemQuestao from '@component/quiz/QuizItemQuestao'
import QuizResult from '@component/quiz/QuizResult'
import { white, gray } from '@utils/colors'
import { setLocalNotification, clearLocalNotification } from '@utils/flashcards'

class Quiz extends Component {
	state = {
		cardIndex: 0,
		endQuiz: false,
		answerCorrect: 0
	}

	static navigationOptions = ({ navigation }) => {
		const { deck } = navigation.state.params
		return {
			title: `Quiz do ${deck.title}`
		}
	}

	answerQuestion = resposta => {
		const { cardIndex } = this.state
		const { questions } = this.props.deck

		if (resposta === 'correta') {
			this.setState(state => ({
				answerCorrect: state.answerCorrect + 1
			}))
		}

		/**
		 * Método do Component Swiper que faz o Card deslisar para a esquerda
		 */

		setTimeout(() => {
			this.swiper.swipeLeft()
			if (cardIndex + 1 >= questions.length) {
				this.setState({ endQuiz: true })
				clearLocalNotification().then(setLocalNotification)
			}
		}, 1000)
	}

	handleCardIndex = cardIndex => {
		const { questions } = this.props.deck

		if (cardIndex + 1 < questions.length) {
			this.setState(state => ({
				cardIndex: state.cardIndex + 1
			}))
		}
	}

	keyExtractor = question => question.id

	restarQuiz = () => {
		this.setState({
			cardIndex: 0,
			endQuiz: false,
			answerCorrect: 0
		})
	}

	returnDetail = () => {
		const { navigation } = this.props
		navigation.goBack()
	}

	render() {
		const { cardIndex, endQuiz, answerCorrect } = this.state
		const { questions } = this.props.deck

		return (
			<View style={styles.container}>
				{endQuiz === false && questions.length > 0 ? (
					<Swiper
						ref={swiper => {
							this.swiper = swiper
						}}
						cards={questions}
						renderCard={(questao, cardIndex) => (
							<QuizItemQuestao
								key={cardIndex}
								questao={questao}
								answerQuestion={this.answerQuestion}
							/>
						)}
						keyExtractor={questao => questao.id}
						onSwiped={this.handleCardIndex}
						disableLeftSwipe={true}
						disableRightSwipe={true}
						verticalSwipe={false}
						cardIndex={cardIndex}
						stackSize={3}
						backgroundColor={white}
					>
						<View style={styles.header}>
							<Text style={styles.title}>
								Pergunta {cardIndex + 1} de {questions.length}
							</Text>
						</View>
					</Swiper>
				) : (
					<QuizResult
						quantidade={questions.length}
						acertos={answerCorrect}
						restarQuiz={this.restarQuiz}
						returnDetail={this.returnDetail}
					/>
				)}
			</View>
		)
	}
}

function mapStateToProps(decks, { navigation }) {
	const { deck } = navigation.state.params
	return {
		deck
	}
}

export default connect(mapStateToProps)(Quiz)

const styles = StyleSheet.create({
	container: {
		flex: 1
	},
	header: {
		borderWidth: 1,
		borderRadius: 1,
		borderColor: '#ddd',
		shadowOpacity: 0.75,
		shadowRadius: 5,
		shadowColor: 'red',
		shadowOffset: { height: 0, width: 0 },
		padding: 10
	},
	title: {
		textAlign: 'left',
		fontSize: 20,
		color: gray
	}
})

Quiz.propTypes = {
	navigation: PropTypes.object.isRequired,
	deck: PropTypes.object.isRequired
}
