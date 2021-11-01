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

    componentDidMount() {
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
            
    render() {
        console.log(this.state.posteos);
    console.log(this.props.userData);
        return (
            <>
            <View style={styles.container}>
                <Text>Hola {this.props.userData.email}</Text>
            </View>
            <FlatList 
            data={this.state.posteos}
            keyExtractor={item => item.id.toString()}
            renderItem={({item}) => <Posteo data={item}/>} 
            />
            <TouchableOpacity style={styles.button} onPress={() => this.props.logOut()}>
                <Text style={styles.buttonText}>Log out</Text>
            </TouchableOpacity>
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
        backgroundColor: '#00bfff',
        padding: 10,
        margin: 'auto',
        width: '80%',
        alignItems: 'center',
        borderRadius: 10,
        marginBottom: 20,
    },
    buttonText: {
        color: 'white',
        fontSize: 20,
    },
})


