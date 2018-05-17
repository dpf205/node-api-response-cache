'use strict';

// Redis Labs config
let redisLabsPort = '10255';
let redisLabsPass = 'A5VtqZSTxvnqu4L7IT3SGKCcIGLlu7oz';
let redisLabsEndpoint = 'redis-10255.c13.us-east-1-3.ec2.cloud.redislabs.com'

let redis = require('redis');

let client = redis.createClient(redisLabsPort, redisLabsEndpoint, {no_ready_check: true});

client.auth(redisLabsPass, function (err) {
    if (err) throw err;
});


client.on('connect', function () {
    console.log('Connected to Redis');
});

module.exports = client;

