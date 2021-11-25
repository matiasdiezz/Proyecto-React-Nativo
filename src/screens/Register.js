import React, { Component } from 'react';
import {View, StyleSheet, Text, TextInput, TouchableOpacity, Image} from 'react-native';
import Mycamera from '../components/MyCamera';


class Register extends Component {
    constructor(props) {
        super(props);
        this.state = {
          email: "",
          password: "",
          username: "",
          url: "",
          showCamera: false,
        };
    }
  showCamera = () => {
      this.setState({
          showCamera: true,
      })
  }
  onImageUpload(url){
    this.setState({
        url: url,
        showCamera: false,
    })
}

    
    render() {
        return (
          this.state.showCamera ? <Mycamera onImageUpload={(url)=>this.onImageUpload(url)}/> :
            <View style={styles.container}>
              <Text style={styles.title}>Crea tu cuenta para poder ingresar</Text>
              <Image style={styles.Foto} source={require('../../assets/img/Register.png')} />

              {/* Imputs del Register */}
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
              
              {this.state.url ? 
                <View style={styles.inline}>

                {/* Botones del Formulario */}

                    <TouchableOpacity
                    style={styles.buttonActive}
                    disabled={true}>
                        <Text style={styles.textButton}>
                            Subir Foto
                        </Text>                        
                    </TouchableOpacity>
                    <Image  style={styles.icon} source={ { uri:"https://img.icons8.com/external-bearicons-outline-color-bearicons/64/000000/external-verified-reputation-bearicons-outline-color-bearicons.png"}}/>
                </View>
                :
                <TouchableOpacity
                    style={styles.button}
                    onPress={()=> this.showCamera()}
                >
                    <Text style={styles.textButton}>
                        Subir Foto
                    </Text>
                </TouchableOpacity>
                }
              {/* Register button */}
              {this.state.email.length > 0 && this.state.password.length > 0 && this.state.username.length > 0 ?
                <TouchableOpacity style={styles.button}  onPress={() => this.props.register(this.state.email, this.state.password, this.state.username, this.state.url)}>
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
    buttonActive: {
      backgroundColor: '#00ADB5',
      padding: 10,
      margin: 10,
      borderRadius: 5,
      width:'50%',
      opacity: 0.5,
  },  
  icon: {
    width: 30,
    height: 30,
    marginLeft: 10,
    marginHorizontal: 10,
},
inline: {
  alignItems: 'center',
  flexDirection: 'row',
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

