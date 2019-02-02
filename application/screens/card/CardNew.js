import React from 'react'
import {
	Text,
	View,
	KeyboardAvoidingView,
	StyleSheet,
	ScrollView
} from 'react-native'
import PropTypes from 'prop-types'
import { TextInput, Button } from 'react-native-paper'
import { connect } from 'react-redux'
import { updateDeckerCards } from '@actions'
import { estruturaQuestao, removeSpaces } from '@utils/flashcards'
import { saveDecker } from '@api/api'

class CardNew extends React.Component {
	static navigationOptions = () => ({
		title: 'Add Cartão'
	})

	state = {
		questao: '',
		resposta: ''
	}

	handleTextChange = nomeDecker => this.setState({ nomeDecker })

	submit = () => {
		const { questao, resposta } = this.state
		const { deck } = this.props
		const questions = estruturaQuestao(questao, resposta)
		const key = removeSpaces(deck.title)

		deck.questions = [...deck.questions, questions]
		const deckUpdate = { [key]: deck }

		saveDecker(deckUpdate)
		updateDeckerCards(questions, removeSpaces(deck.title))
		this.toDetail(deck.title)
	}

	toDetail = title => {
		const { navigation } = this.props
		navigation.navigate('DeckDetail', { title })
	}

	render() {
		return (
			<ScrollView style={styles.container}>
				<KeyboardAvoidingView
					keyboardVerticalOffset={300}
					behavior="padding"
					enabled
				>
					<Text style={styles.titleText}>
						Adicione uma nova Pergunta Para o Quiz
					</Text>
					<View style={styles.padding}>
						<TextInput
							numberOfLines={5}
							mode="outlined"
							label="Questao"
							value={this.state.questao}
							onChangeText={questao => this.setState({ questao })}
						/>
					</View>
					<View style={styles.padding}>
						<TextInput
							numberOfLines={3}
							mode="outlined"
							label="Resposta"
							value={this.state.resposta}
							onChangeText={resposta =>
								this.setState({ resposta })
							}
						/>
					</View>
					<View style={styles.padding}>
						<Button
							icon="save"
							mode="contained"
							onPress={this.submit}
						>
							Save Question
						</Button>
					</View>
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
	},

	titleText: {
		fontSize: 16,
		textAlignVertical: 'center',
		textAlign: 'center'
	},
	padding: {
		marginTop: 20
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
		updateDeckerCards: (deck, title) =>
			dispatch(updateDeckerCards(deck, title))
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
