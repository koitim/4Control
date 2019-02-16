import React from 'react';
import {
  StyleSheet,
  Text,
  Switch,
  View
} from 'react-native';

export default class CustomSwitch extends React.Component {
  
  render() {
    return (
        <View style={styles.container}>
            <Text style={styles.text}>{this.props.label}</Text>
            <Switch 
              onValueChange={this.props.updateValue}
              value={this.props.value}/>
        </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    marginBottom:10
  },
  text: {
    color: '#000',
    fontSize: 20,
    fontWeight: 'bold'
  }
});
