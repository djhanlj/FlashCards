import React, { Component } from 'react'
import { StyleSheet, Text, View, Animated } from 'react-native'
import PropTypes from 'prop-types'
import { white, red, primary } from '@utils/colors'
import { Button } from 'react-native-paper'
import { Dimensions } from 'react-native'

export default class QuizItemQuestao extends Component {
	constructor(props) {
		super(props)

		this.animatedValue = new Animated.Value(0)
		this.value = 0

		this.animatedValue.addListener(({ value }) => {
			this.value = value
		})
		this.frontInterpolate = this.animatedValue.interpolate({
			inputRange: [0, 180],
			outputRange: ['0deg', '180deg']
		})
		this.backInterpolate = this.animatedValue.interpolate({
			inputRange: [0, 180],
			outputRange: ['180deg', '360deg']
		})
		this.frontOpacity = this.animatedValue.interpolate({
			inputRange: [89, 90],
			outputRange: [1, 0]
		})
		this.backOpacity = this.animatedValue.interpolate({
			inputRange: [89, 90],
			outputRange: [0, 1]
		})
	}

	state = {
		buttonValidate: false
	}

	flipCard() {
		if (this.value >= 90) {
			Animated.spring(this.animatedValue, {
				toValue: 0,
				friction: 8,
				tension: 10
			}).start()
		} else {
			Animated.spring(this.animatedValue, {
				toValue: 180,
				friction: 8,
				tension: 10
			}).start()
		}

		this.setState(state => ({
			buttonValidate: !state.buttonValidate
		}))
	}

	handleButtonCorrect(value) {
		const { answerQuestion } = this.props
		answerQuestion(value)
	}

	render() {
		const frontAnimatedStyle = {
			transform: [{ rotateY: this.frontInterpolate }]
		}
		const backAnimatedStyle = {
			transform: [{ rotateY: this.backInterpolate }]
		}
		const { questao } = this.props
		const { buttonValidate } = this.state

		return (
			<View style={styles.container}>
				<Animated.View
					style={[
						styles.card,
						frontAnimatedStyle,
						{ opacity: this.frontOpacity }
					]}
				>
					<View style={styles.alignView}>
						<View>
							<Text style={styles.text}>{questao.question}</Text>
						</View>

						<View style={{ alignItems: 'flex-end' }}>
							<Button
								icon="flip-to-back"
								mode="text"
								color="#b71845"
								style={styles.colorQuestion}
								onPress={() => this.flipCard()}
							>
								Mostrar resposta
							</Button>
						</View>
					</View>
				</Animated.View>
				{buttonValidate && (
					<Animated.View
						style={[
							styles.card,
							styles.flipCardBack,
							backAnimatedStyle,
							{ opacity: this.backOpacity }
						]}
					>
						<View style={styles.alignView}>
							<View>
								<Text style={styles.text}>
									{questao.answer}
								</Text>
							</View>

							<View style={{ alignItems: 'flex-end' }}>
								<Button
									icon="flip-to-front"
									mode="text"
									color="#b71845"
									style={styles.colorQuestion}
									onPress={() => this.flipCard()}
								>
									Mostrar Questão
								</Button>
							</View>
						</View>

						<View style={styles.alignButton}>
							<View style={{ alignSelf: 'flex-end' }}>
								<Button
									icon="thumb-up"
									mode="contained"
									style={styles.colorCorrect}
									onPress={() =>
										this.handleButtonCorrect('correta')
									}
								>
									Correta
								</Button>
							</View>
							<View style={{ alignSelf: 'flex-end' }}>
								<Button
									icon="thumb-down"
									mode="contained"
									style={styles.colorIncorrect}
									onPress={() => this.handleButtonCorrect()}
								>
									Incorret
								</Button>
							</View>
						</View>
					</Animated.View>
				)}
			</View>
		)
	}
}

QuizItemQuestao.propTypes = {
	questao: PropTypes.object.isRequired,
	answerQuestion: PropTypes.func.isRequired
}

const { width, height } = Dimensions.get('window')
var styles = StyleSheet.create({
	container: {
		backgroundColor: white
	},
	card: {
		borderWidth: 1,
		borderRadius: 1,
		borderColor: '#ddd',
		shadowOpacity: 0.75,
		shadowRadius: 5,
		shadowColor: 'red',
		shadowOffset: { height: 0, width: 0 },
		padding: 10,
		width: width * 0.9,
		height: height * 0.6
	},
	flipCardBack: {
		position: 'absolute',
		top: 0
	},
	alignView: {
		flex: 1,
		alignItems: 'center'
	},
	text: {
		fontSize: 20,
		fontWeight: 'bold',
		padding: 30
	},
	alignButtonFlip: {
		justifyContent: 'space-around'
	},
	alignButton: {
		flex: 1,
		flexDirection: 'row',
		justifyContent: 'space-around'
	},
	colorCorrect: {
		backgroundColor: primary
	},
	colorIncorrect: {
		backgroundColor: red
	},
	colorQuestion: {
		color: '#b71845'
	}
})
