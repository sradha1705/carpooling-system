import React, { useEffect, useState } from 'react'
import axios from 'axios'
import Nav from '../components/Nav';
export default function Feedback() {
     const [feedback, setFeedback] = useState([]) 
    useEffect(() => {
        axios.get("http://localhost:5000/feedback/view_feedback").then((data) => {
          console.log(data.data.data);
    
          setFeedback(data.data.data);
        }).catch((error) => {
          console.log(error);
        })
      }, [])
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
            <section className="contact_section layout_padding"><Nav/>
                <div className="container">
                    <div className="heading_container">
                        <h2>FEEDBACKS</h2>
                    </div>
                    
                    <table className="table">
              <thead className="thead-light">
                <tr>
                  <th scope="col"></th>
                  <th scope="col">Name</th>
                  <th scope="col">Phone</th>
                  <th scope="col">Email</th>
                  <th scope="col">Message</th>
                </tr>
              </thead>
              <tbody style={{ color: 'white' }}>
                {
                  feedback.map((data, key) => (
                    <tr>
                      <th scope="row"></th>
                      <td>{data.name}</td>
                      <td>{data.phone}</td>
                      <td>{data.email}</td>
                      <td>{data.message}</td>
                    </tr>
                  ))
                }

              </tbody>
            </table>
                </div>
            </section>
        </div>
  )
}
