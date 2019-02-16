
import firebase from 'firebase';

// Geral
export function initializeFirebase() {
  if (!firebase.apps.length) {
    firebase.initializeApp(conexaoFirebase);
  }
}

// Autenticação

export function login(email, password) {
  return firebase.auth().signInWithEmailAndPassword(email, password);
}

export function logout() {
  return firebase.auth().signOut();
}

export function registerUser(email, password) {
  return firebase.auth().createUserWithEmailAndPassword(email, password);
}

// Banco de dados

export function createRoom(nameRoom, callback) {
  const idUsuario = firebase.auth().currentUser.uid;
  firebase
    .database()
    .ref()
    .child(BD)
    .child(TB_ROOMS)
    .child(idUsuario)
    .child(nameRoom)
    .set(nameRoom, callback);
}

export function createDevice(nameRoom, device, callback) {
  const idUsuario = firebase.auth().currentUser.uid;
  firebase
    .database()
    .ref()
    .child(BD)
    .child(TB_DEVICES)
    .child(idUsuario)
    .child(nameRoom)
    .push()
    .set(device, callback);
}

export function createScene(nameRoom, nameScene, devices, callback) {
  const idUsuario = firebase.auth().currentUser.uid;
  console.log(nameRoom);
  console.log(nameScene);
  console.log(devices);
  firebase
    .database()
    .ref()
    .child(BD)
    .child(TB_SCENES)
    .child(idUsuario)
    .child(nameRoom)
    .child(nameScene)
    .set(devices, callback);
}

export function getRooms(callback) {
  const idUsuario = firebase.auth().currentUser.uid;
  firebase
    .database()
    .ref()
    .child(BD)
    .child(TB_ROOMS)
    .child(idUsuario)
    .once('value')
      .then( function(snapshot){
        let rooms = [];
        if (snapshot.exists()) {
          snapshot.forEach(childSnapshot => {
            rooms.push(childSnapshot.val());
          });
        }
        callback(rooms);
      });
}

export async function fetcherDevices(room, callback) {
  const idUsuario = firebase.auth().currentUser.uid;
  await firebase
    .database()
    .ref()
    .child(BD)
    .child(TB_DEVICES)
    .child(idUsuario)
    .child(room)
    .once('value')
      .then( function(snapshot){
        let devices = [];
        if (snapshot.exists()) {
          snapshot.forEach(childSnapshot => {
            const device = childSnapshot.val();
            devices.push({
              id:childSnapshot.key,
              name:device.name,
              type:device.type,
              value:device.value
            });
          });
        }
        callback(devices);
      });
}

export function getScenes(nameRoom) {
  const idUsuario = firebase.auth().currentUser.uid;
  firebase
    .database()
    .ref()
    .child(BD)
    .child(TB_SCENES)
    .child(idUsuario)
    .child(nameRoom)
    .once('value')
      .then( function(snapshot){
        let scenes = [];
        if (snapshot.exists()) {
          snapshot.forEach(childSnapshot => {
            scenes.push(childSnapshot.val());
          });
        }
        callback(scenes);
      });
}

export async function updateDevice(nameRoom, device) {
  const idUsuario = firebase.auth().currentUser.uid;
  await firebase
    .database()
    .ref()
    .child(BD)
    .child(TB_DEVICES)
    .child(idUsuario)
    .child(nameRoom)
    .child(device.id)
    .set({
      name:device.name,
      type:device.type,
      value:device.value
    });
}

export function existsRoom(nameRoom, callBackIfExists, callBackIfNotExists) {
  const idUsuario = firebase.auth().currentUser.uid;
  firebase
    .database()
    .ref()
    .child(BD)
    .child(idUsuario)
    .child(TB_ROOMS)
    .child(nameRoom)
    .once('value')
      .then( function(snapshot) {
        if (snapshot.exists()) {
          callBackIfExists();
        } else {
          callBackIfNotExists();
        }
      });
}


function getDataAtualFormatada() {
  const data = new Date();
  const dia  = data.getDate().toString()
  const diaF = (dia.length == 1) ? '0' + dia : dia
  const mes  = (data.getMonth() + 1).toString()
  const mesF = (mes.length == 1) ? '0' + mes : mes
  const anoF = data.getFullYear();
  return diaF + "/" + mesF + "/" + anoF;
}

const BD = 'Control';
const TB_ROOMS = 'ROOMS';
const TB_DEVICES = 'DEVICES';
const TB_SCENES = 'SCENES';

const conexaoFirebase = {
  apiKey: "AIzaSyAhW7iIMFC4Uu2DN8RdbnedDZjz8ioilm8",
  authDomain: "control-cbefc.firebaseapp.com",
  databaseURL: "https://control-cbefc.firebaseio.com",
  projectId: "control-cbefc",
  storageBucket: "control-cbefc.appspot.com",
  messagingSenderId: "398114916008"
};