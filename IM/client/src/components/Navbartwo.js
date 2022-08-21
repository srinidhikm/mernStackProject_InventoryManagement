import React from 'react'
import 'bootstrap/dist/css/bootstrap.css';
import { NavLink } from 'react-router-dom';
import logo from "../images/imlogo.png";

const Navbartwo = () => {
  return (
    <div>
      
      <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
            <div className='pl-2'>
           <img src={logo} className="img-fluid rounded-circle" alt="logo" width="50" height="50"/>
            </div>
  <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
    <span className="navbar-toggler-icon"></span>
  </button>

  <div className="collapse navbar-collapse" id="navbarSupportedContent">
    <ul className="navbar-nav ml-auto">
     
    <li className="nav-item dropdown">
        <NavLink className="nav-link dropdown-toggle " to="#" id="navbarDropdown" role="button" data-toggle="dropdown" aria-expanded="false">
          Inventory
        </NavLink>
        <div className="dropdown-menu " aria-labelledby="navbarDropdown">
          <NavLink className="dropdown-item " to="additems">Add Items</NavLink>
          <NavLink className="dropdown-item" to="itemgroups">Item Groups</NavLink>
          <NavLink className="dropdown-item" to="editsdash">Inventory Adjustment</NavLink>
        </div>
      </li> 

      <li className="nav-item dropdown">
        <NavLink className="nav-link dropdown-toggle " to="#" id="navbarDropdown" role="button" data-toggle="dropdown" aria-expanded="false">
          Sales
        </NavLink>
        <div className="dropdown-menu " aria-labelledby="navbarDropdown">
          <NavLink className="dropdown-item " to="addcustomer">Add Customer</NavLink>

          <NavLink className="dropdown-item " to="newsalesorder">New Sales Order</NavLink>

          <NavLink className="dropdown-item " to="returns">Returns</NavLink>
          
        </div>
      </li> 

      <li className="nav-item dropdown">
        <NavLink className="nav-link dropdown-toggle " to="#" id="navbarDropdown" role="button" data-toggle="dropdown" aria-expanded="false">
          Purchases
        </NavLink>
        <div className="dropdown-menu " aria-labelledby="navbarDropdown">
          <NavLink className="dropdown-item " to="addvendor">Add Vendor</NavLink>
          <NavLink className="dropdown-item " to="addpurchase">Add Purchase Order</NavLink>

          
        </div>
      </li> 

      <li className="nav-item">
        <NavLink className="nav-link" to="im">Dashboard</NavLink>
      </li>
      
      <li className="nav-item">
        <NavLink className="nav-link" to="logout">Logout</NavLink>
      </li>
    </ul>
  </div>
</nav>

    </div>
  )
}

export default Navbartwo
