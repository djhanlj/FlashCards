import React from 'react'
import { View, Text, StyleSheet } from 'react-native'
import PropTypes from 'prop-types'
import { TextInput, HelperText, Button } from 'react-native-paper'
import { primary, gray } from '@utils/colors'

export default function CardForm({
	titleForm,
	questao,
	resposta,
	validateQuestao,
	validateResposta,
	handleTextChange,
	submit
}) {
	return (
		<View style={styles.listDecker}>
			<Text style={styles.titleText}>{titleForm}</Text>
			<View style={styles.padding}>
				<TextInput
					numberOfLines={2}
					mode="outlined"
					label="Questao"
					value={questao}
					onChangeText={handleTextChange('questao')}
				/>
				<HelperText type="error" visible={validateQuestao}>
					Preencha a Questão!
				</HelperText>
			</View>
			<View style={styles.padding}>
				<TextInput
					numberOfLines={2}
					mode="outlined"
					label="Resposta"
					value={resposta}
					onChangeText={handleTextChange('resposta')}
				/>
				<HelperText type="error" visible={validateResposta}>
					Preencha a Resposta!
				</HelperText>
			</View>
			<View style={styles.padding}>
				<Button
					icon="save"
					mode="contained"
					style={styles.colorButtonSave}
					onPress={submit}
				>
					Save Question
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
	padding: {
		marginTop: 20
	},
	colorButtonSave: {
		backgroundColor: primary
	}
})

CardForm.propTypes = {
	questao: PropTypes.string.isRequired,
	resposta: PropTypes.string.isRequired,
	validateQuestao: PropTypes.bool.isRequired,
	validateResposta: PropTypes.bool.isRequired,
	titleForm: PropTypes.string.isRequired,
	handleTextChange: PropTypes.func.isRequired,
	submit: PropTypes.func.isRequired
}
