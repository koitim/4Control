import React, { Component } from 'react';
import {
    View,
    StyleSheet,
    Text,
    TextInput
} from 'react-native';
  

export default class CustomInput extends Component {

    render() {
        return (
            <View style={styles.container}>
                <Text style={styles.errorText}>{this.props.errorMessage}</Text>
                <TextInput
                    style={this.props.style}
                    placeholder={this.props.label}
                    value={this.props.value}
                    onChangeText={this.props.onChange}
                    secureTextEntry={this.props.password} />
            </View>
        );
    }
}


const styles = StyleSheet.create({
    container: {
        justifyContent: 'center',
        alignItems: 'flex-start',
        alignSelf: 'stretch',
        backgroundColor: '#333'
    },
    errorText: {
        color: '#F00',
        fontWeight: 'bold'
    }
});