import React, {useEffect} from 'react'
import 'bootstrap/dist/css/bootstrap.css';
import { useHistory } from 'react-router-dom';
import Addcustomercomp from './Addcustomercomp';

const Addcustomer = () => {

    const history = useHistory()
  

    const callIm = async () =>
    {
    
      try
      {
         const res = await fetch('/im', 
          {
            method: 'GET',
            headers:
            {
              Accept: 'application/json',
              'Content-Type': 'application/json'
            },
            credentials: 'include'
          })
          console.log('outside try')
          console.log(res.status)
          if(res.status === 200)
          {
            console.log('inside 200')
            console.log(res.status)
            
          }
          else if(res.status === 401)
          {
            console.log('inside 401')
            throw new Error('User not found')
          }
      }
      catch(err)
      {
        console.log('inside catch')
        console.log(err);
        history.push('/signin')
        
      }
    }
  
  useEffect( () => 
  {
    callIm();
  }, [])

  return (
    <div>
      <Addcustomercomp/>
    </div>
  )
}

export default Addcustomer
