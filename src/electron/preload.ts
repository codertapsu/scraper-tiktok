import { contextBridge, ipcRenderer } from 'electron';

import crypto from 'crypto';

contextBridge.exposeInMainWorld('electronAPI', {
  loadPreferences: () => ipcRenderer.invoke('load-prefs'),
  on: (channel: string, callback: VoidFunction) => {
    ipcRenderer.on(channel, callback);
  },
  send: (channel: string, args: any[]) => {
    console.log(1);

    ipcRenderer.send(channel, args);
  },
});

contextBridge.exposeInMainWorld('browserWindow', {
  versions: () => ipcRenderer.invoke('versions'),
});

contextBridge.exposeInMainWorld('versions', {
  node: () => process.versions.node,
  chrome: () => process.versions.chrome,
  electron: () => process.versions.electron,
  author: () => 'Khanh Hoang 1',
  // we can also expose variables, not just functions
});

contextBridge.exposeInMainWorld('nodeCrypto', {
  sha256sum: (data: string) => {
    const hash = crypto.createHash('sha256');
    hash.update(data);
    return hash.digest('hex');
  },
});
