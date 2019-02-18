import {
    StyleSheet
  } from 'react-native';

export const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#fff',
        padding: 10
    },
    containerDevices: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'flex-start',
        backgroundColor: '#fff',
        padding: 10
    },
    input: {
        height: 45,
        backgroundColor: '#FFF',
        alignSelf: 'stretch',
        borderColor: '#000',
        borderWidth: 1,
        marginBottom: 10
    },
    inputError: {
        height: 45,
        backgroundColor: '#FFF',
        alignSelf: 'stretch',
        borderColor: '#F00',
        borderWidth: 2,
        paddingHorizontal: 20,
        marginBottom: 10
    },
    label: {
        backgroundColor: '#333',
        color: '#FFF',
        marginTop: 20
    },
    comboBox: {
        backgroundColor:'#fff',
        borderColor:'#000',
        borderWidth:2,
        backgroundColor:'#eee',
        justifyContent: 'space-evenly',
        color: '#000',
        alignSelf: 'stretch',
        marginBottom: 20,
        height: 50
    },
    title: {
        color:'#00f',
        fontSize:50,
        fontWeight:'bold',
        marginBottom:50
      }
});