import React from 'react'
import { View, Text, StyleSheet } from 'react-native'

function Posteos(props) {
    console.log(props);
    return (
        <View style={styles.posteos}>
            <Text>{props.data.id}</Text>
            <Text>{props.data.title}</Text>
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

})

export default Posteos;
