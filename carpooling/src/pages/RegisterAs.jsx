import React from 'react'
import Contactbar from '../components/Contactbar'
import { Link } from 'react-router-dom'

export default function RegisterAs() {
    return (
        <div>
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
                            <h2>REGISTER </h2>
                        </div>
                        <div className="row">
                            <div className="col-md-8 mx-auto">
                                <div className="form_container">
                                    <form>

                                        <div className="text-center">
                                            <div className="d-grid gap-2 col-8 mx-auto">
                                                <div className="text-center">
                                                    <Link to={'/register'}>

                                                        <button className="btn btn-primary" type="button" style={{ width: '200px' }}>
                                                            USER REGISTER
                                                        </button>
                                                        &nbsp;
                                                    </Link>
                                                    <Link to={'/viewroute'}>
                                                        <button className="btn btn-primary" type="button" style={{ width: '200px' }}>
                                                            DRIVER REGISTER
                                                        </button>
                                                    </Link>
                                                </div>
                                            </div>
                                        </div>
                                        {/* <a className="col-lg-5 btn btn-primary" href='register'>
                                                USER REGISTER
                                            </a>
                                            &nbsp;
                                            <a className=" col-lg-5 btn btn-primary" href='viewroute'>
                                                DRIVER REGISTER
                                            </a> */}

                                        <br /><br />
                                        <br /> <div className="text-center">
                                            <p><b>Already Registered? <a href='login'>Sign Up</a></b></p>

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
        </div>
    )
}
