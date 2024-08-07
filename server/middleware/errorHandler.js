function errorHandler(err, req, res, next) {
    // console.log(err, "cobain");
    let status = err.status || 500;
    let message = err.message || "Internal Server Error";
    switch (err.name) {
        case "SequelizeValidationError":
        case 'SequelizeConstraintError':
            status = 400;
            message = err.errors[0].message
            break;
        case "errorNotFound":
            status = 404;
            message = "Error Not Found"
            break;
        case "EmailIsRequired":
            status = 400;
            message = "Email Is Required"
            break;
        case "PasswordIsRequired":
            status = 400;
            message = "Password Is Required"
            break;
        case "EmailOrPasswordIsInvalid":
            status = 400;
            message = "Email / Password is Invalid"
            break;
        case "dataNotFound":
            status = 404;
            message = "Data Not Found";
            break;
        case "Invalid Token":
        case 'JsonWebTokenError':
            status = 401;
            message = "Invalid Token"
            break;
        case 'dataEmpty':
            status = 400;
            message = "Data Empty"
            break;
        default:
            // status : 500;
            // message : 'Internal Server Error'
            break;
    }
    res.status(status).json({ message })
}

module.exports = errorHandler