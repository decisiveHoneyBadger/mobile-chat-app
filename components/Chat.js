import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { GiftedChat, Bubble } from 'react-native-gifted-chat';
import { Platform, KeyboardAvoidingView } from 'react-native';

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

    // Initialize Firebase
    const app = initializeApp(firebaseConfig);
    const analytics = getAnalytics(app);
    this.referenceChatMessages = firebase.firestore().collection('messages');
    // firebase.firestore().collection('messages');
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
        user: data.user,
      });
      this.setState({
        messages: messages,
      });
    });
  };

  componentDidMount() {
    this.referenceMessageLists = firebase.firestore().collection('messages');
    this.unsubscribe = this.referenceMessageLists.onSnapshot(
      this.onCollectionUpdate,
    );

    this.setState({
      messages: [
        {
          _id: 1,
          text:
            'Hello ' + this.props.route.params.name + '\nYou have entered chat',
          createdAt: new Date(),
          user: {
            _id: 2,
            name: 'React Native',
            avatar: 'https://placeimg.com/140/140/any',
          },
        },
        {
          _id: 2,
          text: 'This is a system message',
          createdAt: new Date(),
          system: true,
        },
      ],
    });

    this.authUnsubscribe = firebase.auth().onAuthStateChanged(async (user) => {
      if (!user) {
        await firebase.auth().signInAnonymously();
      }

      //update user state with currently active user data
      this.setState({
        uid: user.uid,
        loggedInText: 'Hello there',
      });
    });
  }

  // sends the input messages
  onSend(messages = []) {
    // this.setState((previousState) => ({
    //   messages: GiftedChat.append(previousState.messages, messages),
    // }));

    this.referenceMessageLists.add({
      name: 'TestList',
      items: ['eggs', 'pasta', 'veggies'],
    });
  }

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

  render() {
    return (
      <View style={[styles.container, { backgroundColor: this.props.color }]}>
        <GiftedChat
          renderBubble={this.renderBubble.bind(this)}
          messages={this.state.messages}
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
