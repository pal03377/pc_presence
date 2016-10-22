# PC Presence

Inspiration: <http://softwarerecs.stackexchange.com/questions/36986/presence-on-the-network>

## What it does

This is a small tool that allows you to make an easy network where any PC can see wheater the others are online / offline.

## Instructions

- Download the installers onto each of your PCs.
- Install PC Presence.
- When you open the app, it wants you to enter a "server URL".
- From here on there are two possible ways:

## Way 1 (not recommended): Install your team on precence.pythonanywhere.com

This option is faster but not recommended because the server may not be available forever, you don't have control over it and it may reach it's limits when too much users use it.

- Visit [the Presence team registration site](http://presence.pythonanywhere.com/register).
- Enter a team name and a team password (team name can only contain letters, for security purposes).
- Your team is registered! In the app, enter your team name and your user name which is specific to you.
- You get a list of all people in your team. Green means online, red means offline.

## Way 2 (recommended): Make your on free server on [Pythonanywhere](https://pythonanywhere.com)

This option is more secure and better, but also a little bit more complicated.

- Download or clone this repository.
- Visit [the Pythonanywhere site](https://pythonanywhere.com) and [register a free account](https://www.pythonanywhere.com/registration/register/beginner/).
- Log in.
- Just ignore all the stuff shown to you and go to the "Web" tab.
- Click on "Add new web app".
- Choose "Flask" and "Python 3.4". Leave everything else as it is.
- Go on the "Files" tab.
- Navigate to the directory "mysite".
- Find the button "New file" and click on it.
- Upload the file (from this repository) "flask_server/mysite/flask_app.py".
- Yes, you want to overwrite the existing file.
- Upload the file (from this repository) "flask_server/mysite/registration.html".
- Go back to the "Web" tab.
- Click on "Reload [your username].pythonanywhere.com".
- Visit https:// [your username].pythonanywhere.com/register.
- Enter a team name and a team password (team name can only contain letters, for security purposes).
- :tada: Your team is registered! In the app, enter your server URL (which is [your username].pythonanywhere.com, without any http or https stuff and without slashes), your team name and your user name which is specific to you.
- You get a list of all people in your team. Green means online, red means offline.

### Optional: Disable other team registrations on your server

If you want to disable other team registrations on your server (so no other people can register their team on your server), go to the "Files" tab again and open mysite/flask_app.py.

Now you'll find a line in the editor that says `registrationEnabled = True`. Change it to `registrationEnabled = False`.

On the upper right corner, click on "Save" and on the reload button (with the two arrows).
