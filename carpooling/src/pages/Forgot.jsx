import React, { useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import Contactbar from '../components/Contactbar'
import axios from 'axios'

export default function Forgot() {
  const navigate = useNavigate()

  const [input, setInput] = useState({

    password: '',
    cnpassword: '',
  })

  const [formError, setFormError] = useState({})
  const [isSubmit, setIsSubmit] = useState(false)
  // console.log(formError);
  const change = (event) => {

    const name = event.target.name
    const value = event.target.value

    setInput({ ...input, [name]: value })
  }

  const { _id } = useParams()
console.log(_id);

  const validate = (value) => {
    const error = {}
    if (value.password == '') {
      error.password = 'Enter password'
    }
    if (value.cnpassword == '') {
      error.cnpassword = ' Re-Enter password'
    }
    return error
  }

  const submit = (e) => {
    e.preventDefault()
    setFormError(validate(input))
    setIsSubmit(true)
    if (Object.keys(formError).length == 0 && isSubmit == true) {
      console.log(input);

      axios.put(`http://localhost:5000/login/updatepassword/${_id}`, input).then((data) => {
        console.log(data);

        navigate('/login')

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
        </div>
      </header>
      {/* end header section */}
      {/* contact section */}
      <section className="contact_section layout_padding">
        <div className="container">
          <div className="heading_container">
            <h2>FORGET PASSWORD </h2>
          </div>
          <div className="row">
            <div className="col-md-8 mx-auto">
              <div className="form_container">
                <form onSubmit={submit}>
                  <div className="form-row">
                    <div className="form-group col">
                      <span style={{ color: 'red' }}>{formError.password}</span>
                      <input
                        type="Password"
                        name='password'
                        className="form-control"
                        id="Email"
                        onChange={change}
                        placeholder="New-Password"
                      />
                    </div>
                  </div>
                  <div className="form-row">
                    <div className="form-group col">
                      <span style={{ color: 'red' }}>{formError.cnpassword}</span>
                      <input
                        type="Password"
                        name='cnpassword'
                        className="form-control"
                        id="CnEmail"
                        onChange={change}
                        placeholder="Conform-Password"
                      />
                    </div>
                  </div>
                  <div className="d-flex justify-content-center">
                    <button type="submit" className="">
                      Submit
                    </button>
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
