Date: 14/11/2020
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
Open Stack Information:
------------------------------------------------------------------------------------------------------------------



------------------------------------------------------------------------------------------------------------------
Additional Features:
------------------------------------------------------------------------------------------------------------------

- Created CORS error checking, allowing for clients on other ports to do things 
  on the server.

------------------------------------------------------------------------------------------------------------------
Important Notes:
------------------------------------------------------------------------------------------------------------------

Our express works for the user login and create account page, however, we were unable to get our user sessions
working. As a result, many of our user dependent methods won't run properly; so to show our plan. We
have created all the (post, delete, patch, and get) requests that we plan on using and have outlined what they 
will do when we have user sessions up and running. 
