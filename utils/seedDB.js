const mongoose = require('mongoose');
const Image = require('../models/data.js');
const requestPromise = require('request-promise');

const mockAPI = 'https://jsonplaceholder.typicode.com/photos';


const seedDB = () => {
    const options = {
        method: 'GET',
        uri: mockAPI,
        json: true
    };

    requestPromise(options)
        .then((response) => {
            for (let i = 0; i < response.length; i++) {

                // console.log(response[i])
                let newData = new Image(response[i]);
                newData.save();
            }
        })
        .catch((err) => {
            console.log(err)
        })
};


module.exports = seedDB;