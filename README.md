To get the project started run docker compose up --build
when this completes the server log will tell you success to database.
ctrl + c to close the run window and run 
docker compose up /-d

this spins up the backend 

navigate to exchange-converter/ and run 
ng serve

the angular app is running in development mode and can be accessed from localhost:4200

The backedn server needs to spin up a database and when it is completed it populates
todays datatable wiht the stock info and saves it

the front end gets the data from a calculated result from the saved forex data

Whent the application is started it checks the datat and creates a new forex_data_data table for that day.
To query the api does not trigger thrid party api requests
setup .env required

FCSAPI_URL=
FCSAPI_KEY=
POSTGRES_USER=
POSTGRES_PASSWORD=
POSTGRES_DB=
POSTGRES_PORT=5432
HTTP_PORT=3000
