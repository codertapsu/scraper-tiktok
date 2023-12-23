import { app, BrowserWindow, ipcMain } from 'electron';
import serve from 'electron-serve';

import path from 'path';

/**
 * Disable security warnings
 * @see https://github.com/electron/electron/issues/19775
 */
process.env['ELECTRON_DISABLE_SECURITY_WARNINGS'] = 'true';

const appServe = app.isPackaged
  ? serve({
      directory: path.join(__dirname, '../out'),
    })
  : null;

const createWindow = async () => {
  const browserWindow = new BrowserWindow({
    show: false,
    width: 1200,
    height: 768,
    webPreferences: {
      preload: path.join(__dirname, 'preload.js'),
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

  if (app.isPackaged) {
    await appServe!(browserWindow);
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

  ipcMain.handle('versions', () => {
    return {
      electron: process.versions.electron,
      chrome: process.versions.chrome,
      node: process.versions.node,
      v8: process.versions.v8,
      os: process.platform,
      version: app.getVersion(),
      name: app.getName(),
    };
  });

  return browserWindow;
};

app
  .whenReady()
  .then(() => createWindow())
  .then(() => {
    app.on('activate', () => {
      if (BrowserWindow.getAllWindows().length === 0) {
        createWindow().catch(err => console.error('Error while trying to handle activate Electron event:', err));
      }
    });
  })
  .catch(e => console.error('Failed to create window:', e));

app.on('second-instance', () => {
  createWindow().catch(err => console.error('Error while trying to prevent second-instance Electron event:', err));
});

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit();
  }
});
