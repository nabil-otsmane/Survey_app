# Survey taking app
Code Labs Academy
-

A web application to create and answer surveys anonymously.

#
## How to run
to run this app in development mode, all you need to do is
enter the folders `frond` and `API` each in its own terminal And execute the following commands in both terminals:

```npm install```

```npm run start```

Visit the link http://localhost:3000/ when the above commands complete.

> **PS :** this way of running the project requires both ports `3000` and `8000` to be available. In case of a problem with these ports, please refer to the files `front/src/base_url.js` and `API/index.js` to change  numbers according to your needs.

#
## Data Persistence
the application, for now, uses simple JSON files as a way to store informations that we want to persist in the system, this method is actually sufficient when the amount of data to store is low but is not as maintainable.

A better solution would be to use a database like MongoDB as it is a NoSQL database, with JSON-like documents. This way, we'll be having an efficient way to retreive and manipulate our data, along with a simple interface that is easier to maintain.