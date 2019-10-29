
How to startup mongodb
$ pathtomongo/bin/mongod --dbpath=/pathtodbfolder/mongodb-data

 /Users/marlenebowles/mongodb

 - figure out how to rename app
 - figure out httpstatuses

DB Modeling
Users
- User creates themselves and creates a household
- the users id is looked up into the group
- everytime they create a task it is saved under their group
- tasks can get assigned to users in a group

household
name
password

Use Cases
person has to invite into their household
email is created, they have to login and their email has to match

households have users
households have tasks

tasks get reassigned