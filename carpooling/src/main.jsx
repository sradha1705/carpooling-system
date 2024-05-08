import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'


import Home from './pages/Home.jsx'
import Login from './pages/Login.jsx'
import Register from './pages/Register.jsx'
import Forgot from './pages/Forgot.jsx'

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
)
