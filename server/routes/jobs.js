let mongoose = require('mongoose'),
    express = require('express'),
    router = express.Router(),
    job = require('../models/jobs-schema');


//Retrieve all job and sort by their last date available
router.route('/').get((req, res, next) => {
    job.aggregate([
        { $sort: { endDate: -1 } }
    ], (error, data) => {
        if (error) {
            return next(error)
        } else {
            res.json(data)
        }
    })
});


//Create job and save to DB
router.post('/create', async (req, res) => {

    const { jobName, country, company, salary, skills, jobType, jobDesc, jobReq, jobResponsibility, industry, startDate, endDate, companyID } = req.body;

    try {
        await job.create({
            jobName,
            country,
            company,
            salary,
            skills,
            jobType,
            jobDesc,
            jobReq,
            jobResponsibility,
            industry,
            startDate,
            endDate,
            companyID,
        });
        res.send({ status: "ok" });
    } catch (error) {
        res.send({ status: "error" });
    }
});


//To retrieve current user(company) jobs posted by matching the id
router.post('/myJobs', async (req, res, next) => {
    job.aggregate([
        { $match: { "companyID": req.body.id } },
        { $sort: { endDate: -1 } }
    ], (error, data) => {
        if (error) {
            return next(error)
        } else {
            res.json(data)
        }
    })
});

//For search jobs matching with every collumn in the document
router.post('/search', async (req, res, next) => {

    job.aggregate([
        { $match: { $text: { $search: req.body.input } } },
        { $sort: { endDate: -1 } }
    ], (error, data) => {
        if (error) {
            return next(error)
        } else {
            res.json(data)
        }
    })
});

//For delete job by searching the id
router.post('/deleteJob', async (req, res) => {

    const Job = await job.findByIdAndRemove(req.body.id).exec();

    if (!Job) {
        console.log('Failed to Delete');
    } else {
        console.log('Job Deleted')
    }
})

//For retrieving job to be edited
router.post('/getJob', async (req, res) => {
    const Job = await job.findOne({ _id: req.body.tempid })

    if (!Job) {
        return { status: 'error', error: 'Invalid Login' }
    } else {
        return res.json({
            status: 'ok',
            id: Job._id,
            jobName: Job.jobName,
            country: Job.country,
            company: Job.company,
            salary: Job.salary,
            skills: Job.skills,
            jobType: Job.jobType,
            jobDesc: Job.jobDesc,
            jobReq: Job.jobReq,
            jobResponsibility: Job.jobResponsibility,
            industry: Job.industry,
            startDate: Job.startDate,
            endDate: Job.endDate,
            companyID: Job.companyID,
        })
    }
})

//To update job
router.post('/updateJob', async (req, res) => {

    const Job = await job.findByIdAndUpdate(req.body.id,
        {
            $set:
            {
                jobName: req.body.jobName,
                country: req.body.country,
                company: req.body.company,
                salary: req.body.salary,
                skills: req.body.skills,
                jobType: req.body.jobType,
                jobDesc: req.body.jobDesc,
                jobReq: req.body.jobReq,
                jobResponsibility: req.body.jobResponsibility,
                industry: req.body.industry,
                startDate: req.body.startDate,
                endDate: req.body.endDate,
            }
        }).exec();

    if (!Job) {
        console.log('Failed to Update');
    } else {
        console.log('Job Updated')
    }
})


module.exports = router;