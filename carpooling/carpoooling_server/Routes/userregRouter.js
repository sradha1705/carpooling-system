const express = require('express')
const userregData = require('../models/user_reg_schema')
const loginData = require('../models/login_table')
const { default: mongoose } = require('mongoose')
const userregRouter = express.Router()

//-----------------------------------------------------------------------------------------------------------------------------------------------------------------
//---------------------ADD DATA------------------------------------------------------------------------------------------------

userregRouter.post('/add_user', async (req, res) => {

    const oldName = await userregData.findOne({ 'username': req.body.username })

    if (oldName) {
        return res.status(200).json({
            succces: true,
            error: false,
            message: 'username already exist'
        })
    }
    const oldemail = await userregData.findOne({ 'email': req.body.email })

    if (oldemail) {
        return res.status(200).json({
            succces: true,
            error: false,
            message: 'email already exist'
        })
    }
    const oldphone = await userregData.findOne({ 'phone': req.body.phone })

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
        role: 'user',
        status: '1'
    }
    const logindetails = await loginData(logintb).save()
    const data = {
        loginid: logindetails._id,
        phone: req.body.phone,
        email: req.body.email,
        gender: req.body.gender,
        address: req.body.address
    }
    const userReg = await userregData(data).save()
    if (userReg) {
        return res.status(200).json({
            succces: true,
            error: false,
            message: 'data added successfully',
            data: data
        })
    }
})

//--------------------------------------------------------------------------------------------------------------------------------------------------
userregRouter.get('/user_data/:id', async (req, res) => {
    try {
        const oldName = await userregData.findOne({ loginid: req.params.id })
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
//------------------------------------------------------------------------------------------------------------------------------------------------------
//--------------------VIEW DATA-------------------------------------------------------------------------------------------------------------------------
userregRouter.get('/view_user_reg', async (req, res) => {
    await userregData.aggregate([
        {
            '$lookup': {
                'from': 'login_tbs',
                'localField': 'loginid',
                'foreignField': '_id',
                'as': 'user'
            }
        },
        {
            '$unwind': '$user'
        },
        {
            '$group': {
                '_id': '$_id',
                'phone': { '$first': '$phone' },
                'email': { '$first': '$email' },
                'gender': { '$first': '$gender' },
                'address': { '$first': '$address' },
                'username': { '$first': '$user.username' }
            }
        }
    ]).then((data) => {
        return res.status(200).json({
            succces: true,
            error: false,
            message: 'data retrived successfully',
            data: data
        })
    }).catch((error) => {
        return res.status(400).json({
            success: false,
            error: true,
            message: 'data not found'
        })
    })
})
userregRouter.get('/view_singledata/:id', async (req, res) => {

    const login_id = req.params.id
    await userregData.aggregate([
        {
            '$lookup': {
                'from': 'login_tbs',
                'localField': 'loginid',
                'foreignField': '_id',
                'as': 'user'
            }
        },
        {
            '$unwind': '$user'
        },
        {
            '$match': {
                loginid: new mongoose.Types.ObjectId(login_id)
            }
        },
        {
            '$group': {
                '_id': '$_id',
                'phone': { '$first': '$phone' },
                'email': { '$first': '$email' },
                'gender': { '$first': '$gender' },
                'address': { '$first': '$address' },
                'loginid': { '$first': '$loginid' },
                'username': { '$first': '$user.username' }
            }
        }
    ]).then((data) => {
        return res.status(200).json({
            succces: true,
            error: false,
            message: 'data retrived successfully',
            data: data
        })
    }).catch((error) => {
        return res.status(400).json({
            success: false,
            error: true,
            message: 'data not found'
        })
    })
})

//-----------------------------------------------------------------------------------------------------------------------------------------------------
//-------------------UPDATE DATA-----------------------------------------------------------------------------------------------------------------------

userregRouter.put('/update_user_reg/:id', async (req, res) => {
    try {
        const data = {
            username: req.body.username,
            password: req.body.password,
            phone: req.body.phone,
            email: req.body.email,
            gender: req.body.gender,
            address: req.body.address,
        }
        const regData = await loginData.updateOne({ _id: req.params.id }, { $set: { username: req.body.username } })
        const logData = await userregData.updateOne({ loginid: req.params.id }, { $set: data })

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

//----------------------------------------------------------------------------------------------------------------------------------------------------

// userregRouter.get('/user_update/:id', async (req, res) => {
//     try {
//         const oldName = await userregData.findOne({ loginid: req.params.id })
//         // console.log(oldName);
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
//             message: 'update failed'
//         }) 
//     }
// })
//-------------------------DELETE USER--------------------------------------------------------------------------------------------------------------------------
userregRouter.get('/deleteuser/:id', async (req, res) => {

    try {
        console.log(req.params.id);
        await userregData.deleteOne({ _id: req.params.id }).then((data) => {
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


//------------------------------------------------------------------------------------------------------------------------------------------------------------------

module.exports = userregRouter
