import React from 'react'
import { View, Text, KeyboardAvoidingView, StyleSheet } from 'react-native'
import PropTypes from 'prop-types'
import { FormInput } from 'react-native-elements'
import { blue } from '@utils/colors'
import { saveDecker } from '@utils/api'
import { connect } from 'react-redux'
import { addDecker } from '@actions'
import { estruturaDeck, removeSpaces } from '@utils/flashcards'
import { Button } from 'react-native-paper'

class NewDeck extends React.Component {
	state = {
		nomeDecker: ''
	}

	handleTextChange = nomeDecker => this.setState({ nomeDecker })

	submit = () => {
		const { nomeDecker } = this.state
		const { addDecker } = this.props
		const key = removeSpaces(nomeDecker)
		const corpo = estruturaDeck(nomeDecker)

		const newDeck = { [key]: corpo }
		saveDecker(newDeck)

		addDecker(newDeck)
		this.setState({ nomeDecker: '' })
		this.toDetail(nomeDecker)
	}

	toDetail = title => {
		const { navigation } = this.props
		navigation.navigate('DeckDetail', { title })
	}

	render() {
		const { nomeDecker } = this.state
		return (
			<KeyboardAvoidingView behavior="padding" style={styles.container}>
				<Text style={styles.titleText}>
					Qual é o título do seu novo baralho?
				</Text>
				<View style={styles.input}>
					<FormInput
						value={nomeDecker}
						onChangeText={this.handleTextChange}
						underlineColorAndroid={blue}
					/>
				</View>
				<View style={styles.alignButton}>
					<Button
						icon="add-box"
						mode="contained"
						style={styles.colorButtonSave}
						onPress={this.submit}
					>
						Criar Deck
					</Button>
				</View>
			</KeyboardAvoidingView>
		)
	}
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		marginTop: 30,
		marginLeft: 10,
		marginRight: 10
	},
	titleText: {
		fontSize: 25,
		textAlignVertical: 'center',
		textAlign: 'center'
	},
	input: {
		marginTop: 50
	},
	colorButtonSave: {
		backgroundColor: blue
	},

	alignButton: {
		marginTop: 15
	}
})

function mapDispatchToProps(dispatch) {
	return {
		addDecker: deck => dispatch(addDecker(deck))
	}
}
export default connect(
	null,
	mapDispatchToProps
)(NewDeck)

NewDeck.propTypes = {
	addDecker: PropTypes.func.isRequired,
	navigation: PropTypes.object.isRequired
}
