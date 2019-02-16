import React            from 'react';
import {View}           from 'react-native';
import CustomInput from '../components/CustomInput';
import CustomButton from '../components/CustomButton';
//import LogoMarvel       from '../components/LogoMarvel';
import {styles}         from '../components/Styles';
import {
  initializeServices,
  enter
} from '../service/Index';
import {
  validateEmail,
  validatePassword
} from './Functions';

export default class Login extends React.Component {
  
  static navigationOptions = {
    title: 'Login',
  };

  constructor() {
    super();
    this.state = initialData;
  }

  componentWillMount() {
    initializeServices();
  }

  login() {
    const {email, password} = this.state;
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
    if (!containsErrors) {
      enter(email, password)
        .then(() => {
          this.changeScreen('App');
        })
        .catch((error) => {
          alert(error)
        });
    }
  }

  changeScreen(screen) {
    this.props.navigation.navigate(screen);
    this.setState(initialData);
  }

  toRegister() {
    this.changeScreen('Register');
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
          <CustomButton text="Logar" onPress = {this.login.bind(this)} />
          <CustomButton text="Cadastrar" onPress = {this.toRegister.bind(this)} />
      </View>
    );
  }
}

const initialData = {
  email: '',
  password: '',
  emailInputStyle: styles.input,
  passwordInputStyle: styles.input,
  emailErrorMessage: '',
  passwordErrorMessage: ''
};