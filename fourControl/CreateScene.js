import React from 'react';
import {
  View,
  Alert,
  Text
} from 'react-native';
import CustomInput from '../components/CustomInput';
import CustomButton from '../components/CustomButton';
import {
    initializeServices,
    addScene,
    requestDevices,
    requestAllDevices
} from '../service/Index';
import CustomSwitch from '../components/CustomSwitch';
import CustomSlider from '../components/CustomSlider';
import {styles} from '../components/Styles';
import { SWITCH_DEVICES, SLIDER_DEVICES } from './Constants';



export default class CreateScene extends React.Component {
  
  static navigationOptions = {
    title: 'Cadastro de cena',
  };

  constructor(props) {
    super(props);
    this.state = {
      room: this.props.navigation.getParam('nameRoom'),
      nameScene: '',
      nameSceneInputStyle: styles.input,
      nameSceneErrorMessage: '',
      devices:[]
    };
  }

  async componentWillMount() {
    initializeServices();
    await requestAllDevices(this.state.room, this.loadDevices.bind(this));
  }

  async loadDevices(devices){
    console.log(devices);
    devices.forEach(device => {
      if (SWITCH_DEVICES.indexOf(device.type) != -1) {
        device.value = false;
      } else {
        device.value = 0
      }
    });
    this.setState({
        devices: devices
    });
  }

  updateSwitch = async (index) => {
      const {devices} = this.state;
      devices[index].value = !devices[index].value;
      this.setState({devices:devices});
  }

  updateSlider = (index, newValue) => {
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
        <Text style={styles.title}>{this.state.room}</Text>
        <CustomInput
          errorMessage={this.state.nameSceneErrorMessage}
          style={this.state.nameSceneInputStyle}
          label="Digite o nome da cena:"
          value={this.state.nameScene}
          onChange={nameScene => this.setState({nameScene})}
          password={false}
        />
        <View style={styles.containerDevices}>
          {this.createDevices(this.state.devices)}
        </View>
        <CustomButton text="Gravar" onPress = {this.add} />
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
        'Cena adicionada com sucesso!',
        [{text: 'OK'}],
        {cancelable: false},
      );
      this.props.navigation.goBack();
    } else {
      Alert.alert(
        'Erro',
        'Ocorreu um erro ao adicionar a cena: ' + error,
        [{text: 'OK'}],
        {cancelable: false},
      );
    }
  }

  add = async () => {
    const {room, nameScene, devices} = this.state;
    let containsErrors = false;
    if (this.validateNameScene(nameScene)) {
      this.updateNameScene(styles.input, '');
    } else {
      this.updateNameScene(styles.inputError, 'Nome da cena é obrigatório.');
      containsErrors = true;
    }
    if (!containsErrors) {
      let devicesScene = [];
      devices.forEach(device => {
        devicesScene.push({
          id:device.id,
          value:device.value
        });
      });
      addScene(room, nameScene, devicesScene, this.resultAdd.bind(this));
    }
  }
  
  validateNameScene(nameScene) {
    return !(nameScene == null || nameScene.trim() == "");
  }

  updateNameScene = (style, errorMessage) => {
    this.setState({
      nameSceneInputStyle: style,
      nameSceneErrorMessage: errorMessage
    });
  }
}