import React, { Component } from 'react';
import {
    View
} from 'react-native';
import RoomButton from '../components/RoomButton';
import CustomButtom from '../components/CustomButton';
import {
    initializeServices,
    requestRooms,
    releaseRooms,
    leave
} from '../service/Index';
import {styles} from '../components/Styles';

export default class ListRooms extends Component {

    static navigationOptions = {
        title: 'Ambientes',
    };

    constructor(props) {
        super(props);
        this.state = {
            rooms:[]
        };
    }

    async componentWillMount() {
        initializeServices();
        await requestRooms(this.reloadRooms.bind(this));
    }

    async componentWillUMount() {
        console.log('saindo rooms');
        await releaseRooms();
    }

    reloadRooms(room){
        let {rooms} = this.state;
        rooms.push(room);
        this.setState({
            rooms: rooms
        });
    }

    openRoom = (room) => { 
        this.props.navigation.navigate('OpenRoom', {nameRoom:room});
    }

    addRoom() {
        this.props.navigation.navigate('AddRoom')
    }

    async exit() {
        await leave();
        this.props.navigation.navigate('Login');
    }

    createButton(room) {
        return <RoomButton text={room} key={room} onPress={this.openRoom.bind(this, room)}/>
    }

    createButtons(rooms) {
        return rooms.map(this.createButton.bind(this));
    }

    render() {
        return (
            <View style={styles.container}>
                {this.createButtons(this.state.rooms)}
                <CustomButtom text="Adicionar" onPress = {this.addRoom.bind(this)} />
                <CustomButtom text="Sair" onPress = {this.exit.bind(this)} />
            </View>
        );
    }
}