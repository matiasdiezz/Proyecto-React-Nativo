import React, { Component } from 'react'
import { Text, StyleSheet, View,TextInput, FlatList, TouchableOpacity  } from 'react-native'
import { auth,db } from '../firebase/config';
import Posteo from "../components/Posteo";



class Search extends Component {

    constructor(props){
        super(props);
        this.state = {
            posteos: [],
            search: "",
        };
    }
    
    componentDidUpdate(){
        this.getPosteos();
    }
    
    getPosteos(){
    db.collection('posts').where('user','==', this.state.search).onSnapshot(
            docs =>{
             let posts = [];
             docs.forEach( doc => {
            posts.push({
            id: doc.id,
            data: doc.data()
            })
             this.setState({
            posteos: posts,
             })})}
        )
    }

    render() {
        return (
            <View style={styles.container}>
                <TextInput
                onChangeText={(text) => this.setState({search: text })}
                placeholder="Post Title"
                keyboardType="email-address"
                style={styles.input}
              />
            
                <FlatList
            style={styles.list} 
            data={this.state.posteos}
            keyExtractor={item => item.id.toString()}
            renderItem={({item}) => <Posteo data={item}/>} 
            />
            </View>
        )
    }
}

export default Search

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'white',
        alignItems: 'center',
        textAlign: 'center',
        width: '100%',
    },
    input: {
        width: 300,
        height: 44,
        padding: 10,
        borderWidth: 1,
        borderColor: '#00ADB5',
        marginTop: 10,
        marginBottom: 10,
        borderRadius: 5,
      },
      list: {
        width: '100%',
        height: '100%',
    },
    button: {
        backgroundColor: '#00ADB5',
        padding: 10,
        margin: 10,
        borderRadius: 5,
    }, 
    textButton: {
        color: '#fff',
        textAlign: 'center',
        fontWeight: 'bold',
    },
    
})
