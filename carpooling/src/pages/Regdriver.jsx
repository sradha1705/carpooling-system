import React, { useState } from 'react'
import Nav from '../components/Nav'
import axios from 'axios';
import { useNavigate, useParams } from 'react-router-dom';
import Contactbar from '../components/Contactbar';

export default function Regdriver() {
    const navigate = useNavigate()
    const { origin } = useParams()
    const [input, setInput] = useState({
        username: '',
        password: '',
        phone: '',
        email: '',
        address: '',
        dob: '',
        licence: '',
        timings: '',
        gender: '',
        route: origin
    })
    const [formError, setFormError] = useState({})
    const [isSubmit, setIsSubmit] = useState(false)

    const change = (event) => {

        const name = event.target.name
        const value = event.target.value

        setInput({ ...input, [name]: value })
        console.log(input);

    }
    const handlePhoto = (e) => {
        setInput({ ...input, photo: e.target.files[0] })
        console.log(input.photo);
    }
    const validate = (value) => {
        console.log(value);
        const phone = /^[6-9]\d{9}$/;
        const email = /^\w+([\.-]?\w+)*@\w+([\.-]?\W+)*(\.\w{2,3})+$/;
        const error = {}

        if (value.username == '') {
            error.username = 'Enter username'
        }
        if (value.password == '') {
            error.password = 'Enter password'
        }
        if (value.phone == '') {
            error.phone = 'Enter phone'
        }
        else if (!phone.test(value.phone)) {
            error.phone = 'Enter a valid number'
        }
        if (value.email == '') {
            error.email = 'Enter email'
        }
        else if (!email.test(value.email)) {
            error.email = 'Enter a valid email'
        }
        if (value.address == '') {
            error.address = 'Enter address'
        }
        if (value.dob == '') {
            error.dob = 'Enter Date Of Birth'
        }
        if (value.license == '') {
            error.license = 'Enter License number'
        }
        return error

    }

    const submit = (e) => {
        e.preventDefault()
        setFormError(validate(input))
        setIsSubmit(true)

        const formData = new FormData();
        formData.append('photo', input.photo);
        formData.append('username', input.username);
        formData.append('password', input.password);
        formData.append('phone', input.phone);
        formData.append('email', input.email);
        formData.append('dob', input.dob);
        formData.append('license', input.license);
        formData.append('address', input.address); 
        formData.append('gender', input.gender);
        formData.append('timings', input.timings);
        formData.append('route', input.route);

        if (Object.keys(formError).length == 0 && isSubmit == true) {
            console.log(input);
            axios.post('http://localhost:5000/driver_reg/add_driver', formData).then((data) => {
                console.log(data);
                navigate('/login')
            }).catch((error) => {
                console.log(error);
            })
        }
    }
    console.log(origin);
    return (
        <div>
            {/* header section strats */}
            <header className="header_section">
                <div className="container-fluid">

                    {/* <Nav /> */}

                </div>
            </header>
            {/* end header section */}
            {/* contact section */}
            <section className="contact_section layout_padding">
                <div className="container">
                    <div className="heading_container">
                        <h2> DRIVER REGISTRATION</h2>
                    </div>
                    <div className="row">
                        <div className="col-md-8 mx-auto">
                            <div className="form_container">
                                <form onSubmit={submit}>
                                    <p style={{ color: 'red' }}>Already Registered? <a href='login'>Sign Up</a></p>
                                    <div className="form-row">
                                        <div className="form-group col-md-3">
                                            <label><b>Photo</b></label>
                                            {/* <div className="form-group col"> */}
                                            <input
                                                type="File"
                                                className="form-control"
                                                name='photo'
                                                //  onChange={change}
                                                onChange={handlePhoto}
                                            />
                                            {/* </div> */}
                                        </div>
                                    </div>
                                    <div className="form-row">
                                        <div className="form-group col">
                                            <span style={{ color: 'red' }}>{formError.username}</span>
                                            <input
                                                type="text"
                                                className="form-control"
                                                id="inputName4"
                                                placeholder="Username "
                                                name='username'
                                                onChange={change}
                                                onClick={() => { setFormError({ ...formError, username: '' }) }}
                                            />

                                        </div>
                                    </div>

                                    <div className="form-row">
                                        <div className="form-group col">
                                            <span style={{ color: 'red' }}>{formError.password}</span>
                                            <input
                                                type="Password"
                                                className="form-control"
                                                id="inputEmail4"
                                                placeholder="Password"
                                                name='password'
                                                onChange={change}
                                                onClick={() => { setFormError({ ...formError, password: '' }) }}
                                            />
                                        </div>
                                    </div>

                                    <div className="form-row">
                                        <div className="form-group col">
                                            <span style={{ color: 'red' }}>{formError.phone}</span>
                                            <input
                                                type="text"
                                                className="form-control"
                                                id="inputEmail4"
                                                placeholder="Phone"
                                                name='phone'
                                                onChange={change}
                                                onClick={() => { setFormError({ ...formError, phone: '' }) }}
                                            />
                                        </div>
                                    </div>
                                    <div className="form-row">
                                        <div className="form-group col">
                                            <span style={{ color: 'red' }}>{formError.mail}</span>
                                            <input
                                               
                                                type="text"
                                                className="form-control"
                                                id="inputEmail4"
                                                placeholder="Email id"
                                                name='email'
                                                onChange={change}
                                                onClick={() => { setFormError({ ...formError, mail: '' }) }}
                                            />
                                        </div>
                                    </div>

                                    <div className="form-row">
                                        {/* <div className="form-group col-sm-12"> */}
                                        <label><b>Gender</b></label>
                                        <div className="radio">
                                            <label>&nbsp;&nbsp;&nbsp;
                                                <input type="radio" value="male" name='gender' checked={input.gender === "male"} onChange={change} />
                                                Male
                                            </label>
                                        </div>
                                        <div className="radio">
                                            <label>&nbsp;&nbsp;
                                                <input type="radio" value="female" name='gender' checked={input.gender === "female"} onChange={change} />
                                                Female
                                            </label>
                                        </div>
                                        <div className="radio">
                                            <label>&nbsp;&nbsp;
                                                <input type="radio" value="others" name='gender' checked={input.gender === "others"} onChange={change} />
                                                Others
                                            </label>
                                            {/* </div> */}
                                        </div>
                                    </div>

                                    <div className="form-group">
                                        <div className="form-row">
                                            <div className="form-group col">
                                                <span style={{ color: 'red' }}>{formError.address}</span>
                                                <input
                                                    type="text"
                                                    className="form-control"
                                                    id="inputMessage"
                                                    placeholder="Address"
                                                    name='address'
                                                    onChange={change}
                                                    onClick={() => { setFormError({ ...formError, address: '' }) }}
                                                />
                                            </div>
                                        </div>
                                    </div>


                                    <div className="form-row">
                                        <div className="form-group col-md-6">
                                            <label><b>Date of Birth</b></label>
                                            <span style={{ color: 'red' }}>{formError.dob}</span>
                                            <input
                                                type="date"
                                                className="form-control"
                                                id="inputEmail4"
                                                placeholder="Age"
                                                name='dob'
                                                onChange={change}
                                                onClick={() => { setFormError({ ...formError, dob: '' }) }}
                                            />
                                        </div>
                                    </div>

                                    <div className="form-row">
                                        <div className="form-group col">
                                            <span style={{ color: 'red' }}>{formError.license}</span>
                                            <input
                                                type="text"
                                                className="form-control"
                                                id="inputEmail4"
                                                placeholder="License number"
                                                name='license'
                                                onChange={change}
                                                onClick={() => { setFormError({ ...formError, license: '' }) }}
                                            />
                                        </div>
                                    </div>

                                    <div className="form-row">
                                        {/* <div className="form-group col-sm-12"> */}
                                        <label><b>Timings</b></label>
                                        <div className="radio">
                                            <label>&nbsp;&nbsp;&nbsp;
                                                <input type="radio" value="6AM-12PM" name='timings' checked={input.timings === "6AM-12PM"} onChange={change} />
                                                6AM-12PM
                                            </label>
                                        </div>
                                        <div className="radio">
                                            <label>&nbsp;&nbsp;
                                                <input type="radio" value="12PM-6PM" name='timings' checked={input.timings === "12PM-6PM"} onChange={change} />
                                                12PM-6PM
                                            </label>
                                        </div>
                                        <div className="radio">
                                            <label>&nbsp;&nbsp;
                                                <input type="radio" value="6PM-12AM" name='timings' checked={input.timings === "6PM-12AM"} onChange={change} />
                                                6PM-12AM
                                            </label>
                                        </div>
                                        <div className="radio">
                                            <label>&nbsp;&nbsp;
                                                <input type="radio" value="12AM-6AM" name='timings' checked={input.timings === "12AM-6AM"} onChange={change} />
                                                12AM-6AM
                                            </label>
                                        </div>

                                        <div className="form-row">
                                            <div className="form-group col">

                                                <label><b>Route</b></label>
                                                <input
                                                    value={`${origin}`}
                                                    type="text"
                                                    className="form-control"
                                                    id="inputName4"
                                                    placeholder=" "
                                                    name='route'
                                                    onChange={change}

                                                />

                                            </div>
                                        </div>

                                    </div>

                                    <div className="d-flex justify-content-center">
                                        <button type="submit" className="">
                                            Register
                                        </button>
                                    </div><br />

                                </form>
                            </div>
                        </div>
                    </div>
                    {/*---------------------------------------------------------------------------------------------------- */}
                    <Contactbar />
                </div>
            </section>
            {/* end contact section */}
        </div>
    )
}
