import React from 'react'
import { Text, TouchableOpacity, StyleSheet } from 'react-native'
import { blue, red } from '@utils/colors'
import CardFlip from 'react-native-card-flip'

export default function TesteCard() {
	return (
		<CardFlip style={styles.container} ref={card => (this.card = card)}>
			<TouchableOpacity
				style={styles.card_blue}
				onPress={() => this.card.flip()}
			>
				<Text>AB</Text>
			</TouchableOpacity>
			<TouchableOpacity
				style={styles.card_yellow}
				onPress={() => this.card.flip()}
			>
				<Text>teste</Text>
			</TouchableOpacity>
		</CardFlip>
	)
}

var styles = StyleSheet.create({
	container: {
		flex: 1,
		alignItems: 'center',
		justifyContent: 'center'
	},
	card_blue: {
		borderWidth: 3,
		borderRadius: 3,
		borderColor: blue,
		backgroundColor: blue,
		width: 300,
		height: 300,
		padding: 10
	},
	card_yellow: {
		borderWidth: 3,
		borderRadius: 3,
		borderColor: red,
		backgroundColor: red,
		width: 300,
		height: 300,
		padding: 10
	}
})
