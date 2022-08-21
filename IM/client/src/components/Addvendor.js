import React, {useState} from 'react'
import 'bootstrap/dist/css/bootstrap.css';
import { useHistory } from 'react-router-dom';

const Addvendor = () => {

    const history = useHistory();
    const [vendor, setVendor]=useState(
        {
            vendorname:"", address:"", email:"", vphno:""
        }
    )

    let key, value;
    const handleInputs = (e) =>
  { 
    key = e.target.name;
    value = e.target.value;
    setVendor({ ...vendor, [key]:value })
  }

  const postData = async (e) =>
  {
    e.preventDefault();
    const {  vendorname, address, email, vphno } = vendor;
    const res = await fetch('/addvendor',
    {
      method:'POST',
      headers:
      {
        'Content-Type' : 'application/json'
      },
      body: JSON.stringify(
        {
            vendorname, address, email, vphno
        }
      )
    });

    const data = await res.json();
    if(data.status === 422 || !data)
    {
      console.log(data.error);
      const str= JSON.stringify(data.error)
      window.alert(str);
    }
    else
    {
      window.alert('Registration Successful')
      history.push('/im');
    }
  }

  return (
    <div>
      
      <div className='container bg-dark regis w-50'>
              <h1 className='text-monospace text-white text-center'><span className='fontfamabout'>A D D - V E N D O R</span></h1>
              <form method='POST'>
                <div className='form-group'>
                  <label for='customername' className='text-white'>Name:</label>
                  <input type='text' id='customername' name='vendorname' className='form-control' value={vendor.vendorname} onChange={handleInputs}></input>
                </div>

                <div className='form-group'>
                  <label for='address' className='text-white'>Address:</label>
                  <input type='text' id='address' name='address' className='form-control' value={vendor.address} onChange={handleInputs}></input>
                </div>

                <div className='form-group'>
                  <label for='email' className='text-white'>Email:</label>
                  <input type='email' id='email' name='email' className='form-control' value={vendor.email} onChange={handleInputs}></input>
                </div>

                <div className='form-group'>
                  <label for='email' className='text-white'>Contact Number:</label>
                  <input type='text' id='email' name='vphno' className='form-control' value={vendor.vphno} onChange={handleInputs}></input>
                </div>

                <input type='submit' name='newregister' className='btn text-white btn-secondary' onClick={postData}></input>
                <br></br>
              </form>
            </div>

    </div>
  )
}

export default Addvendor
