import React, { Component } from 'react';
import {View, StyleSheet} from 'react-native';
import { createDrawerNavigator } from '@react-navigation/drawer';
import Home from '../screens/home';
import Login from '../screens/login';
import Register from '../screens/register';
import { auth, db } from "../firebase/config";
import Formulario from '../screens/Formulario';
import Profile from '../screens/Profile';
import Search from '../screens/Search';



const Drawer = createDrawerNavigator();


class Menu extends Component {
    constructor(props) {
        super(props);
        this.state = {
            logged: false,
            userData: [],
            errorMessage: null

        }
    }

    //Register
    register(email, password, username) {
        auth.createUserWithEmailAndPassword(email, password)
        .then((response) => {
            console.log(username);
            response.user.updateProfile({
                displayName: username})
                .then(()=>{
                    this.setState({ logged: true})
                })
        })                    
          .catch((err) => console.log(err));
      }
    
    //Login

    login(email, password) {
    auth
    .signInWithEmailAndPassword(email, password)
    .then((response) => {
        console.log(response);
        this.setState({ logged: true,
          userData: response
        })
    })                       
    .catch((err) => {console.log(err);
    this.setState({ errorMessage: err.message })
    });
    
    }

    //Logout

    logout() {
        auth.signOut()
    }

    //Did Mount
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

            // Drawer navigaror

                <Drawer.Navigator>
                    <Drawer.Screen options={{title: 'Profile'}} name="Profile" component={(screenProps)=><Profile userData={this.state.userData} logOut={()=>this.logout()} screenProps={screenProps}/>} />
                    <Drawer.Screen options={{title: 'Home'}} name="Home" component={()=><Home userData={this.state.userData}  showPost={()=>this.showPost()}  />} />
                    <Drawer.Screen options={{title:'Subir Post'}} name="Subir Post" component={()=><Formulario/>} />
                    <Drawer.Screen options={{title: 'Buscar Posts'}} name="Search" component={()=><Search userData={this.state.userData}/>} />
                </Drawer.Navigator>
                ) : (
                <Drawer.Navigator>
                    <Drawer.Screen options={{title: 'Login'}} name="Login" component={(screenProps)=><Login login={(email,pass)=>this.login(email,pass)} screenProps={screenProps} errorMessage={this.state.errorMessage}/>} />
                    <Drawer.Screen options={{title: 'Register'}} name="Register" component={()=><Register register={(email,pass,username)=>this.register(email,pass,username)} />} />
                </Drawer.Navigator>
                )}
            </>
        );
    }
}

const styles = StyleSheet.create({
    
})

export default Menu;
