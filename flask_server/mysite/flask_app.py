from flask import Flask
import os
import hashlib
import pickle
import time
import json

app = Flask(__name__)

mydir = "./mysite"
registrationEnabled = True
offlineAfterTime = 2 * 60 * 60


def checkIfTeamNameIsValid(teamName):
    return teamName.isalpha()


@app.route("/")
def home():
    return os.getcwd()


@app.route("/register")
@app.route("/register/<team>/<pwd>")
def registerTeam(team=None, pwd=None):
    if not registrationEnabled:
        return "Sorry, your admin has disabled team registrations."
    if os.path.exists(mydir + "/" + team + ".onOffInfo"):
        return "This team already exists!"
    if team is None:
        to_return = ""
        with open(mydir + "/registration.html", "r") as f:
            for s in f:
                to_return += s
        return to_return
    if not checkIfTeamNameIsValid(team):
        return "Invalid team name: " + team + "<br>Your team name can only contain letters."
    with open(mydir + "/" + team + ".pwdhash", "w") as f:
        f.write(hashlib.sha512(pwd.encode()).hexdigest())
    with open(mydir + "/" + team + ".onOffInfo", "wb") as f:
        pickle.dump({}, f)
    return "Team registration completed!"


def checkLogin(team, pwd):
    if not checkIfTeamNameIsValid(team):
        return False
    if not os.path.exists(mydir + "/" + team + ".pwdhash"):
        return False
    pwdhash = ""
    with open(mydir + "/" + team + ".pwdhash", "r") as f:
        for s in f:
            pwdhash += s
    return hashlib.sha512(pwd.encode()).hexdigest() == pwdhash


@app.route("/login/<team>/<pwd>")
def login(team, pwd):
    if checkLogin(team, pwd):
        return "correct"
    return "wrong"


@app.route("/stillOnline/<myname>/<team>/<pwd>")
def stillOnline(myname, team, pwd):
    """(1) My status = online
    (2) Get dict of online and offline people"""
    if not checkLogin(team, pwd):
        return "wrong password"
    currentTime = time.time()
    with open(mydir + "/" + team + ".onOffInfo", "rb") as f:
        peopledict = pickle.load(f)
    peopledict[myname] = currentTime
    with open(mydir + "/" + team + ".onOffInfo", "wb") as f:
        pickle.dump(peopledict, f)
    onOffPeople = {}
    for person in peopledict:
        onOffPeople[person] = (
            (currentTime - peopledict[person]) < offlineAfterTime)
    return json.dumps(onOffPeople)


@app.route("/icon")
def getIcon():
    return send_from_directory(mydir, "icon.png")
