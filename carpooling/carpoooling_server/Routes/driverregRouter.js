const express = require('express')
const driverregData = require('../models/driver_reg_schema')
const loginData = require('../models/login_table')
const { default: mongoose } = require('mongoose')
const multer = require('multer')
const driverregRouter = express.Router()

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, '../public/images/')
    },
    filename: function (req, file, cb) {
        cb(null, file.originalname);
    }
});

let upload = multer({ storage });
//------------------------------------------------------------------------------------------------------------------------------------------------------
//----------------------ADD DATA---------------------------------------------------------------------

driverregRouter.post('/add_driver', upload.single('photo'), async (req, res) => {
    console.log(req.file);
    const oldName = await driverregData.findOne({ 'username': req.body.username })

    if (oldName) {
        return res.status(200).json({
            succces: true,
            error: false,
            message: 'username already exist'
        })
    }
    const oldemail = await driverregData.findOne({ 'email': req.body.email })

    if (oldemail) {
        return res.status(200).json({
            succces: true,
            error: false,
            message: 'email already exist'
        })
    }
    const oldphone = await driverregData.findOne({ 'phone': req.body.phone })

    if (oldphone) {
        return res.status(200).json({
            succces: true,
            error: false,
            message: 'phone already exist'
        })
    }
    const logintb = {
        username: req.body.username,
        password: req.body.password,
        role: 'driver',
        status: '0'

    }
    const logindetails = await loginData(logintb).save()

    const data = {
        loginid: logindetails._id,
        photo: req.file.filename,
        phone: req.body.phone,
        email: req.body.email,
        gender: req.body.gender,
        address: req.body.address,
        dob: req.body.dob,
        license: req.body.license,
        timings: req.body.timings,
        route: req.body.route
    }

    const driverReg = await driverregData(data).save()
    if (driverReg) {
        res.status(200).json({
            succces: true,
            error: false,
            message: 'data added successfully',
            data: data
        })
    }

})
// -------------------------------------------------------------------------------------------------------------------------------------------------
// ------------------VIEW DATA------------------------------------------------------------------------------------------------------------------------------

driverregRouter.get('/view_driver_reg', async (req, res) => {
    await driverregData.aggregate([
        {
            '$lookup': {
                'from': 'login_tbs',
                'localField': 'loginid',
                'foreignField': '_id',
                'as': 'driver'
            }
        },
        {
            '$unwind': '$driver'
        },
        {
            '$group': {
                'username': { '$first': '$driver.username' },
                '_id': '$_id',
                'photo': { '$first': '$photo' },
                'phone': { '$first': '$phone' },
                'address': { '$first': '$address' },
                'email': { '$first': '$email' },
                'gender': { '$first': '$gender' },
                'license': { '$first': '$license' },
                'dob': { '$first': '$dob' },
                'timings': { '$first': '$timings' },
                'route': { '$first': '$route' }
            }
        }
    ]).then((data) => {
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

driverregRouter.get('/view_single_driver/:id', async (req, res) => {
    const login_id = req.params.id
    await driverregData.aggregate([
        {
            '$lookup': {
                'from': 'login_tbs',
                'localField': 'loginid',
                'foreignField': '_id',
                'as': 'driver'
            }
        },
        {
            '$unwind': '$driver'
        },
        {
            '$match': {
                loginid: new mongoose.Types.ObjectId(login_id)
            }
        },
        {
            '$group': {
                'username': { '$first': '$driver.username' },
                '_id': '$_id',
                'photo': { '$first': '$photo' },
                'phone': { '$first': '$phone' },
                'email': { '$first': '$email' },
                'gender': { '$first': '$gender' },
                'license': { '$first': '$license' },
                'dob': { '$first': '$dob' },
                'address': { '$first': '$address' },
                'timings': { '$first': '$timings' },
                'loginid': { '$first': '$loginid' },
                'route': { '$first': '$route' }
            }
        }
    ]).then((data) => {
        console.log(data);
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

// -------------------------------------------------------------------------------------------------------------------------------
driverregRouter.get('/driver_data/:id', async (req, res) => {
    try {

        const oldName = await driverregData.findOne({ loginid: req.params.id })
        console.log(oldName);
        if (oldName) {
            return res.status(200).json({
                succces: true,
                error: false,
                message: 'login success',
                data: oldName
            })
        }
    } catch (error) {
        return res.status(500).json({
            success: false,
            error: true,
            message: 'User not Found'
        })
    }
})
// ------------------------------------------------------------------------------------------------------------------------------------------
// ----------------UPDATE DATA---------------------------------------------------------------------------------
driverregRouter.put('/update_driver_reg/:id', upload.single('photo'), async (req, res) => {
    console.log(req.body);
    console.log(req.file);
    try {
        const data = {
            photo: req.file.filename,
            phone: req.body.phone,
            email: req.body.email,
            gender: req.body.gender,
            address: req.body.address,
            dob: req.body.dob,
            license: req.body.license,
            timings: req.body.timings,
            route: req.body.route,
        }
        const regData = await loginData.updateOne({ _id: req.params.id }, { $set: { username: req.body.username } })
        const logData = await driverregData.updateOne({ loginid: req.params.id }, { $set: data })

        if (regData || logData) {

            return res.status(200).json({
                success: false,
                error: true,
                message: 'data updated',
                regData: regData,
                logData: logData
            })
        }
        else {
            return res.status(400).json({
                succces: false,
                error: true,
                message: 'data updation failed',
                regData: regData,
                logData: logData
            })
        }
    } catch (error) {
        return res.status(500).json({
            succces: false,
            error: true,
            message: 'internal server error',
            errorMessage: error.message
        })
    }
})
// -------------------------------------------------------------------------------------------------------------------------------
// driverregRouter.get('/driver_update/:id', async (req, res) => {
//     try {

//         const oldName = await driverregData.updateOne({ loginid: req.params.id })
//         console.log(oldName);
//         if (oldName) {
//             return res.status(200).json({
//                 succces: true,
//                 error: false,
//                 message: 'update success',
//                 data: oldName
//             })
//         }
//     } catch (error) {
//         return res.status(500).json({
//             success: false,
//             error: true,
//             message: 'Update failed'
//         })
//     }
// })
//--------------------------------------------------DELETE DATA-------------------------------------------------------------------------------------
driverregRouter.get('/deletedriver/:id', async (req, res) => {
    try {
        console.log(req.params.id);
        await driverregData.deleteOne({ _id: req.params.id }).then((data) => {
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
            return res.status(400).json({
                success: false,
                error: true,
                message: 'data not found'
            })
        })
    } catch (error) {
        console.log('Error found');
    }
})
//-------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------

// driverregRouter.get('/driver_delete/:id', async (req, res) => {

//     try {
//         const oldName = await driverregData.deleteOne({ loginid: req.params.id })
//         if (oldName) {
//             return res.status(200).json({
//                 succces: true,
//                 error: false,
//                 message: 'delete success',
//                 data: oldName
//             })
//         }
//     } catch (error) {
//         return res.status(500).json({
//             success: false,
//             error: true,
//             message: 'Delete Failed'
//         })
//     }
// })
// ----------------------------------------------------------------------------------------------------------------------------------------------------------

module.exports = driverregRouter
