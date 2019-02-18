import React, { Component } from 'react';
import {
    View,
    Text
} from 'react-native'
import CustomButtom from '../components/CustomButton';
import {
    initializeServices,
    requestScenes,
    activateScene,
    releaseScenes
} from '../service/Index';
import CustomSwitch from '../components/CustomSwitch';
import {styles} from '../components/Styles';

export default class ListScenes extends Component {

    static navigationOptions = {
        title: 'Lista de cenas',
    };

    constructor(props) {
        super(props);
        this.state = {
            room:this.props.navigation.getParam('nameRoom'),
            scenes:[],
            activeScene:-1
        }
    }

    async componentWillMount() {
        initializeServices();
        await requestScenes(this.state.room, this.reloadScenes.bind(this));
    }

    async componentWillUMount() {
        await releaseScenes();
    }

    reloadScenes(scene){
        let {activeScene, scenes} = this.state;
        scenes.push(scene);
        if (scene.active) {
            activateScene = scenes.length -1
        }
        this.setState({
            scenes:scenes,
            activeScene: activeScene
        });
    }

    addScene() {
        this.props.navigation.navigate('AddScene', {nameRoom:this.state.room})
    }

    updateSwitch = async (index) => {
        const {room, scenes, activeScene} = this.state;
        if (activeScene != -1 && activeScene != index) {
            scenes[activeScene].active = false;
        }
        scenes[index].active = !scenes[index].active;
        this.setState({
            scenes:scenes,
            activeScene:(activeScene == index ? -1 : index)
        });
        const currentActiveScene = (activeScene == -1 ? null : scenes[activeScene]);
        await activateScene(room, currentActiveScene, scenes[index]);
    }

    createScene(scene, index) {
        return (
            <CustomSwitch 
                key={'scene-' + index}
                label={scene.name}
                value={scene.active}
                updateValue={this.updateSwitch.bind(this, index)}/>
        );
    }

    createScenes(scenes) {
        return scenes.map(this.createScene.bind(this));
    }

    render() {
        return (
            <View style={styles.container}>
                <Text style={styles.title}>{this.state.room}</Text>
                <View style={styles.containerDevices}>
                    {this.createScenes(this.state.scenes)}
                </View>
                <CustomButtom text="Adicionar" onPress = {this.addScene.bind(this)} />
            </View>
        );
    }
}