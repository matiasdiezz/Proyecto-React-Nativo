import React, { Component } from 'react';
import {View, StyleSheet, Text, TextInput, TouchableOpacity} from 'react-native';

class Login extends Component {
            render() {
                return (
              <View>
                <TextInput
                  onChangeText={(text) => this.setState({ email: text })}
                  placeholder="email"
                  keyboardType="email-address"
                />
                <TextInput
                  onChangeText={(text) => this.setState({ password: text })}
                  placeholder="password"
                  keyboardType="email-address"
                  secureTextEntry={true}
                />
                <TouchableOpacity
                  style={styles.button}
                  onPress={() => this.props.login(this.state.email, this.state.password)}
                >
                  <Text style={styles.textButton}>Loggear</Text>
                </TouchableOpacity>
              </View>
                );
            }
        }
        
        const styles = StyleSheet.create({
            button: {
                backgroundColor: '#00b5ec',
                padding: 10,
                margin: 10,
                borderRadius: 5,
            },
            textButton: {
                color: '#fff',
                textAlign: 'center',
                fontWeight: 'bold',
            },
        });
        

export default Login;
