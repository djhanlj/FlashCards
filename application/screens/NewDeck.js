import React from 'react'
import { View, Text, TextInput, KeyboardAvoidingView, StyleSheet } from 'react-native'
import { FormLabel, FormInput, FormValidationMessage, Button  } from 'react-native-elements'
import {  blue } from '@utils/colors'
import { saveDecker } from '@utils/api'
import { connect } from 'react-redux'
import { addDecker } from '@actions'
import { estruturaDeck } from '@utils/flashcards'


class NewDeck extends React.Component {

  state = {
    nomeDecker: ''
  }


  handleTextChange = (nomeDecker) => (
    this.setState({ nomeDecker })
  )

  submit = () => {
      const { nomeDecker } = this.state
      const { addDecker } = this.props
      saveDecker(nomeDecker)

      /**
       * adicionar no state
       */
      addDecker(estruturaDeck(nomeDecker))


      this.toDetail()
  }

  toDetail = () => {
      const { nomeDecker } = this.state
      this.props.navigation.navigate('DeckDetail', {'deck':nomeDecker})
  }

  render() {
    const { nomeDecker } = this.state
    return (
      <KeyboardAvoidingView behavior='padding' style={styles.container}>
        <Text style={styles.titleText}>Qual é o título do seu novo baralho?</Text>
        <View style={styles.input}>
          <FormInput  
                  value={nomeDecker} 
                  onChangeText={this.handleTextChange} 
                  underlineColorAndroid={blue} />
        </View>
        <Button large backgroundColor={blue} title='Create Deck'  onPress={this.submit} />
      </KeyboardAvoidingView>
    );
  }
}

const styles = StyleSheet.create({
  container:{
    flex: 1, 
    marginTop: 30
  },

  titleText:{
    fontSize: 30,  
    textAlignVertical: "center", 
    textAlign: "center"
  },
  input:{
    marginTop: 50
  }
 

}) 


function mapDispatchToProps(dispatch) {
  return {
    addDecker: () => dispatch(addDecker()),
  }
}

export default connect(null, mapDispatchToProps)(NewDeck);