import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { useNavigate, useParams, useSubmit } from 'react-router-dom'

export default function Updatecar() {
  const navigate=useNavigate()

 

  const [input, setInput] = useState({})

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

  const { id } = useParams()

  useEffect(() => {

    
    console.log(id);
    axios.get(`http://localhost:5000/car/viewcar_user/${id}`).then((data) => {
      console.log(data.data.data);
      setInput(data.data.data);
    }).catch((error) => {
      console.log(error);
    })
  }, [])
  console.log(input);
  const submit = async (e) => {
    e.preventDefault()

    const formData=new FormData();
formData.append('photo',input.photo);
formData.append('number',input.number);
formData.append('type',input.type);
formData.append('model',input.model);
formData.append('company',input.company);

    await axios.put(`http://localhost:5000/car/updatecar/${id}`,formData).then((data)=>{
      console.log(data);
    })
    
    setIsSubmit(true)
navigate('/viewcar')
   
  }
  return (
    <div>
      {/* header section strats */}
      <header className="header_section">
        <div className="container-fluid">
        </div>
      </header>
      {/* end header section */}
      <section className="contact_section layout_padding">
        <div className="container">
          <div className="heading_container">
            <h2>UPDATE CAR</h2>
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
                    
                       onChange={handlePhoto}
                      />
                      {/* </div> */}
                    </div>
                  </div>
                  <div className="form-row">
                    <div className="form-group col">
                      <label><b>Car Number</b></label>
                      <input
                        value={input.number}
                        type="text"
                        name='number'
                        onChange={change}
                        className="form-control"
                        id="inputName4"
                        placeholder="Car Number "
                      />
                    </div>
                  </div>

                  <div className="form-row">
                    <div className="form-group col">
                      <label><b>Car type</b></label>
                      <input
                        value={input.type}
                        type="text"
                        className="form-control"
                        id="inputEmail4"
                        placeholder="Car type"
                        name='type'
                        onChange={change}
                      />
                    </div>
                  </div>

                  <div className="form-row">
                    <div className="form-group col">
                      <label><b>Car model</b></label>
                      <input
                        value={input.model}
                        type="text"
                        className="form-control"
                        id="inputEmail4"
                        placeholder="model"
                        name='model'
                        onChange={change}
                      />
                    </div>
                  </div>

                  <div className="form-row">
                    <div className="form-group col">
                      <label><b>Car company</b></label>
                      <input
                        value={input.company}
                        type="text"
                        className="form-control"
                        id="inputEmail4"
                        placeholder="Company "
                        name='company'
                        onChange={change}
                      />
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
        </div>
      </section>
    </div>
  )
}
