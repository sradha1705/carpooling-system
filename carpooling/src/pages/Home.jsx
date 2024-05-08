import React, { useState } from 'react'
import Nav from '../components/Nav'
import Contactbar from '../components/Contactbar'
import axios from 'axios'

export default function Home() {
  const role = localStorage.getItem('role')
  const [input, setInput] = useState({
    name: '',
    email: '',
    address: '',
    phone: ''
})
const [formError, setFormError] = useState({})
const [isSubmit, setIsSubmit] = useState(false)

const change = (event) => {

    const name = event.target.name
    const value = event.target.value

    setInput({ ...input, [name]: value })
}
const validate = (value) => {
    console.log(value);
    const error = {}

    if (value.name == '') {
        error.name = 'Enter name'
    }
    if (value.phone == '') {
        error.phone = 'Enter phone'
    }
    if (value.email == '') {
        error.email = 'Enter email'
    }
    if (value.message == '') {
        error.message = 'Enter message'
    }
    return error
}
const submit = (e) => {
    e.preventDefault()
    setFormError(validate(input))
    setIsSubmit(true)

    if (Object.keys(formError).length == 0 && isSubmit == true) {
        console.log(input);
        axios.post('http://localhost:5000/feedback/add_data', input).then((data) => {
            console.log(data);
          }).catch((error) => {
            console.log(error);
        })
    }
}
  return (
    <>
      <div className="hero_area">
        {/* header section strats */}
        <header className="header_section">
          <div className="container-fluid">


            <Nav />


          </div>
        </header>
        {/* end header section */}
        {/* slider section */}
        <section className=" slider_section position-relative">
          <div className="slider_container">
            <div className="img-box">
              <img src="images/hero-img.jpg" alt="" />
            </div>
            <div className="detail_container">
              <div
                id="carouselExampleControls"
                className="carousel slide"
                data-ride="carousel"
              >
                <div className="carousel-inner">
                  <div className="carousel-item active">
                    <div className="detail-box">
                      <h1>
                        Share Car <br />
                        Experts <br />
                        Service
                      </h1>
                      {/* <a href="register">Register Now</a> */}
                    </div>
                  </div>
                  <div className="carousel-item">
                    <div className="detail-box">
                      <h1>
                        <br />
                        Enjoy <br />
                        your Journey <br />
                        With us
                      </h1>
                      {/* <a href="register">Register Now</a> */}
                    </div>
                  </div>
                  <div className="carousel-item">
                    <div className="detail-box">
                      <h1><br />
                        Most safe<br />
                        and fast<br />
                        Car service
                      </h1>
                      {/* <a href="register">Register Now</a> */}
                    </div>
                  </div>
                </div>
                <a
                  className="carousel-control-prev"
                  href="#carouselExampleControls"
                  role="button"
                  data-slide="prev"
                >
                  <span className="sr-only">Previous</span>
                </a>
                <a
                  className="carousel-control-next"
                  href="#carouselExampleControls"
                  role="button"
                  data-slide="next"
                >
                  <span className="sr-only">Next</span>
                </a>
              </div>
            </div>
          </div>
        </section>
        {/* end slider section */}
      </div>
      <section className="book_section">
        <div className="form_container">
          <form action="">
            <div className="form-row">
              <div className="col-lg-8">
                <div className="form-row">


                </div>

              </div>
              <b>
                <h1 style={{ color: 'navyblue' }}>  Car4u<br/>SHARECARS EXPERTS SERVICE</h1></b>
            </div>
          </form>
        </div>
        <div className="img-box">
          <img src="images/book-car.png" alt="" />
        </div>
      </section>

      {role == 'admin' ?
        <div>
        </div>
        :
        <>
          <section className="us_section">
            <div className="container">
              <div className="heading_container">
                <h2>Why choose Us</h2>
                <p>
                  The most attractive feature provided by us are as follows
                </p>
              </div>
            </div>
            <div className="us_container layout_padding2">
              <div className="content_box">
                <div className="box">
                  <div className="img-box">
                    <img src="images/u-1.png" alt="" />
                  </div>
                  <div className="detail-box">
                    <h5>Low Charge</h5>
                  </div>
                </div>
                <div className="box">
                  <div className="img-box">
                    <img src="images/u-2.png" alt="" />
                  </div>
                  <div className="detail-box">
                    <h5>Fast Car</h5>
                  </div>
                </div>
                <div className="box">
                  <div className="img-box">
                    <img src="images/u-3.png" alt="" />
                  </div>
                  <div className="detail-box">
                    <h5>Safe Car</h5>
                  </div>
                </div>
                <div className="box">
                  <div className="img-box">
                    <img src="images/u-4.png" alt="" />
                  </div>
                  <div className="detail-box">
                    <h5>Quick Support</h5>
                  </div>
                </div>
              </div>
              <div className="btn-box">
                <a href="about">Read More</a>
              </div>
            </div>
          </section>



          <section className="contact_section layout_padding">
            <div className="container">
              <div className="heading_container">
                <h2>Request A call back</h2>
              </div>
              <div className="row">
                        <div className="col-md-8 mx-auto">
                            <div className="form_container">
                                <form onSubmit={submit}>
                                    <div className="form-row">
                                        <div className="form-group col-md-6">
                                        <span style={{ color: 'red' }}>{formError.name}</span>
                                            <input
                                            name='name'
                                                type="text"
                                                className="form-control"
                                                id="inputName4"
                                                placeholder="Name "
                                                onChange={change}
                                                onClick={() => { setFormError({ ...formError, name: '' }) }}

                                            />
                                        </div>
                                        <div className="form-group col-md-6">
                                        <span style={{ color: 'red' }}>{formError.phone}</span>

                                            <input
                                            name='phone'
                                            type="text"
                                                className="form-control"
                                                id="inputSubject4"
                                                placeholder="Phone"
                                                onClick={() => { setFormError({ ...formError, phone: '' }) }}
                                                onChange={change}
                                            />
                                        </div>
                                    </div>
                                    <div className="form-row">
                                        <div className="form-group col">
                                        <span style={{ color: 'red' }}>{formError.email}</span>

                                            <input
                                            name='email'
                                            type="email"
                                                className="form-control"
                                                id="inputEmail4"
                                                onClick={() => { setFormError({ ...formError, email: '' }) }}
                                                placeholder="Email id"
                                                onChange={change}
                                            />
                                        </div>
                                    </div>
                                    <div className="form-group">
                                    <span style={{ color: 'red' }}>{formError.message}</span>
                                        <input
                                            name='message'
                                            type="text"
                                            className="form-control"
                                            id="inputMessage"
                                            placeholder="Message"
                                                onClick={() => { setFormError({ ...formError, message: '' }) }}
                                                onChange={change}
                                        />
                                    </div>
                                    <div className="d-flex justify-content-center">
                                        <button type="submit" className="">
                                            Send
                                        </button>
                                    </div>
                                </form>
                            </div>
                        </div>
                    </div>
            <Contactbar/>
            </div>
          </section>
          <div className="map_container">
            <div className="map-responsive">
              <iframe
                src="https://www.google.com/maps/embed/v1/place?key=AIzaSyA0s1a7phLN0iaD6-UE7m4qP-z21pH0eSc&q=Eiffel+Tower+Paris+France"
                width={600}
                height={300}
                frameBorder={0}
                style={{ border: 0, width: "100%", height: "100%" }}
                allowFullScreen=""
              />
            </div>
          </div>
        </>
      }

    </>
  )
}
