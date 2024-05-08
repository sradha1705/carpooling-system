import React, { useEffect, useState } from 'react'
import Nav from '../components/Nav'
import axios from 'axios'
import { Link } from 'react-router-dom'

export default function Viewcar() {
    const role = localStorage.getItem('role')
    const [car, setCar] = useState([])
   
    const deletecar = (id) => {
        axios.get(`http://localhost:5000/car/deletecar/${id}`).then((data) => {
            console.log(data);
        })
    }
    useEffect(() => {
        axios.get('http://localhost:5000/car/viewcar').then((data) => {
            console.log(data.data.data);
            setCar(data.data.data);
        }).catch((error) => {
            console.log(error);
        })
    }, [])
    console.log(car);

    
    return (
        <div>
            {/* header section starts */}
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
                        <h2>CARS</h2>
                    </div>
                    {/* <nav className="navbar navbar-light bg-light">
                        <form className="form-inline">
                            <input
                                className="form-control mr-sm-2"
                               
                                type="search"
                                placeholder="Search"
                                aria-label="Search"
                            />

                        </form>
                    </nav> */}
                    <br />
                    <div className='container' style={{ color: 'black' }}>
                        <div class="row">{
                            car.map((data, key) => (
                                <div class="col-sm-4">
                                  
                                                <div className="card" style={{ width: "14rem", marginBottom: "20px", height: "18rem" }}>
                                                    <div className="text-center">
                                                        <img className="card-img-top" src={`/images/${data.photo}`} alt="Card image cap" style={{ height: "8rem" }} />
                                                        <div className="card-body">
                                                            {/* <h5 className="card-title">Card title</h5> */}
                                                            <p className="card-text" style={{ fontSize: 3 }}>
                                                                <b>Model:</b>{data.model}<br />
                                                                <b>Car Number:</b>{data.number}<br />
                                                                <b>Type:</b>{data.type}<br />
                                                                <b>Company:</b>{data.company}<br />
                                                            </p>
                                                        </div>
                                                        {role == 'admin' ?
                                                            <>
                                                                <Link to={`/updatecar/${data._id}`}>
                                                                    <a href='' className="btn btn-primary" style={{ fontSize: 8 }}>
                                                                        Update
                                                                    </a>
                                                                </Link>
                                                                &nbsp;
                                                                <a onClick={() => { deletecar(data._id) }} href='' className="btn btn-danger" style={{ fontSize: 8 }}>
                                                                    Delete
                                                                </a>
                                                            </>
                                                            :
                                                            <Link to={`/viewroute/${data.model}`}>
                                                                <a href='' className="btn btn-primary" style={{ fontSize: 8 }}>
                                                                    Book Now
                                                                </a>
                                                            </Link>
                                                        }
                                                   
                                                    </div>
                                               
                                                </div>  
                                                    </div>
                            
                            ))}

                        </div>

                    </div>

                </div>

            </section>
        </div>
    )
}
