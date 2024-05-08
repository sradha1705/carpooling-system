import React, { useEffect, useState } from 'react'
import Nav from '../components/Nav'
import axios from 'axios'
import { Link } from 'react-router-dom'
import Contactbar from '../components/Contactbar'

export default function Driverprofile() {
    const [driver, setDriver] = useState([])
    useEffect(() => {
        const loginid = localStorage.getItem('login_id');
        console.log(loginid);
        axios.get(`http://localhost:5000/driver_reg/view_single_driver/${loginid}`).then((data) => {
            console.log(data.data.data[0]);
            setDriver(data.data.data[0]);
        }).catch((error) => {
            console.log(error);
        })

    }, [])

    return (
        <div> <div>
            {/* header section strats */}
            <header className="header_section">
                <div className="container-fluid">
                    <h5 className="text-md-left" style={{ color: 'white' }}>
                        Car4u
                    </h5>
                </div>
            </header></div>

            <section className="contact_section layout_padding"><Nav />
                <div className="container" style={{ color: 'black' }}>
                    <div className="heading_container">
                        <h2>PROFILE</h2>
                    </div>
                    {/* <div className="row">
                        <div className="col-md-8 mx-auto"> */}
                    <center>
                        <div className="form_container">

                            <div className="card" style={{ width: "20rem", height: '29rem' }}>

                                <div className="text-center">

                                    <img className="" src={`/images/${driver.photo}`} class="img-thumbnail" alt="No image" width={'200px'} />

                                    <div className="card-body">
                                        <h5 className="card-title"></h5>
                                        <h6 className="card-subtitle mb-2 text-muted"></h6>

                                        <p className="card-text" style={{ fontSize: 10, textAlign: 'left' }}><br />
                                            <b>Username:</b>{driver?.username}<br />
                                            <b>Phone:</b>{driver?.phone}<br />
                                            <b>Email:</b>{driver?.email}<br />
                                            <b>Gender:</b>{driver?.gender}<br />
                                            <b>Address:</b>{driver?.address}<br />
                                            <b>Date of Birth:</b>{driver?.dob}<br />
                                            <b>License number:</b>{driver?.license}<br />
                                            <b>Timings:</b>{driver?.timings}<br />
                                            <b>Route:</b>{driver?.route}<br />
                                        </p>
                                        <Link to={`/updatedriver/${driver.loginid}`}>
                                            <a href="#" className="btn btn-primary" style={{ fontSize: 3 }}>
                                                Update
                                            </a>
                                        </Link>
                                    </div>

                                </div>
                            </div>
                        </div>
                    </center>
                    <Contactbar />
                </div>
            </section>








        </div>
    )
}
