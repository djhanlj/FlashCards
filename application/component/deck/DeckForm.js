import React from 'react'
import { View, Text, StyleSheet } from 'react-native'
import PropTypes from 'prop-types'
import { primary } from '@utils/colors'
import { TextInput, Button } from 'react-native-paper'

export default function DeckForm({
	titleForm,
	titleDecker,
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
			</View>

			<View style={styles.alignButton}>
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
		fontSize: 25,
		textAlignVertical: 'center',
		textAlign: 'center'
	},
	input: {
		marginTop: 50
	},
	colorButtonSave: {
		backgroundColor: primary
	},

	alignButton: {
		marginTop: 15
	}
})

DeckForm.propTypes = {
	titleDecker: PropTypes.string.isRequired,
	titleForm: PropTypes.string.isRequired,
	handleTextChange: PropTypes.func.isRequired,
	submit: PropTypes.func.isRequired
}
