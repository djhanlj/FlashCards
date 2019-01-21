import React from 'react'
import { View, Text, FlatList, StyleSheet, TouchableOpacity } from 'react-native'
import getObjetos from '../utils/objeto'
import { getDeckerAsync, clearAsyncStorage } from '@utils/api'

export default class Deck extends React.Component {

  state = {
    decks: []
  }
  componentDidMount() {
    getDeckerAsync().then( objeto =>{
      const decks = Object.keys(objeto).map(i => objeto[i])
      this.setState({ decks })
    })
    //const objeto = getObjetos();
    //const decks = Object.keys(objeto).map(i => objeto[i])
    //this.setState({ decks })
  }

  renderItem = ({ item }) => {
    return (
      <TouchableOpacity style={styles.listDecker}
        onPress={() => this.props.navigation.navigate('DeckDetail')}>
        <Text style={[styles.item, { marginTop: 25 }]}>{item.title ? item.title : null }</Text>
        <View style={styles.item}>
          <Text style={styles.deckerQuantidade}>{item.questions.length}</Text>
          <Text style={styles.deckerQuantidade}>cards</Text>
        </View>
      </TouchableOpacity>
    )
  }



  renderSeparator = () => {
    return (
      <View style={styles.line} />
    );
  };

  render() {
    const { decks } = this.state
    console.log(decks)
    return (
      <View style={styles.container}>
        <Text style={styles.cabecalho}>List Decks</Text>
        <View style={styles.line} />
        {decks.length > 0 
        ? <FlatList
        data={decks}
        renderItem={this.renderItem}
        ItemSeparatorComponent={this.renderSeparator}
        keyExtractor={item => item.title}
      /> 
        : 
        <View style={styles.container}>
        <Text>Não há decks cadastrados!</Text>
      </View>
    }
        
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
  listDecker: {
    flexDirection: 'row',
    justifyContent: 'space-between',

  },
  line: {
    height: 1,
    width: "100%",
    backgroundColor: "#CED0CE",

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
    color: "#CED0CE",
  }

}) 