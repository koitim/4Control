import React, { Component } from 'react';
import {
    StyleSheet,
    View,
    Text
} from 'react-native'
import RoomButton from '../components/RoomButton';

export default class ListScenes extends Component {

    static navigationOptions = {
        title: 'Cenas',
    };

    componentWillMount() {
        // Recuperar ambientes da base
    }

    openRoom(room) {

    }

    render() {
        return (
            <View style={styles.container}>
                <RoomButton text='Dormir' onPress={this.openRoom.bind(this, 1)} />
                <RoomButton text='Acordar' />
                <RoomButton text='Cinema' />
            </View>
        );
    }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#000',
    alignItems: 'center',
    justifyContent: 'center',
  },
});