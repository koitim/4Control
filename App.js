import React from 'react';
import {
  createStackNavigator,
  createAppContainer,
  createBottomTabNavigator,
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

export default class App extends React.Component {

  static navigationOptions = {
      title: '4Control',
  };

  render() {
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

const RoomNavigator = createStackNavigator({
  ListRoom: ListRooms,
  AddRoom: CreateRoom
},
{
  initialRouteName: 'ListRoom',
});

const DeviceNavigator = createStackNavigator({
  ListDevice: ListDevices,
  AddDevice: CreateDevice
},
{
  initialRouteName: 'ListDevice',
});

const SceneNavigator = createStackNavigator({
  ListScene: ListScenes,
  AddScene: CreateScene
},
{
  initialRouteName: 'ListScene',
});

const TabNavigator = createBottomTabNavigator({
  Devices: DeviceNavigator,
  Scenes: SceneNavigator
},
{
  initialRouteName: 'Devices',
});

const AppNavigator = createStackNavigator({
  Rooms: RoomNavigator,
  Tab: TabNavigator
},
{
  initialRouteName: 'Rooms',
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
//const AppContainer = createAppContainer(TabNavigator);