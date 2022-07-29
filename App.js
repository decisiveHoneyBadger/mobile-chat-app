import React, { Component } from 'react';
import { StyleSheet, View, TextInput, Button, Alert, Text } from 'react-native';
import Start from './components/Start';
import Chat from './components/Chat';
import 'react-native-gesture-handler';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

// variable to switch the screens
const Stack = createStackNavigator();

// it incorporates all the necessarry components displayed in the app
export default class HelloWorld extends Component {
  constructor(props) {
    super(props);
    this.state = {
      name: '',
      color: '',
    };
  }

  setColor(color) {
    this.setState({
      ...this.state,
      color,
    });
  }

  setName(name) {
    this.setState(
      {
        ...this.state,
        name,
      },
      () => {
        console.log('### this.state: ', this.state);
      },
    );
  }

  getMainColor() {
    if (this.state.color === '#000000' || this.state.color === '#484058') {
      return '#ffffff';
    }

    return '#000000';
  }

  // renders all the elements of the app that should be displayed
  render() {
    return (
      <NavigationContainer>
        <Stack.Navigator initialRouteName="Start">
          <Stack.Screen name="Start">
            {(props) => (
              <Start
                {...props}
                color={this.state.color}
                setColor={this.setColor.bind(this)}
                name={this.state.name}
                setName={this.setName.bind(this)}
              />
            )}
          </Stack.Screen>
          <Stack.Screen
            name="Chat"
            options={{
              title: this.state.name,
              headerStyle: {
                backgroundColor: this.state.color,
              },
              headerTintColor: this.getMainColor(),
            }}
          >
            {(props) => (
              <Chat
                {...props}
                color={this.state.color}
                name={this.state.name}
                mainColor={this.getMainColor()}
              />
            )}
          </Stack.Screen>
        </Stack.Navigator>
      </NavigationContainer>
    );
  }
}
