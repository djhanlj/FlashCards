import React from 'react'
import { KeyboardAvoidingView, StyleSheet, ScrollView } from 'react-native'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { updateDeckerCards } from '@actions'
import CardForm from '@component/card/CardForm'
import { addCardToDeck } from '@api/api'
import { estruturaQuestao, removeSpaces } from '@utils/flashcards'

class CardNew extends React.Component {
	static navigationOptions = () => ({
		title: 'Add Card'
	})

	state = {
		questao: '',
		resposta: ''
	}

	handleTextChange = name => {
		return text => {
			this.setState({ [name]: text })
		}
	}

	submit = () => {
		const { questao, resposta } = this.state
		const { deck } = this.props
		const titleDeck = removeSpaces(deck.title)

		/**
		 * AsyncStorage Save Card to Deck
		 */
		const questions = estruturaQuestao(questao, resposta)
		deck.questions = [...deck.questions, questions]
		addCardToDeck(titleDeck, deck)

		/**
		 * Action
		 */
		updateDeckerCards(titleDeck, questions)

		/**
		 * Open DeckDetail
		 */
		this.setState({ questao: '', resposta: '' })
		this.openDeckDetail(deck.title)
	}

	openDeckDetail = title => {
		const { navigation } = this.props
		navigation.navigate('DeckDetail', { title })
	}

	render() {
		const { questao, resposta } = this.state

		return (
			<ScrollView style={styles.container}>
				<KeyboardAvoidingView
					keyboardVerticalOffset={300}
					behavior="padding"
					enabled
				>
					<CardForm
						questao={questao}
						resposta={resposta}
						titleForm="Adicione uma nova Pergunta Para o Quiz"
						handleTextChange={this.handleTextChange}
						submit={this.submit}
					/>
				</KeyboardAvoidingView>
			</ScrollView>
		)
	}
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		marginTop: 25,
		marginLeft: 10,
		marginRight: 10
	}
})

function mapStateToProps(decks, { navigation }) {
	const { deck } = navigation.state.params
	return {
		deck
	}
}

function mapDispatchToProps(dispatch) {
	return {
		updateDeckerCards: (title, deck) =>
			dispatch(updateDeckerCards(title, deck))
	}
}

export default connect(
	mapStateToProps,
	mapDispatchToProps
)(CardNew)

CardNew.propTypes = {
	navigation: PropTypes.object.isRequired,
	deck: PropTypes.object.isRequired
}
