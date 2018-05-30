const mongoose = require('mongoose');
const Image = require('../models/data.js');


const documentCount = (req, res) => {

    let testQuery = 'accu'; // full or partial  match

    Image.count({"title": {'$regex': testQuery, '$options': ['i', 'm']}}, function (err, count) {
        if (err) {
            console.log(err);
        } else if (count === 0) {
            console.log(`documentCount() --> No Found Records. Count is ${count}`);
            res.send(` No Found Records. Count is ${count}`)
        } else {
            console.log(`documentCount() --> Records Found! Count is ${count}`);
            res.send(`Records Found! Count is ${count}`)
        }

    });
};


module.exports = documentCount;