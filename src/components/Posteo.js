import React from 'react'
import { View, Text, StyleSheet, Image } from 'react-native'

function Posteos(props) {
    console.log(props);
    return (
        <View style={styles.container}>
            <Text>{props.data.data.title}</Text>
            <Image style={styles.imagen} source={props.data.data.foto}></Image>
        </View>
    )
}


const styles = StyleSheet.create({
    container:{
        flex: 1,
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
    }

})

export default Posteos;
