import React from 'react';
import {
  createStackNavigator,
  createAppContainer,
  createSwitchNavigator
} from "react-navigation";
import ListRooms from './fourControl/ListRooms';
import ListDevices from './fourControl/ListDevices';
import ListScenes from './fourControl/ListScenes';
import CreateRoom from './fourControl/CreateRoom';
import Login from './login/Login';
import Register from './login/Register';
import CreateDevice from './fourControl/CreateDevice';
import CreateScene from './fourControl/CreateScene';
import OpenRoom from './fourControl/OpenRoom'

export default class App extends React.Component {

  render() {
    console.disableYellowBox = true;
    return (
      <AppContainer/>
    );
  }
}

const LoginNavigator = createStackNavigator({
  Login: Login,
  Register: Register
},
{
  initialRouteName: 'Login',
});

const AppNavigator = createStackNavigator({
  ListRoom: ListRooms,
  AddRoom: CreateRoom,
  OpenRoom: OpenRoom,
  ListDevice: ListDevices,
  AddDevice: CreateDevice,
  ListScene: ListScenes,
  AddScene: CreateScene,
},
{
  initialRouteName: 'ListRoom',
});

const AppContainer = createAppContainer(createSwitchNavigator(
  {
    Login: LoginNavigator,
    App: AppNavigator
  },
  {
    initialRouteName: 'Login',
  }
));