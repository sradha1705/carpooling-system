import React, { useEffect, useState } from 'react'
import Nav from '../components/Nav'
import axios from 'axios'
import { Link } from 'react-router-dom'
import Contactbar from '../components/Contactbar'

export default function Userprofile() {
    const [user, setUser] = useState([])
    useEffect(() => {
        const loginid = localStorage.getItem('login_id');
        axios.get(`http://localhost:5000/user_reg/view_singledata/${loginid}`).then((data) => {

            console.log(data.data.data[0]);
            setUser(data.data.data[0]);

        }).catch((error) => {
            console.log(error);
        })
    }, [])

    return (
        <div> <div> <div>
            {/* header section strats */}
            <header className="header_section">
                <div className="container-fluid">

                    <Nav />

                </div>
            </header></div>

            <section className="contact_section layout_padding">
                <div className="container" style={{ color: 'black' }}>
                    <div className="heading_container">
                        <h2>PROFILE</h2>
                    </div>
                    {/* <div className="row">
                <div className="col-md-8 mx-auto"> */}
                    <center>
                        <div className="form_container">
                         <div className="card" style={{ width: "20rem", height: "20rem" }}>

                                <div className="card-body">
                                    <h5 className="card-title"></h5>
                                    <h6 className="card-subtitle mb-2 text-muted"></h6>

                                    <p className="card-text" style={{ fontSize: 10, textAlign: 'left' }}><br />
                                        <b>Username:</b>{user.username}<br /><br />
                                        <b>Phone:</b>{user.phone}<br /><br />
                                        <b>Email:</b>{user.email}<br /><br />
                                        <b>Gender:</b>{user.gender}<br /><br />
                                        <b>Address:</b>{user.address}<br /><br />
                                       


                                    </p>
                                    <Link to={`/updateuser/${user.loginid}`}>
                                        <a href="#" className="btn btn-primary" style={{ fontSize: 15 }}>
                                            Update
                                        </a>
                                    </Link>
                                    {/* </div>
                        </div> */}

                                </div>
                            </div>
                        </div>
                    </center>
                  <Contactbar/>
                </div>
            </section>
        </div></div>
    )
}
