import React, { Component } from 'react';
import {
    View,
    Text
} from 'react-native'
import RoomButton from '../components/RoomButton';
import {styles} from '../components/Styles';

export default class OpenRoom extends Component {

    static navigationOptions = {
        title: 'Ambientes',
    };

    constructor(props) {
        super(props);
        this.state = {
            room:this.props.navigation.getParam('nameRoom')
        }
    }

    listDevices() {
        this.props.navigation.navigate('ListDevice', {nameRoom:this.state.room});
    }

    listScenes() {
        this.props.navigation.navigate('ListScene', {nameRoom:this.state.room});
    }

    render() {
        return (
            <View style={styles.container}>
                <Text style={styles.title}>{this.state.room}</Text>
                <RoomButton text='Dispositivos' onPress={this.listDevices.bind(this)} />
                <RoomButton text='Cenas' onPress={this.listScenes.bind(this)} />
            </View>
        );
    }
}