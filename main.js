/*jshint esversion: 6 */

const {
  app,
  BrowserWindow
} = require('electron');
const path = require("path");
const cp = require('child_process');

var handleStartupEvent = function() {
  if (process.platform !== 'win32') {
    return false;
  }
  var squirrelCommand = process.argv[1];
  switch (squirrelCommand) {
    case '--squirrel-install':
    case '--squirrel-updated':

      // Optionally do things such as:
      //
      // - Install desktop and start menu shortcuts
      // - Add your .exe to the PATH
      // - Write to the registry for things like file associations and
      //   explorer context menus
      // http://stackoverflow.com/a/30819355/4306257
      var updateDotExe = path.resolve(path.dirname(process.execPath), '..', 'update.exe');
      var target = path.basename(process.execPath);
      var child = cp.spawn(updateDotExe, ["--createShortcut", target], { detached: true });
      child.on('close', function(code) {
          app.quit();
      });

      return true;
    case '--squirrel-uninstall':
      // Undo anything you did in the --squirrel-install and
      // --squirrel-updated handlers
      // http://stackoverflow.com/a/30819355/4306257
      updateDotExe = path.resolve(path.dirname(process.execPath), '..', 'update.exe');
      target = path.basename(process.execPath);
      child = cp.spawn(updateDotExe, ["--removeShortcut", target], { detached: true });
      child.on('close', function(code) {
          app.quit();
      });

      // Always quit when done
      app.quit();

      return true;
    case '--squirrel-obsolete':
      // This is called on the outgoing version of your app before
      // we update to the new version - it's the opposite of
      // --squirrel-updated
      app.quit();
      return true;
  }
};
if (handleStartupEvent()) {
  return;
}


var win;

function createWin() {
  win = new BrowserWindow({
    title: "PC Presence",
    width: 250,
    height: 400,
    frame: false,
    resizable: false,
    icon: "icon.png"
  });
  win.loadURL('file://' + __dirname + '/index.html');
  // win.webContents.openDevTools(); // TODO: comment out
  win.on("closed", function () {
    win = null;
  });
  win.show();
}

app.on('ready', createWin);
