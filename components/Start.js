import React from 'react';
import { StyleSheet, View, TextInput, Button, Alert, Text } from 'react-native';

export default class Start extends React.Component {
  constructor(props) {
    super(props);
    this.state = { text: 'Hello Test' };
  }

  render() {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        {/* <Text>Hello Screen1!</Text>
        <Button
          title="Go to Screen 2"
          onPress={() => this.props.navigation.navigate('Screen2')}
        /> */}
        {/* <View style={{ flex: 1, justifyContent: 'center' }}> */}
        <TextInput
          style={styles.formInput}
          onChangeText={(text) => this.setState({ text })}
          value={this.state.text}
          placeholder="Your name"
        ></TextInput>
        <Button
          onPress={() => {
            this.alertMyText({ text: this.state.text });
          }}
          title="Start chatting"
        />
        <Text>You wrote: {this.state.text}</Text>
        {/* </View> */}
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
  },
  formInput: {
    fontSize: 16,
    fontWeight: 300,
    fontColor: '#757083',
    opactity: '50%',
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
