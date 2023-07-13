# Recipe-Management-System-Sequelize

A recipe management system using PostGreSQL and Sequelize in tandem. Does not use SQL
in most parts and depends on Sequelize to take its place.

# npm packages

This program depends on the following node packages:
```
sequelize
sequelize-cli
dotenv
pg
nodemon (optional)
express
```

There may be one or two forgotten packages, but these are used in the majority of the program.

# Making a table and starting the server

A table will be made automatically, using the model as a reference for the fields. You may make a table by
 using either "node server.js" or "node database.js", but only the former command will also run the server. 
 The purpose of "node database.js" is for personal development use to test the difference between using sync() and authenticate();

 # Misc

 A couple of things exist in the program which are not necessary, such as the UUID field. This field is testing the creation of unique IDs and is not meant to 
 be used as an actual identifier. "database.js" is a test file; it is still useable, but it is advised to create a table with server.js instead.

 I've also replaced the "Sequelize" data in the model with "DataTypes" as it felt easier to read and avoids type errors when posting.

 # Using Postman

 All postman functions work as tested. To test some functions, such as put, patch, and post, you can try using a pre-written body for postman below:
```
 {
    "title": "Cheese",
    "description": "Described",
    "ingredients": "Stuff",
    "instructions": "Do stuff"
}
```

You can also test input validation by simply changing the string length of the values