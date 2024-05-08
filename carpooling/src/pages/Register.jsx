import React, { useState } from 'react'
import Nav from '../components/Nav'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'
import Contactbar from '../components/Contactbar'

export default function Register() {
  const navigate = useNavigate()
  const [input, setInput] = useState({

    username: '',
    password: '',
    phone: '',
    email: '',
    address: ''

  })
  const [formError, setFormError] = useState({})
  const [isSubmit, setIsSubmit] = useState(false)
  // console.log(formError);

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
  const submit = (e) => {
    e.preventDefault()
    setFormError(validate(input))
    setIsSubmit(true)
    // console.log('ertyu');
    if (Object.keys(formError).length == 0 && isSubmit == true) {
      console.log(input);
      axios.post('http://localhost:5000/user_reg/add_user', input).then((data) => {
        console.log(data);

        navigate('/login')

      }).catch((error) => {
        console.log(error);
      })
    }
  }
  return (
    <div>
      <header className="header_section">
        <div className="container-fluid">
          {/* 
          <Nav /> */}
        </div>
      </header>
      {/* contact section */}
      <section className="contact_section layout_padding">
        <div className="container">
          <div className="heading_container">

            <h2>REGISTRATION</h2>
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
                        name='username'
                        onChange={change}
                        onClick={() => { setFormError({ ...formError, username: '' }) }}
                        className="form-control"
                        id="inputName4"
                        placeholder="Username "
                      />

                    </div>
                  </div>

                  <div className="form-row">
                    <div className="form-group col">
                      <span style={{ color: 'red' }}>{formError.password}</span>
                      <input
                        type="password"
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
                        type="phone"
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
                      <span style={{ color: 'red' }}>{formError.email}</span>
                      <input
                        type="text"
                        className="form-control"
                        id="inputEmail4"
                        placeholder="Email id"
                        name='email'
                        onChange={change}
                        onClick={() => { setFormError({ ...formError, email: '' }) }}
                      />
                    </div>
                  </div>

                  <div className="form-row">
                    {/* <div className="form-group col-sm-12"> */}
                    <label><b>Gender</b></label>
                    <div className="radio">
                      <label>&nbsp;&nbsp;&nbsp;
                        <input type="radio" value="male" name='gender' checked={true} />
                        Male
                      </label>
                    </div>
                    <div className="radio">
                      <label>&nbsp;&nbsp;
                        <input type="radio" value="female" name='gender' />
                        Female
                      </label>
                    </div>
                    <div className="radio">
                      <label>&nbsp;&nbsp;
                        <input type="radio" value="others" name='gender' />
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

                  <div className="d-flex justify-content-center">
                    <button type="submit" className="">
                      Register
                    </button>
                  </div><br />
                  <p>Already Registered? <a href='login'>Sign Up</a></p>
                </form>
              </div>
            </div>
          </div>
          < Contactbar />
        </div>
      </section>
      {/* end contact section */}
    </div>
  )
}
