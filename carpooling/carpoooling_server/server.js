const express = require('express')
const mongoose = require('mongoose');
const driverregRouter = require('./Routes/driverregRouter');
const userregRouter = require('./Routes/userregRouter');
const addcarRouter = require('./Routes/addcarRouter');
const loginRouter = require('./Routes/loginRouter');
const cors= require('cors');
const addpathRouter = require('./Routes/addpathRouter');
const bookingRouter = require('./Routes/bookingRouter');
const feedbackRouter = require('./Routes/feedbackRouter');

const app=express()

mongoose.connect("mongodb+srv://sradha1705:7IHWvZvRFPKYX6aq@cluster0.j6gur1b.mongodb.net/carpooling").then(() => {
    console.log("Database connected successfully");
}).catch((error) => {
    console.log(error);
})

app.use(cors())
app.use(express.json())
app.use(express.urlencoded({extended:true}))


app.use('/driver_reg',driverregRouter)
app.use('/user_reg',userregRouter)
app.use('/car',addcarRouter)
app.use('/login',loginRouter)
app.use('/path',addpathRouter)
app.use('/booking',bookingRouter)
app.use('/feedback',feedbackRouter)

app.listen(5000, () => {
    console.log('server started at http//localhost:5000');
})