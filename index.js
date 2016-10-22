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

function getSetting(settingName, fromForm) {
  if (fromForm) {
    return document.getElementById(settingName + "Input").value;
  }
  return localStorage.getItem(settingName);
}


function onLoginResult(res) {
  currentLoginIndex++;
  if (res !== "correct") {
    onLoginGetError("Your login information is wrong. Please check it again.");
    return;
  }
  isLoggedIn = true;
  if (localStorage.getItem("team") == null) {
    localStorage.setItem("team", getSetting("team", true));
    localStorage.setItem("pwd", getSetting("pwd", true));
    localStorage.setItem("username", getSetting("username", true));
    localStorage.setItem("url", getSetting("url", true));
  }
  document.getElementById("login").style.display = "none";
  document.getElementById("onoffscreen").style.display = "block";
  fetchOnOffStates();
  setInterval(fetchOnOffStates, 60000); // refresh every minute
}

function onLoginGetError(err) {
  currentLoginIndex++;
  dialog.showMessageBox({
    "type": "error",
    "buttons": ["OK"],
    "title": "Error during login",
    "message": "There was an error during login.",
    "detail": err
  });
}

function fetchOnOffStates(res) {
  if (res === undefined) {
    httpGetAsync("http://" + getSetting("url") + "/stillOnline/" + getSetting("username") + "/" + getSetting("team") + "/" + getSetting("pwd"), fetchOnOffStates);
  } else {
    var onOffDict = JSON.parse(res);
    var space2writeto = document.getElementById("onoffview");
    var allPeople = Object.keys(onOffDict);
    if (allPeople.length <= 0) {
      space2writeto.innerHTML = "no people in your team"; // should never happen
    } else {
      space2writeto.innerHTML = "";
    }
    for (var i = 0; i < allPeople.length; i++) {
      var personindicator = document.createElement("p");
      personindicator.innerHTML = allPeople[i];
      if (onOffDict[allPeople[i]]) {
        // person online
        personindicator.style.color = "green";
        personindicator.style.fontWeight = "bold";
      } else {
        personindicator.style.color = "red";
      }
      space2writeto.appendChild(personindicator);
    }
  }
}

function loginToTeamServer(fromLoginForm) {
  if (fromLoginForm == null) {
    fromLoginForm = true;
  }
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
    httpGetAsync("http://" + getSetting("url", fromLoginForm) + "/login/" + getSetting("team", fromLoginForm) + "/" + getSetting("pwd", fromLoginForm), onLoginResult);
  } catch (e) {
    console.warn(e);
    onLoginGetError("The URL is invalid.");
  }
}

function start() {
  if (localStorage.getItem("team") != null) {
    loginToTeamServer(false);
  }
}
