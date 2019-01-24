import React from 'react'
import {
	View,
	Text,
	FlatList,
	StyleSheet,
	TouchableOpacity
} from 'react-native'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'
import { handleInitialData, resetDecker } from '@actions'
import { clearAsyncStorage } from '@utils/api'
import { Button } from 'react-native-elements'
import { red } from '@utils/colors'

class Deck extends React.Component {
	componentDidMount() {
		const { loadData, navigation } = this.props
		navigation.addListener('willFocus', () => {
			loadData()
		})
	}

	reset = () => {
		const { resetDecker } = this.props
		clearAsyncStorage()
		resetDecker()
	}

	renderItem = ({ item }) => {
		return (
			<TouchableOpacity
				style={styles.listDecker}
				onPress={() =>
					this.props.navigation.navigate('DeckDetail', {
						deck: item.title
					})
				}
			>
				<Text style={[styles.item, { marginTop: 25 }]}>
					{item.title ? item.title : null}
				</Text>
				<View style={styles.item}>
					<Text style={styles.deckerQuantidade}>
						{item.questions.length}
					</Text>
					<Text style={styles.deckerQuantidade}>cards</Text>
				</View>
			</TouchableOpacity>
		)
	}

	renderSeparator = () => {
		return <View style={styles.line} />
	}

	render() {
		const { decks } = this.props
		return (
			<View style={styles.container}>
				<Text style={styles.cabecalho}>List Decks</Text>
				<Button
					backgroundColor={red}
					title="Remove os Decks"
					onPress={this.reset}
				/>
				<View style={styles.line} />
				{decks.length > 0 ? (
					<FlatList
						data={decks}
						renderItem={this.renderItem}
						ItemSeparatorComponent={this.renderSeparator}
						keyExtractor={item => item.title}
					/>
				) : (
					<View style={styles.container}>
						<Text>Não há decks cadastrados!</Text>
					</View>
				)}
			</View>
		)
	}
}

const styles = StyleSheet.create({
	container: {
		marginTop: 25,
		marginLeft: 10,
		marginRight: 10
	},
	listDecker: {
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
	},
	cabecalho: {
		fontSize: 18,
		color: '#CED0CE'
	}
})

function mapStateToProps(decks) {
	const decksArray = Object.keys(decks).map(i => decks[i])
	return {
		decks: decksArray
	}
}

function mapDispatchToProps(dispatch) {
	return {
		loadData: () => dispatch(handleInitialData()),
		resetDecker: () => dispatch(resetDecker())
	}
}

export default connect(
	mapStateToProps,
	mapDispatchToProps
)(Deck)

Deck.propTypes = {
	loadData: PropTypes.func.isRequired,
	navigation: PropTypes.func.isRequired,
	resetDecker: PropTypes.func.isRequired,
	decks: PropTypes.array.isRequired
}
