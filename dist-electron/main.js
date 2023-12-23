'use strict';
var __importDefault =
  (this && this.__importDefault) ||
  function (mod) {
    return mod && mod.__esModule ? mod : { default: mod };
  };
Object.defineProperty(exports, '__esModule', { value: true });
const electron_1 = require('electron');
const electron_serve_1 = __importDefault(require('electron-serve'));
const path_1 = __importDefault(require('path'));
/**
 * Disable security warnings
 * @see https://github.com/electron/electron/issues/19775
 */
process.env['ELECTRON_DISABLE_SECURITY_WARNINGS'] = 'true';
const appServe = electron_1.app.isPackaged
  ? (0, electron_serve_1.default)({
      directory: path_1.default.join(__dirname, '../out'),
    })
  : null;
const createWindow = async () => {
  const browserWindow = new electron_1.BrowserWindow({
    show: false,
    width: 1200,
    height: 768,
    webPreferences: {
      preload: path_1.default.join(__dirname, 'preload.js'),
      webSecurity: true,
      nodeIntegration: true,
      nodeIntegrationInWorker: true,
      contextIsolation: true,
    },
  });
  /**
   * If you install `show: true` then it can cause issues when trying to close the window.
   * Use `show: false` and listener events `ready-to-show` to fix these issues.
   * @see https://github.com/electron/electron/issues/25012
   */
  browserWindow.on('ready-to-show', () => {
    browserWindow?.show();
  });
  if (electron_1.app.isPackaged) {
    await appServe(browserWindow);
    await browserWindow.loadURL('app://-');
  } else {
    await browserWindow.loadURL('http://localhost:3000');
    browserWindow.webContents.openDevTools({
      mode: 'detach',
      title: 'DevTools - React Electron Boilerplate',
    });
    browserWindow.webContents.on('did-fail-load', (e, code, desc) => {
      console.log({
        e,
        code,
        desc,
      });
      browserWindow.webContents.reloadIgnoringCache();
    });
  }
  electron_1.ipcMain.handle('versions', () => {
    return {
      electron: process.versions.electron,
      chrome: process.versions.chrome,
      node: process.versions.node,
      v8: process.versions.v8,
      os: process.platform,
      version: electron_1.app.getVersion(),
      name: electron_1.app.getName(),
    };
  });
  return browserWindow;
};
electron_1.app
  .whenReady()
  .then(() => createWindow())
  .then(() => {
    electron_1.app.on('activate', () => {
      if (electron_1.BrowserWindow.getAllWindows().length === 0) {
        createWindow().catch(err => console.error('Error while trying to handle activate Electron event:', err));
      }
    });
  })
  .catch(e => console.error('Failed to create window:', e));
electron_1.app.on('second-instance', () => {
  createWindow().catch(err => console.error('Error while trying to prevent second-instance Electron event:', err));
});
electron_1.app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    electron_1.app.quit();
  }
});
