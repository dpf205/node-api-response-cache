'use strict';

const TestData = require('./models/data');
const mongoose = require('mongoose');

// const ages = {
//     John: '20',
//     Michelle: '34',
//     Amy: '31',
//     Doug: '22'
// };
//
// const getDataFromDb = (name, cb) => {
//     setTimeout(() => {
//         console.log('Fetching from db');
//         const age = ages[name] || 'Does not exist';
//          cb(age);
//     }, 1000)
// };
//
// // export a new function, which uses the cache
// module.exports = (name, cb) => {
//
//     // check if the data exists in the cache
//     client.get(name, (err, age) => {
//         if (age !== null) {
//
//             //If it does, return it in the callback
//               cb(age)
//         }
//
//         // since the data is not in the cache, request it from the API
//         getDataFromDb(name, age => {
//
//             //store data in cache
//             client.set(name, age, () => {
//                 console.log('\n Storing to db \n')
//
//                 // data is stored in the redis cache; return the data via the callback
//                  cb(age);
//             })
//         })
//     })
// };

// TODO: 1) Check the cache for data,
// TODO: 2) If data is present in cache, return it to client
// TODO: 3) If data is absent in cache, request it from API and save it to cache and to the DB

const cacheService = () => {

    TestData.findOne({}, (err, data) => {
        if (err) throw err;

        // object of all the users
        console.log(data);
    });

    setTimeout(() => {
        console.log('Fetching from db');

        const age = ages[name] || 'Does not exist';
         cb(age);
    }, 1000)
};

