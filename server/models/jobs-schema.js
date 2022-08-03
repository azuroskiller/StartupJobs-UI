//Schema for Jobs document in the database

const moment = require('moment-timezone')
const mongoose = require('mongoose')
const Schema = mongoose.Schema;

const JobsSchema = new Schema({

    jobName: {
        type: String,
        required: true
    },
    country: {
        type: String,
        required: true
    },
    company: {
        type: String,
        required: true
    },
    companyID:{
        type: String,
        required: true
    },
    jobType: {
        type: String,
        required: true
    },
    salary: {
        type: String,
        required: true
    },
    skills: {
        type: String,
        required: true
    },
    jobDesc: {
        type: String,
        required: true
    },
    jobReq: {
        type: String,
        required: true
    },
    jobResponsibility: {
        type: String,
        required: false
    },
    industry: {
        type: String,
        required: true
    },
    startDate:{
        type: String,
        requrired: true
    },
    endDate:{
        type: String,
        requrired: true
    },
    DateCreated: {
        type: String,
        default: () => moment().utcOffset(+480).format()
    },
})
JobsSchema.index({'$**': 'text'});//For searching function
module.exports = mongoose.model('WebCrawler', JobsSchema)