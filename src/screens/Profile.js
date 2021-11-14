import React, { Component } from 'react'
import { Text, StyleSheet, View, TouchableOpacity} from 'react-native'

class Profile extends Component {
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
    render() {
        console.log(this.props.userData)
        return (
            <View>
                <Text> {this.props.userData.displayName} </Text>
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
    },
    textButton: {
        color: '#fff',
        textAlign: 'center',
        fontWeight: 'bold',
    },
})


