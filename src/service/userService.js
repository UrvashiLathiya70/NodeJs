const statusCode = require('../config/statuscode');
const { responseMessage } = require('../helper/response');
const { verifyRequired, otpGenerate, sendEmail } = require('../helper/validation');
const Users = require('../model/Users');
const common_api = require('../helper/common_api');
const jwt = require('jsonwebtoken');
const cloudinary = require('cloudinary').v2;
const profileApi = require('./profileService');

exports.userRegistration = async (body) => {
    if (Object.keys(body).length == 0) {
        return {
            statusCode: statusCode.SERVER_ERROR,
            success: 0,
            message: "Not FOUND"
        };
    }

    let errors = verifyRequired(body, [('email', 'password')]);
    if (errors.length != 0) {
        return {
            statusCode: statusCode.NOTFOUND,
            success: 0,
            message: "Not FOUND"
        };
    }
    const isExisting = await common_api.FindOne({ email: body.email }, Users);
    if (isExisting.data || isExisting?.data?.deleted === 0) {
        return {
            statusCode: statusCode.BADREQUEST,
            success: 0,
            message: "User Exist"
        };
    }
    body.password = await passwordBcrypt(body.password);
    body.otp = await otpGenerate();

    const userData = await common_api.createData(body, Users);
    if (userData) {
        let subject = 'For User Registration';
        let content = `<h2>This is the otp "${body.otp}"to Register user.</h2>`;
        sendEmail(body.email, subject, content);
        return {
            statusCode: statusCode.SUCCESS,
            success: 1,
            data: { ...body }
        };
    }
};

exports.VerifyOpt = async (body) => {
    let errors = verifyRequired(body, [('email', 'otp')]);
    if (errors.length != 0) {
        return {
            statusCode: statusCode.NOTFOUND,
            success: 0,
        };
    }
    const UserExisting = await common_api.FindOne({ email: body.email }, Users);
    if (!UserExisting.data || UserExisting.data.deleted == 1) {
        return {
            statusCode: statusCode.NOTFOUND,
            success: 0,
        };
    }
    if (UserExisting.data.otp !== body.otp) {
        return {
            statusCode: statusCode.BADREQUEST,
            success: 0,
            message: 'OTP_invalid'
        };
    }
    const token = jwt.sign(
        { _id: UserExisting.data._id, role: UserExisting.data.role },
        process.env.SECRET_KEY,
        {
            expiresIn: '3d'
        }
    );
    const updatedUser = await common_api.editData(
        UserExisting.data._id,
        { $set: { isVerified: 1, otp: null } },
        Users
    );
   

    return {
        statusCode: statusCode.SUCCESS,
        success: 1,
        data: { token, data: updatedUser }
    };
};

exports.signin = async (body) => {
    let errors = verifyRequired(body, ['email', 'password']);
    if (errors.length != 0) {
        return {
            statusCode: statusCode.NOTFOUND,
            success: 0,
        };
    }
    const UserExisting = await common_api.FindOne({ email: body.email }, Users);
    if (!UserExisting) {
        return {
            statusCode: statusCode.UNAUTHORIZED,
            success: 0,
        };
    }
    if (UserExisting?.data?.status === 'Admin') {
        return {
            statusCode: statusCode.UNAUTHORIZED,
            success: 0,
            message: responseMessage('banned')
        };
    }
    if (UserExisting?.data || UserExisting?.data?.deleted == 0) {
        const isMatch = await bcrypt.compare(body.password, UserExisting.data.password);

        if (isMatch) {
            if (UserExisting.data.isVerified == 0) {
                return {
                    statusCode: statusCode.UNAUTHORIZED,
                    success: 0,
                };
            }

            const userId = UserExisting.data._id;
            return {
                statusCode: statusCode.SUCCESS,
                success: 1,
                data: { token: token, data: UserExisting }
            };
        } else {
            return {
                statusCode: statusCode.BADREQUEST,
                success: 0
            };
        }
    } else {
        return {
            statusCode: statusCode.NOTFOUND,
            success: 0,
        };
    }
};
