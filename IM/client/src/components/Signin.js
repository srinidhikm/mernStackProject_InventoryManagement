import React, {useState} from 'react'
import 'bootstrap/dist/css/bootstrap.css';
import { useHistory } from 'react-router-dom';

const Signin = () => {
  const history = useHistory();
  const [cred, setCred] = useState(
    {
      email:"", password:""
    }
  )

  let key, value;
  const handleInputs = (e) =>
  {
    key = e.target.name;
    value = e.target.value;
    setCred({ ...cred, [key]:value })
    console.log(cred)
  }

  const postData = async (e) =>
  {
    e.preventDefault();
    const { email, password } = cred;
    const res = await fetch('/signin',
    {
      method:'POST',
      headers:
      {
        'Content-Type' : 'application/json'
      },
      body: JSON.stringify(
        {
          email, password
        }
      )
    })

    const data = await res.json()
    if(data.status === 400 || !data)
    {
      console.log(data.error)
      window.alert('Invalid Credentials')
    }
    else
    {
      window.alert('Login Successful')
      history.push('/im')
    }
  }
  return (
    <>
            <div className='container bg-dark regis w-50 login'>
              <h1 className='text-monospace text-white text-center'><span className='fontfamabout'>L O G I N</span></h1>
              <form method='POST'>
                

                <div className='form-group'>
                  <label for='email' className='text-white'>Email:</label>
                  <input type='email' id='email' name='email' className='form-control' value={cred.email} onChange={handleInputs}></input>
                </div>

                

                <div className='form-group'>
                  <label for='password' className='text-white'>Password:</label>
                  <input type='password' id='password' name='password' className='form-control' value={cred.password} onChange={handleInputs}></input>
                </div>

               

                <input type='submit' name='login' className='btn text-white btn-secondary' onClick={postData}></input>
              </form>
            </div>
    </>
  )
}

export default Signin
