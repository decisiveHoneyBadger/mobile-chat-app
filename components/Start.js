import React from 'react';
import {
  StyleSheet,
  View,
  TextInput,
  Pressable,
  Text,
  ImageBackground,
  Image,
} from 'react-native';
import Colors from './Colors';

import logo from '../assets/background.png';
import icon from '../assets/icon.svg';
export default class Start extends React.Component {
  constructor(props) {
    super(props);
    this.navigation = this.props.navigation;
  }

  render() {
    return (
      <ImageBackground
        source={logo}
        resizeMode="cover"
        style={styles.background}
      >
        <View style={styles.container}>
          <Text style={styles.title}>App Title</Text>
          <View style={styles.login}>
            <View style={styles.name}>
              <Image style={styles.icon} source={icon} />
              <TextInput
                style={styles.formInput}
                onChangeText={(name) => this.props.setName(name)}
                value={this.props.name}
                placeholder="Your name"
                opacity={0.5}
              />
            </View>
            <Colors color={this.props.color} setColor={this.props.setColor} />
            <Pressable
              style={styles.startChatting}
              onPress={() => {
                this.navigation.navigate('Chat');
              }}
            >
              <Text style={styles.startChattingText}>Start Chatting</Text>
            </Pressable>
          </View>
        </View>
      </ImageBackground>
    );
  }
}

const styles = StyleSheet.create({
  background: {
    flex: 1,
  },
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  title: {
    fontSize: 45,
    fontWeight: 600,
    color: '#fff',
    // margin: 'auto',
    // marginTop: '20%',
  },
  login: {
    width: '88%',
    height: '44%',
    justifyContent: 'space-between',
    backgroundColor: '#fff',
    // margin: '10%',
    padding: '2rem',
  },
  name: {
    border: '2px solid #555',
    padding: '0.75rem',
    display: 'flex',
    borderRadius: '4px',
    flexWrap: 'wrap',
    flexDirection: 'row',
  },
  icon: {
    height: 20,
    width: 20,
    // display: 'inline-block',
    // marginRight: 10,
  },
  formInput: {
    // display: 'inline-block',
    fontSize: 16,
    fontWeight: 300,
    fontColor: '#757083',
    opactity: 0.5,
    lineHeight: 2,
    // margin: '2rem 0',
  },
  startChatting: {
    fontSize: 16,
    fontWeight: 600,
    color: 'red',
    backgroundColor: '#757083',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 12,
    paddingHorizontal: 32,
    borderRadius: 4,
    elevation: 3,
  },
  startChattingText: {
    fontSize: 16,
    lineHeight: 21,
    fontWeight: 'bold',
    letterSpacing: 0.25,
    color: 'white',
  },
});
