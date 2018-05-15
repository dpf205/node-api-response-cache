const express = require('express');
const app = express();
let port = process.env.PORT || 8080;

const ageService = require('./age-service');



app.get('/', function(req, res) {

    const {name} = req.query
    ageService((name, age) => {

        res.end(age)
    })
});



app.listen(port, () => {
    console.log(`Express server on port ${port}`);
});