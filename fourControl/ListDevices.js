import React, { Component } from 'react';
import {
    View,
    Text
} from 'react-native'
import CustomButtom from '../components/CustomButton';
import {
    initializeServices,
    requestDevices,
    setDevice,
    releaseDevices
} from '../service/Index';
import CustomSwitch from '../components/CustomSwitch';
import CustomSlider from '../components/CustomSlider';
import {SLIDER_DEVICES, SWITCH_DEVICES} from './Constants';
import {styles} from '../components/Styles';

export default class ListDevices extends Component {

    static navigationOptions = {
        title: 'Lista de dispositivos',
    };

    constructor(props) {
        super(props);
        this.state = {
            room:this.props.navigation.getParam('nameRoom'),
            devices:[]
        }
    }

    async componentWillMount() {
        initializeServices();
        await requestDevices(this.state.room, this.loadDevices.bind(this));
    }

    async componentWillUMount() {
        await releaseDevices();
    }

    loadDevices(device){
        let {devices} = this.state;
        devices.push(device);
        this.setState({
            devices: devices
        });
    }

    addDevice() {
        this.props.navigation.navigate('AddDevice', {nameRoom:this.state.room})
    }

    updateSwitch = async (index) => {
        const {room, devices} = this.state;
        devices[index].value = !devices[index].value;
        this.setState({devices:devices});
        await setDevice(room, devices[index]);
    }

    updateSlider = async (index, newValue) => {
        const {room, devices} = this.state;
        devices[index].value = newValue;
        this.setState({devices:devices});
        await setDevice(room, devices[index]);
    }

    createScene(device, index) {
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
                    updateValue={this.updateSlider.bind(this, index)} />
            );
        }
        return null;
    }

    createDevices(devices) {
        return devices.map(this.createScene.bind(this));
    }

    render() {
        return (
            <View style={styles.container}>
                <Text style={styles.title}>{this.state.room}</Text>
                <View style={styles.containerDevices}>
                    {this.createDevices(this.state.devices)}
                </View>
                <CustomButtom text="Adicionar" onPress = {this.addDevice.bind(this)} />
            </View>
        );
    }
}