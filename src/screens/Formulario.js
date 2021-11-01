import React, { Component } from 'react'
import { Text, View, TextInput, TouchableOpacity, StyleSheet } from 'react-native'
import { auth,db } from '../firebase/config';

export class Formulario extends Component {
    constructor(props) {
        super(props);
        this.state = { 
            Title: '',
            description: '',
         }
    }
    submitForm = () => {
        db.collection('posts').add({
            user: auth.currentUser.email,
            description: this.state.description,
            title: this.state.Title,
            createdAt: Date.now(),
            likes:[],
            comments:[]
            })
            .then(()=>{
                this.setState({
                    Title: '',
                    description: '',
                })
            }
            )
            .catch( e => console.log(e))
    }


    render() {
        return (
           
                 <View style={styles.container}>
                <Text>Forms</Text>
                <TextInput
                    placeholder="Nombre"
                    onChangeText={(text) => this.setState({Title: text})}
                    value={this.state.Title}
                    style={styles.input}
                />
                 <TextInput
                    placeholder="Description"
                    onChangeText={(description) => this.setState({description: description})}
                    value={this.state.description}
                    style={styles.input}
                />
                
                <TouchableOpacity
                    style={styles.button}
                    onPress={this.submitForm}
                    >
                <Text style={styles.textButton}>Enviar</Text>
                </TouchableOpacity>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center',
    },
    input: {
        borderWidth: 1,
        borderColor: '#000',
        width: '90%',
        marginBottom: 10,
        padding: 10,
    },
    button: {
        backgroundColor: '#000',
        padding: 10,
        marginTop: 10,
    },
    textButton: {
        color: '#fff',
        textAlign: 'center',
    }

})

export default Formulario
