import React, { useEffect } from 'react'
import { Link, useNavigate } from 'react-router-dom';

export default function Nav() {
  const navigate = useNavigate()
  const role = localStorage.getItem('role')
  console.log(role);
  const logout = () => {
    console.log('hi');
    localStorage.clear()
    navigate('/')
  }
  useEffect(() => {
    if (!role) {
      navigate('/')
    }
  }, [])

  return (
    <>

      {role == 'admin' ?
        <nav className="navbar navbar-expand-lg custom_nav-container">
          <a className="navbar-brand" href="/">
            <span>Car4u</span>
          </a>
          <div className="navbar-collapse" id="">
            <div className="user_option" >
            <a onClick={logout} >Logout</a> 
            </div>
            <div className="custom_menu-btn">
              <button onClick={openNav}>
                <span className="s-1"> </span>
                <span className="s-2"> </span>
                <span className="s-3"> </span>
              </button>
            </div>
            <div id="myNav" className="overlay">
              <div className="overlay-content">
                {/* <a href="/">Welcome</a>  */}
                <Link to="/home">Home</Link>
                <Link to="/addcar">Add car</Link>
                <Link to="/viewroute">View route</Link>
                <Link to="/viewbooking">View booking</Link>
                <Link to="/viewcar">View car</Link>
                <Link to="/feedback">View feedbacks</Link>
                <Link to="/viewuser">View user</Link>
                <Link to="/addroute ">Add route</Link>
                <Link to="/adddriver">View Driver</Link>
                <a onClick={logout}>Logout</a> 
              </div>
            </div>
          </div>
        </nav>
        :

        role == 'user' ?
          <nav className="navbar navbar-expand-lg custom_nav-container">
            <a className="navbar-brand" href="/">
              <span>Car4u</span>
            </a>
            <div className="navbar-collapse" id="">
              <div className="user_option">
                <a onClick={logout}>Logout</a>
              </div>
              <div className="custom_menu-btn">
                <button onClick={openNav}>
                  <span className="s-1"> </span>
                  <span className="s-2"> </span>
                  <span className="s-3"> </span>
                </button>
              </div>
              <div id="myNav" className="overlay">
                <div className="overlay-content">
                  <Link to="/home">Home</Link>
                  <Link to="/userprofile">Profile</Link>
                  <Link to="/viewcar">Booking</Link>
                  <Link to="/viewbookinguser">View booking</Link>
                  <Link to="/about ">About</Link>
                  <Link to="/contact">Contact Us</Link>
                 <a onClick={logout}>Logout</a>
                </div>
              </div>
            </div>
          </nav>

          :

          <nav className="navbar navbar-expand-lg custom_nav-container">
            <a className="navbar-brand" href="/">
              <span>Car4u</span>
            </a>
            <div className="navbar-collapse" id="">
              <div className="user_option">
               <a onClick={logout}>Logout</a>
              </div>
              <div className="custom_menu-btn">
                <button onClick={openNav}>
                  <span className="s-1"> </span>
                  <span className="s-2"> </span>
                  <span className="s-3"> </span>
                </button>
              </div>
              <div id="myNav" className="overlay">
                <div className="overlay-content">
                  {/* <a href="/">Welcome</a>  */}
                  <Link to="/home">Home</Link>
                  <Link to="/about ">About</Link>
                  <Link to="/viewbooking">View booking</Link>
                  <Link to="/contact">Contact Us</Link>
                  <Link to="/driverprofile">Profile</Link>
                 <a onClick={logout}>Logout</a>
                </div>
              </div>
            </div>
          </nav>
      }

    </>
  )
}
