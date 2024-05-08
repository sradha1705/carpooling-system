import React, { useEffect, useState } from 'react'
import Nav from '../components/Nav'
import axios from 'axios'
import { Link, useParams } from 'react-router-dom'


export default function Viewroute() {
  const role = localStorage.getItem('role')
  const [route, setRoute] = useState([])
  const [routeData, setRouteData] = useState([])
  const deleteroute = (id) => {
    axios.get(`http://localhost:5000/path/deletepath/${id}`).then((data) => {
      console.log(data);
    })
  }
  useEffect(() => {
    axios.get("http://localhost:5000/path/viewpath").then((data) => {
      console.log(data.data.data);

      setRoute(data.data.data);
    }).catch((error) => {
      console.log(error);
    })
  }, [])
  // console.log(route);
  // const { origin } = useParams()
  // console.log(origin);
  // const { via } = useParams()
  // console.log(via);
  // const { destination } = useParams()
  // console.log(destination);
  // const { model } = useParams()
  // console.log(model);

  const searchFuntion = (value) => {
    console.log(value);

    const filter = route.filter((details) => {
      console.log(details);
      return details.origin.includes(value)
    })

    setRouteData(filter)
  }
  console.log(routeData);

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
            <h2>AVILABLE CAR ROUTES</h2>
          </div>
          <>
            <nav className="navbar navbar-light bg-light">
              <form className="form-inline">
                <input
                  className="form-control mr-sm-2"
                  type="search"
                  onChange={(e) => { searchFuntion(e.target.value) }}
                  name='search_input'
                  placeholder="Search"
                  aria-label="Search"
                />
                <button className="btn btn-outline-info my-2 my-sm-0" type="button" >
                  Search
                </button>
              </form>
            </nav>
            <br />
            <table className="table">
              <thead className="thead-light">
                <tr>
                  <th scope="col"></th>
                  <th scope="col">Origin</th>
                  <th scope="col">Via</th>
                  <th scope="col">Destination</th>
                  <th scope="col"></th>
                </tr>
              </thead>
              <tbody style={{ color: 'white' }}>
                {
                  routeData[0] ?
                    routeData.map((data, key) => (
                      <tr>
                        <th scope="row"></th>
                        <td>{data.origin}</td>
                        <td>{data.via}</td>
                        <td>{data.destination}</td>
                        {role == 'admin' ?
                          <>
                            <td>
                              <a onClick={() => { deleteroute(data._id) }} href="#" className="btn btn-danger" style={{ fontSize: 3 }}>
                                Delete
                              </a>
                              <Link to={`/updateroute/${data._id}`}>
                                <a  className="btn btn-primary" style={{ fontSize: 3 }}>
                                  Update
                                </a></Link></td>
                          </>
                          :
                          role == 'user' ?
                            <>
                              <Link to={`/booking/${model}/${data.origin}/${data.via}/${data.destination}`}>
                                <td><a  className="btn btn-primary" style={{ fontSize: 15,color:'white' }}>
                                  Choose
                                </a></td></Link></>
                            :
                            <Link to={`/regdriver/${data.origin}`}>
                              <td><a  className="btn btn-primary" style={{ fontSize: 15 ,color:'white' }}>
                                Choose
                              </a></td></Link>
                        }
                      </tr>
                    )) :
                    route.map((data, key) => (
                      <tr>
                        <th scope="row"></th>
                        <td>{data.origin}</td>
                        <td>{data.via}</td>
                        <td>{data.destination}</td>
                        {role == 'admin' ?
                          <>
                            <td>
                              <a onClick={() => { deleteroute(data._id) }} href="#" className="btn btn-danger" style={{ fontSize: 3 }}>
                                Delete
                              </a>
                              <Link to={`/updateroute/${data._id}`}>
                                <a  className="btn btn-primary" style={{ fontSize: 3 }}>
                                  Update
                                </a></Link></td>
                          </>
                          :
                          role == 'user' ?
                            <>
                              <Link to={`/booking/${model}/${data.origin}/${data.via}/${data.destination}`}>
                                <td><a  className="btn btn-primary" style={{ fontSize: 15 ,color:'white' }}>
                                  Choose
                                </a></td></Link></>

                            :
                            <Link to={`/regdriver/${data.origin}/${data.via}/${data.destination}`}>
                              <td><a  className="btn btn-primary" style={{ fontSize: 15,color:'white' }}>
                                Choose
                              </a></td></Link>
                        }
                      </tr>
                    ))
                }

              </tbody>
            </table>
          </>
        </div>
      </section>
    </div>
  )
}
