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
  List: ListRooms,
  Add: CreateRoom
},
{
  initialRouteName: 'List',
});

const DeviceNavigator = createStackNavigator({
  List: ListDevices,
  Add: CreateDevice
},
{
  initialRouteName: 'List',
});

const SceneNavigator = createStackNavigator({
  List: ListScenes,
  Add: CreateScene
},
{
  initialRouteName: 'List',
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