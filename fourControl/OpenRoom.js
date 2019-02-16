import React, { Component } from 'react';
import {
    StyleSheet,
    View,
    Text
} from 'react-native'
import RoomButton from '../components/RoomButton';

export default class OpenRoom extends Component {

    static navigationOptions = {
        title: 'Ambientes',
    };

    componentWillMount() {
        // Recuperar ambientes da base
    }

    openRoom(room) {

    }

    render() {
        return (
            <View style={styles.container}>
                <RoomButton text='Suíte' onPress={this.openRoom.bind(this, 1)} />
                <RoomButton text='Quarto' />
                <RoomButton text='Gabinete' />
                <RoomButton text='Sala' />
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