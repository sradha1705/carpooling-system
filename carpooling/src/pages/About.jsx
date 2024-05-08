import React from 'react'
import Nav from '../components/Nav'

import Contactbar from '../components/Contactbar'

export default function About() {
    return (
        <div>
            {/* header section strats */}
            <header className="header_section" style={{ backgroundColor: '#25055d' }}>
                <div className="container-fluid">

                    <Nav />

                </div>
            </header>
            {/* end header section */}

            {/* us section */}
            <section className="us_section">
                <div className="container">

                    <div className="heading_container" style={{ padding: 80 }}>
                        <h2>Why choose Us</h2>
                        <p>
                            The most attractive feature provided by us are as follows
                        </p>
                    </div>
                </div>
                <div className="us_container layout_padding2">
                    <div className="content_box">
                        <div className="box">
                            <div className="img-box">
                                <img src="images/u-1.png" alt="" />
                            </div>
                            <div className="detail-box">
                                <h5>Low Charge</h5>
                            </div>
                        </div>
                        <div className="box">
                            <div className="img-box">
                                <img src="images/u-2.png" alt="" />
                            </div>
                            <div className="detail-box">
                                <h5>Fast Car</h5>
                            </div>
                        </div>
                        <div className="box">
                            <div className="img-box">
                                <img src="images/u-3.png" alt="" />
                            </div>
                            <div className="detail-box">
                                <h5>Safe Car</h5>
                            </div>
                        </div>
                        <div className="box">
                            <div className="img-box">
                                <img src="images/u-4.png" alt="" />
                            </div>
                            <div className="detail-box">
                                <h5>Quick Support</h5>
                            </div>
                        </div>
                    </div>

                </div>
                <div className="container">
                    <div className="heading_container">
                        <h2>Low Charge</h2>
                        <p>
                            We aim that customers must have their Journey with least possible minimum cost.We assured that the cost for
                            travelling is very low
                        </p>
                    </div>
                </div>
                <div className="container">
                    <div className="heading_container">
                        <h2>Fast car</h2>
                        <p>
                            Our fast car feature represents that the customer can complete there journey be on time.We values the time
                            of each and every customer.
                        </p>
                    </div>
                </div>
                <div className="container">
                    <div className="heading_container">
                        <h2>Safe car</h2>
                        <p>
                            We provide fast car facility to the customers at the same time we are also resposible for the safety of the customer.
                            so we ensure safe car experience to our customers
                        </p>
                    </div>
                </div>
                <div className="container">
                    <div className="heading_container">
                        <h2>Quick support</h2>
                        <p>
                          We are here for service you.24x7 customer support available .We always ready to help
                            you when ever you need help from us.Our aim is customer satisfaction
                        </p>
                    </div>
                </div>

                <Contactbar />

            </section>
            {/* end us section */}

        </div>
    )
}
