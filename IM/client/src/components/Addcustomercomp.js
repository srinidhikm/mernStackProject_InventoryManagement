import React, {useState} from 'react'
import 'bootstrap/dist/css/bootstrap.css';
import { useHistory } from 'react-router-dom';


const Addcustomercomp = () => {

    const history = useHistory();
    const [customer, setCustomer]=useState(
        {
            customername:"", address:"", email:""
        }
    )

    let key, value;
    const handleInputs = (e) =>
  { 
    key = e.target.name;
    value = e.target.value;
    setCustomer({ ...customer, [key]:value })
  }

  const postData = async (e) =>
  {
    e.preventDefault();
    const {  customername,  address, email } = customer;
    const res = await fetch('/addcustomer',
    {
      method:'POST',
      headers:
      {
        'Content-Type' : 'application/json'
      },
      body: JSON.stringify(
        {
            customername,  address, email
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
              <h1 className='text-monospace text-white text-center'><span className='fontfamabout'>A D D - C U S T O M E R</span></h1>
              <form method='POST'>
                <div className='form-group'>
                  <label for='customername' className='text-white'>Name:</label>
                  <input type='text' id='customername' name='customername' className='form-control' value={customer.customername} onChange={handleInputs}></input>
                </div>

                <div className='form-group'>
                  <label for='address' className='text-white'>Address:</label>
                  <input type='text' id='address' name='address' className='form-control' value={customer.address} onChange={handleInputs}></input>
                </div>

                <div className='form-group'>
                  <label for='email' className='text-white'>Email:</label>
                  <input type='email' id='email' name='email' className='form-control' value={customer.email} onChange={handleInputs}></input>
                </div>

                <input type='submit' name='newregister' className='btn text-white btn-secondary' onClick={postData}></input>
                <br></br>
              </form>
            </div>

    </div>
  )
}

export default Addcustomercomp
