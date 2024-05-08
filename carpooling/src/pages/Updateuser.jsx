import React, { useEffect, useState } from 'react'
import Nav from '../components/Nav'
import axios from 'axios'
import { useNavigate, useParams } from 'react-router-dom'
import Contactbar from '../components/Contactbar'

export default function Updateuser() {
    const navigate = useNavigate()



    const [input, setInput] = useState({})
    const [formError, setFormError] = useState({})
    const [isSubmit, setIsSubmit] = useState(false)
    const change = (event) => {

        const name = event.target.name
        const value = event.target.value

        setInput({ ...input, [name]: value })

    }
    const validate = (value) => {
        console.log(value);
        const phone = /^[6-9]\d{9}$/;
        const email = /^\w+([\.-]?\w+)*@\w+([\.-]?\W+)*(\.\w{2,3})+$/;
        const error = {}

        if (value.username == '') {
            error.username = 'Enter username'
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

    const loginid = localStorage.getItem('login_id');


    useEffect(() => {

        axios.get(`http://localhost:5000/user_reg/view_singledata/${loginid}`).then((data) => {

            console.log(data.data.data[0]);
            setInput(data.data.data[0]);

        }).catch((error) => {
            console.log(error);
        })
    }, [])

    console.log(input);
    
    const submit = async (e) => {
        e.preventDefault()
        setFormError(validate(input))
        setIsSubmit(true)
        if (Object.keys(formError).length == 0 && isSubmit == true) {
        await axios.put(`http://localhost:5000/user_reg/update_user_reg/${loginid}`, input).then((data) => {
            console.log(data);
            navigate('/userprofile')
        }).catch((error) => {
            console.log(error);
          })
        // setFormError(validate(input))
     
    }
}
    return (
        <div>
            <header className="header_section">
                <div className="container-fluid">

                    <Nav />
                </div>
            </header>

            {/* contact section */}
            <section className="contact_section layout_padding">
                <div className="container">
                    <div className="heading_container">

                        <h2>PROFILE UPDATION</h2>
                    </div>
                    <div className="row">
                        <div className="col-md-8 mx-auto">
                            <div className="form_container">
                                <form onSubmit={submit}>
                                    <div className="form-row">
                                        <div className="form-group col">
                                            <span style={{ color: 'red' }}>{formError.username}</span>
                                            <label><b>Username</b></label>
                                            <input
                                                value={input.username}
                                                type="text"
                                                name='username'
                                                onChange={change}
                                                className="form-control"
                                                id="inputName4"
                                                onClick={() => { setFormError({ ...formError, username: '' }) }}
                                            />
                                        </div>
                                    </div>

                                    <div className="form-row">
                                        <div className="form-group col">
                                            <span style={{ color: 'red' }}>{formError.phone}</span>
                                            <label><b>Phone</b></label>
                                            <input
                                                value={input.phone}
                                                type="phone"
                                                className="form-control"
                                                id="inputEmail4"
                                                name='phone'
                                                onChange={change}
                                                onClick={() => { setFormError({ ...formError, phone: '' }) }}

                                            />
                                        </div>
                                    </div>

                                    <div className="form-row">
                                        <div className="form-group col">
                                            <span style={{ color: 'red' }}>{formError.email}</span>
                                            <label><b>Email</b></label>
                                            <input
                                                value={input.email}
                                                type="mail"
                                                className="form-control"
                                                id="inputEmail4"
                                                name='email'
                                                onChange={change}
                                                onClick={() => { setFormError({ ...formError, email: '' }) }}
                                            />
                                        </div>
                                    </div>

                                    <div className="form-row">
                                        {/* <div className="form-group col-sm-12"> */}
                                        <label><b>Gender</b></label>
                                        <input
                                            value={input.gender}
                                            type="text"
                                            name='gender'
                                            onChange={change}
                                            className="form-control"
                                            id="inputName4"
                                        />
                                    </div>

                                    <div className="form-group">
                                        <div className="form-row">
                                            <div className="form-group col">
                                                <span style={{ color: 'red' }}>{formError.address}</span>
                                                <label><b>Address</b></label>
                                                <input
                                                    value={input.address}
                                                    type="text"
                                                    className="form-control"
                                                    id="inputMessage"
                                                    name='address'
                                                    onChange={change}
                                                    onClick={() => { setFormError({ ...formError, address: '' }) }}
                                                />
                                            </div>
                                        </div>
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
                    <Contactbar />
                </div>
            </section>
            {/* end contact section */}
        </div>
    )
}
