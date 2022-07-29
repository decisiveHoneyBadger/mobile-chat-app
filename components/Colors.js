import React from 'react';
import {
  StyleSheet,
  View,
  TextInput,
  Pressable,
  Text,
  ImageBackground,
} from 'react-native';

// optional background colors for the user in Start.js
const color1 = '#000000';
const color2 = '#484058';
const color3 = '#8795a7';
const color4 = '#b6c7ac';

// it provides the color pallet for the login screen
export default class Colors extends React.Component {
  constructor(props) {
    super(props);
  }

  isActive(color) {
    return this.props.color === color ? styles.isActive : null;
  }

  setColor(color) {
    this.props.setColor(color);
  }

  // renders the optional colors in the start screen
  render() {
    return (
      <View>
        <Text style={styles.colorsText}>Choose Background Color:</Text>
        <View style={styles.colors}>
          <Pressable
            style={[styles.color, styles.color1, this.isActive(color1)]}
            onPress={() => {
              this.setColor(color1);
            }}
          ></Pressable>
          <Pressable
            style={[styles.color, styles.color2, this.isActive(color2)]}
            onPress={() => this.setColor(color2)}
          ></Pressable>
          <Pressable
            style={[styles.color, styles.color3, this.isActive(color3)]}
            onPress={() => this.setColor(color3)}
          ></Pressable>
          <Pressable
            style={[styles.color, styles.color4, this.isActive(color4)]}
            onPress={() => {
              this.setColor(color4);
            }}
          ></Pressable>
        </View>
      </View>
    );
  }
}

// style sheets for the elements - including the colors
const styles = StyleSheet.create({
  colorsText: {
    fontSize: 16,
    color: '#484058',
    marginBottom: 8,
  },
  colors: {
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    flexDirection: 'row',
    marginBottom: 20,
  },
  color: {
    height: 50,
    borderRadius: 50,
    width: 50,
  },
  isActive: {
    borderColor: '#ff0000',
    borderWidth: 4,
  },
  color1: {
    backgroundColor: color1,
  },
  color2: {
    backgroundColor: color2,
  },
  color3: {
    backgroundColor: color3,
  },
  color4: {
    backgroundColor: color4,
  },
});
