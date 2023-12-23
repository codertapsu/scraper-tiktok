'use strict';
var __importDefault =
  (this && this.__importDefault) ||
  function (mod) {
    return mod && mod.__esModule ? mod : { default: mod };
  };
Object.defineProperty(exports, '__esModule', { value: true });
const crypto_1 = __importDefault(require('crypto'));
const electron_1 = require('electron');
electron_1.contextBridge.exposeInMainWorld('electronAPI', {
  loadPreferences: () => electron_1.ipcRenderer.invoke('load-prefs'),
  on: (channel, callback) => {
    electron_1.ipcRenderer.on(channel, callback);
  },
  send: (channel, args) => {
    console.log(1);
    electron_1.ipcRenderer.send(channel, args);
  },
});
electron_1.contextBridge.exposeInMainWorld('browserWindow', {
  versions: () => electron_1.ipcRenderer.invoke('versions'),
});
electron_1.contextBridge.exposeInMainWorld('versions', {
  node: () => process.versions.node,
  chrome: () => process.versions.chrome,
  electron: () => process.versions.electron,
  author: () => 'Khanh Hoang 1',
  // we can also expose variables, not just functions
});
electron_1.contextBridge.exposeInMainWorld('nodeCrypto', {
  sha256sum: data => {
    const hash = crypto_1.default.createHash('sha256');
    hash.update(data);
    return hash.digest('hex');
  },
});
