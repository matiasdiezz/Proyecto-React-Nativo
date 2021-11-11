import React from 'react'
import { View, Text, StyleSheet } from 'react-native'

function Posteos(props) {
    console.log(props);
    return (
        <View style={styles.posteos}>
            <Text>{props.data[0].id}</Text>
            <Text>{props.data[0].title}</Text>
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
