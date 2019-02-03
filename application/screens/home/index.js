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
import { handleInitialData } from '@actions'
import DeckItemList from '@component/deck/DeckItemList'

class Home extends React.Component {
	componentDidMount() {
		const { loadData, navigation } = this.props
		navigation.addListener('willFocus', () => {
			loadData()
		})
	}

	renderSeparator = () => {
		return <View style={styles.line} />
	}

	openDeckDetail = item => {
		const { navigation } = this.props
		navigation.navigate('DeckDetail', {
			title: item.title
		})
	}

	render() {
		const { decks } = this.props
		return (
			<View style={styles.container}>
				{decks.length > 0 ? (
					<FlatList
						data={decks}
						renderItem={({ item }) => (
							<TouchableOpacity
								onPress={() => this.openDeckDetail(item)}
							>
								<DeckItemList item={item} />
							</TouchableOpacity>
						)}
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

function mapStateToProps(decks) {
	const decksArray = Object.keys(decks).map(i => decks[i])
	return {
		decks: decksArray
	}
}

function mapDispatchToProps(dispatch) {
	return {
		loadData: () => dispatch(handleInitialData())
	}
}

export default connect(
	mapStateToProps,
	mapDispatchToProps
)(Home)

Home.propTypes = {
	loadData: PropTypes.func.isRequired,
	navigation: PropTypes.object.isRequired,
	decks: PropTypes.array.isRequired
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		marginTop: 25
	},
	line: {
		height: 1,
		width: '100%',
		backgroundColor: '#CED0CE'
	},
	cabecalho: {
		fontSize: 18,
		color: '#CED0CE'
	}
})
