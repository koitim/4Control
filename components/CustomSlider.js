import React from 'react';
import {
  StyleSheet,
  Text,
  Slider,
  View
} from 'react-native';

export default class CustomSlider extends React.Component {
  
  render() {
    return (
        <View style={styles.container}>
            <Text style={styles.text}>{this.props.label}</Text>
            <Slider
                    style={styles.slider}
                    minimumValue={this.props.minimo}
                    maximumValue={this.props.maximo}
                    onSlidingComplete={this.props.updateValue}
                    value={this.props.value}/>
        </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row'
  },
  text: {
    color: '#000',
    fontSize: 20,
    fontWeight: 'bold'
  },
  slider:{
      height: 50,
      width: 200
  }
});