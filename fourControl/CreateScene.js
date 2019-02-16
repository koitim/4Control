import React from 'react';
import {
  View,
  Alert,
  Picker,
  Text
} from 'react-native';
import CustomInput from '../components/CustomInput';
import CustomButton from '../components/CustomButton';
//import LogoMarvel       from '../componentes/LogoMarvel';
import {
    initializeServices,
    createUser,
    addDevice,
    getDevices
} from '../service/Index';
import {styles} from '../components/Styles';
import { SWITCH_DEVICES } from './Constants';



export default class CreateScene extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      room: this.props.navigation.getParam('nameRoom'),
      nameScene: '',
      nameSceneInputStyle: styles.input,
      nameSceneErrorMessage: '',
      typeDevice: '1',
      devices:[]
    };
  }

  async componentWillMount() {
    initializeServices();
    await this.recoverDevices();
  }

  async recoverDevices(){
      console.log('indo recuperar dispositivos do ambiente ' + this.state.room);
      await getDevices(this.state.room, this.updateDevices.bind(this));
  }

  updateDevices(devices){
    console.log('antes: ' + devices);

    devices.forEach(device => {
      if (SWITCH_DEVICES.indexOf(device.type) != -1) {
        device.value = false;
      } else {
        device.value = 0
      }
    });
    console.log('depois: ' + devices);
      this.setState({
          devices: deviçpces
      });
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
        <CustomInput
          errorMessage={this.state.nameSceneErrorMessage}
          style={this.state.nameSceneInputStyle}
          label="Digite o nome da cena:"
          value={this.state.nameScene}
          onChange={nameScene => this.setState({nameScene})}
          password={false}
        />
        {this.createDevices(this.state.devices)}
        <CustomButton text="Adicionar" onPress = {this.add} />
        <CustomButton text="Cancelar" onPress = {this.goBack} />
      </View>
    );
  }

  goBack = () => {
    this.props.navigation.goBack();
  }

  resultAdd(error) {
    if (error == null) {
      Alert.alert(
        'Resultado',
        'Dispositivo adicionado com sucesso!',
        [{text: 'OK'}],
        {cancelable: false},
      );
      this.props.navigation.goBack();
    } else {
      Alert.alert(
        'Resultado',
        'Ocorreu um erro ao adicionar o dispositivo: ' + error,
        [{text: 'OK'}],
        {cancelable: false},
      );
    }
  }

  add = async () => {
    const {room, nameScene, typeDevice} = this.state;
    let containsErrors = false;
    if (this.validateNameDevice(nameScene)) {
      this.updateNameDevice(styles.input, '');
    } else {
      this.updateNameDevice(styles.inputError, 'Nome do dispositivo é obrigatório.');
      containsErrors = true;
    }
    if (!containsErrors) {
      let defaultValue;
      switch (typeDevice) {
        case '1':
        case '3':
        case '5':
        case '7':
        case '8':
          defaultValue = false;
          break;
        case '2':
        case '4':
        case '6':
        case '9':
          defaultValue = 0;
          break;
        default:
          defaultValue = null;
          break;
      }
      let device = {
        name:nameScene,
        type:typeDevice,
        value:defaultValue
      }
      addDevice(room, device, this.resultAdd.bind(this));
    }
  }
  
  validateNameDevice(nameDevice) {
    return !(nameDevice == null || nameDevice.trim() == "");
  }

  updateNameDevice = (style, errorMessage) => {
    this.setState({
      nameDeviceInputStyle: style,
      nameDeviceErrorMessage: errorMessage
    });
  }
}
