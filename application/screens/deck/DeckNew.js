import React from 'react'
import { KeyboardAvoidingView, StyleSheet } from 'react-native'
import PropTypes from 'prop-types'
import { saveDeckTitle } from '@api/api'
import { connect } from 'react-redux'
import { addDecker } from '@actions'
import DeckForm from '@component/deck/DeckForm'

class DeckNew extends React.Component {
	state = {
		titleDecker: ''
	}

	handleTextChange = titleDecker => this.setState({ titleDecker })

	submit = () => {
		const { titleDecker } = this.state
		const { addDecker } = this.props

		/**
		 * validate if deck name already exists
		 */
		if (this.validateTitleDeck(titleDecker)) {
			/**
			 * AsyncStorage Save Deck
			 */
			saveDeckTitle(titleDecker)

			/**
			 * Action
			 */
			addDecker(titleDecker)

			/**
			 * Open DeckDetail
			 */
			this.setState({ titleDecker: '' })
			this.openDeckDetail(titleDecker)
		} else {
			/**
			 * create alert mensagem
			 */
		}
	}

	validateTitleDeck = title => {
		const { decks } = this.props
		return decks.every(deck => deck.title !== title)
	}

	openDeckDetail = title => {
		const { navigation } = this.props
		navigation.navigate('DeckDetail', { title })
	}

	render() {
		const { titleDecker } = this.state
		return (
			<KeyboardAvoidingView behavior="padding" style={styles.container}>
				<DeckForm
					titleForm="Qual é o título do seu novo baralho?"
					titleDecker={titleDecker}
					handleTextChange={this.handleTextChange}
					submit={this.submit}
				/>
			</KeyboardAvoidingView>
		)
	}
}

function mapStateToProps(decks) {
	const decksArray = Object.keys(decks).map(i => decks[i])
	return {
		decks: decksArray
	}
}

function mapDispatchToProps(dispatch) {
	return {
		addDecker: deck => dispatch(addDecker(deck))
	}
}
export default connect(
	mapStateToProps,
	mapDispatchToProps
)(DeckNew)

const styles = StyleSheet.create({
	container: {
		flex: 1,
		marginTop: 30,
		marginLeft: 10,
		marginRight: 10
	}
})

DeckNew.propTypes = {
	decks: PropTypes.array.isRequired,
	addDecker: PropTypes.func.isRequired,
	navigation: PropTypes.object.isRequired
}
