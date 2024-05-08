const express = require('express')
const bookData = require('../models/booking_schema')
const loginData = require('../models/login_table')
const mongoose = require('mongoose')
const bookingRouter = express.Router()

bookingRouter.post('/addbooking/:id', async (req, res) => {
    const logindetails = await loginData.findOne({ _id: req.params.id })

    const data = {
        loginid: logindetails._id,
        username: logindetails.username,
        passengers: req.body.passengers,
        time: req.body.time,
        pickup: req.body.pickup,
        drop: req.body.drop,
        route: req.body.route,
        car: req.body.car,
        via: req.body.via,
        destination: req.body.destination,
        payment: req.body.payment

    }
    const booking = await bookData(data).save()

    if (booking) {
        return res.status(200).json({
            succces: true,
            error: false,
            message: 'data added successfully',
            data: data
        })
    }
})
//------------------------------------------------------------------------------
bookingRouter.get('/booking_data/:id', async (req, res) => {
    try {
        const oldbook = await bookData.findOne({ loginid: req.params.id })
        console.log(oldbook);
        if (oldbook) {
            return res.status(200).json({
                succces: true,
                error: false,
                message: 'booking success',
                data: oldName
            })
        }

    } catch (error) {
        return res.status(500).json({
            success: false,
            error: true,
            message: 'booking not done'
        })
    }
})
//----------------- VIEW BOOKING---------------------------------------------------------------
bookingRouter.get('/view_booking', async (req, res) => {
    await bookData.aggregate([

        {
            '$lookup': {
                'from': 'login_tbs',
                'localField': 'loginid',
                'foreignField': '_id',
                'as': 'booking'
            }
        },
        {
            '$lookup': {
                'from': 'user_tbs',
                'localField': 'loginid',
                'foreignField': 'loginid',
                'as': 'user'
            }
        },
        {
            '$unwind': {
                'path': '$booking'
            }
        },
        {
            '$unwind': {
                'path': '$user'
            }
        },
        {
            '$group': {
                '_id': '$_id',
                'passengers': {
                    '$first': '$passengers'
                },
                'username': {
                    '$first': '$booking.username'
                },
                'phone': {
                    '$first': '$user.phone'
                },
                'email': {
                    '$first': '$user.email'
                },
                'time': {
                    '$first': '$time'
                },
                'pickup': {
                    '$first': '$pickup'
                },
                'drop': {
                    '$first': '$drop'
                },
                'route': {
                    '$first': '$route'
                },
                'payment': {
                    '$first': '$payment'
                },
                'status': {
                    '$first': '$status'
                },
                'car': {
                    '$first': '$car'
                },
                'via': {
                    '$first': '$via'
                },
                'destination': {
                    '$first': '$destination'
                }
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
//---------------UPDATE STATUS-----------------------------------------------------
bookingRouter.put('/updatestatus/:id', async (req, res) => {

    await bookData.updateOne({ _id: req.params.id }, { $set: { status: " Booking Conformed" } }).then((data) => {
        if (data.modifiedCount == 0) {
            return res.status(400).json({
                success: false,
                error: true,
                message: 'data already updated'
            })
        }
        else {
        }
        return res.status(200).json({
            succces: true,
            error: false,
            message: 'data updated',
        })

    }).catch((error) => {
        res.status(400).json({
            success: false,
            error: true,
            message: 'data not updated'
        })
    })
})

// ----------------------------------------------------------------
bookingRouter.get('/view_single_booking/:id', async (req, res) => {
    const loginid = req.params.id
    await bookData.aggregate([

        {
            '$lookup': {
                'from': 'login_tbs',
                'localField': 'loginid',
                'foreignField': '_id',
                'as': 'booking'
            }
        },
        {
            '$lookup': {
                'from': 'user_tbs',
                'localField': 'loginid',
                'foreignField': 'loginid',
                'as': 'user'
            }
        },
        {
            '$unwind': {
                'path': '$booking'
            }
        },
        {
            '$unwind': {
                'path': '$user'
            }
        },
        {
            '$match': {
                'loginid': new mongoose.Types.ObjectId(loginid)
            }
        },
        {
            '$group': {
                '_id': '$_id',
                'passengers': { '$first': '$passengers' },
                'username': { '$first': '$booking.username' },
                'phone': { '$first': '$user.phone' },
                'email': { '$first': '$user.email' },
                'time': { '$first': '$time' },
                'pickup': { '$first': '$pickup' },
                'drop': { '$first': '$drop' },
                'route': { '$first': '$route' },
                'car': { '$first': '$car' },
                'payment': { '$first': '$payment' },
                'via': { '$first': '$via' },
                'destination': { '$first': '$destination' },
                'loginid': { '$first': '$loginid' },
                'status': { '$first': '$status' }
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
//------------------DELETE BOOKING-----------------------------------------------------------------------------------------------------------------------------------
bookingRouter.get('/deletebooking/:id', async (req, res) => {

    try {
        console.log(req.params.id);
        await bookData.deleteOne({ _id: req.params.id }).then((data) => {
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
module.exports = bookingRouter;