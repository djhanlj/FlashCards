import React from 'react'
import { View, Text, FlatList, StyleSheet } from 'react-native'

export default class DeckDetail extends React.Component {

  static navigationOptions = ({ navigation }) => {
    const { deck } = navigation.state.params
    return {
      title: deck
    }
  }

  componentDidMount() {
    const { deck } = this.props.navigation.state.params
  }

  render() {
    return (
      <View style={styles.container}>
        <Text>Deck Detail- {this.props.navigation.state.params.deck}</Text>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    marginTop: 25,
    marginLeft: 10,
    marginRight: 10,
  },


}) 