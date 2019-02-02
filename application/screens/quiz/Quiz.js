import React, { Component } from 'react'
import { View, StyleSheet } from 'react-native'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'
import Swiper from 'react-native-deck-swiper'
import FlipCard from '@component/flipCard'
import { white } from '@utils/colors'

class Quiz extends Component {
	state = {
		cardIndex: 0
	}

	static navigationOptions = () => {
		return {
			title: 'Quiz'
		}
	}

	handleResposta = () => {
		this.swiper.swipeLeft()
		console.log('click do botão')
	}

	keyExtractor = question => question.id

	render() {
		const { deck } = this.props
		const { title, questions } = deck
		return (
			<View style={styles.container}>
				<Swiper
					ref={swiper => {
						this.swiper = swiper
					}}
					cards={questions}
					renderCard={questao => (
						<FlipCard
							questao={questao}
							handleResposta={this.handleResposta}
						/>
					)}
					keyExtractor={question => question.question}
					onSwiped={cardIndex => {
						console.log(cardIndex)
					}}
					disableLeftSwipe={true}
					disableRightSwipe={true}
					verticalSwipe={false}
					cardIndex={0}
					stackSize={3}
					backgroundColor={white}
				/>
			</View>
		)
	}
}

const styles = StyleSheet.create({
	container: {
		flex: 1
	}
})
function mapStateToProps(decks, { navigation }) {
	const { deck } = navigation.state.params
	return {
		deck
	}
}

export default connect(mapStateToProps)(Quiz)

Quiz.propTypes = {
	navigation: PropTypes.object.isRequired
}
