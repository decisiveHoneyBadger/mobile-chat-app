import React, { Component } from 'react';
import { StyleSheet, View, TextInput, Button, Alert, Text } from 'react-native';
import Start from './components/Start';
import Chat from './components/Chat';
import 'react-native-gesture-handler';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

// Create the navigator
const Stack = createStackNavigator();
export default class HelloWorld extends Component {
  constructor(props) {
    super(props);
    this.state = { text: 'Hello Test' };
  }
  alertMyText(input = []) {
    Alert.alert(input.text);
  }

  render() {
    return (
      <NavigationContainer>
        <View style={styles.container}>
          {/* <View style={styles.box1}></View>
        <View style={styles.box2}></View>
        <View style={styles.box3}></View> */}

          {/* <View style={{ flex: 1, justifyContent: 'center' }}>
            <TextInput
              style={{ height: 40, borderColor: 'gray', borderWidth: 1 }}
              onChangeText={(text) => this.setState({ text })}
              value={this.state.text}
              placeholder="Type here ..."
            ></TextInput>
            <Button
              onPress={() => {
                this.alertMyText({ text: this.state.text });
              }}
              title="Press Me"
            />
            <Text>You wrote: {this.state.text}</Text>
          </View> */}
          <Start></Start>
        </View>
      </NavigationContainer>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
  },
  box1: {
    flex: 10,
    backgroundColor: 'blue',
  },
  box2: {
    flex: 120,
    backgroundColor: 'red',
  },
  box3: {
    flex: 50,
    backgroundColor: 'green',
  },
});
