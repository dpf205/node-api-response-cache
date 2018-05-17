'use strict';
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const Image = new Schema({
    albumId: Number,
    id: Number,
    title: String,
    url: String,
    thumbnailUrl: String
});

module.exports =  mongoose.model('Image', Image);

