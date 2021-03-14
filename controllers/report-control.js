const { validationResult } = require('express-validator');

const HttpError = require('../models/http-error');
const Report = require('../models/report');

const signup = async (req, res, next) => {

    const { name, displayName, password, location, type } = req.body;

    let existingUser;
    try {
        existingUser = await User.findOne({ name: name });
    } catch (err) {
        const error = new HttpError(
            'Signing up failed, please try again later. Error finding user',
            500
        );
        return next(error);
    }

    if (existingUser) {
        const error = new HttpError(
            'User exists already, please login instead. User already exist',
            422
        );
        return next(error);
    }


    const createdUser = new User({
        name,
        displayName,
        location,
        password: password,
        type
    });

    try {
        await createdUser.save();
    } catch (err) {
        const error = new HttpError(
            'Signing up failed, please try again later. failed saving user',
            500
        );
        return next(error);
    }



    res
        .status(201)
        .json({ userId: createdUser.id, name: createdUser.name, displayName });
};

const getReport = async (req, res, next) => {
    const { ID } = req.body;

    let existingReport;

    try {
        existingReport = await Report.findById(ID);
        if (!existingReport) {
            throw new Error('NOT FOUND')
        }
    } catch (err) {
        return res.sendStatus(500);
    }

    res.json(existingReport);
};

const getReports = async (req, res) => {
    const { location } = req.body;

    let reports;
    try {
        reports = await Report.find({
            location: location === 'all' ? '' : location
        })
    } catch(err) {
        return res.status(500).send('cannot search the db');
    }
    res.json(reports);
}

const addReport = async (req, res) => {
    const { location, data, createdBy } = req.body;
    const newReport = new Report({
        location, data, createdBy
    });
    try {
       await newReport.save(); 
    } catch( error ) {
        return res.status(500).send('Error Saving to DB');
    }
    res.sendStatus(200);
}

exports.getReports = getReports;
exports.getReport = getReport;
exports.addReport = addReport;
