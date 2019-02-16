import React, { Component } from 'react';
import {
    StyleSheet,
    View,
    Text,
    TouchableOpacity
} from 'react-native';
import RoomButton from '../components/RoomButton';
import CustomButtom from '../components/CustomButton';
import {
    initializeServices,
    fetcherRooms
} from '../service/Index';

export default class ListRooms extends Component {

    static navigationOptions = {
        title: 'Ambientes',
    };

    constructor(props) {
        super(props);
        this.state = {rooms:[]};
    }

    async componentWillMount() {
        initializeServices();
        await this.recoverRooms();
    }

    async recoverRooms(){
        fetcherRooms(this.updateRooms.bind(this));
    }

    async updateRooms(rooms){
        this.setState({
            rooms: rooms
        });
    }

    openRoom = (room) => { 
        this.props.navigation.navigate('ListDevice', {name:room});
    }

    addRoom() {
        this.props.navigation.navigate('AddRoom')
    }

    createButton(room) {
        //return <RoomButton text={room} onPress={this.openRoom(room)}/>
        //return <RoomButton text={room} onPress={(room) => {this.openRoom(room)}}/>
        //return <RoomButton text={room} key={'btn-' + room} onPress={this.openRoom.bind(this, room)}/>
        //return <RoomButton key={room} text={room} onPress={() => {this.props.navigation.navigate('Tab')}}/>
        return (<RoomButton key={room} text={room}/>);
    }

    createButtons(rooms) {
        //rooms.map()
        return rooms.map(this.createButton);
    }

    render() {
        return (
            <View style={styles.container}>
                <RoomButton text='Gabinete' onPress={this.openRoom.bind(this, 'Gabinete')}/>
                <RoomButton text='Sala' onPress={this.openRoom.bind(this, 'Sala')}/>
                <RoomButton text='Suíte' onPress={this.openRoom.bind(this, 'Suíte')}/>
                <RoomButton text='Quarto' onPress={this.openRoom.bind(this, 'Quarto')}/>
                <CustomButtom text="Adicionar" onPress = {this.addRoom.bind(this)} />
            </View>
        );
    }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});