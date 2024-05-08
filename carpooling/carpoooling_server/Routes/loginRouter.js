const express = require('express')
const loginData = require('../models/login_table')
const loginRouter = express.Router()

loginRouter.post('/login_data', async (req, res) => {

    const oldUser = await loginData.findOne({ 'username': req.body.username })

    if (!oldUser) {
        return res.status(400).json({
            success: false,
            error: true,
            message: 'user not found'
        })
    }
    if (oldUser.password === req.body.password) {
        return res.status(200).json({
            succces: true,
            error: false,
            message: 'login success',
            data: oldUser
        })
    }
    else {
        res.status(400).json({
            success: false,
            error: true,
            message: 'incorrect password'
        })
    }
})
//----------------------------------FORGOT PASSWORD----------------------------------------------------------------------------------------
loginRouter.post('/user_data', async (req, res) => {
    console.log(req.body.username);
    const oldUser = await loginData.findOne({ username: req.body.username })
    if (!oldUser) {
        return res.status(400).json({
            success: false,
            error: true,
            message: 'user not found'
        })
    }
    else {
        return res.status(200).json({
            succces: true,
            error: false,
            message: 'user found',
            data: oldUser
        })
    }
})

//----------------------------------------------------------------------------
loginRouter.put('/updatepassword/:id', async (req, res) => {
    const data = {
        password: req.body.password,
        cnpassword: req.body.cnpassword,
    }

    await loginData.updateOne({ _id: req.params.id }, { $set: data }).then((data) => {

        if (data.modifiedCount == 0) {
            return res.status(400).json({
                success: false,
                error: true,
                message: 'PASSWORD NOT CHANGED',

            })
        }
        if (data.password == data.cnpassword) {
            return res.status(200).json({
                succces: true,
                error: false,
                message: 'PASSWORD CHANGED'

            })
        }
    }).catch((error) => {
        return res.status(400).json({
            success: false,
            error: true,
            message: 'PASSWORD NOT UPDATED'
        })
    })
})
// -----------------------------------------------------------------------------------------------------------------
module.exports = loginRouter