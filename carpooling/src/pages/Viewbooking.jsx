import React, { useEffect, useState } from 'react'
import Nav from '../components/Nav'
import axios from 'axios'
import Contactbar from '../components/Contactbar'


export default function Viewbooking() {
    const role = localStorage.getItem('role')

    const [booking, setBooking] = useState([])

    const updatestatus = (id) => {
        axios.put(`http://localhost:5000/booking/updatestatus/${id}`).then((data) => {
            console.log(data);
        })
    }
    useEffect(() => {

        axios.get('http://localhost:5000/booking/view_booking').then((data) => {
            console.log(data.data.data);
            setBooking(data.data.data);

        }).catch((error) => {
            console.log(error);
        })
    }, [])
    console.log(booking);



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
            <section className="contact_section layout_padding"><Nav/>
                <div className="container">
                    <div className="heading_container">
                        <h2>BOOKINGS</h2>
                    </div>
                    <div className='container' style={{ color: 'black' }}>
                 
                            <div class="row">

                                {
                                    booking.map((data, key) => (
                                        <div class="col-sm-4">

                                            <div className="card" style={{ width: "14rem", marginBottom: "20px" }}>
                                                {/* <img className="card-img-top" src="..." alt="Card image cap" /> */}
                                                <div className="card-body">
                                                    {/* <h5 className="card-title">Card title</h5> */}
                                                    <p className="card-text" style={{ fontSize: 3 }}>
                                                        Username:{data?.username}<br />
                                                        No of Passengers:{data?.passengers}<br />
                                                        Phone:{data?.phone}<br />
                                                        Email:{data?.email}<br />
                                                        Time:{data?.time}<br />
                                                        Pickup:{data?.pickup}<br />
                                                        Drop:{data?.drop}<br />
                                                        Origin:{data?.route}<br />
                                                        Via:{data?.via}<br />
                                                        Destination:{data?.destination}<br />
                                                        Car:{data?.car}<br />
                                                        Payment mode:{data?.payment}<br />
                                                        Status:{data?.status}<br />


                                                        {role == 'admin' ?
                                                            <div>
                                                            </div>
                                                            :
                                                            <a onClick={() => { updatestatus(data._id) }} href="#" className="btn btn-primary" style={{ fontSize: 15 }}>
                                                                Respond
                                                            </a>
                                                        }
                                                    </p>

                                                </div>
                                            </div>
                                        </div>

                                    ))
                                }

                            </div>
                    </div>

                </div>

            </section>
            {role == 'admin' ?
                <div>
                </div>
                :


                <Contactbar />
            }
        </div>

    )
}
