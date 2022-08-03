//Schema for Users document in the database

const mongoose = require('mongoose');
const moment = require('moment-timezone')
const jwt = require('jsonwebtoken')
const Schema = mongoose.Schema;

let userSchema = new Schema({
    
    name: {
        type: String,
        required: true
    },
    username: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: false
    },
    company: {
        type: String,
        required: false
    },
    position: {
        type: String,
        required: false
    },
    type: {
        type: String,
        required: true
    },
    createdAt: {
        type: String,
        default: () => moment().utcOffset(+480).format()
    },
    verified: {
        type: Boolean,
        required: true,
        default: false
    },
    userLevel:{
        type: Number,
        default: 0
    }
}, {
    collection: 'users'
})
userSchema.index({'$**': 'text'}); //For searching function
module.exports = mongoose.model('User', userSchema)