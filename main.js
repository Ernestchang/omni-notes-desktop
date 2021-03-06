'use strict';

const electron = require('electron');
const app = electron.app;
const BrowserWindow = electron.BrowserWindow;
const isDev = require('electron-is-dev');
const windowStateKeeper = require('electron-window-state');

// Keep a global reference of the window object, if you don't, the window will
// be closed automatically when the JavaScript object is garbage collected.
let win;

// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
app.on('ready', function() {
    let winState = windowStateKeeper({
        defaultWidth: 1024,
        defaultHeight: 700
    });
    win = new BrowserWindow({
        x: winState.x,
        y: winState.y,
        width: winState.width,
        height: winState.height,
        autoHideMenuBar: true,
        icon: __dirname + '/icons/png/128x128.png'
    });

    // and load the index.html of the app.
    win.loadURL('file://' + __dirname + '/index.html');

    // Open the DevTools.
    if (isDev) {
        win.webContents.openDevTools();
    }

    // Emitted when the window is closed.
    win.on('closed', function() {
        // Dereference the window object, usually you would store windows
        // in an array if your app supports multi windows, this is the time
        // when you should delete the corresponding element.
        win = null;
    });

    winState.manage(win);
});

// Quit when all windows are closed.
app.on('window-all-closed', function() {
    // On OS X it is common for applications and their menu bar
    // to stay active until the user quits explicitly with Cmd + Q
    if (process.platform !== 'darwin') {
        app.quit();
    }
});

app.on('activate', function() {
    // On OS X it's common to re-create a window in the app when the
    // dock icon is clicked and there are no other windows open.
    if (win === null) {
        createWindow();
    }
});
