const express = require('express');
const colors = require('colors');
const dotenv = require('dotenv').config();
// const { errorHandler } = require('./middleware/errorMiddleware')
const connectDB = require('./config/db');
const PORT = process.env.PORT;

//connect to database
connectDB();
//initialize express
const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use('/api/goals', require('./routes/goalRoutes'));
app.use('/api/users', require('./routes/userRoutes'));

app.use((err, req, res, next) => {
    // console.log("res: ", res)
    const statusCode = res.statusCode ? res.statusCode : 500;
    res.status(statusCode);

    res.json({
        message: err.message,
        stack: process.env.NODE_ENV === 'production' ? null : err.stack
    });
    // console.error(err.stack)
    // res.status(500).send('Something broke!')
});

app.listen(PORT, () => console.log(`Server started on port ${PORT}`));