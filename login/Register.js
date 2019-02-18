import React from 'react';
import {View} from 'react-native';
import {
    validateEmail,
    validatePassword,
    validatePasswordConfirmation
} from './Functions';
import CustomInput from '../components/CustomInput';
import CustomButton from '../components/CustomButton';
import {
    initializeServices,
    createUser
} from '../service/Index';
import {styles} from '../components/Styles';


export default class Register extends React.Component {
  
  static navigationOptions = {
    title: 'Cadastro de usuário',
  };

  constructor(props) {
    super(props);
    this.state = initialData;
  }

  componentWillMount() {
    initializeServices();
  }

  toRegister = async () => {
    const {email, password, passwordConfirmation} = this.state;
    let containsErrors = false;
    if (validateEmail(email)) {
      this.updateEmail(styles.input, '');
    }
    else {
      this.updateEmail(styles.inputError, 'Email inválido.');
      containsErrors = true;
    }
    if (validatePassword(password)) {
      this.updatePassword(styles.input, '');
    }
    else {
      this.updatePassword(styles.inputError, 'Senha é obrigatório.');
      containsErrors = true;
    }
    if (validatePasswordConfirmation(password, passwordConfirmation)) {
      this.updatePasswordConfirmation(styles.input, '');
    }
    else {
      this.updatePasswordConfirmation(styles.inputError, 'Confirmação deve ser igual a senha.');
      containsErrors = true;
    }
    if (!containsErrors) {
      createUser(email, password)
        .then(() => {
          alert("Usuário cadastrado com sucesso.");
          this.setState(initialData);
          this.goBack();
        })
        .catch((error) => {
          alert(error)
        });
    }
  }

  goBack = () => {
    this.props.navigation.goBack();
  }

  updateEmail = (style, errorMessage) => {
    this.setState({
      emailInputStyle: style,
      emailErrorMessage: errorMessage
    });
  }

  updatePassword = (style, errorMessage) => {
    this.setState({
      passwordInputStyle: style,
      passwordErrorMessage: errorMessage
    });
  }

  updatePasswordConfirmation = (style, errorMessage) => {
    this.setState({
      passwordConfirmationInputStyle: style,
      passwordConfirmationErrorMessage: errorMessage
    });
  }
  
  render() {
    return (
      <View style={styles.container}>
        <CustomInput
          errorMessage={this.state.emailErrorMessage}
          style={this.state.emailInputStyle}
          label="Digite seu e-mail"
          value={this.state.email}
          onChange={email => this.setState({email})}
          password={false}
        />
        <CustomInput
          errorMessage={this.state.passwordErrorMessage}
          style={this.state.passwordInputStyle}
          label="Digite sua senha"
          value={this.state.password}
          onChange={password => this.setState({password})}
          password={true}
        />
        <CustomInput
          errorMessage={this.state.passwordConfirmationErrorMessage}
          style={this.state.passwordConfirmationInputStyle}
          label="Confirme sua senha"
          value={this.state.passwordConfirmation}
          onChange={passwordConfirmation => this.setState({passwordConfirmation})}
          password={true}
        />
        <CustomButton text="Cadastrar" onPress = {this.toRegister} />
        <CustomButton text="Voltar" onPress = {this.goBack} />
      </View>
    );
  }
}

const initialData = {
    email: '',
    password: '',
    passwordConfirmation: '',
    emailInputStyle: styles.input,
    passwordInputStyle: styles.input,
    passwordConfirmationInputStyle: styles.input,
    emailErrorMessage: '',
    passwordErrorMessage: '',
    passwordConfirmationErrorMessage: ''
};
