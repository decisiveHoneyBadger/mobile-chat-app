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

// navigates the home screen
export default class Start extends React.Component {
  constructor(props) {
    super(props);
    this.navigation = this.props.navigation;
  }

  // renders the elements on the start screen like, login form, colors, and the button
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
              {/* <Image style={styles.icon} source={icon} /> */}

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

// style sheets for the elements - just below render()
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
    color: '#fff',
    marginTop: '20%',
  },
  textInputBorder: {
    backgroundColor: '#efefef',
    padding: 1,
    width: '100%',
  },
  login: {
    width: '88%',
    justifyContent: 'space-between',
    backgroundColor: '#fff',
    margin: '10%',
    padding: 16,
  },
  name: {
    height: 40,
    borderWidth: 1,
    borderRadius: 4,
    padding: 10,
    marginBottom: 8,
  },
  icon: {
    height: 20,
    width: 20,
    marginRight: 10,
  },
  formInput: {
    width: '100%',
    color: '#000',
  },
  startChatting: {
    fontSize: 16,
    fontWeight: 600,
    color: '#ffff00',
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
    fontWeight: 'bold',
    color: '#fff',
  },
});
