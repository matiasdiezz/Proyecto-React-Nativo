import React, { Component } from 'react';
import {View, StyleSheet, Text, TextInput, TouchableOpacity} from 'react-native';

class Login extends Component {
  constructor(props) {
    super(props);
    this.state = {
       
    };
}
  navigateToRegister = () => {
    this.props.screenProps.navigation.navigate('Register');
  }
            render() {
                return (
              <View 
                style={styles.container}>
                <Text style={styles.title}>
                  Ingresa a tu cuenta
                  </Text>
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
                <TouchableOpacity
                  style={styles.button}
                  onPress={() => this.props.login(this.state.email, this.state.password)}
                >
                  <Text style={styles.textButton}>Loggear</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.button} onPress={()=> this.navigateToRegister()}>
                  <Text style={styles.textButton}>Registrarse</Text>
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
        

export default Login;
