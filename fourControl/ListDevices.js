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

export default class ListDevices extends Component {

    static navigationOptions = {
        title: 'Dispositivos',
    };

    constructor(props) {
        super(props);
        const temproom = this.props.navigation.getParam('name');
        console.log(temproom);
        this.state = {
            room:this.props.navigation.getParam('name'),
            language:'',
        }
    }

    componentWillMount() {
        // Recuperar ambientes da base
    }

    openRoom(room) {

    }

    addDevice() {
        this.props.navigation.navigate('Add', {nameRoom:this.state.room})
    }

    render() {
        const min = 0;
        const max = 100;
        const a = true;
        return (
            <View style={styles.container}>
                <Picker
                    selectedValue={this.state.language}
                    style={{height: 50, width: 100}}
                    onValueChange={(itemValue, itemIndex) =>
                        this.setState({language: itemValue})
                    }>
                    <Picker.Item label="Java" value="java" />
                    <Picker.Item label="JavaScript" value="js" />
                </Picker>
                <Slider
                    style={{height: 50, width: 100}}
                    minimumValue={min}
                    maximumValue={max}
                />
                <Switch
                    value={a}
                />
                <RoomButton text='Luz' />
                <CustomButtom text="Adicionar" onPress = {this.addDevice.bind(this)} />
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