
How to startup mongodb
$ pathtomongo/bin/mongod --dbpath=/pathtodbfolder/mongodb-data

 /Users/marlenebowles/mongodb

 - figure out how to rename app
 - figure out httpstatuses

DB Modeling
Users
- User creates themselves and creates a group
- if no group is created they are their own group
- the users id is looked up into the group
- everytime they create a task it is saved under their group
- tasks can get assigned to users in a group

