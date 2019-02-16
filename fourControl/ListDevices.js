import React, { Component } from 'react';
import {
    StyleSheet,
    View,
    Text,
    Picker,
    Slider,
    Switch
} from 'react-native'
import RoomButton from '../components/RoomButton';
import CustomButtom from '../components/CustomButton';
import {
    initializeServices,
    getDevices,
    setDevice
} from '../service/Index';
import CustomSwitch from '../components/CustomSwitch';
import CustomSlider from '../components/CustomSlider';
import {SLIDER_DEVICES, SWITCH_DEVICES} from './Constants';

export default class ListDevices extends Component {

    constructor(props) {
        super(props);
        this.state = {
            room:this.props.navigation.getParam('name'),
            devices:[]
        }
    }

    async componentWillMount() {
        initializeServices();
        await this.recoverDevices();
    }

    async recoverDevices(){
        getDevices(this.state.room, this.updateDevices.bind(this));
    }

    async updateDevices(devices){
        this.setState({
            devices: devices
        });
    }

    openRoom(room) {

    }

    addDevice() {
        this.props.navigation.navigate('AddDevice', {nameRoom:this.state.room})
    }

    updateSwitch = (index) => {
        const {room, devices} = this.state;
        devices[index].value = !devices[index].value;
        this.setState({devices:devices});
        setDevice(room, devices[index]);
    }

    updateSlider = (newValue, index) => {
        const {devices} = this.state;
        devices[index].value = newValue;
        this.setState({devices:devices});
    }

    createDevice(device, index) {
        if (SWITCH_DEVICES.indexOf(device.type) != -1) {
            return (
                <CustomSwitch 
                    label={device.name}
                    value={this.state.devices[index].value}
                    updateValue={this.updateSwitch.bind(this, index)}/>
            );
        }
        if (SLIDER_DEVICES.indexOf(device.type) != -1) {    
            const min = 0;
            const max = 200;
            return (
                <CustomSlider 
                    label={device.name} 
                    minimo={min} 
                    maximo={max}
                    value={this.state.devices[index].value}
                    updateValue={this.updateSlider.bind(this)} />
            );
        }
        return null;
    }

    createDevices(devices) {
        return devices.map(this.createDevice.bind(this));
    }

    render() {
        return (
            <View style={styles.container}>
                {this.createDevices(this.state.devices)}
                <CustomButtom text="Adicionar" onPress = {this.addDevice.bind(this)} />
            </View>
        );
    }
}

const devicesSwitch = ['']

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'flex-start',
    justifyContent: 'center',
    marginLeft:20
  },
});