import React from 'react';
import {
  View,
  Alert,
  Picker,
  Text
} from 'react-native';
import CustomInput from '../components/CustomInput';
import CustomButton from '../components/CustomButton';
import {
    initializeServices,
    addDevice
} from '../service/Index';
import {styles} from '../components/Styles';



export default class CreateDevice extends React.Component {
  
  static navigationOptions = {
    title: 'Cadastro de dispositivo',
  };

  constructor(props) {
    super(props);
    this.state = {
      room: this.props.navigation.getParam('nameRoom'),
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
        <Text style={styles.title}>{this.state.room}</Text>
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
            <Picker.Item label="Temperatura do Ar condicionado" value="4" />
            <Picker.Item label="TV" value="5" />
            <Picker.Item label="Volume da TV" value="6" />
            <Picker.Item label="Cortina" value="7" />
            <Picker.Item label="Som" value="8" />
            <Picker.Item label="Volume do Som" value="9" />
        </Picker>
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
        'Dispositivo adicionado com sucesso!',
        [{text: 'OK'}],
        {cancelable: false},
      );
      this.goBack();
    } else {
      Alert.alert(
        'Erro',
        'Ocorreu um erro ao adicionar o dispositivo: ' + error,
        [{text: 'OK'}],
        {cancelable: false},
      );
    }
  }

  add = async () => {
    const {room, nameDevice, typeDevice} = this.state;
    let containsErrors = false;
    if (this.validateNameDevice(nameDevice)) {
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
        name:nameDevice,
        type:typeDevice,
        value:defaultValue
      }
      await addDevice(room, device, this.resultAdd.bind(this));
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
