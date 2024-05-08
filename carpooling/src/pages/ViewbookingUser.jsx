import React, { useEffect, useState } from 'react'
import Nav from '../components/Nav'
import Contactbar from '../components/Contactbar'
import axios from 'axios'

export default function ViewbookingUser() {
    const [user, setUser] = useState([])
    const deletetrip = (id) => {
        axios.get(`http://localhost:5000/booking/deletebooking/${id}`).then((data) => {
            console.log(data);
        })
    }
    useEffect(() => {
        const login_id = localStorage.getItem('login_id');
        console.log(login_id);

        axios.get(`http://localhost:5000/booking/view_single_booking/${login_id}`).then((data) => {

            console.log(data.data.data[0]);
            setUser(data.data.data);

        }).catch((error) => {
            console.log(error);
        })
    }, [])
    console.log(user);
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
                        <h2>BOOKINGS</h2>
                    </div>
                    <div className='container' style={{ color: 'black' }}>
                        <div class="row">
                            {
                                user.map((user, key) => (
                                    <div class="col-sm-4">
                                        <div className="card" style={{ width: "14rem", marginBottom: "20px" }}>
                                            {/* <img className="card-img-top" src="..." alt="Card image cap" /> */}
                                            <div className="card-body">
                                                {/* <h5 className="card-title">Card title</h5> */}
                                                <p className="card-text" style={{ fontSize: 3 }}>
                                                    <b> Username:</b>{user?.username}<br />
                                                    <b> No of Passengers:</b>{user?.passengers}<br />
                                                    <b> Phone:</b>{user?.phone}<br />
                                                    <b>  Email:</b>{user?.email}<br />
                                                    <b>   Time:</b>{user?.time}<br />
                                                    <b> Pickup:</b>{user?.pickup}<br />
                                                    <b>  Drop:</b>{user?.drop}<br />
                                                    <b>Starts from:</b>{user?.route}<br />
                                                    <b>  Via:</b>{user?.via}<br />
                                                    <b> Destination:</b>{user?.destination}<br />
                                                    <b> Car:</b>{user?.car}<br />
                                                    <b> Payment mode:</b>{user?.payment}<br />
                                                    <b> Status:</b>{user?.status}<br />
                                                    <a onClick={() => { deletetrip(user._id) }} href="#" className="btn btn-danger" style={{ fontSize: 15 }}>
                                                        Cancel Trip
                                                    </a>
                                                </p>
                                            </div>
                                        </div>
                                    </div>
                                ))}
                        </div>
                    </div>
                </div>
            </section>
            <Contactbar />
        </div>

    )
}
