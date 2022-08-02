let mongoose = require('mongoose'),
    express = require('express'),
    router = express.Router(),
    user = require('../models/user-schema');

const nodemailer = require('nodemailer');
const crypto = require("crypto");
const jwt = require("jsonwebtoken")
const bcrypt = require('bcrypt');

const transporter = nodemailer.createTransport({
    service: "Gmail",
    auth: {
        user: process.env.EMAIL_USERNAME,
        pass: process.env.EMAIL_PASSWORD,
    },
});


router.post('/create', async (req, res) => {


    // const { name, username, email, password, company, position } = req.body;
    const { name, username, email, type } = req.body;

    // const encryptedPassword = await bcrypt.hash(password, 10);

    const output = `
        <p>Thank You for registering to Startup Database</p>
        <p>Your account is in process of verification by our staff</p>
        <p>You will receive an email from us when you account is ready</p>
        <h3>Account Details:</h3>
        <ul>
            <li>Name:      ${name}</li>
            <li>Email:     ${email}</li>
            <li>Username:  ${username}</li>
            <li>User Type: ${type}</li>
        </ul>
    `;

    try {
        const existingUser = await user.findOne({ email });

        if (existingUser) {
            return res.json({ error: "Account with the same email existed" })
        }
        await user.create({
            name,
            username,
            email,
            // password: encryptedPassword,
            // company,
            // position,
            type,
        });

        // create reusable transporter object using the default SMTP transport
        let transporter = nodemailer.createTransport({
            service: 'gmail',
            host: 'smtp.gmail.com',  // true for 465, false for other ports
            auth: {
                user: "wafiqhey@gmail.com",
                pass: "tawehrlqrjlbozbo",
            },
            tls: {
                rejectUnauthorized: false
            }
        });

        // setup email data with unicode symbols
        let mailOptions = {
            from: '<hairul@gmail.com>', // sender address
            to: email, // list of receivers
            subject: 'Startup Database Account Creation', // Subject line
            text: 'Hello world?', // plain text body
            html: output // html body
        };

        transporter.sendMail(mailOptions, (error, info) => {
            if (error) {
                return console.log(error);
            }
            console.log('Message sent: %s', info.messageId);
            console.log('Preview URL: %s', nodemailer.getTestMessageUrl(info));

            res.render('contact', { layout: false, msg: 'Email has been sent' });
        });

        res.send({ status: "ok" });
    } catch (error) {
        res.send({ status: "error" });
    }
});

router.post('/createInternal', async (req, res) => {

    const { name, username, email, password, company, position } = req.body;

    const encryptedPassword = await bcrypt.hash(password, 10);

    try {
        const existingUser = await user.findOne({ email });

        if (existingUser) {
            return res.json({ error: "Account with the same email existed" })
        }
        await user.create({
            name,
            username,
            email,
            password: encryptedPassword,
            company: "NEXEA",
            position,
            type:"User",
            userLevel: "1",
        });
        res.send({ status: "ok" });
    } catch (error) {
        res.send({ status: "error" });
    }
});

router.post('/login', async (req, res) => {

    const User = await user.findOne({
        username: req.body.username,
    })

    if (!User) {
        return { status: 'error', error: 'Invalid Login' }
    }

    const isPasswordValid = await bcrypt.compare(
        req.body.password,
        User.password
    )

    if (isPasswordValid) {

        const jwtoken = jwt.sign(
            {
                name: User.name,
                email: User.email,
            }, 'secret123'
        )

        return res.json({ status: 'ok', token: jwtoken, user: User.name, level: User.userLevel, username: User.username, type:User.type, level:User.userLevel, id:User._id })
    } else {
        return res.json({ status: 'error', token: false })
    }
});

router.route('/').get((req, res, next) => {
    user.aggregate([
        { $match: { "company": { $ne: "NEXEA" } } },
        { $sort: { verified: 1 } }
    ], (error, data) => {
        if (error) {
            return next(error)
        } else {
            res.json(data)
        }
    })
});

router.route('/internal').get((req, res, next) => {
    user.aggregate([
        { $match: { "company": "NEXEA" } },
        { $sort: { verified: 1 } }
    ], (error, data) => {
        if (error) {
            return next(error)
        } else {
            res.json(data)
        }
    })
});

router.post('/search', async (req, res,next) => {
    
    user.aggregate([
        { $match: {$text: { $search: req.body.input } } },
        // { $match: { "company": { $ne: "NEXEA" } } },
        { $sort: { verified: 1 } }
    ], (error, data) => {
        if (error) {
            return next(error)
        } else {
            res.json(data)
        }
    })
});

router.post('/getUser', async (req, res) => {
    const User = await user.findOne({ username: req.body.username })

    if (!User) {
        return { status: 'error', error: 'Not Found' }
    } else {
        return res.json({
            status: 'ok',
            name: User.name,
            username: User.username,
            email: User.email,
            password: User.password,
            company: User.company,
            position: User.position,
            level: User.userLevel,
            id: User._id
        })
    }
})

router.post('/deleteUser', async (req, res) => {

    const User = await user.findByIdAndRemove(req.body.id).exec();

    if (!User) {
        console.log('Failed to Delete');
    } else {
        console.log('User Deleted')
    }
})

router.post('/verifyUser', async (req, res) => {

    const User = await user.findByIdAndUpdate(req.body.id,
        {
            $set: { verified: true }
        }).exec();
    const usermail = User.email
    const output = `
        <p>Thank You for registering to Startup Database.</p>
        <p>Your account has been verified.</p>
        <p>Please click the link below to finish creating your account by entering your password.</p>
        <a href=http://localhost:3000/passwordCreation target=_blank> Click here to finish account creation</a>
        <h3>Account Details:</h3>
        <ul>
            <li>Name:     ${User.name}</li>
            <li>Email:    ${User.email}</li>
            <li>Username:  ${User.username}</li>
            <li>User Type: ${User.type}</li>
        </ul>
    `;



    if (!User) {
        console.log('Failed to Veirfy');
    } else {

        // create reusable transporter object using the default SMTP transport
        let transporter = nodemailer.createTransport({
            service: 'gmail',
            host: 'smtp.gmail.com',  // true for 465, false for other ports
            auth: {
                user: "wafiqhey@gmail.com",
                pass: "tawehrlqrjlbozbo",
            },
            tls: {
                rejectUnauthorized: false
            }
        });

        // setup email data with unicode symbols
        let mailOptions = {
            from: '<hairul@m.nexea.com>', // sender address
            to: User.email, // list of receivers
            subject: 'Startup Database Account Verification', // Subject line
            text: 'Email Verified', // plain text body
            html: output // html body
        };

        transporter.sendMail(mailOptions, (error, info) => {
            if (error) {
                return console.log(error);
            }
            console.log('Message sent: %s', info.messageId);
            console.log('Preview URL: %s', nodemailer.getTestMessageUrl(info));

            res.render('contact', { layout: false, msg: 'Email has been sent' });
        });

        console.log('User Verified')
    }
})

router.post('/updateUser', async (req, res) => {

    const tempUser = await user.findById(req.body.id)

    const isPasswordValid = await bcrypt.compare(
        req.body.password,
        tempUser.password
    )

    if (isPasswordValid) {
        const User = await user.findByIdAndUpdate(req.body.id,
            {
                $set:
                {
                    name: req.body.name,
                    username: req.body.username,
                    company: req.body.company,
                    position: req.body.position
                }
            }).exec();

        if (!User) {
            console.log('Failed to Update');
        } else {
            console.log('User Updated')
        }
    }
})

router.post('/finishUser', async (req, res) => {

    const encryptedPassword = await bcrypt.hash(req.body.password, 10);
    const User = await user.findOneAndUpdate({ email: req.body.email },
        {
            $set:
            {
                password: encryptedPassword,
            }
        }).exec();

    if (!User) {
        console.log('Failed to Update');
    } else {
        console.log('User Updated')
    }
})


router.route('/edit/:id').get((req, res) => {
    user.findById(req.params.id, (error, data) => {
        if (error) {
            return next(error)
        } else {
            res.json(data)
        }
    })
});

router.route('/update/:id').get((req, res, next) => {
    user.findByIdAndUpdate(req.params.id, {
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
    user.findByIdAndRemove(req.params.id, (error, data) => {
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