# HealthTrack

HealthTrack consists of a medical tool for managing patients in a health care unit, such as emergency units (such as UPAs, in Brazil) or hospitals. The project was developed as the conclusion work of the Web Applications Development Course in July 2023.

## Database initialization
The database can be initialized with only one user, with username and password equal to **admin** by the following command.

```
npm run initialize-database
```

## Start application and database

```
npm run app
```

```
npm run data
```

## Interaction between Client and Servers
The interaction between the client and the servers is illustrated in the following image where the GET and POST methods are used for the interaction between the client and the application server and the GET, POST, PUT and DELETE methods are used for the interaction between the application server and the database server.

![ClientServerInteraction](https://github.com/imonteiroyh/WEB/assets/61994795/aa3148e5-04d4-4c81-9180-d4dc38cdfc66)

## Access and content management
The application has different user profiles, which have access only to specific pages. There are four user types, specified as follows:

> Administrator

Manages the users of the system, registering and removing users, and removing patients when necessary.

> Attendant

Register new patients and register new records for already registered patients 

> Risk Classifier

Visualize the records in a table, which is periodically updated and ordered by registration time. The user collect information on temperature, pressure and other basic information about the patient's symptoms and assign an appropriate risk to the patient.

> Doctor

Visualize the records in a table, which is periodically updated and ordered by risk. The user can edit the information previously collected by the risk classifier.

## Contributions
The project was made by Vandemberg Monteiro, responsible for the back-end, and Yago Oliveira, responsible for the front-end. It is worth mentioning that both project's participants took part in the development and testing of the application's functionalities.
