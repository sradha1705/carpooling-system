const express=require('express')
const pathData = require('../models/route_schema')
const addpathRouter=express.Router()
//-----------------------------------------------------------------------------------------------------------------
addpathRouter.post('/addpath', async (req, res) => {
    const data = {
        origin: req.body.origin,
        destination: req.body.destination,
        via: req.body.via 
    }
    const addpath = await pathData(data).save()
    if (addpath) {
        res.status(200).json({
            succces: true,
            error: false,
            message: 'path added successfully',
            data: data
        })
    }
})
//--------------------------------------------------------------------------------------------------------------
addpathRouter.get('/viewpath', async (req, res) => {
    await pathData.find().then((data) => {
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
// ---------------------------SINGLE VIEW---------------------------------------------------------
addpathRouter.get('/viewpath/:id', async (req, res) => {
    await pathData.findOne({_id:req.params.id})
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
//---------------------------------------------------------------------------------------------------------------------------------------
addpathRouter.put('/updatepath/:id', async (req, res) => {
    const data = {
        origin: req.body.origin,
        destination: req.body.destination,
        via: req.body.via, 
    }
    await pathData.updateOne({ _id: req.params.id }, { $set: data }).then((data) => {
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
addpathRouter.get('/deletepath/:id', async (req, res) => {
    try {
        console.log(req.params.id);
        await pathData.deleteOne({ _id: req.params.id }).then((data) => {
            console.log(data);
            if (data.deletedCount == 0) {
                return res.status(200).json({
                    success: true,
                    error: false,
                    message: 'no data to delete'
                })
            }
            else {
                return res.status(200).json({
                    success: true,
                    error: false,
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
module.exports=addpathRouter