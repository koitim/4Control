
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
export async function fetchRooms(callBack) {
  const idUsuario = firebase.auth().currentUser.uid;
  await firebase
    .database()
    .ref()
    .child(BD)
    .child(TB_ROOMS)
    .child(idUsuario)
    .on('child_added', (childSnapshot, prevChildKey) => {
      callBack(childSnapshot.val());
    });
}

export async function detacheCallbackRooms() {
  const idUsuario = firebase.auth().currentUser.uid;
  await firebase
    .database()
    .ref()
    .child(BD)
    .child(TB_ROOMS)
    .child(idUsuario)
    .off();
}

export async function fetchDevices(room, callback) {
  const idUsuario = firebase.auth().currentUser.uid;
  await firebase
    .database()
    .ref()
    .child(BD)
    .child(TB_DEVICES)
    .child(idUsuario)
    .child(room)
    .on('child_added', (childSnapshot, prevChildKey) => {
      const device = childSnapshot.val();
      callback({
        id:childSnapshot.key,
        name:device.name,
        type:device.type,
        value:device.value
      });
    });
}

export async function fetchAllDevices(room, callback) {
  console.log('estou na rotina certa...')
  const idUsuario = firebase.auth().currentUser.uid;
  await firebase
    .database()
    .ref()
    .child(BD)
    .child(TB_DEVICES)
    .child(idUsuario)
    .child(room)
    .once('value')
      .then((snapshot) => {
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

export async function detacheCallbackDevices() {
  const idUsuario = firebase.auth().currentUser.uid;
  await firebase
    .database()
    .ref()
    .child(BD)
    .child(TB_DEVICES)
    .child(idUsuario)
    .child(room)
    .off();
}

export function fetchScenes(room, callBack) {
  const idUsuario = firebase.auth().currentUser.uid;
  firebase
    .database()
    .ref()
    .child(BD)
    .child(TB_SCENES)
    .child(idUsuario)
    .child(room)
    .on('child_added', (childSnapshot, prevChildKey) => {
      callBack({
        name:childSnapshot.key,
        active:childSnapshot.val().active,
        devices:childSnapshot.val().devices
      });
    });
}

export async function detacheCallbackScenes() {
  const idUsuario = firebase.auth().currentUser.uid;
  await firebase
    .database()
    .ref()
    .child(BD)
    .child(TB_SCENES)
    .child(idUsuario)
    .child(room)
    .off();
}

export async function createRoom(nameRoom, callback) {
  const idUsuario = firebase.auth().currentUser.uid;
  await firebase
    .database()
    .ref()
    .child(BD)
    .child(TB_ROOMS)
    .child(idUsuario)
    .child(nameRoom)
    .once('value')
      .then( function(snapshot) {
        if (snapshot.exists()) {
          callback('Ambiente já cadastrado.');
        } else {
          firebase
            .database()
            .ref()
            .child(BD)
            .child(TB_ROOMS)
            .child(idUsuario)
            .child(nameRoom)
            .set(nameRoom, callback);
        }
      });
}

export async function createDevice(nameRoom, device, callback) {
  const idUsuario = firebase.auth().currentUser.uid;
  await firebase
    .database()
    .ref()
    .child(BD)
    .child(TB_DEVICES)
    .child(idUsuario)
    .child(nameRoom)
    .once('value')
      .then( function(snapshot) {
        let foundDevice = false;
        if (snapshot.exists()) {
          snapshot.forEach(childSnapshot => {
            const deviceFirebase = childSnapshot.val();
            if (deviceFirebase.name == device.name) {
              foundDevice = true;
              callback('Dispositivo já cadastrado.');
            }
          });
        }
        if (!foundDevice) {
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

export async function createScene(room, nameScene, devices, callback) {
  const idUsuario = firebase.auth().currentUser.uid;
  await firebase
    .database()
    .ref()
    .child(BD)
    .child(TB_SCENES)
    .child(idUsuario)
    .child(room)
    .child(nameScene)
    .once('value') 
      .then( function(snapshot) {
        if (snapshot.exists()) {
          callback('Cena já cadastrada.');
        } else {
          firebase
            .database()
            .ref()
            .child(BD)
            .child(TB_SCENES)
            .child(idUsuario)
            .child(room)
            .child(nameScene)
            .set({active:false,devices}, callback);
        }
      });
}

export async function updateScene(room, currentActiveScene, newActiveScene) {
  const idUsuario = firebase.auth().currentUser.uid;
  let refScene = await firebase
    .database()
    .ref()
    .child(BD)
    .child(TB_SCENES)
    .child(idUsuario)
    .child(room);
  if (currentActiveScene != null) {
    refScene
      .child(currentActiveScene.name)
      .set({
        active:currentActiveScene.active,
        devices:currentActiveScene.devices
      });
  }
  refScene
    .child(newActiveScene.name)
    .set({
      active:newActiveScene.active,
      devices:newActiveScene.devices
    });
  let refDevice = await firebase
    .database()
    .ref()
    .child(BD)
    .child(TB_DEVICES)
    .child(idUsuario)
    .child(room);
  newActiveScene.devices.forEach(device => {
    refDevice
      .child(device.id)
      .once('value')
      .then( function(snapshot) {
        if (snapshot.exists()) {
          let deviceBD = snapshot.val();
          deviceBD.value = device.value;
          refDevice
            .child(device.id)
            .set(deviceBD);
        }
      });
  });  
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