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
    addDevice
} from '../service/Index';
import {styles} from '../components/Styles';



export default class CreateDevice extends React.Component {
  
  static navigationOptions = {
    title: 'Cadastro de dispositivo',
  };

  constructor(props) {
    super(props);
    const temp = this.props.navigation.getParam('nameRoom');
    console.log(temp);
    this.state = {
      nameRoom: this.props.navigation.getParam('nameRoom'),
      nameDevice: '',
      nameDeviceInputStyle: styles.input,
      nameDeviceErrorMessage: '',
      typeDevice: '1'
    };
  }

  componentWillMount() {
    initializeServices();
  }
  
  render() {
    return (
      <View style={styles.container}>
        <CustomInput
          errorMessage={this.state.nameDeviceErrorMessage}
          style={this.state.nameDeviceInputStyle}
          label="Digite o nome do dispositivo:"
          value={this.state.nameDevice}
          onChange={nameDevice => this.setState({nameDevice})}
          password={false}
        />
        <Picker
            prompt='Tipo de dispositivo'
            selectedValue={this.state.typeDevice}
            style={styles.comboBox}
            onValueChange={(itemValue, itemIndex) =>
                this.setState({typeDevice: itemValue})
            }>
            <Picker.Item label="Luz normal" value="1" />
            <Picker.Item label="Luz com Dimmer" value="2" />
            <Picker.Item label="Ar condicionado" value="3" />
            <Picker.Item label="TV" value="4" />
            <Picker.Item label="Cortina" value="5" />
            <Picker.Item label="Som" value="6" />
        </Picker>
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
        'Ambiente adicionado com sucesso!',
        [{text: 'OK'}],
        {cancelable: false},
      );
      this.props.navigation.goBack();
    } else {
      Alert.alert(
        'Resultado',
        'Ocorreu um erro ao adicionar o ambiente: ' + error,
        [{text: 'OK'}],
        {cancelable: false},
      );
    }
  }

  add = async () => {
    const {nameRoom, nameDevice, typeDevice} = this.state;
    let containsErrors = false;
    if (this.validateNameDevice(nameDevice)) {
      this.updateNameDevice(styles.input, '');
    } else {
      this.updateNameDevice(styles.inputError, 'Nome do dispositivo é obrigatório.');
      containsErrors = true;
    }
    if (!containsErrors) {
      addDevice(nameRoom, nameDevice, typeDevice, this.resultAdd.bind(this));
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
