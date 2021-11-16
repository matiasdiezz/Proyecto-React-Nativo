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
            limit: 5,
            verLikes: false
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
            verLikes: false
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
            <View style={styles.container}>
            {!this.state.verLikes ? (
                <View style={styles.header}>
                    <TouchableOpacity style={styles.buttonLikes} onPress={() => this.orderMostLikes()}>
                        <Text style={styles.textButtonLikes}>
                            Ver los más likeados
                        </Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.buttonDisabled} onPress={() => this.showposts()} disabled={true}>
                        <Text style={styles.textButtonLikes}>
                            Ver los más Recientes
                        </Text>
                    </TouchableOpacity>
                </View>
                    ):(
                <View style={styles.header}>
                        <TouchableOpacity style={styles.buttonDisabled} onPress={() => this.orderMostLikes()} disabled={true}>
                        <Text style={styles.textButtonLikes}>
                            Ver los más likeados
                        </Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.buttonLikes} onPress={() => this.showposts()}>
                        <Text style={styles.textButtonLikes}>
                            Ver los más Recientes
                        </Text>
                    </TouchableOpacity>
                </View>
            )}
            <FlatList
            style={styles.list} 
            data={this.state.posteos}
            keyExtractor={item => item.id.toString()}
            renderItem={({item}) => <Posteo data={item}/>} 
            />
            {!this.state.verLikes ? (
            <TouchableOpacity  style={styles.button} onPress={() => this.verMasPosts()}>
                <Text style={styles.textButton}>Ver más</Text>
            </TouchableOpacity>
            ) : (
            <></>
            )}
            </View>
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
    buttonLikes: {
        backgroundColor: '#00ADB5',
        padding: 5,
        margin: 10,
        borderRadius: 5,
        width: '40%',
    },
    buttonDisabled: {
        backgroundColor: '#0D7377',
        padding: 5,
        margin: 10,
        borderRadius: 5,
        width: '40%',
        opacity: 0.5,
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


