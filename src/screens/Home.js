import React, { Component } from 'react';
import {View, StyleSheet, Text, Button, TouchableOpacity, FlatList} from 'react-native';
import { auth,db } from '../firebase/config';
import Posteo from '../components/Posteo';


class Home extends Component {

    
    constructor(props) {
        super(props);
        this.state = {
            posteos: [],
            loading: true,
        };

    }

    showposts(){
        db.collection('posts').onSnapshot(
            docs =>{
             let posts = [];
             docs.forEach( doc => {
            posts.push({
            id: doc.id,
            data: doc.data()
            })
             this.setState({
            posteos: posts,
            loading: false
             })})}
        )
            }
        

    
            
    componentDidMount() {
        this.showposts();
    }

    
    
    render() {
        return (
            <>
            <FlatList
            style={styles.list} 
            data={this.state.posteos}
            keyExtractor={item => item.id.toString()}
            renderItem={({item}) => <Posteo data={item}/>} 
            />
            
            </>
        );
    }
}
    export default Home;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'white',
        alignItems: 'center',
        textAlign: 'center',
        width: '100%',
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
    list: {
        width: '100%',
        height: '100%',
    }
})


