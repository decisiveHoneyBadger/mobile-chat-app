import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { GiftedChat } from 'react-native-gifted-chat';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
});

export default class Chat extends React.Component {
  constructor(props) {
    super(props);
    this.mainColor = this.props.mainColor;
  }

  render() {
    return (
      <View style={[styles.container, { backgroundColor: this.props.color }]}>
        <Text style={{ color: this.mainColor }}>Hello Screen2!</Text>
        <Text style={{ color: this.mainColor }}>Color: {this.props.color}</Text>
        <Text style={{ color: this.mainColor }}>Name: {this.props.name}</Text>
      </View>
    );
  }
}
