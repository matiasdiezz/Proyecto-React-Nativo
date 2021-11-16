import React, { Component } from 'react'
import { Text, StyleSheet, View, TouchableOpacity, FlatList, Image} from 'react-native'
import { auth,db } from '../firebase/config';
import Posteo from "../components/Posteo"


class Profile extends Component {
    constructor(props) {
        super(props);
        this.state = {
            posteos: [],
            loading: true,
        };

    }

    irAFormulario = () => {
        this.props.screenProps.navigation.navigate('Subir Post');
    }
    showposts(){
        db.collection('posts').where('user','==', auth.currentUser.email).onSnapshot(
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

    componentDidMount(){
        this.showposts();
    }
        
            
    render() {

        console.log(this.props.userData)
        return (
            <View style={styles.container}>
                <Text style={styles.userData}>Bienvenido {this.props.userData.displayName} </Text>
                {this.state.posteos.length > 0 ? (
                    <FlatList
                    data={this.state.posteos}
                    renderItem={({ item }) => <Posteo data={item} />}
                    keyExtractor={item => item.id}
                    />
                ) : (
                <>
                    <Text style={styles.userData}>Todavia no tienes ningún posteo, Crea uno!</Text>
                    <Image source={require('../../assets/img/AddPost.png')} style={styles.Foto} />
                <View style={styles.buttonContainer}>       
                    <TouchableOpacity style={styles.buttonPost} onPress={() => this.irAFormulario()}>
                        <Text style={styles.textButton}>Crear Posteo</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.buttonPost} onPress={() => this.props.screenProps.navigation.navigate('Home')}>
                        <Text style={styles.textButton}>Ver Posts</Text>
                    </TouchableOpacity>
                </View>
                </>
                )}
                <TouchableOpacity style={styles.button} onPress={() => this.props.logOut()}>
                    <Text style={styles.textButton}>Log out</Text>
                </TouchableOpacity>
            </View>
        )
    }
}
export default Profile
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
        position: 'absolute',
        bottom: 0,
    },
    buttonPost: {
        backgroundColor: '#7FC8A9',
        padding: 10,
        margin: 10,
        borderRadius: 5,
        width: '30%',
    },
    textButton: {
        color: '#fff',
        textAlign: 'center',
        fontWeight: 'bold',
    },
    list: {
        width: '100%',
        height: '100%',
    },
    userData: {
        fontSize: 20,
        fontWeight: 'bold',
        margin: 10,
    },
    Foto: {
        width: '300px',
        height: '200px',
        margin: 10,
    },
    buttonContainer: {
        flexDirection: 'row',
        justifyContent: 'center',
        width: '100%',
        marginTop: 10,
    },
})


