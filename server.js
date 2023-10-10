const express = require('express');
const routes = require('./routes/route');
const connectDatabase = require('./config/database');
const bodyParser = require("body-parser");
const path = require('path');

const app = express();

require('dotenv').config({path: './config/config.env'});
connectDatabase();
app.use(bodyParser.urlencoded({extended: true}));

app.use(express.json());
app.use('/api', routes);

app.use(express.static(path.join(__dirname, "./frontend/build")));
app.get("*", (req, res) => {
    res.sendFile(path.join(__dirname, "./frontend/build/index.html"))
})

app.listen(process.env.PORT, () => {
    console.log(`Server is running on port ${process.env.PORT}`);
});
