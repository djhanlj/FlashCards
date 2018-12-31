import React from 'react'
import { View, Text, FlatList, StyleSheet } from 'react-native'
import getObjetos from '../utils/objeto'

function ItemView({ title, questions }) {
  return (
    <View style={ styles.listDecker }>
      <Text style={[styles.item, {marginTop: 25}]}>{title}</Text>
      <View style={styles.item}>
        <Text style={styles.deckerQuantidade}>{ questions.length }</Text>
        <Text style={styles.deckerQuantidade}>cards</Text>
      </View>
    </View>
  )
}

export default class Deck extends React.Component {

  state = {
    decks: []
  }
  componentDidMount() {
    const objeto = getObjetos();
    const decks = Object.keys(objeto).map(i => objeto[i])
    this.setState({decks})
  }

  renderItem =({ item }) => {
    return <ItemView  {... item} />
  }

  renderSeparator = () => {
    return (
      <View style={styles.line}/>
    );
  };

  render() {
    const { decks } = this.state
    return (
      <View style={styles.container}>
        <Text style={styles.cabecalho}>List Decks</Text>
        <View style={styles.line}/>
        <FlatList 
          data={decks}
          renderItem={ this.renderItem }
          ItemSeparatorComponent={this.renderSeparator}
          keyExtractor={item => item.title}
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container:{
    marginTop: 25,
    marginLeft: 10,
    marginRight: 10,
  },
  listDecker: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    
  },
  line:{
    height: 1,
    width: "100%",
    backgroundColor: "#CED0CE",
   
  },
  item:{
    fontSize: 20,
    marginTop: 15,
    marginBottom: 15,
    alignItems: 'center'
    
  },
  deckerQuantidade:{
    fontSize: 20,
    textAlign: 'center'
  },
  cabecalho:{
    fontSize: 18,
    color: "#CED0CE",
  }

}) 