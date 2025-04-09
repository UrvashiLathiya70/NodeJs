const { responseData, responseMessage } = require('../helper/response');
const statusCode = require('../config/statuscode');
const service = require('../service');

exports.userRegistration = async (req, res) => {
    try {
        const result = await service.userService.userRegistration(req.body, req);
        if (!result)
            return responseData({
                res,
                statusCode: statusCode.BADREQUEST,
                success: 0,
                message: responseMessage('error', 'creating')
            });
        responseData({ res, ...result });
    } catch (error) {
        responseData({
            res,
            statusCode: statusCode.SERVER_ERROR,
            success: 0,
            message: error.message
        });
    }
};

exports.verfiyOtp = async (req, res) => {
    try {
        const result = await service.userService.VerifyOpt(req.body);
        if (!result)
            return responseData({
                res,
                statusCode: statusCode.BADREQUEST,
                success: 0,
                message: responseMessage('error', 'Verifying OTP')
            });
        responseData({ res, ...result });
    } catch (error) {
        responseData({
            res,
            statusCode: statusCode.SERVER_ERROR,
            success: 0,
            message: error.message
        });
    }
};


exports.signin = async (req, res) => {
    try {
        const result = await service.userService.signin(req.body);
        if (!result)
            return responseData({
                res,
                statusCode: statusCode.BADREQUEST,
                success: 0,
                message: responseMessage('error', 'Login')
            });
        responseData({ res, ...result });
    } catch (error) {
        console.log('error', error);
        responseData({
            res,
            statusCode: statusCode.SERVER_ERROR,
            success: 0,
            message: error.message
        });
    }
};

//Forgot Password
exports.forgotPassword = async (req, res) => {
    try {
        const result = await service.userService.forgotPassword(req.body);
        if (!result)
            return responseData({
                res,
                statusCode: statusCode.BADREQUEST,
                success: 0,
                message: responseMessage('error', 'Forgoting Password')
            });
        responseData({ res, ...result });
    } catch (error) {
        responseData({
            res,
            statusCode: statusCode.SERVER_ERROR,
            success: 0,
            message: error.message
        });
    }
};

//Verify Password and Update
exports.verifyPasswordUpdate = async (req, res) => {
    try {
        const result = await service.userService.verifyPasswordUpdate(req.body);
        if (!result)
            return responseData({
                res,
                statusCode: statusCode.BADREQUEST,
                success: 0,
                message: responseMessage('error', 'Forgoting Password')
            });
        responseData({ res, ...result });
    } catch (error) {
        responseData({
            res,
            statusCode: statusCode.SERVER_ERROR,
            success: 0,
            message: error.message
        });
    }
};

//Reset Password
exports.resetPassword = async (req, res) => {
    try {
        const result = await service.userService.resetPassword(req.body);
        if (!result)
            return responseData({
                res,
                statusCode: statusCode.BADREQUEST,
                success: 0,
                message: responseMessage('error', 'Forgoting Password')
            });
        responseData({ res, ...result });
    } catch (error) {
        responseData({
            res,
            statusCode: statusCode.SERVER_ERROR,
            success: 0,
            message: error.message
        });
    }
};

//Get All Users
exports.userList = async (req, res) => {
    try {
        const result = await service.userService.userList(req.query);

        if (!result)
            return responseData({
                res,
                statusCode: statusCode.BADREQUEST,
                success: 0,
                message: responseMessage('error', 'Fetching User')
            });
        responseData({ res, ...result });
    } catch (error) {
        responseData({
            res,
            statusCode: statusCode.SERVER_ERROR,
            success: 0,
            message: error.message
        });
    }
};

//Remove User
exports.removeUser = async (req, res) => {
    try {
        const result = await service.userService.removeUser(req.body);

        if (!result)
            return responseData({
                res,
                statusCode: statusCode.BADREQUEST,
                success: 0,
                message: responseMessage('error', 'Fetching User')
            });
        responseData({ res, ...result });
    } catch (error) {
        responseData({
            res,
            statusCode: statusCode.SERVER_ERROR,
            success: 0,
            message: error.message
        });
    }
};

//By ID
exports.userById = async (req, res) => {
    try {
        const result = await service.userService.userById(req.params);

        if (!result)
            return responseData({
                res,
                statusCode: statusCode.BADREQUEST,
                success: 0,
                message: responseMessage('error', 'Fetching User')
            });
        responseData({ res, ...result });
    } catch (error) {
        responseData({
            res,
            statusCode: statusCode.SERVER_ERROR,
            success: 0,
            message: error.message
        });
    }
};

//Get All Admins
exports.getAllAdmins = async (req, res) => {
    try {
        const result = await service.userService.getAllAdmins();
        if (!result)
            return responseData({
                res,
                statusCode: statusCode.BADREQUEST,
                success: 0,
                message: responseMessage('error', 'getting')
            });
        responseData({ res, ...result });
    } catch (error) {
        responseData({
            res,
            statusCode: statusCode.SERVER_ERROR,
            success: 0,
            message: error.message
        });
    }
};

//User Status
exports.userStatus = async (req, res) => {
    try {
        const result = await service.userService.userStatus(req.body, req.params);
        if (!result)
            return responseData({
                res,
                statusCode: statusCode.BADREQUEST,
                success: 0,
                message: responseMessage('error', 'getting')
            });
        responseData({ res, ...result });
    } catch (error) {
        responseData({
            res,
            statusCode: statusCode.SERVER_ERROR,
            success: 1,
            message: error.message
        });
    }
};
