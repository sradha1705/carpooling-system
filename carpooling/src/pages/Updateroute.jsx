import React, { useEffect, useState } from 'react'
import Nav from '../components/Nav'
import { useNavigate, useParams } from 'react-router-dom'
import axios from 'axios'

export default function Updateroute() {
const navigate=useNavigate()
    const { origin } = useParams()
    const { via } = useParams()
    const { destination } = useParams()
   
    const [input, setInput] = useState({
  
      origin: origin,
      via: via,
      destination: destination,
     
  
    })

    const [formError, setFormError] = useState({})
    const [isSubmit, setIsSubmit] = useState(false)

    const change = (event) => {

        const name = event.target.name
        const value = event.target.value

        setInput({ ...input, [name]: value })


    }
    const { id } = useParams()

    useEffect(() => {

     console.log(id);  
        axios.get(`http://localhost:5000/path/viewpath/${id}`).then((data) => {
          console.log(data.data.data);
          setInput(data.data.data);
        }).catch((error) => {
          console.log(error);
        })
      }, [])
      console.log(input);
    const submit = async (e) => {
        e.preventDefault()
    
        await axios.put(`http://localhost:5000/path/updatepath/${id}`,input).then((data)=>{
            console.log(data);
          })
          setIsSubmit(true)
          navigate('/viewroute')
          
    }
    
  return (
    <div>
    {/* contact section */}
   
    <section className="contact_section layout_padding">
      
        <div className="container">
        <Nav />
            <div className="heading_container">
                <h2>UPDATE ROUTE </h2>
            </div>
            <div className="row">
                <div className="col-md-8 mx-auto">
                    <div className="form_container">
                        <form onSubmit={submit}>
                            <div className="form-row">
                                <div className="form-group col">
                                    
                                    <label><b>Origin</b></label>
                                    <input
                                    value={input.origin}
                                        type="text"
                                        className="form-control"
                                        id="inputName4"
                                        name='origin'
                                        onChange={change}
                                      
                                    />

                                </div>
                            </div>
                            <div className="form-row">
                                <div className="form-group col">
                                    <label><b>Via</b></label>
                                    <input
                                      value={input.via}
                                        type="text"
                                        className="form-control"
                                        id="inputEmail4"
                                        name='via'
                                        onChange={change}

                                    />
                                </div>
                            </div>
                            <div className="form-row">
                                <div className="form-group col">
                                    <label><b>Destination</b></label>
                                    <input
                                      value={input.destination}
                                        type="text"
                                        className="form-control"
                                        id="inputEmail4"
                                        name='destination'
                                        onChange={change}
                                    />
                                </div>
                            </div>

                            <div className="d-flex justify-content-center">
                                <button type="submit" className="">
                                 Update
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    </section >
</div>

  )
}
