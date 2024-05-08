import React, { useState } from 'react'
import Nav from '../components/Nav'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'
import Contactbar from '../components/Contactbar'


export default function Login() {
    const navigate = useNavigate()
    const [input, setInput] = useState({
        username: '',
        password: '',
    })

    const [formError, setFormError] = useState({})
    const [isSubmit, setIsSubmit] = useState(false)
    // console.log(formError);
    const change = (event) => {

        const name = event.target.name
        const value = event.target.value

        setInput({ ...input, [name]: value })
    }

    const login = () => {
        if (localStorage == null) {

        }

    }
    const validate = (value) => {
        const error = {}

        if (value.username == '') {
            error.username = 'Enter username'
        }
        if (value.password == '') {
            error.password = 'Enter password'
        }
        return error
    }

    const submit = (e) => {
        e.preventDefault()
        setFormError(validate(input))
        setIsSubmit(true)
        if (Object.keys(formError).length == 0 && isSubmit == true) {
            console.log(input);

            axios.post('http://localhost:5000/login/login_data', input).then((data) => {
                console.log(data);

                localStorage.setItem('login_id', data.data.data._id);
                localStorage.setItem('role', data.data.data.role);
                localStorage.setItem('username', data.data.data.username);


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
            <section className="contact_section layout_padding">
                <div className="container">
                    <div className="heading_container">
                        <h2>LOGIN</h2>
                    </div>
                    <div className="row">
                        <div className="col-md-8 mx-auto">
                            <div className="form_container">
                                <form onSubmit={submit}>
                                    <div className="form-row">
                                        <div className="form-group col">
                                            <span style={{ color: 'red' }}>{formError.username}</span>
                                            <input
                                                type="text"
                                                onChange={change}
                                                onClick={() => { setFormError({ ...formError, username: '' }) }}
                                                className="form-control"
                                                id="inputName4"
                                                name='username'
                                                placeholder="Username "
                                            />
                                        </div>
                                    </div>
                                    <div className="form-row">
                                        <div className="form-group col">
                                            <span style={{ color: 'red' }}>{formError.password}</span>
                                            <input
                                                type="password"
                                                onChange={change}
                                                onClick={() => { setFormError({ ...formError, password: '' }) }}
                                                className="form-control"
                                                name='password'
                                                id="inputEmail4"
                                                placeholder="Password"
                                            />
                                        </div>
                                    </div>

                                    <div className="d-flex justify-content-center">
                                        <button type="submit" className="">
                                            Login
                                        </button>
                                    </div><br />

                                    <div className="d-flex justify-content-center">
                                        <a href='/password'>Forgot password</a>

                                    </div>
                                    <div className="d-flex justify-content-center">
                                        <p style={{ color: 'red' }}><b>Not yet Register?  </b></p><a href='regas'> <b> Register Now </b></a>

                                    </div>
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
