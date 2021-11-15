import React, { Component } from 'react'
import { Text, View, TextInput, TouchableOpacity, StyleSheet } from 'react-native'
import Mycamera from '../components/MyCamera';
import { auth,db } from '../firebase/config';

export class Formulario extends Component {
    constructor(props) {
        super(props);
        this.state = { 
            Title: '',
            description: '',
            showCamera: false,
         }
    }

    // Metodo para subir la foto a firebase
    
    submitForm = () => {
        db.collection('posts').add({
            user: auth.currentUser.email,
            description: this.state.description,
            title: this.state.Title,
            createdAt: Date.now(),
            likes:[],
            comments:[],
            foto: this.state.url
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

    //Mostrar la camara
    
    showCamera = () => {
        this.setState({
            showCamera: true
        })
    }

    // Cambiar el estado cuando esta subida la foto

    onImageUpload(url){
        this.setState({
            url: url,
            showCamera: false,
        })
    }
    render() {
        return (
           this.state.showCamera ? <Mycamera onImageUpload={(url)=>this.onImageUpload(url)}/> :
            <View style={styles.container}>
                <Text style={styles.titulo}>Subir un post</Text>
                <TextInput
                    placeholder="Titulo del post"
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
                {/* When theres a photo the button changes color */}
                <TouchableOpacity
                    style={styles.button, this.state.url ? styles.buttonActive : styles.button}
                    onPress={()=> this.showCamera()}
                >
                    <Text style={styles.textButton}>
                        Subir Foto
                    </Text>
                </TouchableOpacity>
                {this.state.url ?
                    <TouchableOpacity
                        style={styles.button}
                        onPress={()=> this.submitForm()}
                    >
                        <Text style={styles.textButton}>
                            Subir Post
                        </Text>
                    </TouchableOpacity>
                    : null
                }
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
        width: 300,
        height: 44,
        padding: 10,
        borderWidth: 1,
        borderColor: '#00ADB5',
        marginBottom: 10,
        borderRadius: 5,
        textAlign: 'center',
      },
    button: {
        backgroundColor: '#00ADB5',
        padding: 10,
        margin: 10,
        borderRadius: 5,
        width:'50%',
    },
    buttonActive: {
        backgroundColor: '#393E46',
        padding: 10,
        margin: 10,
        borderRadius: 5,
        width:'50%',
    },  
    textButton: {
        color: '#fff',
        textAlign: 'center',
        fontWeight: 'bold',
    },
    titulo: {
        fontSize: 20,
        marginBottom: 10,
        fontWeight: 'bold',
    }
})

export default Formulario
