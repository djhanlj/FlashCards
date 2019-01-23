import React from 'react'
import { View, Text, KeyboardAvoidingView, StyleSheet } from 'react-native'
import { FormInput, Button } from 'react-native-elements'
import { blue } from '@utils/colors'
import { saveDecker } from '@utils/api'
import { connect } from 'react-redux'
import { addDecker } from '@actions'
import { estruturaDeck } from '@utils/flashcards'


class NewDeck extends React.Component {

    static navigationOptions = () => {
        return {
            title: "Add Cartão"
        }
    }

    state = {
        questao: '',
        resposta: '',
    }


    handleTextChange = (nomeDecker) => (
        this.setState({ nomeDecker })
    )

    submit = () => {

    }

    toDetail = () => {
        const { nomeDecker } = this.state
        this.props.navigation.navigate('DeckDetail', { 'deck': nomeDecker })
    }

    render() {
        return (
            <KeyboardAvoidingView behavior='padding' style={styles.container}>
                <Text style={styles.titleText}>Adicione uma nova Pergunta Para o Quiz</Text>
               
                <Button large backgroundColor={blue} title='Salvar Questão' onPress={this.submit} />
            </KeyboardAvoidingView>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },

    titleText: {
        fontSize: 16,
        textAlignVertical: "center",
        textAlign: "center"
    },
    input: {
        marginTop: 50
    }

})

function mapDispatchToProps(dispatch) {
    return {
        addDecker: (deck) => dispatch(addDecker(deck)),
    }
}

export default connect(null, mapDispatchToProps)(NewDeck);