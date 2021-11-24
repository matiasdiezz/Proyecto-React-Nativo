import React, { Component } from 'react';
import {View, StyleSheet, Text, Button, TouchableOpacity, FlatList, ActivityIndicator} from 'react-native';
import { auth,db } from '../firebase/config';
import Posteo from '../components/Posteo';



class Home extends Component {
    constructor(props) {
        super(props);
        this.state = {
            posteos: [],
            loading: true,
            limit: 5,
            verLikes: false,
            verComments: false
        };

    }

showposts(){
    db.collection('posts').orderBy(
        'createdAt', 'desc'
    ).limit(this.state.limit).onSnapshot(
        docs =>{
            let posts = [];
            docs.forEach( doc => {
        posts.push({
        id: doc.id,
        data: doc.data()
        })
            this.setState({
        posteos: posts,
        loading: false,
        verLikes: false,
        verComments: false
            })})}
    )
}

orderMostLikes(){
    db.collection('posts').orderBy(
        'likes', 'desc'
    ).limit(this.state.limit).onSnapshot(
        docs =>{
            let posts = [];
            docs.forEach( doc => {
            posts.push({
            id: doc.id,
            data: doc.data()
            })
            this.setState({
            posteos: posts,
            loading: false,
            verLikes: true
            })})}
    )
}

orderMostComents(){
    db.collection('posts').orderBy(
        'comments', 'desc'
    ).limit(this.state.limit).onSnapshot(
        docs =>{
            let posts = [];
            docs.forEach( doc => {
            posts.push({
            id: doc.id,
            data: doc.data()
            })
            this.setState({
            posteos: posts,
            loading: false,
            verLikes: false,
            verComments: true
            })})}
    )
}

        

    verMasPosts(){
        this.setState({
            limit: this.state.limit + 5
        })
        console.log(this.state.limit);
        this.showposts();
    }

    
        componentDidMount() {
        this.showposts();
    }

    
    
    render() {
        return (
            <>
            {!this.state.loading ? (
            <View style={styles.container}>

                {/* Botones del Home */}
            
                    <View style={styles.header}>
                        <TouchableOpacity style={styles.buttonLikes} onPress={() => this.showposts()}>
                            <Text style={styles.textButtonLikes}>
                                Más Recientes
                            </Text>
                        </TouchableOpacity>
                        <TouchableOpacity style={styles.buttonLikes} onPress={() => this.orderMostLikes()}>
                            <Text style={styles.textButtonLikes}>
                                Más likeados
                            </Text>
                        </TouchableOpacity>
                        <TouchableOpacity style={styles.buttonLikes} onPress={() => this.orderMostComents()}>
                            <Text style={styles.textButtonLikes}>
                                Más comentados
                            </Text>
                        </TouchableOpacity>
                    </View>

                {/* Lista de Posteos */}

                <FlatList
                style={styles.list} 
                data={this.state.posteos}
                keyExtractor={item => item.id.toString()}
                renderItem={({item}) => <Posteo data={item}/>} 
                />
                {!this.state.verLikes && !this.state.verComments ? (
                <TouchableOpacity  style={styles.button} onPress={() => this.verMasPosts()}>
                    <Text style={styles.textButton}>Ver más</Text>
                </TouchableOpacity>
                ) : (
                    <></>
                )}
            </View>
            ):(
                <View style={styles.container}>
                    <ActivityIndicator size="large" color="#0000ff"  style={styles.container}/>
                </View>
            )}
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
        position: 'relative',
        bottom: 0,
        width: '95%',
    },
    buttonLikes: {
        backgroundColor: '#323232',
        padding: 5,
        margin: 10,
        borderRadius: 5,
        width: '25%',
    },

    buttonDisabled: {
        backgroundColor: '#323232',
        padding: 5,
        margin: 10,
        borderRadius: 5,
        width: '40%',
        opacity: 0.5,
    },
    textButton: {
        color: '#fff',
        textAlign: 'center',
        fontWeight: 'bold',
    },
    header: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        width: '100%',
    },
    textButtonLikes: {
        color: '#fff',
        textAlign: 'center',
        fontWeight: 'bold',
        fontSize: 12,
    },
    list: {
        width: '100%',
        height: '100%',
    }
})

