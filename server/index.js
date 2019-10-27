const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const PORT = process.env.PORT || 3001;

const userRouter = require('./routers/user');
const taskRouter = require('./routers/task');

// Runs mongoose db
require('./db/mongoose');

// Sets up app to parse json
app.use(bodyParser.json())

app.use(userRouter);
app.use(taskRouter);

app.listen(PORT, () => {
    console.log('app is running')
});