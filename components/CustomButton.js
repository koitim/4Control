import React from 'react';
import {
  StyleSheet,
  Text,
  TouchableOpacity
} from 'react-native';

export default class CustomButtom extends React.Component {
  
  render() {
    return (
        <TouchableOpacity style={styles.button} onPress={this.props.onPress}>
          <Text style={styles.buttonText}>{this.props.text}</Text>
        </TouchableOpacity>
    );
  }
}

const styles = StyleSheet.create({
  button: {
    height: 45,
    backgroundColor: '#00f',
    alignSelf: 'stretch',
    paddingHorizontal: 30,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 10
  },
  buttonText: {
    color: '#FFF',
    fontWeight: 'bold'
  }
});
