'use strict';

const express = require('express');
const app = express();
let port = process.env.PORT || 8080;

const cacheService = require('./utils/cacheService');

const cors = require('cors');
const bodyParser = require('body-parser');

// MongoDB Config/Utils
const mongoose = require('mongoose');
const MLabConnect = 'mongodb://admin:password@ds133136.mlab.com:33136/node-api-response-cache';
const Image = require('./models/data');
const apiRequest = require('./utils/apiRequest');
const documentCount = require('./utils/documentCount');

// middleware
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));
app.use(cors());


app.get('/', (req, res) => {

    let Model = Image;

    let testQuery = 'accu'; // full or partial  match
    let responseDataLimit = 1;

// check the db, if you dont find the info, hit the api, and save the response to the db
    Model.find({'title': {'$regex': testQuery, '$options': ['i', 'm']}}, (err, data) => {
        if (err) {
            console.log(`\n Error message: ${err} \n`);
        }
        else if (documentCount(req, res, testQuery) === false) {
            apiRequest();
            console.log(`\n the payload: \n ${data} `);

        } else {
            console.log(`API response should contain data: \n\n ${data}`);
        }

    })
        .limit(responseDataLimit)
        .exec((err, data) => {
            if (err) {
                console.log(err)
            }
            console.log(data)
        });
});

// request data from API and display
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
            console.log(err);
        })
});


app.get('/display-data', (req, res) => {

    let limitResponse = 1;
    Image.find()
        .limit(limitResponse)
        .exec((err, data) => {
            if (err) {
                console.log(err);
            } else if (data)
                console.log(data)

            res.send(`retrieved ${limitResponse} images`);
        });

});


app.get('/seed', (req, res) => {
    apiRequest();
    res.end('API response saved to DB')
});


app.get('/doc-count', (req, res) => {
    documentCount(req, res); // curried request and response objects
});


app.listen(port, () => {

    mongoose.Promise = global.Promise;

    // connect to MLab MongoDB instance
    mongoose.connect(MLabConnect)
        .then(() => console.log('connected MLab MongoDB'))
        .catch((err) => console.error(err));

    console.log(`Express server on port ${port}`);
});