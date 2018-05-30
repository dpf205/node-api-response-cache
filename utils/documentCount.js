const mongoose = require('mongoose');
const Image = require('../models/data.js');


const documentCount = (req, res, testQuery) => {

    let Model = Image;

    Model.count({"title": {'$regex': testQuery, '$options': ['i', 'm']}}, function (err, count) {
        if (err) {
            console.log(err);
        } else if (count === 0) {
            console.log(`documentCount() --> No Found Records. Count is ${count}`);
            res.send(` No Found Records. Count is ${count}`)
            return false;
        } else {
            console.log(`documentCount() --> Records Found! Count is ${count}`);
            res.send(`Records Found! Count is ${count}`)
        }

    });
};


module.exports = documentCount;