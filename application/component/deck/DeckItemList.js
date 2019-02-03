import React from 'react'
import PropTypes from 'prop-types'
import { List } from 'react-native-paper'

export default function DeckItemList({ item }) {
	return (
		<List.Item
			title={item.title}
			description={`${item.questions.length} cads`}
			left={props => <List.Icon {...props} icon="label" />}
		/>
	)
}

DeckItemList.propTypes = {
	item: PropTypes.object.isRequired
}
