import React, { Component } from 'react'
import { Text, View, TextInput, TouchableOpacity, StyleSheet, Image } from 'react-native'
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
            user: auth.currentUser.displayName,
            email: auth.currentUser.email,
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
                    url:"",
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

        // Camara y formulario
           this.state.showCamera ? <Mycamera onImageUpload={(url)=>this.onImageUpload(url)}/> :
            <View style={styles.container}>
                <Text style={styles.titulo}>Subir un post</Text>
                <Image source={require('../../assets/img/Post.png')} style={styles.Foto}/>

                {/* Formulario del Post */} 

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
                {this.state.url ? 
                <View style={styles.inline}>

                {/* Botones del Formulario */}

                    <TouchableOpacity
                    style={styles.buttonActive}
                    disabled={true}>
                        <Text style={styles.textButton}>
                            Subir Foto
                        </Text>                        
                    </TouchableOpacity>
                    <Image  style={styles.icon} source={ { uri:"https://img.icons8.com/external-bearicons-outline-color-bearicons/64/000000/external-verified-reputation-bearicons-outline-color-bearicons.png"}}/>
                </View>
                :
                <TouchableOpacity
                    style={styles.button}
                    onPress={()=> this.showCamera()}
                >
                    <Text style={styles.textButton}>
                        Subir Foto
                    </Text>
                </TouchableOpacity>
                }
                {this.state.url && this.state.Title.length > 0 && this.state.description.length > 0 ?

                    // Si todos los campos estan llenos se puede subir el post

                    <TouchableOpacity
                        style={styles.button}
                        onPress={()=> this.submitForm()}
                    >
                        <Text style={styles.textButton}>
                            Subir Post
                        </Text>
                    </TouchableOpacity>
                    :  
                    <TouchableOpacity
                    style={styles.buttonActive}
                    disabled={true}
                    >
                        <Text style={styles.textButton}>
                            Subir Post
                        </Text>
                    </TouchableOpacity>
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
    Foto: {
        width: 300,
        height: 200,
        marginBottom: 20,
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
        backgroundColor: '#00ADB5',
        padding: 10,
        margin: 10,
        borderRadius: 5,
        width:'50%',
        opacity: 0.5,
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
    },
    icon: {
        width: 30,
        height: 30,
        marginLeft: 10,
        marginHorizontal: 10,
    },
    inline: {
        alignItems: 'center',
        flexDirection: 'row',
    }

})

export default Formulario
