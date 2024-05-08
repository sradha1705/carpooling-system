import React from 'react'
import Nav from '../components/Nav'
import Contactbar from '../components/Contactbar'

export default function Welcome() {
  return (
    <div>
      <div className="hero_area">
        {/* header section strats */}
        <header className="header_section">
          <div className="container-fluid">

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
                      <a href="login">Sign Up</a>
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
                      <a href="login">Sign Up</a>
                    </div>
                  </div>
                  <div className="carousel-item">
                    <div className="detail-box">
                      <h1><br />
                        Most safe<br />
                        and fast<br />
                        Car service
                      </h1>
                      <a href="login">Sign Up</a>
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
                <h1 style={{ color: 'navyblue' }}>  Welcome to Car4u-ShareCar Experts Service</h1>


              </div>

            </div>
          </form>
        </div>
        <div className="img-box">
          <img src="images/book-car.png" alt="" />
        </div>
      </section>
<Contactbar/>
    </div>
  )
}
