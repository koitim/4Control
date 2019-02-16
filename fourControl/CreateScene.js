import React from 'react';
import {
  View,
  Alert
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



export default class CreateScene extends React.Component {
  
  static navigationOptions = {
    title: 'Cadastro de dispositivo',
  };

  constructor(props) {
    super(props);
    this.state = initialData;
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
            selectedValue={this.state.language}
            style={{height: 50, width: 100}}
            onValueChange={(itemValue, itemIndex) =>
                this.setState({language: itemValue})
            }>
            <Picker.Item label="Java" value="java" />
            <Picker.Item label="JavaScript" value="js" />
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
    const {nameDevice} = this.state;
    let containsErrors = false;
    if (this.validateNameDevice(nameDevice)) {
      this.updateNameDevice(styles.input, '');
    } else {
      this.updateNameDevice(styles.inputError, 'Nome do dispositivo é obrigatório.');
      containsErrors = true;
    }
    if (!containsErrors) {
      addDevice(nameDevice, this.resultAdd.bind(this));
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

const initialData = {
    nameDevice: '',
    nameDeviceInputStyle: styles.input,
    nameDeviceErrorMessage: ''
};
