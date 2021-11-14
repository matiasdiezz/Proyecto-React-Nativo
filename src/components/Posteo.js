
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
        }
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


    
    render(){
    console.log(this.props.data);
        return (
        <View style={styles.container}>
            <Text>{this.props.data.data.title}</Text>
            <Image style={styles.imagen} source={this.props.data.data.foto}></Image>

            <View style={styles.icons}>
            <TouchableOpacity style={styles.likes} > 
            <Text>{this.state.likes}</Text>
            <Image style={styles.foto} source={{  uri: "https://img.icons8.com/material-outlined/24/000000/hearts.png"}}/>
           
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
    }

})

export default Posteos;
