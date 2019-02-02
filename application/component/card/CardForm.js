import React from 'react'
import { View, Text, StyleSheet } from 'react-native'
import PropTypes from 'prop-types'
import { blue } from '@utils/colors'
import { TextInput, Button } from 'react-native-paper'

export default function CardForm({
	titleForm,
	questao,
	resposta,
	handleTextChange,
	submit
}) {
	return (
		<View style={styles.listDecker}>
			<Text style={styles.titleText}>{titleForm}</Text>
			<View style={styles.padding}>
				<TextInput
					numberOfLines={5}
					mode="outlined"
					label="Questao"
					value={questao}
					onChangeText={handleTextChange('questao')}
				/>
			</View>
			<View style={styles.padding}>
				<TextInput
					numberOfLines={3}
					mode="outlined"
					label="Resposta"
					value={resposta}
					onChangeText={handleTextChange('resposta')}
				/>
			</View>
			<View style={styles.padding}>
				<Button icon="save" mode="contained" onPress={submit}>
					Save Question
				</Button>
			</View>
		</View>
	)
}

const styles = StyleSheet.create({
	titleText: {
		fontSize: 16,
		textAlignVertical: 'center',
		textAlign: 'center'
	},
	padding: {
		marginTop: 20
	}
})

CardForm.propTypes = {
	questao: PropTypes.string.isRequired,
	resposta: PropTypes.string.isRequired,
	titleForm: PropTypes.string.isRequired,
	handleTextChange: PropTypes.func.isRequired,
	submit: PropTypes.func.isRequired
}
