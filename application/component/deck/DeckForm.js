import React from 'react'
import { View, Text, StyleSheet } from 'react-native'
import PropTypes from 'prop-types'
import { primary, gray } from '@utils/colors'
import { TextInput, HelperText, Button } from 'react-native-paper'

export default function DeckForm({
	titleForm,
	titleDecker,
	validateForm,
	handleTextChange,
	submit
}) {
	return (
		<View style={styles.listDecker}>
			<Text style={styles.titleText}>{titleForm}</Text>
			<View style={styles.input}>
				<TextInput
					mode="outlined"
					label="Name Deck"
					value={titleDecker}
					onChangeText={handleTextChange}
				/>
				<HelperText type="error" visible={validateForm}>
					Preencha o campo!
				</HelperText>
			</View>

			<View>
				<Button
					icon="add-box"
					mode="contained"
					style={styles.colorButtonSave}
					onPress={submit}
				>
					Create Deck
				</Button>
			</View>
		</View>
	)
}

const styles = StyleSheet.create({
	titleText: {
		fontSize: 20,
		textAlignVertical: 'center',
		textAlign: 'center',
		color: gray
	},
	input: {
		marginTop: 50
	},
	colorButtonSave: {
		backgroundColor: primary
	}
})

DeckForm.propTypes = {
	titleDecker: PropTypes.string.isRequired,
	titleForm: PropTypes.string.isRequired,
	validateForm: PropTypes.bool.isRequired,
	handleTextChange: PropTypes.func.isRequired,
	submit: PropTypes.func.isRequired
}
