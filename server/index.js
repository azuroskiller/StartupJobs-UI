let express = require('express');
let mongoose = require('mongoose');
let cors = require('cors');
let bodyParser = require('body-parser');
const userRoute = require('../server/routes/user')
const jobRoute = require('../server/routes/jobs')

mongoose
    .connect("mongodb+srv://hairul:hairul123@crawler1.u1w6t.mongodb.net/?retryWrites=true&w=majority")
    .then((x) => {
        console.log("Connected successfully to mongo")
    })
    .catch((err) => {
        console.error("Error connecting to mongo", err.reason)
    })

const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
    extended: true
}));

app.use(cors());
app.use('/users', userRoute)
app.use('/jobs', jobRoute)
const port = process.env.PORT || 4000;
const server = app.listen(port, () => {
    console.log('Connected to port' + port)
})

// Error Handling
app.use((req, res, next) => {
    next(createError(404));
});
app.use(function (err, req, res, next) {
    console.error(err.message);
    if (!err.statusCode) err.statusCode = 500;
    res.status(err.statusCode).send(err.message);
});
