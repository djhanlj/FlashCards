import React, { Component } from 'react'
import {
	StyleSheet,
	Text,
	View,
	TouchableOpacity,
	Button,
	Animated
} from 'react-native'
import PropTypes from 'prop-types'
import { white, gray } from '@utils/colors'

export default class Questao extends Component {
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
	}

	handleButtonCorrect() {
		console.log('component questao')
		const { handleResposta } = this.props
		handleResposta()
	}

	render() {
		const frontAnimatedStyle = {
			transform: [{ rotateY: this.frontInterpolate }]
		}
		const backAnimatedStyle = {
			transform: [{ rotateY: this.backInterpolate }]
		}
		const { questao } = this.props
		return (
			<View>
				<Animated.View
					style={[
						styles.card,
						frontAnimatedStyle,
						{ opacity: this.frontOpacity }
					]}
				>
					<View style={styles.positionText}>
						<Text style={styles.text}>{questao.question}</Text>
					</View>
					<View style={styles.positionText}>
						<TouchableOpacity onPress={() => this.flipCard()}>
							<Text>Answer!</Text>
						</TouchableOpacity>
					</View>
				</Animated.View>

				<Animated.View
					style={[
						styles.card,
						styles.flipCardBack,
						backAnimatedStyle,
						{ opacity: this.backOpacity }
					]}
				>
					<View style={styles.positionText}>
						<Text style={styles.text}>{questao.answer}</Text>
					</View>
					<View style={styles.positionText}>
						<TouchableOpacity onPress={() => this.flipCard()}>
							<Text>Question!</Text>
						</TouchableOpacity>
					</View>

					<View style={styles.positionText}>
						<TouchableOpacity
							onPress={() => this.handleButtonCorrect()}
						>
							<Text style={styles.testeText}>Teste!</Text>
						</TouchableOpacity>
					</View>
				</Animated.View>
			</View>
		)
	}
}

Questao.propTypes = {
	questao: PropTypes.object.isRequired,
	handleResposta: PropTypes.func.isRequired
}

var styles = StyleSheet.create({
	container: {
		backgroundColor: white
	},
	card: {
		borderWidth: 1,
		borderRadius: 1,
		borderColor: gray,
		backgroundColor: white,
		width: 300,
		height: 300,
		padding: 10
	},
	flipCardBack: {
		position: 'absolute',
		top: 0
	},
	positionText: {
		alignItems: 'center'
	},
	text: {
		fontSize: 20,
		fontWeight: 'bold',
		padding: 30
	},
	testeText: {
		fontSize: 20,
		fontWeight: 'bold',
		padding: 10
	}
})
