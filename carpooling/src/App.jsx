import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Login from './pages/Login'
import Register from './pages/Register'
import Home from './pages/Home'
import Regdriver from './pages/Regdriver'
import Booking from './pages/Booking'
import Addroute from './pages/Addroute'
import About from './pages/About'
import Contact from './pages/Contact'
import Forgot from './pages/Forgot'
import Addcar from './pages/Addcar'
import Viewroute from './pages/Viewroute'
import AddDriver from './pages/AddDriver'
import Viewuser from './pages/Viewuser'
import Viewbooking from './pages/Viewbooking'
import Welcome from './pages/Welcome'
import Viewcar from './pages/Viewcar'
import Driverprofile from './pages/Driverprofile'
import Userprofile from './pages/Userprofile'
import RegisterAs from './pages/RegisterAs'
import ViewbookingUser from './pages/ViewbookingUser'
import Updatecar from './pages/Updatecar'
import Updatedriver from './pages/Updatedriver'
import Updateroute from './pages/Updateroute'
import Updateuser from './pages/Updateuser'
import Feedback from './pages/Feedback'
import Password from './pages/password'


function App() {

  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path='/updatecar/:id' element={<Updatecar/>} />
          <Route path='/updatedriver/:id' element={<Updatedriver/>} />
          <Route path='/updateroute/:id' element={<Updateroute/>} />
          <Route path='/updateuser/:id' element={<Updateuser/>} />
          <Route  path='/' element={<Welcome />} />
          <Route path='/home' element={<Home />} />
          <Route path='/login' element={<Login />} />
          <Route path='/register' element={<Register />} />
          <Route path='/viewroute/:model' element={<Viewroute />} />
          <Route path='/viewroute/:origin' element={<Viewroute />} />
          <Route path='/viewroute' element={<Viewroute />} />
          <Route path='/regdriver/:origin/:via/:destination' element={<Regdriver />} />
          <Route path='/booking/:model/:origin/:via/:destination' element={<Booking />} />
          <Route path='/booking' element={<Booking />} />
          <Route path='/route' element={<Addroute />} />
          <Route path='/about' element={<About />} />
          <Route path='/contact' element={<Contact />} />
          <Route path='/forgot/:_id' element={<Forgot />} />
          <Route path='/addcar' element={<Addcar />} />
          <Route path='/adddriver' element={<AddDriver />} />
          <Route path='/viewuser' element={<Viewuser />} />
          <Route path='/viewbooking' element={<Viewbooking />} />
          <Route path='/viewbookinguser' element={<ViewbookingUser />} />
          <Route path='/welcome' element={<Welcome />} />
          <Route path='/viewcar' element={<Viewcar />} />
          <Route path='/addroute' element={<Addroute />} />
          <Route path='/driverprofile' element={<Driverprofile />} />
          <Route path='/userprofile' element={<Userprofile />} />
          <Route path='/regas' element={<RegisterAs />} />
          <Route path='/feedback' element={<Feedback />} />
          <Route path='/password' element={<Password />} />
        </Routes>
      </BrowserRouter>



    </>
  )
}

export default App
