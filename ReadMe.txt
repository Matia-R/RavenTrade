Date: 14/11/2020
Project: Stock Market
Partners: Ethan Brydon (101157918) AND Matia Raspopovic (101155148)

------------------------------------------------------------------------------------------------------------------
Open Stack Information:
------------------------------------------------------------------------------------------------------------------

To access the server OpenStack server which contains our code and other relevant files, open your terminal and enter
the following command:

student@134.117.128.242

You will be prompted for a password, enter:

student

*note the ip address of the server follows the "@" in the command.

To launch the app, enter the command:

npm start

Now, open a new terminal and enter the command:

ssh -L 9999:localhost:3000 student@134.117.128.242

*note again the ip address is the same as before.

Now to access the app itself, open a web browser and enter the URL:

localhost:9999

*This is the tunneled port

Should any issues arise, terminate the instance of the server and try again. If any files are missing or serious
missing-module errors occur (or something to that effect) please contact us at matiaraspopovic@cmail.carleton.ca as
we do not anticipate this and tested thoroughly.

------------------------------------------------------------------------------------------------------------------
Additional Features:
------------------------------------------------------------------------------------------------------------------

- Created CORS error checking, allowing for clients on other ports to do things 
  on the server.

------------------------------------------------------------------------------------------------------------------
Important Notes:
------------------------------------------------------------------------------------------------------------------

Our express works for the user login and create account page, however, we were unable to get our user sessions
working. As a result, many of our user dependent methods won't run properly; so to show our plan we
have created all the (post, delete, patch, and get) requests that we plan on using and have outlined what they 
will do when we have user sessions up and running. Note you can login and create an account without issue - only
a unique session will not be created on login. 
