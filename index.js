/*jshint esversion: 6 */

var TIMEOUT = 5000;
var isLoggedIn = false;
var dialog = require('electron').remote.dialog;
var currentLoginIndex = 0;

// http://stackoverflow.com/a/4033310
function httpGetAsync(theUrl, callback) {
  var xmlHttp = new XMLHttpRequest();
  xmlHttp.onreadystatechange = function () {
    if (xmlHttp.readyState == 4 && xmlHttp.status == 200)
      callback(xmlHttp.responseText);
  };
  xmlHttp.open("GET", theUrl, true); // true for asynchronous
  xmlHttp.send(null);
}

function onLoginResult(res) {
  currentLoginIndex++;
  if (res !== "correct") {
    onLoginGetError("Your login information is wrong. Please check it again.");
    return;
  }
}

function onLoginGetError(err) {
  dialog.showMessageBox({
    "type": "error",
    "buttons": ["OK"],
    "title": "Error during login",
    "message": "There was an error during login.",
    "detail": err
  });
}

function loginToTeamServer() {
  try {
    if (!navigator.onLine) {
      onLoginGetError("You don't have an internet connection.");
      return;
    }
    setTimeout(function (loginIndex = currentLoginIndex) {
      if (loginIndex !== currentLoginIndex) {
        return;
      }
      if (!isLoggedIn) {
        onLoginGetError("Connection timed out. Make sure your server is set up properly.");
      }
    }, TIMEOUT);
    httpGetAsync("http://"+document.getElementById("urlInput").value, onLoginResult);
  } catch (e) {
    onLoginGetError("The URL is invalid.");
  }
}
