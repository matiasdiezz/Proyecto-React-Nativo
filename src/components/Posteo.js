
import React, { Component } from 'react';
import { auth, db } from "../firebase/config";
import { View, Text, StyleSheet, Image, TouchableOpacity, FlatList, TextInput} from 'react-native'
import firebase from "firebase"
import { Modal } from 'react-native';

class Posteos extends Component {
    constructor(props) {
        super(props)
        this.state = {
            likes: 0,
            liked: false,
            showModal: false,
            comment: [],
        }
    }
    
//setstate para que se vea el like
componentDidMount() {
    this.setState({
        likes: this.props.data.data.likes.length,
        liked: this.props.data.data.likes.includes(auth.currentUser.email)

    })
}

    
dislike() {
        let post = db.collection("posts").doc(this.props.data.id);

        post.update({
            likes: firebase.firestore.FieldValue.arrayRemove(auth.currentUser.email)
        })
        .then(() => {
            this.setState({
                likes: this.state.likes - 1,
                liked: false
            })
        })
        .catch((error) => {
            console.error("Error updating document: ", error);
        });
    }
 likeCounter() {
        let likes = this.props.data.data.likes;
        if (likes) {
            this.setState({
                likes: likes.length
            })
        }
        if(likes.includes(auth.currentUser.email)) {    
            this.setState({
                liked: true
            })
        }
    }
 like() {
        let post = db.collection("posts").doc(this.props.data.id);

        post.update({
            likes: firebase.firestore.FieldValue.arrayUnion(auth.currentUser.displayName)
        })
        .then(() => {
            this.setState({
                likes: this.state.likes + 1,
                liked: true
            })
        })
        .catch((error) => {
            console.error("Error updating document: ", error); 
        });
    }
    openModal() {
        this.setState({
            showModal: true
        })
    }

    closeModal() {
        this.setState({
            showModal: false
        })
    }

    guardarComentario(){
        console.log('Guardando comentario...');
        let oneComment = {
            createdAt: Date.now(),
            author: auth.currentUser.displayName,
            comment: this.state.comment, 
        }
         db.collection('posts').doc(this.props.data.id).update({
           comments:firebase.firestore.FieldValue.arrayUnion(oneComment)
        })
        .then(()=>{
            this.setState({
                showModal:false,
                comment:''
            })
        }
        )}

        showModal() {
            this.setState({
                showModal: true
            })
        }

        hideModal() {
            this.setState({
                showModal: false
            })
        }


    
    render(){
        return (
        <View style={styles.container}>
            <View style={styles.Foto}>
                <Image style={styles.imagen} source={this.props.data.data.foto}></Image>
            </View>
            <Text>{this.props.data.data.title}</Text>
            
            {/* {if it was liked by the user change the image} */}
           
                
            <View style={styles.icons}>
                {
                    ! this.state.liked ?
                        <TouchableOpacity style={styles.button} onPress={() => this.like()}>
                            <Text>{this.state.likes}</Text>
                            <Image style={styles.Icons} source={{uri: "https://img.icons8.com/material-outlined/24/000000/hearts.png"}}></Image> 
                        </TouchableOpacity>
                    :
                        <TouchableOpacity style={styles.button} onPress={() => this.dislike()}>
                            <Text>{this.state.likes}</Text>
                            <Image style={styles.Icons} source={{  uri: "https://img.icons8.com/fluency/48/000000/like.png"}}></Image>
                        </TouchableOpacity>
                }
                <TouchableOpacity style={styles.button} onPress={() => this.openModal()}>
                    <Text>{this.props.data.data.comments.length}</Text>
                    <Image style={styles.Icons} source={{uri: "https://img.icons8.com/material-outlined/24/000000/speech-bubble.png"}}></Image>
                </TouchableOpacity>
            </View>
                {/* Modal para comentarios */}
            {   this.state.showModal ?
                <Modal style={styles.modalContainer}
                    visible={this.state.showModal}
                    animationType='slide'
                    transparent={false}
                >   
                    <TouchableOpacity onPress={()=>this.hideModal()}>
                        <Text style={styles.closeButton}>X</Text>
                    </TouchableOpacity> 

                    <FlatList
                        data={this.props.data.data.comments}
                        keyExtractor={comment=>comment.createdAt.toString()}
                        renderItem={({item})=>(
                                <Text>{item.author}: {item.comment}</Text> 
                        )}

                    />

                    {/* Formulario para nuevo comentarios */}
                    <View>
                        <TextInput 
                            style={styles.input}
                        placeholder="Comentar..."
                            keyboardType="default"
                            multiline
                            onChangeText={text => this.setState({comment: text})}
                            value={this.state.comment}
                        />
                        <TouchableOpacity 
                        style={styles.buttonModal}
                        onPress={()=>{this.guardarComentario()}}>
                            <Text style={styles.buttonText}>Guadar comentario</Text>
                        </TouchableOpacity>
                    </View>

                </Modal>    :
                <Text></Text>
            } 
                
                
        </View>
    )
}
}

const styles = StyleSheet.create({
    container:{
        flex: 1,
        display: "flex", 
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 10,
        borderColor: '#00ADB5',
        borderWidth: 1, 
        margin: 10,
        marginBottom: 10,
    },
    Foto:{
        width: '100%',
        height: 200,
        borderRadius: 10,
        borderColor: '#00ADB5',
        marginBottom: 5,
    },  
    imagen: {
        width: '100%',
        height: '100%',
        borderRadius: 10,
    },
    Icons:{
        width: "20px",
        height:"20px",

    },
    icons:{
        flexDirection: 'row', 
        width: "100%",
        justifyContent: "space-evenly",
    },
    likes:{
        flexDirection: "row",
    },
    button:{
        width: "20px",
        height: "20px",
        alignItems: "center",
        justifyContent: "center",
        margin: 5,
        flexDirection: "row",
    },
    input:{
        width:'100%',  
        flex: 3,
        alignSelf: 'center',
        backgroundColor: "white",
        borderColor: 'rgba(0, 0, 0, 0.500)',
        borderWidth: 1,
        borderRadius: 6,
        padding: 10,
    },
    modalText:{
        fontWeight: 'bold',
        color: '#Black'
    },
    modalContainer:{
        width:'95%',
        borderRadius:4,
        padding:5,
        backgroundColor: '#fff',
        alignSelf: 'center',
        marginTop: 20,
        marginBottom: 10,
    },
    buttonText:{
        color: '#ffffff',
        fontSize: 15,
    },
    modalText:{
        color: '#ffffff'
    },
    closeButton:{
        fontWeight: 'bold',
        color: '#ffffff',
        fontSize: 20,
        alignSelf: 'flex-end',
        padding: 10,
        backgroundColor: '#dc3545',
        marginTop:2,
        borderRadius: 10,
    },
    buttonModal:{
        alignSelf: 'center',
        backgroundColor: '#00ADB5',
        borderRadius: 4,
        padding: 10,
        marginTop: 10,
    }
})

export default Posteos;
