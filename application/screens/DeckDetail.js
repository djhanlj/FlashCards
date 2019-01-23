import React from 'react'
import { View, Text, StyleSheet } from 'react-native'
import { connect } from 'react-redux'
import { Button } from 'react-native-elements'
import { dodgerblue, seagreen } from '@utils/colors'

class DeckDetail extends React.Component {

  static navigationOptions = ({ navigation }) => {
    const { deck } = navigation.state.params
    return {
      title: deck
    }
  }

  render() {
    const { navigation } = this.props
    const { deck } = this.props
    const { title, questions } = deck
    return (
      <View style={styles.container}>
        {deck ?
          <View>
            <View style={styles.text}>
              <Text>Deck { title  } </Text>
              <Text>{ questions.length > 0 ? questions.length : 0 } Cartões </Text>
            </View>
            <View>
              <View style={{ marginTop: 15 }}>
                <Button large backgroundColor={seagreen} title='Iniciar Quiz' />
              </View>
              <View style={{ marginTop: 15 }}>
                <Button large backgroundColor={dodgerblue} title='Add Card'
                 onPress={() => navigation.navigate('NewCard', { deck })}
                />
              </View>
            </View>
          </View>
          : null}
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
  },
  text: {
    alignItems: 'center',
  }
})

function mapStateToProps(decks, { navigation }) {
  const { deck } = navigation.state.params
  const decksArray = Object.keys(decks).map(i => decks[i])

  return {
    deck: decksArray.find(d => d.title === deck)
  }
}

export default connect(mapStateToProps)(DeckDetail);