import React, { Component } from 'react'
import { Text, StyleSheet, View, TouchableOpacity, FlatList, Image, ActivityIndicator} from 'react-native'
import { auth,db } from '../firebase/config';
import Posteo from "../components/Posteo"


class Profile extends Component {
    constructor(props) {
        super(props);
        this.state = {
            posteos: [],
            loading: true,
            lastVisible: this.props.userData.metadata.lastSignInTime,
            showCamera: false,
        };
    }

    irAFormulario = () => {
        this.props.screenProps.navigation.navigate('Subir Post');
    }

    showposts(){
        db.collection('posts').where('user','==', auth.currentUser.displayName).onSnapshot(
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
             })
            })}
        )
    }

    componentDidMount(){{
        this.showposts()}   
        this.setState({
        loading: false, 
        })
    }

    borrarPost = (id) => {
        db.collection('posts').doc(id).delete()
        this.showposts();

    }

    render() {
        console.log(this.props.userData);
        return (
            <>
             {!this.state.loading ? (
            <View style={styles.container}>
                {/* Datos del usuario */}
            
                <View style={styles.datos}>
                {this.props.userData.photoURL != null ? (
                    <Image style={styles.avatar} source={{uri: this.props.userData.photoURL}} />
                    ) : (
                    <Image style={styles.avatarRandom} source={require( '../../assets/img/user.png')}/>
                )}
                <Text style={styles.userData}>🤖 {this.props.userData.displayName} </Text>
                </View>
                <Text style={styles.userDataSecundaria}>📩: {this.props.userData.email} </Text>
                <Text style={styles.userDataSecundaria}>🖥:  {this.state.lastVisible} </Text>
                <Text style={styles.userDataSecundaria}>Cantidad de posteos: {this.state.posteos.length} </Text>

                {/* Lista de Posteos del usuario */}
                <TouchableOpacity style={styles.button} onPress={() => this.props.logOut()}>
                    <Text style={styles.textButton}>Log out</Text>
                </TouchableOpacity>
                  
                {this.state.posteos.length > 0 ? (
                <View style={styles.posteos}>
                    <FlatList
                    data={this.state.posteos}
                    renderItem={({ item }) => <><Posteo data={item}/> 
                    <TouchableOpacity style={styles.buttonBorrar} onPress={() => this.borrarPost(item.id)}>
                        <Text>Eliminar</Text>
                    </TouchableOpacity>
                    </>
                    }
                    keyExtractor={item => item.id}
                    />
                 </View> 
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
                
                
            </View>
            ) : (
            <View style={styles.container}>
                <ActivityIndicator size="large" color="#0000ff" style={styles.ActivityIndicator} />
            </View>
            )}
            </>
        )
    }
}
export default Profile
const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'white',
        alignItems: 'left',
        textAlign: 'center',
        width: '100%',
    },
    datos: {
        backgroundColor: 'white',
        alignItems: 'center',
        textAlign: 'center',
        width: '100%',
        
    },
    avatar: {
        width: 100,
        height: 100,
        borderRadius: 50,
        borderWidth: 1,
        borderColor: '#00ADB5',
        marginBottom: 10,
        marginTop: 10,
        shadowColor: '#00ADB5',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 1.8,
        shadowRadius: 2,
    },
    avatarRandom: {
        width: 100,
        height: 100,
        borderRadius: 50,
        borderWidth: 1,
        borderColor: '#00ADB5',
        margin:10,
        shadowColor: 'black',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 1.8,
        shadowRadius: 2,
    },

    ActivityIndicator: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        height: 80
    },
    posteos: {
        width: '100%',
        marginTop: 20,
        height: '100%',
    },
    button: {
        backgroundColor: '#00ADB5',
        padding: 10,
        margin: 10,
        borderRadius: 5,
        position: 'relative',
        bottom: 0,
    },
    buttonPost: {
        backgroundColor: '#7FC8A9',
        padding: 10,
        margin: 10,
        borderRadius: 5,
        width: '30%',
    },
    buttonBorrar: {
        backgroundColor: '#FF6B6B',
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
        textAlign: 'Center',
    },
    userDataSecundaria: {
        fontSize: 15,
        margin: 10,
        textAlign: 'left',
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