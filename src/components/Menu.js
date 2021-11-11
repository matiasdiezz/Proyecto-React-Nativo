import React, { Component } from 'react';
import {View, StyleSheet} from 'react-native';
import { createDrawerNavigator } from '@react-navigation/drawer';
import Home from '../screens/home';
import Login from '../screens/login';
import Register from '../screens/register';
import { auth, db } from "../firebase/config";
import Formulario from '../screens/Formulario';
import Profile from '../screens/Profile';



const Drawer = createDrawerNavigator();


class Menu extends Component {
    constructor(props) {
        super(props);
        this.state = {
            logged: false,
            userData: [],
        }
    }
    register(email, password) {
        auth
          .createUserWithEmailAndPassword(email, password)
          .then((response) => {
              console.log(response);
              this.setState({ logged: true,
                userData: response
              })
          })
                                    
          .catch((err) => console.log(err));
      }

    login(email, password) {
    auth
    .signInWithEmailAndPassword(email, password)
    .then((response) => {
        console.log(response);
        this.setState({ logged: true,
          userData: response
        })
    })
                            
    .catch((err) => console.log(err));
    }

    logout() {
        auth.signOut()
    }

    componentDidMount() {
        auth.onAuthStateChanged(user => {
            if (user) {
                this.setState({ logged: true,
                    userData: user
                })
            } else {
                this.setState({ logged: false,
                    userData: []
                })
            }
        })
    }

    

    render() {
        return (
            <>
                {this.state.logged ? (
                <Drawer.Navigator>
                    <Drawer.Screen options={{title: 'Profile'}} name="Profile" component={()=><Profile userData={this.state.userData} logOut={()=>this.logout()}/>} />
                    <Drawer.Screen options={{title: 'Home'}} name="Home" component={()=><Home userData={this.state.userData}/>} />
                    <Drawer.Screen options={{title:'Subir Post'}} name="Subir Post" component={()=><Formulario/>} />
                </Drawer.Navigator>
                ) : (
                <Drawer.Navigator>
                    <Drawer.Screen options={{title: 'Login'}} name="Login" component={(screenProps)=><Login login={(email,pass)=>this.login(email,pass)} screenProps={screenProps}/>} />
                    <Drawer.Screen options={{title: 'Register'}} name="Register" component={()=><Register register={(email,pass)=>this.register(email,pass)} />} />
                </Drawer.Navigator>
                )}
            </>
        );
    }
}

const styles = StyleSheet.create({})

export default Menu;
