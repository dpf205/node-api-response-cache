const cache = require('./cache');

const ages = {
    John: '20',
    Michelle: '34',
    Amy: '31',
    Doug: '22'
};

const getAgeFromDb = (name, cb) => {
    setTimeout(() => {
        console.log('Fetching from db');
        const age = ages[name] || 'Does not exist';
        return cb(age);
    }, 1000)
};

// export a new function, which makes use of the cache
module.exports = (name, cb) => {

    // check if the age exists in our cache
    cache.get(name, (err, age) => {
        if (age !== null) {
            //If it does, return it in the callback
             return cb(age)
        }


        // data not in the cache, query it from database

        getAgeFromDb(name, age ,() => {

            //store data in cache
            cache.set(name, age, () => {

                // data is stored in the redis cache
                // return the data via the callback
                 cb(age);
            })
        })
    })
};