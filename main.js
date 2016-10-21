/*jshint esversion: 6 */

const {
  app,
  BrowserWindow
} = require('electron');

var win;

function createWin() {
  win = new BrowserWindow({
    title: "PC Presence",
    width: 250,
    height: 400,
    frame: false
  }); //, resizable: false}); // TODO
  win.loadURL('file://' + __dirname + '/index.html');
  win.webContents.openDevTools(); // TODO
  win.on("closed", function () {
    win = null;
  });
  win.show();
}

app.on('ready', createWin);
