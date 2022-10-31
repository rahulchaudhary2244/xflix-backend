const mongoose = require('mongoose');

const { app } = require('./app');

const APP_PORT = process.env.APP_PORT;
const MONGODB_URL = process.env.MONGODB_URL;

app.listen(APP_PORT, () => console.log(`Server listening at port ${APP_PORT}`));

mongoose
    .connect(MONGODB_URL)
    .then(() => console.log(`Connected to DB at ${MONGODB_URL}`))
    .catch((error) =>
        console.log(`Error connected to DB at ${MONGODB_URL}\n`, error)
    );
