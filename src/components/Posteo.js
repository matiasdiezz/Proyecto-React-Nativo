import React from 'react'
import { View, Text, StyleSheet } from 'react-native'

function Posteos(props) {
    console.log(props);
    return (
        <View style={styles.posteos}>
            <Text style={styles.title}>{props.data.data.title}</Text>
            <Text >{props.data.id}</Text>
        </View>
    )
}


const styles = StyleSheet.create({
    posteos: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center',
        border: 1,
        borderColor: '#000',
    },
    title:{
        color: "red",
        
    }

})

export default Posteos;
