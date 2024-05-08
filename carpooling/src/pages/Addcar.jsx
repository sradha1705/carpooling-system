import React, { useState } from 'react'
import Nav from '../components/Nav'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'

export default function Addcar() {
  const navigate=useNavigate()
  const [input, setInput] = useState({

    number: '',
    type: '',
    model: '',
    company: ''

  })
  const [formError, setFormError] = useState({})
  const [isSubmit, setIsSubmit] = useState(false)

  const change = (event) => {

    const name = event.target.name
    const value = event.target.value
   

    setInput({ ...input, [name]: value })

  }

  const handlePhoto=(e)=>{
    setInput({...input,photo:e.target.files[0]})
    console.log(input.photo);
  }

  const validate = (value) => {
    console.log(value);
    const error = {}

    if (value.number == '') {
      error.number = 'Enter Carnumber'
    }
    if (value.type == '') {
      error.type = 'Enter Cartype'
    }
    if (value.model == '') {
      error.model = 'Enter Carmodel'
    }
    if (value.company == '') {
      error.company = 'Enter Carcompany'
    }
    return error
  }
  const submit = (e) => {
    e.preventDefault()
    setFormError(validate(input))
    setIsSubmit(true)
const formData=new FormData();
formData.append('photo',input.photo);
formData.append('number',input.number);
formData.append('type',input.type);
formData.append('model',input.model);
formData.append('company',input.company);

    if (Object.keys(formError).length == 0 && isSubmit == true) {
      console.log(input);

      axios.post('http://localhost:5000/car/addcar', formData).then((data) => {
        console.log(data);
        navigate('/viewcar')

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
      <section className="contact_section layout_padding"><Nav />
        <div className="container">
          <div className="heading_container">
            <h2>ADD CARS</h2>
          </div>
          <div className="row">
            <div className="col-md-8 mx-auto">
              <div className="form_container">
                <form onSubmit={submit}>
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
                      <span style={{ color: 'red' }}>{formError.number}</span>
                      <input
                        type="text"
                        name='number'
                        onChange={change}
                        onClick={() => { setFormError({ ...formError, number: '' }) }}
                        className="form-control"
                        id="inputName4"
                        placeholder="Car Number "
                      />
                    </div>
                  </div>
                  <div className="form-row">
                    <div className="form-group col">
                      <span style={{ color: 'red' }}>{formError.type}</span>
                      <input
                        type="text"
                        className="form-control"
                        id="inputEmail4"
                        placeholder="Car type"
                        name='type'
                        onChange={change}
                        onClick={() => { setFormError({ ...formError, type: '' }) }}
                      />
                    </div>
                  </div>
                  <div className="form-row">
                    <div className="form-group col">
                      <span style={{ color: 'red' }}>{formError.model}</span>
                      <input
                        type="text"
                        className="form-control"
                        id="inputEmail4"
                        placeholder="model"
                        name='model'
                        onChange={change}
                        onClick={() => { setFormError({ ...formError, model: '' }) }}
                      />
                    </div>
                  </div>
                  <div className="form-row">
                    <div className="form-group col">
                      <span style={{ color: 'red' }}>{formError.company}</span>
                      <input
                        type="text"
                        className="form-control"
                        id="inputEmail4"
                        placeholder="Company "
                        name='company'
                        onChange={change}
                        onClick={() => { setFormError({ ...formError, company: '' }) }}
                      />
                    </div>
                  </div>
                  <div className="d-flex justify-content-center">
                    <button type="submit" className="">
                      Add car
                    </button>
                  </div><br />
                </form>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
