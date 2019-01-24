import React from 'react'
import { Text, KeyboardAvoidingView, StyleSheet } from 'react-native'
import PropTypes from 'prop-types'
import { Button } from 'react-native-elements'
import { blue } from '@utils/colors'
import { connect } from 'react-redux'
import { addDecker } from '@actions'

class NewDeck extends React.Component {
	static navigationOptions = () => ({
		title: 'Add Cartão'
	})

	state = {
		questao: '',
		resposta: ''
	}

	handleTextChange = nomeDecker => this.setState({ nomeDecker })

	submit = () => {}

	toDetail = () => {
		const { nomeDecker } = this.state
		const { navigation } = this.props
		navigation.navigate('DeckDetail', { deck: nomeDecker })
	}

	render() {
		return (
			<KeyboardAvoidingView behavior="padding" style={styles.container}>
				<Text style={styles.titleText}>
					Adicione uma nova Pergunta Para o Quiz
				</Text>
				<Button
					large
					backgroundColor={blue}
					title="Salvar Questão"
					onPress={this.submit}
				/>
			</KeyboardAvoidingView>
		)
	}
}

const styles = StyleSheet.create({
	container: {
		flex: 1
	},

	titleText: {
		fontSize: 16,
		textAlignVertical: 'center',
		textAlign: 'center'
	},
	input: {
		marginTop: 50
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
	navigation: PropTypes.object.isRequired
}
