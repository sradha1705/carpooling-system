import React, { useState } from 'react'
import Contactbar from '../components/Contactbar'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'

export default function Password() {
  const navigate = useNavigate()

  const [input, setInput] = useState({
    username: '',
  })
  const [formError, setFormError] = useState({})
  const [isSubmit, setIsSubmit] = useState(false)
  const change = (event) => {

    const name = event.target.name
    const value = event.target.value

    setInput({ ...input, [name]: value })
  }
  const validate = (value) => {
    const error = {}

    if (value.username == '') {
      error.username = 'Enter username'
    }
    return error
  }
  const submit = (e) => {
    e.preventDefault()
    setFormError(validate(input))
    setIsSubmit(true)
    if (Object.keys(formError).length == 0 && isSubmit == true) {
      console.log(input);

      axios.post('http://localhost:5000/login/user_data', input).then((data) => {
        console.log(data.data.data);

        navigate(`/forgot/${data.data.data._id}`)

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
                      <span style={{ color: 'red' }}>{formError.username}</span>
                      <input
                        type="text"
                        name='username'
                        className="form-control"
                        id="inputName4"
                        placeholder="Username "
                        onChange={change}
                        onClick={() => { setFormError({ ...formError, username: '' }) }}

                      />
                    </div>
                  </div>
                  <div className="d-flex justify-content-center">
                    <button type="submit" className="">
                      {/* <Link to={`/forgot/${data._id}`}>  */}
                      Submit
                      {/* </Link>  */}
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
