import React, { Component } from 'react';
import {View, StyleSheet, Text, TextInput, TouchableOpacity} from 'react-native';


class Register extends Component {
    constructor(props) {
        super(props);
        this.state = {
          email: "",
          password: "",
          userName: ""
        };
    }
    
    render() {
        return (
            <View style={styles.container}>
              <Text style={styles.title}>Crea tu cuenta para poder ingresar</Text>
              <TextInput
                onChangeText={(text) => this.setState({ email: text })}
                placeholder="email"
                keyboardType="email-address"
                style={styles.input}
              />
              <TextInput
                onChangeText={(text) => this.setState({ password: text })}
                placeholder="password"
                keyboardType="email-address"
                secureTextEntry={true}
                style={styles.input}
              />
                 <TextInput
                onChangeText={(text) => this.setState({ username: text })}
                placeholder="username"
                keyboardType="email-address"
                secureTextEntry={false}
                style={styles.input}
              />
              <TouchableOpacity
                style={styles.button}
                onPress={() => this.props.register(this.state.email, this.state.password)}
              >
                <Text style={styles.textButton}>Registrar</Text>
              </TouchableOpacity>
          </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
      flex: 1,
      alignItems: 'center',
      justifyContent: 'center',
      backgroundColor: '#EEEEEE',
    },
    title: {
      fontSize: 20,
      marginBottom: 20,
      color: '#303841',
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
    input: {
      width: 300,
      height: 44,
      padding: 10,
      borderWidth: 1,
      borderColor: '#00ADB5',
      marginBottom: 10,
      borderRadius: 5,
    },
});


export default Register;
