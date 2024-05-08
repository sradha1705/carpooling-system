import React, { useEffect, useState } from 'react'
import Nav from '../components/Nav'
import axios from 'axios'

export default function AddDriver() {
    const [driver, setDriver] = useState([])
    const deletedriver=(id) => {  
        axios.get(`http://localhost:5000/driver_reg/deletedriver/${id}`).then((data)=>{
            console.log(data);
        })
    }
    useEffect(() => {
        axios.get('http://localhost:5000/driver_reg/view_driver_reg').then((data) => {
            console.log(data.data.data);
            setDriver(data.data.data);
        }).catch((error) => {
            console.log(error);
        })
    }, [])
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
            <section className="contact_section layout_padding"><Nav></Nav>
                <div className="container">
                    <div className="heading_container">
                        <h2>DRIVER DETAILS </h2>
                    </div>
                    <div className='container' style={{ color: 'black' }}>

                        <div class="row">
                            {
                                driver.map((data, key) => (

                                    <div class="col-sm-4">

                                        <div className="card" style={{ width: "14rem", marginBottom: "20px", height:"35rem"}}>
                                            <img className="card-img-top" src={`/images/${data.photo}`} alt="Card image cap" style={{ height:"15rem"}}/>
                                            <div className="card-body">
                                                {/* <h5 className="card-title">Card title</h5> */}
                                                <p className="card-text" style={{ fontSize: 3 }}>
                                                    <b>Username:</b>{data.username}<br />
                                                    <b>Phone:</b>{data.phone}<br />
                                                    <b>Email:</b>{data.email}<br />
                                                    <b>Gender:</b>{data.gender}<br />
                                                    <b>Address:</b>{data.address}<br />
                                                    <b> Date of Birth:</b>{data.dob}<br />
                                                    <b> License number:</b><br />{data.license}<br />
                                                    <b>Timings:</b>{data.timings}<br />
                                                    <b>Route:</b>{data.route}<br />

                                                </p>
                                                {/* <a href="#" className="btn btn-success" style={{ fontSize: 3 }}>
                                                    Add
                                                </a> */}
                                                &nbsp;&nbsp;
                                                <a onClick={()=> {deletedriver(data._id)}}href="#" className="btn btn-danger" style={{ fontSize: 3 }}>
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
            </section>

        </div>
    )
}
