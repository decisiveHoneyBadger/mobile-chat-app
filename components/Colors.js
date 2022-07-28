import React from 'react';
import {
  StyleSheet,
  View,
  TextInput,
  Pressable,
  Text,
  ImageBackground,
} from 'react-native';

const color1 = '#000000';
const color2 = '#484058';
const color3 = '#8795a7';
const color4 = '#b6c7ac';

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

const styles = StyleSheet.create({
  colorsText: {
    fontSize: '16',
    fontWeight: '300',
    fontColor: '#757083',
    marginBottom: '1rem',
  },
  colors: {
    // display: 'flex',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    flexDirection: 'row',
    maxWidth: '300px',
  },
  color: {
    height: '50px',
    borderRadius: '50px',
    width: '50px',
  },
  isActive: {
    border: 'red 3px solid',
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
