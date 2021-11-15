
import React, { Component } from 'react';
import { auth, db } from "../firebase/config";
import { View, Text, StyleSheet, Image, TouchableOpacity} from 'react-native'
import firebase from "firebase"

class Posteos extends Component {
    constructor(props) {
        super(props)
        this.state = {
            likes: 0,
            liked: false,
            showModal: false,
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
            likes: firebase.firestore.FieldValue.arrayUnion(auth.currentUser.email)
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
            author: auth.currentUser.email,
            comment: this.state.comment, 
        }
         db.collection('posts').doc(this.props.postData.id).update({
           comments:firebase.firestore.FieldValue.arrayUnion(oneComment)
        })
        .then(()=>{
            this.setState({
                showModal:false,
                comment:''
            })
        }
        )}


    
    render(){
    console.log(this.props.data);
        return (
        <View style={styles.container}>
            <Text>{this.props.data.data.title}</Text>
            <Image style={styles.imagen} source={this.props.data.data.foto}></Image>

            <View style={styles.icons}>
            <TouchableOpacity style={styles.likes} > 
            <Text>{this.state.likes}</Text>
            {/* {if it was liked by the user change the image} */}
            {!this.state.liked ? <Image style={styles.foto} source={{  uri: "https://img.icons8.com/material-outlined/24/000000/hearts.png"}}></Image> : <Image style={styles.foto} source={{  uri: "https://img.icons8.com/fluency/48/000000/like.png"}}></Image>}
           
        </TouchableOpacity>
                
                {
                    ! this.state.liked ?
                        <TouchableOpacity style={styles.button} onPress={() => this.like()}>
                             <Image  style={styles.foto} source={ { uri:"https://img.icons8.com/material-outlined/24/000000/facebook-like--v1.png"}}/>
            
                        </TouchableOpacity>
                    :
                        <TouchableOpacity style={styles.button} onPress={() => this.dislike()}>
                              <Image  style={styles.foto} source={ { uri:"https://img.icons8.com/material-outlined/24/000000/thumbs-down.png"}}/>
        
                        </TouchableOpacity>
                }
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
                        data={this.props.postData.data.comments}
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
                        style={styles.button}
                        onPress={()=>{this.guardarComentario()}}>
                            <Text style={styles.buttonText}>Guadar comentario</Text>
                        </TouchableOpacity>
                    </View>

                </Modal>    :
                <Text></Text>
            } 
                </View>
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
    imagen: {
        width: '100%',
        height: '15vh',
    },
    foto:{
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
    modalContainer:{
        width:'97%',
        borderRadius:4,
        padding:5,
        backgroundColor: '#fff',
        justifyContent: 'center',
        alignSelf: 'center',
        boxShadow: 'rgb(204 204 204 ) 0px 0px 9px 7px #ccc',
        marginTop: 20,
        marginBottom: 10,
    },
    closeButton:{
        color:'#fff',
        padding:5,
        backgroundColor:'#dc3545',
        alignSelf:'flex-end',
        borderRadius:4,
        paddingHorizontal: 8,
    },
   

})

export default Posteos;
