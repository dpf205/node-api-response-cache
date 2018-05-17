'use strict';

const express = require('express');
const app = express();
let port = process.env.PORT || 8080;

const cacheService = require('./cacheService');

const cors = require('cors');
const bodyParser = require('body-parser');

// MongoDB Config/Utils
const mongoose = require('mongoose');
const MLabConnectionEndpoint = 'mongodb://admin:password@ds123770.mlab.com:23770/node-api-response-cache';
const Image = require('./models/data');
const seedDB = require('./utils/seedDB');


// middleware
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));
app.use(cors());


// request data from API
app.get('/api', function (req, res) {
    const options = {
        method: 'GET',
        uri: mockAPI,
        json: true
    };

    requestPromise(options)
        .then((response) => {
            res.send(response)
        })
        .catch((err) => {
            console.log(err)

        })
});


app.get('/', function (req, res) {

    const {name} = req.query;
    cacheService(name, age => {

        res.end(age)
    })
});


app.get('/seed', (req, res) => {
    seedDB();
    res.send('data saved from API')
});

app.get('/show', (req, res) => {
    Image.find({}, (err, data) => {

        if (err) throw err;

        console.log(data);
        res.send('works!');
    })
});


app.listen(port, () => {

    mongoose.Promise = global.Promise;

    // connect to MLab MongoDB instance
    mongoose.connect(MLabConnectionEndpoint)
        .then(() => console.log('connected MLab MongoDB'))
        .catch((err) => console.error(err));

    console.log(`Express server on port ${port}`);
});