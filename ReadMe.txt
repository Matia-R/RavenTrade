Date: 07/10/2020
Project: Stock Market
Partners: Ethan Brydon (101157918) AND Matia Raspopovic (101155148)

------------------------------------------------------------------------------------------------------------------
Setup Instructions:
------------------------------------------------------------------------------------------------------------------

The Web App runs using an Express Node.js server, so to properly setup the environment ensure Node.js is installed
on your system and navigate to the root directory in terminal/cmd and enter the following command:

npm install

If done correctly, a folder called "node_modules" will have been created in the root directory. These modules
are required for the server to run and for the app engine to function.

------------------------------------------------------------------------------------------------------------------
Running the App:
------------------------------------------------------------------------------------------------------------------

After following the setup, you can run the server by navigating to the root directory in terminal/cmd and entering 
the following command:

npm start

Now, to access the app itself, open any web browser and enter the URL localhost:3000 (as the sevrer is running on
port 300). This will take you to the login page of the app (index).

------------------------------------------------------------------------------------------------------------------
Business Logic:
------------------------------------------------------------------------------------------------------------------

The business logic of the program can be found in Project Check-In #2/public/js/dynamics.js . The logic has not yet
been integrated with the UI so simply run the file in an IDE and view some sample test results in the console.

------------------------------------------------------------------------------------------------------------------
Additional Features:
------------------------------------------------------------------------------------------------------------------

Some routing between pages has been implemented using Express routers. This can be seen in Project Check-In #2/app.js
(app engine), and Project Check-In #2/routes (js routing files for each page). There is not currently routing from
the login/create account pages to the core app pages yet so to access the rest of the pages, simply add '/portfolio'
to the end of the url when running, and any routing from then on will be functional within the links. 

