import React, { useEffect, useState } from 'react'
import Nav from '../components/Nav'
import axios from 'axios'


export default function Viewuser() {

    const [user, setUser] = useState([])
    const deleteuser = (id) => {
        axios.get(`http://localhost:5000/user_reg/deleteuser/${id}`).then((data) => {
            console.log(data);
        })
    }
    useEffect(() => {
        axios.get("http://localhost:5000/user_reg/view_user_reg").then((data) => {
            console.log(data.data.data);
            setUser(data.data.data);
        }).catch((error) => {
            console.log(error);
        })
    }, [])
    console.log(user);


    return (
        <div>      {/* header section strats */}
            <header className="header_section">
                <div className="container-fluid">
                    <h5 className="text-md-left" style={{ color: 'white' }}>
                        Car4u
                    </h5>

                </div>
            </header>
            {/* end header section */}
            <section className="contact_section layout_padding">  <Nav />
                <div className="container">
                    <div className="heading_container">
                        <h2> USER DETAILS</h2>
                    </div>

                    <div className='container' style={{ color: 'black' }}>

                        <div class="row">

                            {
                                user.map((data, key) => (
                                    <div class="col-sm-4">

                                        <div className="card" style={{ width: "14rem", marginBottom: "20px" ,height:"15rem"}}>
                                            {/* <img className="card-img-top" src="..." alt="Card image cap" /> */}
                                            <div className="card-body">
                                                {/* <h5 className="card-title">Card title</h5> */}
                                                <p className="card-text" style={{ fontSize: 3 }}>
                                                    <strong> Username:</strong>{data.username}<br />
                                                    <strong> Phone:</strong>{data.phone}<br />
                                                    <strong> Email:</strong>{data.email}<br />
                                                    <strong> Gender:</strong>{data.gender}<br />
                                                    <strong> Address:</strong>{data.address}<br />
                                                </p>
                                                <a onClick={() => { deleteuser(data._id) }} href="#" className="btn btn-danger" style={{ fontSize: 3 }}>
                                                    Delete
                                                </a>
                                            </div>
                                        </div>
                                    </div>
                                ))
                            }


                        </div>
                    </div>



                </div>
            </section></div>
    )
}
