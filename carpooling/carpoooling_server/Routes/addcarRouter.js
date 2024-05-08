const express = require('express')
const carData = require('../models/car_schema')
const multer = require('multer')

const addcarRouter = express.Router()

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, '../public/images/')
    },
    filename: function (req, file, cb) {
        cb(null, file.originalname);
    }
});

let upload = multer({ storage });
// ------------------------------------------------------------------------------------------------------------------------------------
// ---------------------------ADD CAR-----------------------------------------
addcarRouter.post('/addcar', upload.single('photo'), async (req, res) => {
    console.log(req.file);

    const data = {

        model: req.body.model,
        number: req.body.number,
        photo: req.file.filename,
        type: req.body.type,
        company: req.body.company,
    }

    const addcar = await carData(data).save()
    console.log(data);
    if (addcar) {
        res.status(200).json({
            succces: true,
            error: false,
            message: 'data added successfully',
            data: data
        })
    }
})
// ---------------------------------------------------------------------------------------------
// ---------------------------VIEW CAR---------------------------------------------------------------------

addcarRouter.get('/viewcar', async (req, res) => {
    await carData.find()

        .then((data) => {
            res.status(200).json({
                succces: true,
                error: false,
                message: 'data retrived successfully',
                data: data
            })
        }).catch((error) => {
            res.status(400).json({
                success: false,
                error: true,
                message: 'data not found'
            })
        })
})

// --------------------------------------------------------------------------------------
addcarRouter.get('/viewcar_user', async (req, res) => {

    await carData.find()

        .then((data) => {
            res.status(200).json({
                succces: true,
                error: false,
                message: 'data retrived successfully',
                data: data
            })
        }).catch((error) => {
            res.status(400).json({
                success: false,
                error: true,
                message: 'data not found'
            })
        })
})

// --------------------------------------------------------------------------------------
addcarRouter.get('/viewcar_user/:id', async (req, res) => {

    await carData.findOne({ _id: req.params.id })

        .then((data) => {
            res.status(200).json({
                succces: true,
                error: false,
                message: 'data retrived successfully',
                data: data
            })
        }).catch((error) => {
            res.status(400).json({
                success: false,
                error: true,
                message: 'data not found'
            })
        })
})
// ----------------------------------------UPDATECAR-------------------------------------------------------------------------------------------------------------------------------------

addcarRouter.put('/updatecar/:id', upload.single('photo'), async (req, res) => {
    console.log(req.file);

    const data = {

        photo: req?.file?.filename,
        model: req.body.model,
        number: req.body.number,
        type: req.body.type,
        company: req.body.company
    }

    await carData.updateOne({ _id: req.params.id }, { $set: data }).then((data) => {
        if (data.modifiedCount == 0) {
            return res.status(400).json({
                success: false,
                error: true,
                message: 'data already updated'
            })
        }
        else {

            return res.status(200).json({
                succces: true,
                error: false,
                message: 'data updated',
                data: data
            })
        }
    }).catch((error) => {
        res.status(400).json({
            success: false,
            error: true,
            message: 'data not updated'
        })
    })
})
// ----------------------------------DELETE CAR--------------------------------------------------------

addcarRouter.get('/deletecar/:id', async (req, res) => {
    try {
        console.log(req.params.id);
        await carData.deleteOne({ _id: req.params.id }).then((data) => {
            console.log(data);
            if (data.deletedCount == 0) {
                return res.status(200).json({
                    success: true,
                    error: false,
                    message: 'no data to delete'
                })
            }
            else {
                return res.status(400).json({
                    success: false,
                    error: true,
                    message: 'data deleted'
                })
            }

        }).catch((error) => {
            res.status(400).json({
                success: false,
                error: true,
                message: 'data not found'
            })
        })
    } catch (error) {
        console.log('Error found');
    }
})

module.exports = addcarRouter