import React, {Component} from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import Menu from './src/components/Menu';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      email: "",
      password: "",
    };
  }

  
  render() {
  return (
      <NavigationContainer>
      <Menu />
      </NavigationContainer>
  );
}
}

export default App;

const styles = StyleSheet.create({
  
});
