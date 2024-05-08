import React, { useState } from 'react'
import Nav from '../components/Nav'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'


export default function Contact() {
     const navigate=useNavigate()
    const [input, setInput] = useState({
        name: '',
        email: '',
        address: '',
        phone: ''
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

        if (value.name == '') {
            error.name = 'Enter name'
        }
        if (value.phone == '') {
            error.phone = 'Enter phone'
        }
        if (value.email == '') {
            error.email = 'Enter email'
        }
        if (value.message == '') {
            error.message = 'Enter message'
        }
        return error
    }
    const submit = (e) => {
        e.preventDefault()
        setFormError(validate(input))
        setIsSubmit(true)

        if (Object.keys(formError).length == 0 && isSubmit == true) {
            console.log(input);
            axios.post('http://localhost:5000/feedback/add_data', input).then((data) => {
                console.log(data);
                 navigate('/home')

            }).catch((error) => {
                console.log(error);
            })
        }

    }
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
                        <h2>Request A call back</h2>
                    </div>
                    <div className="row">
                        <div className="col-md-8 mx-auto">
                            <div className="form_container">
                                <form onSubmit={submit}>
                                    <div className="form-row">
                                        <div className="form-group col-md-6">
                                        <span style={{ color: 'red' }}>{formError.name}</span>
                                            <input
                                            name='name'
                                                type="text"
                                                className="form-control"
                                                id="inputName4"
                                                placeholder="Name "
                                                onChange={change}
                                                onClick={() => { setFormError({ ...formError, name: '' }) }}

                                            />
                                        </div>
                                        <div className="form-group col-md-6">
                                        <span style={{ color: 'red' }}>{formError.phone}</span>

                                            <input
                                            name='phone'
                                            type="text"
                                                className="form-control"
                                                id="inputSubject4"
                                                placeholder="Phone"
                                                onClick={() => { setFormError({ ...formError, phone: '' }) }}
                                                onChange={change}
                                            />
                                        </div>
                                    </div>
                                    <div className="form-row">
                                        <div className="form-group col">
                                        <span style={{ color: 'red' }}>{formError.email}</span>

                                            <input
                                            name='email'
                                            type="email"
                                                className="form-control"
                                                id="inputEmail4"
                                                onClick={() => { setFormError({ ...formError, email: '' }) }}
                                                placeholder="Email id"
                                                onChange={change}
                                            />
                                        </div>
                                    </div>
                                    <div className="form-group">
                                    <span style={{ color: 'red' }}>{formError.message}</span>
                                        <input
                                            name='message'
                                            type="text"
                                            className="form-control"
                                            id="inputMessage"
                                            placeholder="Message"
                                                onClick={() => { setFormError({ ...formError, message: '' }) }}
                                                onChange={change}
                                        />
                                    </div>
                                    <div className="d-flex justify-content-center">
                                        <button type="submit" className="">
                                            Send
                                        </button>
                                    </div>
                                </form>
                            </div>
                        </div>
                    </div>
                    <div className="contact_items">
                        <a href="">
                            <div className="img-box">
                                <img src="images/location.png" alt="" />
                            </div>
                            <h6>Sharecars Company pvt Ltd</h6>
                        </a>
                        <a href="">
                            <div className="img-box">
                                <img src="images/call.png" alt="" />
                            </div>
                            <h6>(+91 1234456789)</h6>
                        </a>
                        <a href="">
                            <div className="img-box">
                                <img src="images/mail.png" alt="" />
                            </div>
                            <h6>sharecars@gmail.com</h6>
                        </a>
                    </div>
                    <div className="social_container">
                        <div className="social-box">
                            <div>
                                <a href="www.facebook.com">
                                    <img src="images/fb.png" alt="" />
                                </a>
                            </div>
                            <div>
                                <a href="twitter.com/?lang=en">
                                    <img src="images/twitter.png" alt="" />
                                </a>
                            </div>
                            <div>
                                <a href="in.linkedin.com/">
                                    <img src="images/linkedin.png" alt="" />
                                </a>
                            </div>
                            <div>
                                <a href="www.instagram.com">
                                    <img src="images/insta.png" alt="" />
                                </a>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
            {/* end contact section */}
        </div>
    )
}
