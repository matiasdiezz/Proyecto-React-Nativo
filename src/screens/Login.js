import React, { Component } from 'react';
import {View, StyleSheet, Text, TextInput, TouchableOpacity, Image} from 'react-native';

class Login extends Component {
  constructor(props) {
    super(props);
    this.state = {
      email: "",
      password: ""
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
                  <Image source={require('../../assets/img/Log-In.png')} style={styles.Foto}/>
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
                <Text style={styles.error}>{this.props.errorMessage}</Text>
                {/* {Button disabled until inputs are filled} */}
                {this.state.email.length > 0 && this.state.password.length > 0 ?
                <TouchableOpacity
                  style={styles.button}
                  onPress={() => this.props.login(this.state.email, this.state.password)}
                >
                  <Text style={styles.textButton}>Loggear</Text>
                </TouchableOpacity>
                :
                <TouchableOpacity
                  style={styles.buttonDisabled}
                  disabled={true}
                >
                  <Text style={styles.textButton}>Loggear</Text>
                </TouchableOpacity>
                }
                <TouchableOpacity style={styles.buttonRegister} onPress={()=> this.navigateToRegister()}>
                  <Text style={styles.textButtonRegister}>Si no tenes cuenta, Registrarse</Text>
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
            buttonRegister: {
              backgroundColor: '#303841',
              padding: 10,
              margin: 10,
              borderRadius: 5,
              

          },
            textButton: {
                color: '#fff',
                textAlign: 'center',
                fontWeight: 'bold',
                fontSize: 20,
            },
            textButtonRegister: {
              color: '#fff',
              textAlign: 'center',
              fontWeight: 'bold',
              fontSize: 12,
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
        

export default Login;
