# user_preferences

The user preferences page allows users to customize their settings.

# features

Multi-tab settings (Account, Notification, Theme, Privacy)

Dynamic sidebar navigation

User-specific customization

Backend API for saving/loading preferences

Responsive UI using Webix

# file structure
user_preferences/
│
├── client/                  # Frontend codebase (Webix app)
│   └── src/
│       ├── assets/
│       ├── components/
│       ├── pages/
│       ├── styles/
│       ├── utils/
│       ├── app.js
│       └── auth.js
│
├── server/                  # Backend codebase (Django)
│   ├── backend/             # Django project folder
│   └── users/               # Django app handling user logic
│
├── README.md

# Install and Setup
git clone git@github.com:TishaniNR/user_preferences.git
cd user_preferences

# backend setup

# navigate to backend
cd server

# activate a Python virtual environment
python3 -m venv venv
source venv/bin/activate    

# Run django migration
python manage.py migrate

# Run the backend server
python manage.py runserver
(default it will run : http://127.0.0.1:8000)

# frontend setup
cd ../client

# install node modules
npm install

# run the front end
npm start
(default it will run : http://localhost:5173)


# test user
email : test1@gmail.com
password : test1