#　Project Info
Your Inspiration is a web-based personal thought journal that allows users to capture and organize their ideas seamlessly. Users can authenticate securely through their Google accounts, providing a hassle-free login experience. The platform offers comprehensive note management functionality, including:
Creating new thought entries
Reading and reviewing past entries
Updating existing content
Deleting unwanted entries
This digital journal serves as a space where users can document their thoughts, ideas, and inspirations as they occur, ensuring no valuable insight is lost.

Development Team:
Chu Ying Ying (S12891667),
Lung Kwan Chak (S12896141),
Tsao Sai Chak (S12890241),
Wong Hok Man (S12893544),
Tam Oi Laam (S12887457)





#　Project Info intro
## app.js:

1. Authentication & Session Management:
	Uses Passport.js for authentication
	Implements session management using express-session
	Stores sessions in MongoDB using connect-mongo

2. Server Configuration:
	Runs on port 5000 (or environment-specified port)
	Uses MongoDB as database (configured through dotenv)
	Handles both URL-encoded and JSON request bodies

3. View Engine Setup:
	Uses EJS as the templating engine
	Implements express-ejs-layouts for layout management
	Serves static files from 'public' directory

4. Route Management:
	Handles authentication routes (/server/routes/auth)
	Manages main application routes (/server/routes/index)
	Controls dashboard functionality (/server/routes/dashboard)
	Includes custom 404 error handling

Additional Features:
Supports HTTP method override (allowing PUT/DELETE requests)
Uses environment variables for configuration
Implements modular routing structure

 
## package.json:
{
  "name": "nodejs---inspiration",
  "version": "1.0.0",
  "description": "",
  "main": "app.js",
  "scripts": {
    "test": "echo \"Error: no test specified\" && exit 1",
    "start": "nodemon app.js"
  },
  "keywords": [],
  "author": "",
  "license": "ISC",
  "dependencies": {
    "connect-mongo": "^4.6.0",
    "dotenv": "^16.0.3",
    "ejs": "^3.1.8",
    "express": "^4.18.2",
    "express-ejs-layouts": "^2.5.1",
    "express-session": "^1.17.3",
    "method-override": "^3.0.0",
    "mongoose": "^6.8.1",
    "passport": "^0.6.0",
    "passport-google-oauth20": "^2.0.0"
  },
  "devDependencies": {
    "nodemon": "^2.0.20"
  }
}




## public:css and img folder. 
For the css folder, it includes the main.css file. For the img folder, there are four svg format and one png format images.


## views: 
First, it includes three folders and three ejs files.
For ejs files, e.g. 404.ejs, about.ejs, index.ejs…

In views/(folder)
In views/(folder)/(files)
dashboard
add.ejs, index.ejs, search.ejs, view-note.ejs
layouts
dashboard.ejs, front-page.ejs, main.ejs
partials
footer.ejs, header_dashboard.ejs, header.ejs



## server:
In views/(folder)
In views/(folder)/(files)
config
db.js
controllers
dashboardController,js, mainController.js, apiController.js
middleware
checkAuth.js
models
Notes.js, User.js
routes
auth.js, dashboard.js, index.js, api.js


## README.md: this file


## .env-example:
MONGODB_URI=
GOOGLE_CLIENT_ID=
GOOGLE_CLIENT_SECRET=
GOOGLE_CALLBACK_URL=


# The cloud-based server URL:
https://three81project-group9.onrender.com


# Operation guides:

```
$ npm install
$ npm start
```
## complete the .env file: 

```
MONGODB_URI=
GOOGLE_CLIENT_ID=
GOOGLE_CLIENT_SECRET=
GOOGLE_CALLBACK_URL=

```
## API test
### Get your session cookie from browser after logging in
SESSION="connect.sid=YOUR_SESSION_COOKIE"

```
How to get SESSION_COOKIE?
visit: http://localhost:5000/get-session

```

### Get all notes
curl -b "$SESSION" http://localhost:5000/api/notes

### Get specific note
curl -b "$SESSION" http://localhost:5000/api/notes/YOUR_NOTE_ID

### Create note
curl -X POST -b "$SESSION" \
-H "Content-Type: application/json" \
http://localhost:5000/api/notes \
-d '{
    "title": "API Test",
    "body": "Created via API"
}'

### Update note
curl -X PUT -b "$SESSION" \
-H "Content-Type: application/json" \
http://localhost:5000/api/notes/YOUR_NOTE_ID \
-d '{
    "title": "Updated Title",
    "body": "Updated body"
}'

### Delete note
curl -X DELETE -b "$SESSION" \
http://localhost:5000/api/notes/YOUR_NOTE_ID

### Search notes
curl -X POST -b "$SESSION" \
-H "Content-Type: application/json" \
http://localhost:5000/api/notes/search \
-d '{
    "searchTerm": "test"
}'

## Using DEV tools to test API function in Cloud platform-render.com

After you have login the website, the DEV tool will appear when you press the F12.
In console, you can use the code below to test the API functions.

### To create a note
fetch('/api/notes', {
    method: 'POST',
    credentials: 'include',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
        title: 'Test Note',
        body: 'Testing'
    })
}).then(r => r.json()).then(console.log)

## Store your ID in a variable for easy use
const noteId = 'COPY_YOUR_ID_HERE';
## Or Save ID to localStorage
localStorage.setItem('noteId', 'COPY_YOUR_ID_HERE'); // they will work even after refresh

### GET this specific note
fetch(`/api/notes/${noteId}`, {
    credentials: 'include'
}).then(r => r.json()).then(console.log);

### UPDATE this note
fetch(`/api/notes/${noteId}`, {
    method: 'PUT',
    credentials: 'include',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
        title: 'Updated Note Title',
        body: 'This is the updated content'
    })
}).then(r => r.json()).then(console.log);

###　DELETE this note
fetch(`/api/notes/${noteId}`, {
    method: 'DELETE',
    credentials: 'include'
}).then(r => r.json()).then(console.log);

## localStorage version

// GET the note
fetch(`/api/notes/${localStorage.getItem('noteId')}`, {
    credentials: 'include'
}).then(r => r.json()).then(console.log);

// UPDATE the note
fetch(`/api/notes/${localStorage.getItem('noteId')}`, {
    method: 'PUT',
    credentials: 'include',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
        title: 'Updated Again',
        body: 'Testing with localStorage'
    })
}).then(r => r.json()).then(console.log);

// DELETE the note
fetch(`/api/notes/${localStorage.getItem('noteId')}`, {
    method: 'DELETE',
    credentials: 'include'
}).then(r => r.json()).then(console.log);

// To check the stored noteid anytime
console.log('Stored note ID:', localStorage.getItem('noteId'));

// Remove it when you're done
localStorage.removeItem('noteId');



# Reference
[www.raddy.dev](https://www.raddy.dev)


