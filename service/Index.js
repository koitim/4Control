import {
    initializeFirebase,
    registerUser,
    login,
    logout,
    createRoom,
    createDevice,
    fetchRooms,
    fetchDevices,
    updateDevice,
    createScene,
    fetchScenes,
    updateScene,
    detacheCallbackRooms,
    detacheCallbackDevices,
    detacheCallbackScenes,
    fetchAllDevices
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
export async function requestRooms(callBack) {
  await fetchRooms(callBack);
}

export async function releaseRooms() {
  await detacheCallbackRooms();
}

export async function addRoom(nameRoom, callBack) {
  return await createRoom(nameRoom, callBack);
}

export async function requestDevices(room, callBack) {
  await fetchDevices(room, callBack);
}

export async function requestAllDevices(room, callBack) {
  await fetchAllDevices(room, callBack);
}

export async function releaseDevices() {
  await detacheCallbackDevices();
}

export async function setDevice(room, device) {
  await updateDevice(room, device);
}

export async function addDevice(room, device, callBack) {
  await createDevice(room, device, callBack);
}

export async function requestScenes(room, callBack) {
  await fetchScenes(room, callBack);
}

export async function releaseScenes() {
  await detacheCallbackScenes();
}

export async function addScene(room, nameScene, devices, callBack) {
  await createScene(room, nameScene, devices, callBack);
}

export async function activateScene(room, currentActiveScene, newActiveScene) {
  await updateScene(room, currentActiveScene, newActiveScene);
}