# Your Inspiration: A Personal Thought Journal 
## Project Overview
Your Inspiration is a web-based personal thought journal designed to help users capture and organize their ideas seamlessly.
<br>This application utilizes **Node.js** and **Express.js** for the backend, **MongoDB** for data storage, and integrates **Google OAuth** for secure authentication. The frontend is built with **HTML**, **CSS**, and **JavaScript**, ensuring a user-friendly interface. The application is deployed on **Render** for cloud hosting.<br/>



## Key Features
- **Secure Authentication:** Users can log in securely using their Google accounts via Google OAuth.
- **Comprehensive Note Management:**
   - Create new thought entries
   - Read and review past entries
   - Update existing content
   - Delete unwanted entries
 
## The cloud-based server URL
```
https://three81project-group9.onrender.com/
```

# Getting Started
## _Prerequisites_
- Node.js installed
  > ### 1. Clone the repository:
    ```
     git clone https://github.com/usernameis-notavaliable/381project-group9/tree/main
    ```
  > ### 2. Install dependencies:
    ```
     npm install
    ```
  > ### 3. Start the application:
    ```
     npm start
    ```     
- MongoDB setup
  > ### Complete the .env file(Already given example)
    ```
     MONGODB_URI="your_mongodb_url"
    ```
- Google OAuth credentials
  > ### Setup Google OAuth in .env file
    ```
     GOOGLE_CLIENT_ID="your_client_id"
     GOOGLE_CLIENT_SECRET="your_clientSecret"
     GOOGLE_CALLBACK_URL="your_callback_url"
    ```

# API test
## Using Linux Terminal 
You can use the `curl` command in the Linux terminal to test API endpoints.
<br>Here's an example of how to test the `/api/notes` endpoint:<br/>

_Getting Your Session Cookie:_
```
curl http://localhost:5000/get-session
```
This will return the session cookie, which you can then use in your curl commands.
<br>Once you have the session cookie value, format is like this:<br/>
```
SESSION="connect.sid=YOUR_SESSION_COOKIE_VALUE"
```
### Get all notes
```
# Assuming you have a session stored in a variable named "SESSION"
curl -b "$SESSION" http://localhost:5000/api/notes
```

### Get specific note
```
curl -b "$SESSION" http://localhost:5000/api/notes/YOUR_NOTE_ID
```

### Create a note
```
curl -X POST -b "$SESSION" \
-H "Content-Type: application/json" \
http://localhost:5000/api/notes \
-d '{
    "title": "API Test",
    "body": "Created via API"
}'
```

### Update note
```
curl -X PUT -b "$SESSION" \
-H "Content-Type: application/json" \
http://localhost:5000/api/notes/YOUR_NOTE_ID \
-d '{
    "title": "Updated Title",
    "body": "Updated body"
}'
```

### Delete a note
```
curl -X DELETE -b "$SESSION" \
http://localhost:5000/api/notes/YOUR_NOTE_ID
```

### Search notes
```
curl -X POST -b "$SESSION" \
-H "Content-Type: application/json" \
http://localhost:5000/api/notes/search \
-d '{
    "searchTerm": "test"
}'
```

## Using Chrome DevTools
Chrome DevTools provides a powerful interface for inspecting and testing API requests directly in the browser.
1. Accessing DevTools:
   - Right-click on any webpage and select "Inspect"
   - _Press_ **Ctrl+Shift+I (Windows/Linux)**
   -  **Cmd+Option+I (Mac)**.
2. use console to input commands
### To create a note
```
fetch('/api/notes', {
    method: 'POST',
    credentials: 'include',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
        title: 'Test Note',
        body: 'Testing'
    })
}).then(r => r.json()).then(console.log)
```

### Save ID to localStorage
```
localStorage.setItem('noteId', 'COPY_YOUR_ID_HERE'); // they will work even after refresh
```

### GET the note
```
fetch(`/api/notes/${localStorage.getItem('noteId')}`, {
    credentials: 'include'
}).then(r => r.json()).then(console.log);
```

### UPDATE the note
```
fetch(`/api/notes/${localStorage.getItem('noteId')}`, {
    method: 'PUT',
    credentials: 'include',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
        title: 'Updated Again',
        body: 'Testing with localStorage'
    })
}).then(r => r.json()).then(console.log);
```

### DELETE the note
```
fetch(`/api/notes/${localStorage.getItem('noteId')}`, {
    method: 'DELETE',
    credentials: 'include'
}).then(r => r.json()).then(console.log);
```

### To check the stored noteid anytime
```
console.log('Stored note ID:', localStorage.getItem('noteId'));
```
### Remove it when you're done
```
localStorage.removeItem('noteId');

```


# Reference
For additional insights into web development and design, you can visit
[www.raddy.dev](https://www.raddy.dev)


