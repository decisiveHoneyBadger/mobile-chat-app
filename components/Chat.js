import { identity } from 'lodash';
import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  Platform,
  KeyboardAvoidingView,
} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import NetInfo from '@react-native-community/netinfo';
import { GiftedChat, Bubble, InputToolbar } from 'react-native-gifted-chat';
import firebase from 'firebase';
import 'firebase/firestore';

import CustomActions from './CustomActions';
let styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});

export default class Chat extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      messages: [],
      uid: 0,
      user: {
        _id: '',
        name: '',
        avatar: '',
      },
      isConnected: false,
    };

    const firebaseConfig = {
      apiKey: 'AIzaSyCKru1G-kZ111ndZYYfioIF2mPCBKa_J18',
      authDomain: 'test-9484b.firebaseapp.com',
      projectId: 'test-9484b',
      storageBucket: 'test-9484b.appspot.com',
      messagingSenderId: '134557517715',
      appId: '1:134557517715:web:502ae94b90a5089e7d4a66',
      measurementId: 'G-ZZ1XW6F0P1',
    };

    if (!firebase.apps.length) {
      firebase.initializeApp(firebaseConfig);
    }

    this.referenceChatMessages = firebase.firestore().collection('messages');
  }

  onCollectionUpdate = (querySnapshot) => {
    const messages = [];
    // go through each document
    querySnapshot.forEach((doc) => {
      // get the QueryDocumentSnapshot's data
      let data = doc.data();
      messages.push({
        _id: data._id,
        text: data.text,
        createdAt: data.createdAt.toDate(),
        user: {
          _id: data.user._id,
          name: data.user.name,
          avatar: data.location || null,
        },
        image: data.image || null,
        locastion: data.location || null,
      });
      this.setState({
        messages: messages,
      });
    });
  };

  // sets the condition for retrieving chat messages
  async getMessages() {
    let messages = '';
    try {
      messages = (await AsyncStorage.getItem('messages')) || [];
      this.setState({
        messages: JSON.parse(messages),
      });
    } catch (error) {
      console.log(error.message);
    }
  }

  componentDidMount() {
    this.getMessages();
    // checks the user's connection status. If connected it fetches the data from Firestore. If not, it does from asyncStorage (locally on user's device)
    NetInfo.fetch().then((connection) => {
      if (connection.isConnected) {
        this.setState({
          isConnected: true,
        });
        this.authUnsubscribe = firebase.auth().onAuthStateChanged((user) => {
          if (!user) {
            firebase.auth().signInAnonymously();
          } else {
            this.setState({
              uid: user.uid,
              messages: [],
            });
            this.unsubscribe = this.referenceChatMessages
              .orderBy('createdAt', 'desc')
              .onSnapshot(this.onCollectionUpdate);
          }
        });

        // create a reference to the active user's documents (shopping lists)
        this.referenceMessagelistUser = firebase
          .firestore()
          .collection('messages')
          .where('uid', '==', this.state.uid);

        this.referenceMessageLists = firebase
          .firestore()
          .collection('messages');
        this.unsubscribe = this.referenceMessageLists.onSnapshot(
          this.onCollectionUpdate,
        );
      } else {
        console.log('offline');
      }
    }); // retrieves chat messages

    // this.setState({
    //   messages: [
    //     {
    //       _id: 1,
    //       text:
    //         'Hello ' + this.props.route.params.name + '\nYou have entered chat',
    //       createdAt: new Date(),
    //       user: {
    //         _id: 2,
    //         name: 'React Native',
    //         avatar: 'https://placeimg.com/140/140/any',
    //       },
    //     },
    //     {
    //       _id: 2,
    //       text: 'This is a system message',
    //       createdAt: new Date(),
    //       system: true,
    //     },
    //   ],
    // });
  }

  // when offline, it disables the user from writing messages by hiding the input bar
  renderInputToolbar(props) {
    if (this.state.isConnected == false) {
    } else {
      return <InputToolbar {...props} />;
    }
  }
  //stops listening to authentication and collection changes
  componentWillUnmount() {
    NetInfo.fetch().then((connection) => {
      if (connection.isConnected) {
        this.unsubscribe();
        this.authUnsubscribe();
      } else {
        console.log('offline');
      }
    });
  }

  // sends the input messages (to the state)
  onSend(messages = []) {
    this.setState(
      (previousState) => ({
        messages: GiftedChat.append(previousState.messages, messages),
      }),
      () => {
        this.saveMessages(); // callback function - saves the current state once the state object is updated
        NetInfo.fetch().then((connection) => {
          if (connection.isConnected) {
            this.addMessages();
          } else {
            console.log('offline');
          }
        });
      },
    );
  }

  // saves the retrieved messages
  async saveMessages() {
    try {
      await AsyncStorage.setItem(
        'messages',
        JSON.stringify(this.state.messages), // converts the messages ibto a string
      );
    } catch (error) {
      console.log(error.message);
    }
  }

  // deletes any saved messages
  async deleteMessages() {
    try {
      await AsyncStorage.removeItem('messages');
      this.setState({
        messages: [],
      });
    } catch (error) {
      console.log(error.message);
    }
  }

  //adds message to firetore
  addMessages = () => {
    const message = this.state.messages[0];
    this.referenceChatMessages.add({
      uid: this.state.uid,
      _id: message._id,
      text: message.text || '',
      createdAt: message.createdAt,
      user: message.user,
      image: message.image || null,
      location: message.location || null,
    });
  };

  // formats the bubble with css
  renderBubble(props) {
    return (
      <Bubble
        {...props}
        wrapperStyle={{
          right: {
            backgroundColor: '#000',
            padding: 8,
          },
        }}
      />
    );
  }

  renderCustomActions(props) {
    return <CustomActions {...props} />;
  }

  render() {
    return (
      <View style={[styles.container, { backgroundColor: this.props.color }]}>
        <GiftedChat
          renderBubble={this.renderBubble.bind(this)}
          messages={this.state.messages}
          renderActions={this.renderCustomActions.bind(this)}
          renderInputToolbar={this.renderInputToolbar.bind(this)}
          onSend={(messages) => this.onSend(messages)}
          user={{
            _id: 1,
          }}
        />
        {Platform.OS === 'android' ? (
          <KeyboardAvoidingView behavior="height" />
        ) : null}
        <Text>{this.state.loggedInText}</Text>
      </View>
    );
  }
}
