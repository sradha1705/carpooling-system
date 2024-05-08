import React, { useState } from 'react'
import Nav from '../components/Nav'
import axios from 'axios'
import { useNavigate, useParams } from 'react-router-dom'
import Contactbar from '../components/Contactbar'

export default function Booking() {
    const navigate=useNavigate()
    const { model } = useParams()
    const { origin } = useParams()
    const { via } = useParams()
    const { destination } = useParams()
    const [input, setInput] = useState({
        passengers: '',
        time: '',
        pickup: '',
        drop: '',
        status:'',
        route: origin,
        via:via,
        destination:destination,
        car: model,
        payment: ''

    })
    const [formError, setFormError] = useState({})
    const [isSubmit, setIsSubmit] = useState(false)

    const change = (event) => {

        const name = event.target.name
        const value = event.target.value

        setInput({ ...input, [name]: value })

    }
    const validate = (value) => {
        console.log(value);
        const error = {}

        if (value.passengers == '') {
            error.passengers = 'Enter no.of passengers'
        }

        if (value.time == '') {
            error.time = 'Enter time'
        }
        if (value.pickup == '') {
            error.pickup = 'Enter pickup location'
        }
        if (value.drop == '') {
            error.drop = 'Enter drop location'
        }
        return error
    }

    const submit = (e) => {
        e.preventDefault()
        setFormError(validate(input))
        setIsSubmit(true)
        // console.log('ertyu');
        if (Object.keys(formError).length == 0 && isSubmit == true) {
            console.log(input);
            const loginid = localStorage.getItem('login_id');
            console.log(loginid);
            axios.post(`http://localhost:5000/booking/addbooking/${loginid}`, input).then((data) => {
                console.log(data);
                // console.log('ertyu');
                navigate('/viewbookinguser')
            }).catch((error) => {
                console.log(error);
            })
        }
       
    }
    console.log(origin);
    console.log(model);
 console.log(via);
 console.log(destination);
    return (
        <div>
            {/* header section strats */}
            <header className="header_section">
                <div className="container-fluid">
                <h5 className="text-md-left" style={{ color: 'white' }}>
                        Car4u
                    </h5>

                </div>
            </header>
            {/* end header section */}
            {/* contact section */}
            <section className="contact_section layout_padding"><Nav/>
                <div className="container">
                    <div className="heading_container">
                        <h2>BOOKING</h2>
                    </div>
                    <div className="row">
                        <div className="col-md-8 mx-auto">
                            <div classNacomme="form_container">
                                <form onSubmit={submit}>
                                    <div className="form-row">
                                        <div className="form-group col">
                                            <span style={{ color: 'red' }}>{formError.passengers}</span>
                                            <input
                                                type="text"
                                                className="form-control"
                                                id="inputEmail4"
                                                placeholder="No Of Passengers"
                                                name='passengers'
                                                onChange={change}
                                                onClick={() => { setFormError({ ...formError, passengers: '' }) }}
                                            />
                                        </div>
                                    </div>
                                    <div className="form-row">
                                        <label><b>Time</b></label>
                                        <div className="form-group col">
                                            <span style={{ color: 'red' }}>{formError.time}</span>
                                            <input
                                                type="time"
                                                className="form-control"
                                                id="inputEmail4"
                                                placeholder="time"
                                                name='time'
                                                onChange={change}
                                                onClick={() => { setFormError({ ...formError, time: '' }) }}
                                            />
                                        </div>
                                    </div>
                                    <div className="form-row">
                                        <div className="form-group col">
                                            <span style={{ color: 'red' }}>{formError.pickup}</span>
                                            <input
                                                type="text"
                                                className="form-control"
                                                id="inputEmail4"
                                                placeholder="pick up location"
                                                name='pickup'
                                                onChange={change}
                                                onClick={() => { setFormError({ ...formError, pickup: '' }) }}
                                            />
                                        </div>
                                    </div>
                                    <div className="form-row">
                                        <div className="form-group col">
                                            <span style={{ color: 'red' }}>{formError.drop}</span>
                                            <input
                                                type="text"
                                                className="form-control"
                                                id="inputEmail4"
                                                placeholder="Drop location"
                                                name='drop'
                                                onChange={change}
                                                onClick={() => { setFormError({ ...formError, drop: '' }) }}
                                            />
                                        </div>
                                    </div>
                                    <div className="form-row">
                                        {/* <div className="form-group col-sm-12"> */}
                                        <label><b>Payment Mode</b></label>
                                        <div className="radio">
                                            <label>&nbsp;&nbsp;&nbsp;
                                                <input type="radio" value="cash" name='payment' checked={input.payment === "cash"} onChange={change} />
                                                Cash
                                            </label>
                                        </div>
                                        <div className="radio">
                                            <label>&nbsp;&nbsp;
                                                <input type="radio" value="upi" name='payment' checked={input.payment === "upi"} onChange={change} />
                                                UPI
                                            </label>
                                        </div>
                                        <div className="radio">
                                            <label>&nbsp;&nbsp;
                                                <input type="radio" value="card" name='payment' checked={input.payment === "card"} onChange={change} />
                                                Credit/debit card
                                            </label>
                                        </div>
                                    </div>
                                    <div className="form-row">
                                        <div className="form-group col">
                                            <label><b>Route</b></label>
                                            <input
                                                value={`${origin},${via},${destination}`}
                                                type="text"
                                                className="form-control"
                                                id="inputEmail4"
                                                placeholder=""
                                                name='route'
                                                onChange={change}
                                            />
                                        </div>
                                    </div>
                                    <div className="form-row">
                                        <div className="form-group col">
                                            <label><b>Car</b></label>
                                            <input
                                                Value={`${model}`}
                                                type="text"
                                                className="form-control"
                                                id="inputEmail4"
                                                placeholder=" "
                                                name='car'
                                                onChange={change}
                                            />
                                        </div>
                                    </div>
                                    <div className="d-flex justify-content-center">
                                        <button type="submit" className="">
                                            Book
                                        </button>
                                    </div>
                                </form>
                            </div>
                        </div>
                    </div>
                    <Contactbar/>
                </div>
            </section>
            {/* end contact section */}
        </div>
    )
}
