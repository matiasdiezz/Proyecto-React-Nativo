import React, { Component } from 'react';
import {View, StyleSheet, Text, TextInput, TouchableOpacity, Image} from 'react-native';


class Register extends Component {
    constructor(props) {
        super(props);
        this.state = {
          email: "",
          password: "",
          username: "",
        };
    }
    
    render() {
        return (
            <View style={styles.container}>
              <Text style={styles.title}>Crea tu cuenta para poder ingresar</Text>
              <Image style={styles.Foto} source={require('../../assets/img/Register.png')} />
              <TextInput
                onChangeText={(text) => this.setState({ username: text })}
                placeholder="username"
                keyboardType="email-address"
                style={styles.input}
              />
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
              <Text>Rellene el formulario para poder Registrarse</Text>
              {/* When TextInputs are empty, the button is disabled */}
              {this.state.email.length > 0 && this.state.password.length > 0 && this.state.username.length > 0 ?
                <TouchableOpacity style={styles.button}  onPress={() => this.props.register(this.state.email, this.state.password, this.state.username)}>
                  <Text style={styles.textButton}>Registrarse</Text>
                </TouchableOpacity>
                :
                <TouchableOpacity style={styles.buttonDisabled} disabled={true}>
                  
                  <Text style={styles.textButton}>Registrarse</Text>
                </TouchableOpacity>
              }
            </View>
        );
    }              
}

const styles = StyleSheet.create({
    container: {
      flex: 1,
      alignItems: 'center',
      justifyContent: 'center',
      backgroundColor: '#fff',
    },
    title: {
      fontSize: 20,
      marginBottom: 20,
      color: '#303841',
      fontWeight: 'bold',
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
    buttonEnabled: {
      backgroundColor: '#00ADB5',
    },
    buttonDisabled: {
      backgroundColor: '#00ADB5',
      padding: 10,
      margin: 10,
      borderRadius: 5,
      opacity: 0.5,
    },
    Foto: {
      width: 200,
      height: 200,
      marginBottom: 20,
    },
});


export default Register;
