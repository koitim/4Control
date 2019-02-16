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
    addRoom
} from '../service/Index';
import {styles} from '../components/Styles';



export default class CreateRoom extends React.Component {
  
  static navigationOptions = {
    title: 'Cadastro de ambiente',
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
          errorMessage={this.state.nameRoomErrorMessage}
          style={this.state.nameRoomInputStyle}
          label="Digite o nome do ambiente"
          value={this.state.nameRoom}
          onChange={nameRoom => this.setState({nameRoom})}
          password={false}
        />
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
    const {nameRoom} = this.state;
    let containsErrors = false;
    if (this.validateNameRoom(nameRoom)) {
      this.updateNameRoom(styles.input, '');
    } else {
      this.updateNameRoom(styles.inputError, 'Nome do ambiente é obrigatório.');
      containsErrors = true;
    }
    if (!containsErrors) {
      addRoom(nameRoom, this.resultAdd.bind(this));
    }
  }
  
  validateNameRoom(nameRoom) {
    return !(nameRoom == null || nameRoom.trim() == "");
  }

  updateNameRoom = (style, errorMessage) => {
    this.setState({
      nameRoomInputStyle: style,
      nameRoomErrorMessage: errorMessage
    });
  }
}

const initialData = {
    nameRoom: '',
    nameRoomInputStyle: styles.input,
    nameRoomErrorMessage: ''
};
