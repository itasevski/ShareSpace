## ShareSpace

ShareSpace is a system where people can interact and share public transport expenses. This repository contains its source code.

### Setting up the application

1. Make sure you have a PostgreSQL server installed locally or a Docker container with a PostgreSQL server image running. After that, edit the application-sharespace.properties file with your information.
2. Add a Database source with information that corresponds to the information in the .properties file. Make sure you select a PostgreSQL DB source.
3. After this, start the application. The database and its related entities should be built by Hibernate during runtime.
4. To start the React application, first make sure port 3000 on your localhost is not being used by another service. After that, open your terminal, navigate to the "sharespace-frontend" directory and enter the command "npm start". The development server will start and your default browser will open automatically.

To avoid referential integrity violations, open the database console in your editor/IDE and paste the SQL code given in "project-material/SQL-backup-script.txt". After that, select the code and run it in the console.

Additional usage guides are available in the "About" section of the web application.

For the application's Geocoding/Geolocation services, you must create your own Google Cloud project and an associated Geocode API key.

You can generate one by following the steps in the following link: https://developers.google.com/maps/documentation/javascript/get-api-key#creating-api-keys

Once your key is generated for your newly created project, you need to enable the "Geocoding" API for that concrete project.

Once you have done that, just create a ".env" file in the "sharespace-frontend" directory and paste the following line: 
"REACT_APP_GEOCODE_API_KEY=<YOUR_API_KEY>", where <YOUR_API_KEY> is your newly generated API key.