const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const PORT = process.env.PORT || 3001;
const User = require('./models/user');

// Runs mongoose db
require('./db/mongoose');

// Sets up app to parse json
app.use(bodyParser.json())

app.post('/users', (req, res) => {
    const user = new User(req.body);
    user.save().then(result => {
        res.send(user);
    }).catch(err => {
        res.status(400).send(err)
    });
});

app.listen(PORT, () => {
    console.log('app is running')
});