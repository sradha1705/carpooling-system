import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'
import Contactbar from '../components/Contactbar'

export default function Updatedriver() {
    const navigate = useNavigate()
    const [driver, setDriver] = useState({
        username: '',
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

    useEffect(() => {

        axios.get(`http://localhost:5000/driver_reg/view_single_driver/${loginid}`).then((data) => {

            console.log(data.data.data[0]);
            setDriver(data.data.data[0]);

        }).catch((error) => {
            console.log(error);
        })
    }, [])





    const change = (event) => {
        const name = event.target.name
        const value = event.target.value

        setDriver({ ...driver, [name]: value })
        console.log(driver);

    }
    const handlePhoto = (e) => {
        e.preventDefault()
        console.log(e);
        setDriver({ ...driver, photo: e.target.files[0] })
        console.log(driver.photo);
    }

    const loginid = localStorage.getItem('login_id');



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
        return error

    }
    const submit = async (e) => {
        e.preventDefault()
        setFormError(validate(driver))
        setIsSubmit(true)
        console.log(driver);
        const formData = new FormData();
        formData.append('username', driver.username);
        formData.append('password', driver.password);
        formData.append('phone', driver.phone);
        formData.append('photo', driver.photo);
        formData.append('email', driver.email);
        formData.append('dob', driver.dob);
        formData.append('license', driver.license);
        formData.append('gender', driver.gender);
        formData.append('timings', driver.timings);
        formData.append('route', driver.route);
        console.log(formData);
        if (Object.keys(formError).length == 0 && isSubmit == true) {

            await axios.put(`http://localhost:5000/driver_reg/update_driver_reg/${loginid}`, formData).then((data) => {
                console.log(data);

                navigate('/driverprofile')
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

                    {/* <Nav /> */}

                </div>
            </header>
            {/* end header section */}
            {/* contact section */}
            <section className="contact_section layout_padding">
                <div className="container">
                    <div className="heading_container">
                        <h2> PROFILE UPDATION</h2>
                    </div>
                    <div className="row">
                        <div className="col-md-8 mx-auto">
                            <div className="form_container">
                                <form onSubmit={submit}>
                                    <div className="form-row">
                                        <div className="form-group col-md-4">
                                            <label><b>Photo</b></label>
                                            {/* <span style={{ color: 'white' }}>{driver?.photo}</span> */}
                                            {/* <div className="form-group col"> */}
                                            <input
                                                type="file"
                                                // className="form-control"
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
                                            <label><b>Username</b></label>
                                            <input
                                                value={driver.username}
                                                type="text"
                                                className="form-control"
                                                id="inputName4"
                                                name='username'
                                                onChange={change}
                                                onClick={() => { setFormError({ ...formError, username: '' }) }}
                                            />

                                        </div>
                                    </div>

                                    <div className="form-row">
                                        <div className="form-group col">
                                            <span style={{ color: 'red' }}>{formError.phone}</span>

                                            <label><b>Phone</b></label>
                                            <input
                                                value={driver.phone}
                                                type="text"
                                                className="form-control"
                                                id="inputEmail4"
                                                onClick={() => { setFormError({ ...formError, phone: '' }) }}
                                                name='phone'
                                                onChange={change}
                                            />
                                        </div>
                                    </div>

                                    <div className="form-row">
                                        <div className="form-group col">
                                            <span style={{ color: 'red' }}>{formError.email}</span>
                                            <label><b>Email</b></label>
                                            <input
                                                value={driver.email}
                                                type="text"
                                                className="form-control"
                                                id="inputEmail4"
                                                name='email'
                                                onChange={change}
                                                onClick={() => { setFormError({ ...formError, email: '' }) }}
                                            />
                                        </div>
                                    </div>

                                    <div className="form-group">
                                        <div className="form-row">
                                            <div className="form-group col">
                                                <label><b>Gender</b></label>
                                                <input
                                                    value={driver.gender}
                                                    type="text"
                                                    className="form-control"
                                                    id="inputEmail4"

                                                    name='gender'
                                                    onChange={change}

                                                />
                                            </div>
                                        </div>
                                    </div>
                                    <div className="form-group">
                                        <div className="form-row">
                                            <div className="form-group col">
                                                <label><b>Address</b></label>
                                                <span style={{ color: 'red' }}>{formError.address}</span>
                                                <input
                                                    value={driver.address}
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
                                            <input
                                                value={driver.dob}
                                                type="text"
                                                className="form-control"
                                                id="inputEmail4"
                                                name='dob'
                                                onChange={change}

                                            />
                                        </div>
                                    </div>

                                    <div className="form-row">
                                        <div className="form-group col">
                                            <label><b>Licence number</b></label>
                                            <input
                                                value={driver.license}
                                                type="text"
                                                className="form-control"
                                                id="inputEmail4"

                                                name='license'
                                                onChange={change}

                                            />
                                        </div>
                                    </div>

                                    <div className="form-row">
                                        {/* <div className="form-group col-sm-12"> */}
                                        <label><b>Timings</b></label>
                                        <input
                                            value={driver.timings}
                                            type="text"
                                            className="form-control"
                                            id="inputEmail4"

                                            name='timings'
                                            onChange={change}

                                        />



                                    </div>

                                    <div className="d-flex justify-content-center">
                                        <button type="submit" className="">
                                            Update
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
