import React from 'react'
import { View, Text, StyleSheet } from 'react-native'
import PropTypes from 'prop-types'

export default function DeckItemList({ item }) {
	return (
		<View style={styles.container}>
			<Text style={[styles.item, { marginTop: 25 }]}>
				{item.title ? item.title : null}
			</Text>
			<View style={styles.item}>
				<Text style={styles.deckerQuantidade}>
					{item.questions.length}
				</Text>
				<Text style={styles.deckerQuantidade}>cards</Text>
			</View>
		</View>
	)
}

DeckItemList.propTypes = {
	item: PropTypes.object.isRequired
}

const styles = StyleSheet.create({
	container: {
		marginLeft: 10,
		marginRight: 10,
		flexDirection: 'row',
		justifyContent: 'space-between'
	},
	line: {
		height: 1,
		width: '100%',
		backgroundColor: '#CED0CE'
	},
	item: {
		fontSize: 20,
		marginTop: 15,
		marginBottom: 15,
		alignItems: 'center'
	},
	deckerQuantidade: {
		fontSize: 20,
		textAlign: 'center'
	}
})
