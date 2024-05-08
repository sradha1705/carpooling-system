import axios from 'axios'
import React, { useState } from 'react'
import Nav from '../components/Nav'
import { useNavigate } from 'react-router-dom'


export default function Addroute() {
    const navigate=useNavigate()
    const [input, setInput] = useState({
        origin: '',
        destination: '',
        via: ''
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

        if (value.origin == '') {
            error.origin = 'Enter origin'
        }
        if (value.destination == '') {
            error.destination = 'Enter destination'
        }
        if (value.via == '') {
            error.via = 'Enter via'
        }
        return error
    }
    const submit = (e) => {
        e.preventDefault()
        setFormError(validate(input))
        setIsSubmit(true)

        if (Object.keys(formError).length == 0 && isSubmit == true) {
            console.log(input);
            axios.post('http://localhost:5000/path/addpath', input).then((data) => {
                console.log(data);
                navigate('/viewroute')

            }).catch((error) => {
                console.log(error);
            })
        }

    }
    return (
        <div>
            {/* contact section */}

            <section className="contact_section layout_padding"><Nav/>
            

                <div className="container">

                    <div className="heading_container">
                        <h2>ADD ROUTE </h2>
                    </div>
                    <div className="row">
                        <div className="col-md-8 mx-auto">
                            <div className="form_container">
                                <form onSubmit={submit}>
                                    <div className="form-row">
                                        <div className="form-group col">
                                            <span style={{ color: 'red' }}>{formError.origin}</span>
                                            <input
                                                type="text"
                                                className="form-control"
                                                id="inputName4"
                                                placeholder="Origin "
                                                name='origin'
                                                onChange={change}
                                                onClick={() => { setFormError({ ...formError, origin: '' }) }}
                                            />
                                        </div>
                                    </div>
                                    <div className="form-row">
                                        <div className="form-group col">
                                            <span style={{ color: 'red' }}>{formError.destination}</span>
                                            <input
                                                type="text"
                                                className="form-control"
                                                id="inputEmail4"
                                                placeholder="Destination"
                                                name='destination'
                                                onChange={change}
                                                onClick={() => { setFormError({ ...formError, destination: '' }) }}
                                            />
                                        </div>
                                    </div>
                                    <div className="form-row">
                                        <div className="form-group col">
                                            <span style={{ color: 'red' }}>{formError.via}</span>
                                            <input
                                                type="text"
                                                className="form-control"
                                                id="inputEmail4"
                                                placeholder="Via"
                                                name='via'
                                                onChange={change}
                                                onClick={() => { setFormError({ ...formError, via: '' }) }}
                                            />
                                        </div>
                                    </div>

                                    <div className="d-flex justify-content-center">
                                        <button type="submit" className="">
                                            Add
                                        </button>
                                    </div>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
            </section >
        </div>
    )
}
