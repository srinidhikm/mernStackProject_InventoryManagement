import React, {useState, useEffect} from 'react'
import 'bootstrap/dist/css/bootstrap.css';
import { useHistory } from 'react-router-dom';
import Axios from 'axios'

const Addpurchase = () => {

    const history = useHistory();
    const[vendorname, setvendorname] = useState("")
    const[itemname, setitemname] = useState("")
    const[pquantity, setpquantity] = useState("")
    const[purchamt, setpurchamt] = useState("")

    const[vdetails, setvdetails] = useState([]) 

    useEffect(() =>
    {
      Axios.get('/totvendors').then((response) =>
      {
        
      
        setvdetails(response.data)
        
      })
    }, [])

  
    const postData = async (e) =>
    {
      e.preventDefault();
     
      const res = await fetch('/addpurchase',
      {
        method:'POST',
        headers:
        {
          'Content-Type' : 'application/json'
        },
        body: JSON.stringify(
          {
            vendorname, itemname, pquantity, purchamt
          }
        )
      });
  
      const data = await res.json();
      if(data.status === 500)
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
              <h1 className='text-monospace text-white text-center'><span className='fontfamabout'>A D D - P U R C H A S E</span></h1>
              <form>
              <div>
                <label className='text-white'>Vendor Name:</label> 
              <select className="form-control" id="sel1" name="sellist1" onChange={(e) => setvendorname(e.target.value)}>
                 <option>Select</option>
                 {
             vdetails.map( (val, key) =>
                {
                 return(
                    
                 <option>{val.vendorname}</option>
               
                  )
             })
             }
      </select>
    </div>
         
    <div className='form-group'>
                  <label className='text-white'>Item Name:</label>
                  <input type='text' id='phno' name='phno' className='form-control' onChange={(e) => setitemname(e.target.value)}></input>
         </div>

         
         <div className='form-group'>
                  <label className='text-white'>Quantity:</label>
                  <input type='number' id='phno' name='phno' className='form-control' onChange={(e) => setpquantity(e.target.value)}></input>
         </div>

         <div className='form-group'>
                  <label className='text-white'>Purchase Amount:</label>
                  <input type='text' id='phno' name='phno' className='form-control' onChange={(e) => setpurchamt(e.target.value)}></input>
         </div>

        
         <input type='submit' name='newsales' className='btn text-white btn-secondary' value='Add' onClick={postData}></input>

              </form>

    
            </div>

    </div>
  )
}

export default Addpurchase
