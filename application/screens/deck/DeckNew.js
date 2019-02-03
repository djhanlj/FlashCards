import React from 'react'
import { KeyboardAvoidingView, StyleSheet, View } from 'react-native'
import PropTypes from 'prop-types'
import { saveDeckTitle } from '@api/api'
import { connect } from 'react-redux'
import { addDecker } from '@actions'
import DeckForm from '@component/deck/DeckForm'
import { Button, Paragraph, Dialog, Portal } from 'react-native-paper'

class DeckNew extends React.Component {
	state = {
		titleDecker: '',
		validateForm: false,
		visibleDialog: false
	}

	_showDialog = () => this.setState({ visibleDialog: true })

	_hideDialog = () => this.setState({ visibleDialog: false })

	handleTextChange = titleDecker =>
		this.setState({ titleDecker: titleDecker })

	submit = () => {
		const { titleDecker } = this.state
		const { addDecker } = this.props

		if (!titleDecker) {
			this.setState({ validateForm: true })
			return false
		}

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
			this.setState({ titleDecker: '', validateForm: false })
			this.openDeckDetail(titleDecker)
		} else {
			/**
			 * create alert mensagem
			 */
			this._showDialog()
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
		const { titleDecker, validateForm } = this.state
		return (
			<KeyboardAvoidingView behavior="padding" style={styles.container}>
				<DeckForm
					titleForm="Qual é o título do seu novo baralho?"
					validateForm={validateForm}
					titleDecker={titleDecker}
					handleTextChange={this.handleTextChange}
					submit={this.submit}
				/>
				<Portal>
					<Dialog
						visible={this.state.visibleDialog}
						onDismiss={this._hideDialog}
					>
						<Dialog.Title>Alert</Dialog.Title>
						<Dialog.Content>
							<Paragraph>
								Deck Informado Já existe Tente Cadastrar Outro
							</Paragraph>
						</Dialog.Content>
						<Dialog.Actions>
							<Button onPress={this._hideDialog}>Sair</Button>
						</Dialog.Actions>
					</Dialog>
				</Portal>
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
