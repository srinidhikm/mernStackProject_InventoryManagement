import React from 'react'
import 'bootstrap/dist/css/bootstrap.css';
import { NavLink } from 'react-router-dom';
import logo from "../images/imlogo.png";

const Navbar = () => {
  return (
    <>      
            <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
            <div className='pl-2'>
           <img src={logo} className="img-fluid rounded-circle" alt="logo" width="50" height="50"/>
            </div>
  <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
    <span className="navbar-toggler-icon"></span>
  </button>

  <div className="collapse navbar-collapse" id="navbarSupportedContent">
    <ul className="navbar-nav ml-auto">
      <li className="nav-item active">
        <NavLink className="nav-link" to="/">Home <span className="sr-only">(current)</span></NavLink>
      </li>
      <li className="nav-item">
        <NavLink className="nav-link" to="/aboutus">About Us</NavLink>
      </li>
      <li className="nav-item">
        <NavLink className="nav-link" to="signup">Register</NavLink>
      </li>
      <li className="nav-item">
        <NavLink className="nav-link" to="signin">Login</NavLink>
      </li>
    </ul>
  </div>
</nav>
    </>
  )
}

export default Navbar