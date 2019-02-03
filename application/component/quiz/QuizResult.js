import React from 'react'
import { StyleSheet, Text, View } from 'react-native'
import PropTypes from 'prop-types'
import { white } from '@utils/colors'
import { Button } from 'react-native-paper'
import { Dimensions } from 'react-native'

export default function QuizResult({ quantidade, acertos }) {
	return (
		<View style={styles.container}>
			<View style={styles.header}>
				<Text style={styles.title}>Resulta do Quiz</Text>
			</View>
			<View style={styles.card}>
				<View>
					<View>
						<Text style={styles.subTitleCard}>
							De {quantidade} Questõe(s), você acertou
						</Text>
					</View>
					<View>
						<Text style={styles.titleCard}>{acertos}</Text>
					</View>
				</View>

				<View style={styles.containerButton}>
					<View style={styles.alignButton}>
						<Button
							mode="contained"
							style={styles.colorCorrect}
							onPress={() => console.log()}
						>
							Reiniciar Quiz
						</Button>
					</View>
					<View style={styles.alignButton}>
						<Button
							mode="contained"
							style={styles.colorIncorrect}
							onPress={() => console.log()}
						>
							Voltar
						</Button>
					</View>
				</View>
			</View>
		</View>
	)
}

const { width, height } = Dimensions.get('window')
var styles = StyleSheet.create({
	container: {
		backgroundColor: white,
		marginTop: 25,
		alignItems: 'center',
		justifyContent: 'center'
	},
	card: {
		borderWidth: 1,
		borderRadius: 1,
		borderColor: '#ddd',
		shadowOpacity: 0.75,
		shadowRadius: 5,
		shadowColor: 'red',
		shadowOffset: { height: 0, width: 0 },
		padding: 10,
		width: width * 0.8,
		height: height * 0.5
	},
	header: {
		padding: 15
	},
	title: {
		textAlign: 'center',
		fontSize: 25
	},
	subTitleCard: {
		textAlign: 'center',
		fontSize: 16
	},
	titleCard: {
		textAlign: 'center',
		fontSize: 50,
		marginTop: 15
	},
	containerButton: {
		flex: 1,
		justifyContent: 'flex-end'
	},
	alignButton: {
		justifyContent: 'center',
		padding: 5
	}
})
