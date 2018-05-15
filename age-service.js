database queries can be expensive).

Enter : the cache layer

The cache layer is a temporary datastore, which is much faster than the database. The server, after receiving a request, first checks if the cache has the response available. If so, it sends it to the client. If not, it queries the database as usual, and stores the response in the cache before sending it back to the client. This way, every response is either cached, or retrieved from the cache, and as a result, the load to our server and database is reduced.

    with cache

Building our server
Prerequisites
This example uses NodeJs v6.x.x, along with redis for our cache, so make sure you have those installed first.

    Start up your redis server using the command :

    redis-server
Create a new directory for your project, and create a package.json file, and install the required node modules by running :

    npm init
npm install --save redis express
Set up the mock database service
The first module we are going to set up is our mock database (since installing and operating an actual database would be a whole other post in itself)

Create a file called age-service.js

/*
The mock data which we have in our database
*/
const ages = {
    John: '20',
    Michelle: '34',
    Amy: '31',
    Doug: '22'
}

/*
We create an async function, which accepts a name, and a callback function to
be called once we fetch the age from out database.

To simulate the time it takes to fetch results from an actual database, we set
a timeout of 1 second, and then return the age of the person requested.
*/
const getAgeFromDb = (name, cb) => setTimeout(() => {
    //This is to verify that out database is being called.
    console.log('Fetching from db')

    //Returns "Does not exist" if an unknown name is given
    const age = ages[name] || 'Does not exist'

    // Call the callback function with the result
    cb(age)
}, 1000)

module.exports = getAgeFromDb