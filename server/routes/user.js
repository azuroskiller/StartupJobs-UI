let mongoose = require('mongoose'),
    express = require('express'),
    router = express.Router(),
    user = require('../models/user-schema');

const nodemailer = require('nodemailer');
const jwt = require("jsonwebtoken")
const bcrypt = require('bcrypt');

//To create user
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
                user: "nexeatech@gmail.com",
                pass: "yolskfowjdokwhxa",
            },
            tls: {
                rejectUnauthorized: false
            }
        });

        // setup email data with unicode symbols
        let mailOptions = {
            from: '<NEXEATech@gmail.com>', // sender address
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

//To create internal/staff user
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

//For login function
router.post('/login', async (req, res) => {

    const User = await user.findOne({
        username: req.body.username,
    })

    if (!User) {
        return { status: 'error', error: 'Invalid Login' }
    }

    //Comparing the password from form to the password in DB by turning the pasword in DB to string
    const isPasswordValid = await bcrypt.compare(
        req.body.password,
        User.password
    )

    if (isPasswordValid) {
        //To generate user token
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

//Get user that is not NEXEA or not internal and sort by verified first
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

//Get internal user and sort by verified first
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

//To search user and sort by verified first
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

//Get current user details
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

//Delete user function
router.post('/deleteUser', async (req, res) => {

    const User = await user.findByIdAndRemove(req.body.id).exec();

    if (!User) {
        console.log('Failed to Delete');
    } else {
        console.log('User Deleted')
    }
})

//For user verification with email sending
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
                user: "nexeatech@gmail.com",
                pass: "yolskfowjdokwhxa",
            },
            tls: {
                rejectUnauthorized: false
            }
        });

        // setup email data with unicode symbols
        let mailOptions = {
            from: '<NEXEATech@gmail.com>', // sender address
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

//Function for update user
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

//For passwor creation and pasword change
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

module.exports = router;