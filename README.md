# Clone the master branch
git clone -b master --single-branch https://github.com/HarshM96/BT.git
# Setup Instructions
- Run the requirements.txt file inside the backend folder
- pip install -r requirements.txt
# Setting up MySQL Database
- Setup a localhost or a host on your server and add the details in the .env file inside the backend folder
- Run the Script inside the SQL_Database_Script.txt file
# Run Backend
- Inside the backend folder, run "uvicorn main:app --reload" to start the backend
# Start Frontend
- Inside the fronend folder, run 'npm install' on cmd
- Inside the frontend folder, run "npm start"