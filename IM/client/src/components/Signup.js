import React, {useState} from 'react'
import 'bootstrap/dist/css/bootstrap.css';
import { NavLink, useHistory } from 'react-router-dom';

const Signup = () => {
  const history = useHistory();
  const [user, setUser] = useState(
    {
      compname:"", email:"", phno:"", password:"", cpassword:""
    }
  );

  let key, value;
  const handleInputs = (e) =>
  { 
    key = e.target.name;
    value = e.target.value;
    setUser({ ...user, [key]:value })
  }

  const postData = async (e) =>
  {
    e.preventDefault();
    const { compname, email, phno, password, cpassword } = user;
    const res = await fetch('/signup',
    {
      method:'POST',
      headers:
      {
        'Content-Type' : 'application/json'
      },
      body: JSON.stringify(
        {
          compname, email, phno, password, cpassword
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
      history.push('/signin');
    }
  }

  return (
    <>

            <div className='container bg-dark regis w-50'>
              <h1 className='text-monospace text-white text-center'><span className='fontfamabout'>R E G I S T E R</span></h1>
              <form method='POST'>
                <div className='form-group'>
                  <label for='compname' className='text-white'>Name:</label>
                  <input type='text' id='compname' name='compname' className='form-control' value={user.compname} onChange={handleInputs}></input>
                </div>

                <div className='form-group'>
                  <label for='email' className='text-white'>Email:</label>
                  <input type='email' id='email' name='email' className='form-control' value={user.email} onChange={handleInputs}></input>
                </div>

                <div className='form-group'>
                  <label for='phno' className='text-white'>Contact Number:</label>
                  <input type='number' id='phno' name='phno' className='form-control' value={user.phno} onChange={handleInputs}></input>
                </div>

                <div className='form-group'>
                  <label for='password' className='text-white'>Create Password:</label>
                  <input type='password' id='password' name='password' className='form-control' value={user.password} onChange={handleInputs}></input>
                </div>

                <div className='form-group'>
                  <label for='cpassword' className='text-white'>Confirm Password:</label>
                  <input type='password' id='cpassword' name='cpassword' className='form-control' value={user.cpassword} onChange={handleInputs}></input>
                </div>

                <input type='submit' name='newregister' className='btn text-white btn-secondary' onClick={postData}></input>
                <br></br> 
              <NavLink to='signin' className='text-white text-center'>Click here if already registered</NavLink>
                <br></br>
              </form>
            </div>
     
    </>
  )
}

export default Signup
