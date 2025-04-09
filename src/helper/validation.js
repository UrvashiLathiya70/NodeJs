const Users = require('../model/Users');
const bcrypt = require('bcrypt');
const nodemailer = require('nodemailer');
const sharp = require('sharp');
const statusCode = require('../config/statuscode');
const multer = require('multer');
const fs = require('fs');
const path = require('path');



const verifyRequired = (body, requiredFields) => {
    const errorMsg = [];
    for (const field of requiredFields) {
        if (!body[field] || !body[field].toString().trim()) {
            errorMsg.push(`${field} is required`);
        }
    }
    return errorMsg;
};

const otpGenerate = async () => {
    try {
        let min = 1000;
        let max = 9999;
        return Math.floor(Math.random() * (max - min + 1)) + min;
    } catch (error) {
        return {
            statusCode: statusCode.BADREQUEST,
            success: 0,
            message: error.message
        };
    }
};

const sendEmail = async (recipientEmail, emailSubject, emailContent) => {
    try {
        const transporter = nodemailer.createTransport({
            service: 'gmail',
            secure: false, 
            auth: {
                user: 'urvashil.itpath@gmail.com',
                pass: 'rjfhsbwlwtkihvey'
            }
        });
        
        const message = {
            to: recipientEmail,
            subject: emailSubject,
            html: emailContent
        };
        const info = await transporter.sendMail(message);
        return {
            success: true,
            message: `Email sent successfully`
        };
    } catch (error) {
        return {
            statusCode: statusCode.BADREQUEST,
            success: 0,
            message: error.message
        };
    }
};


module.exports = {
    otpGenerate,
    sendEmail,
    verifyRequired
};
