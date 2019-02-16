import {
    initializeFirebase,
    registerUser,
    login,
    logout,
    existsRoom,
    createRoom,
    createDevice,
    getRooms,
    fetcherDevices,
    updateDevice
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
  export async function getDevices(room, callBack) {
    await fetcherDevices(room, callBack);
  }
  
  export function addRoom(nameRoom, callBack) {
    return createRoom(nameRoom, callBack);
  }
  
  export function addDevice(nameRoom, device, callBack) {
    createDevice(nameRoom, device, callBack);
  }

  export async function setDevice(room, device) {
    await updateDevice(room, device);
  }