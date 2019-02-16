
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
      /* .then(function() {
        return true;
      })
      .catch(function(error) {
        return false;
      }); */
}

export function createDevice(nameRoom, nameDevice, typeDevice, callback) {
  const idUsuario = firebase.auth().currentUser.uid;
  console.log(nameRoom);
  console.log(nameDevice);
  console.log(typeDevice);
  firebase
    .database()
    .ref()
    .child(BD)
    .child(TB_DEVICES)
    .child(idUsuario)
    .child(nameRoom)
    .push()
    .set({
      name: nameDevice,
      type: typeDevice
    }, callback);
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

const conexaoFirebase = {
  apiKey: "AIzaSyAhW7iIMFC4Uu2DN8RdbnedDZjz8ioilm8",
  authDomain: "control-cbefc.firebaseapp.com",
  databaseURL: "https://control-cbefc.firebaseio.com",
  projectId: "control-cbefc",
  storageBucket: "control-cbefc.appspot.com",
  messagingSenderId: "398114916008"
};