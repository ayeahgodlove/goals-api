const errorHandler = (err, req, res, next) => {
    console.log("res: ", res)
        // const statusCode = res.statusCode ? res.statusCode : 500;
        // res.status(statusCode);

    // res.json({
    //     message: err.message,
    //     stack: process.env.NODE_ENV === 'production' ? null : err.stack
    // });
    console.error(err.stack)
    res.status(500).send('Something broke!')
}

module.epxorts = {
    errorHandler
}