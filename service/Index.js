import {
    initializeFirebase,
    registerUser,
    login,
    logout,
    existsRoom,
    createRoom,
    createDevice,
    getRooms
  } from '../service/Firebase';
  
  // Geral
  export function initializeServices() {
    initializeFirebase();
  }
  
  // Autenticação
  export function createUser(email, password) {
    return registerUser(email, password);
  }
  
  export function enter(email, password) {
    return login(email, password);
  }
  
  export function leave() {
    return logout();
  }

  // Control
  export function fetcherRooms(callBack) {
    getRooms(callBack);
  }
  
  export function addRoom(nameRoom, callBack) {
    return createRoom(nameRoom, callBack);
  }
  
  export function addDevice(nameRoom, nameDevice, typeDevice, callBack) {
    createDevice(nameRoom, nameDevice, typeDevice, callBack);
  }