let mongoose = require('mongoose'),
    express = require('express'),
    router = express.Router(),
    job = require('../models/jobs-schema');

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

router.post('/deleteJob', async (req, res) => {

    const Job = await job.findByIdAndRemove(req.body.id).exec();

    if (!Job) {
        console.log('Failed to Delete');
    } else {
        console.log('Job Deleted')
    }
})

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

router.route('/edit/:id').get((req, res) => {
    job.findById(req.params.id, (error, data) => {
        if (error) {
            return next(error)
        } else {
            res.json(data)
        }
    })
});

router.route('/update/:id').get((req, res, next) => {
    job.findByIdAndUpdate(req.params.id, {
        $set: req.body
    }, (error, data) => {
        if (error) {
            return next(error)
            console.log(error);
        } else {
            res.json(data)
            console.log('User Updated Successfully')
        }
    })
})

router.route('/delete/:id').delete((req, res, next) => {
    job.findByIdAndRemove(req.params.id, (error, data) => {
        if (error) {
            return next(error);
        } else {
            res.status(200).json({
                msg: data
            })
        }
    })
})

module.exports = router;