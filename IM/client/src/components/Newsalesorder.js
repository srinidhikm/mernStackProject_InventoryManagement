import React, {useState, useEffect} from 'react'
import 'bootstrap/dist/css/bootstrap.css';
import Axios from 'axios'
import { useHistory } from 'react-router-dom';

const Newsalesorder = () => {
    const history = useHistory();

    const[cdetails, setcdetails] = useState([])
    const[idetails, setidetails] = useState([])
    const[customername, setcustomername] = useState("")
    const[itemname, setitemname] = useState("")
    const[squantity, setsquantity] = useState("")
    const[shipcost, setshipcost] = useState("")
    const[sodate, setsodate] = useState("")
    const[status, setstatus] = useState("")

    useEffect(() =>
  {
    Axios.get('/totcustomers').then((response) =>
    {
      setcdetails(response.data);
      console.log(response.data)
    })
  }, [])

  useEffect(() =>
  {
    Axios.get('/totitems').then((response) =>
    {
        setidetails(response.data);
      console.log(response.data)
    })
  }, [])


  const postData = async (e) =>
  {
    e.preventDefault();
   
    const res = await fetch('/newsalesorder',
    {
      method:'POST',
      headers:
      {
        'Content-Type' : 'application/json'
      },
      body: JSON.stringify(
        {
            customername, itemname, squantity, shipcost, sodate, status
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
              <h1 className='text-monospace text-white text-center'><span className='fontfamabout'>N E W - S A L E S - O R D E R</span></h1>
              <form method='POST'>
                
                <div>
                <label className='text-white'>Customer Name:</label> 
              <select className="form-control" id="sel1" name="sellist1" onChange={(e) => setcustomername(e.target.value)}>
                 <option>Select</option>
                 {
             cdetails.map( (val, key) =>
                {
                 return(
                    
                 <option>{val.customername}</option>
               
                  )
             })
             }
      </select>
    </div>

    <div>
                <label className='text-white'>Item Name:</label> 
              <select className="form-control" id="sel1" name="sellist1" onChange={(e) => setitemname(e.target.value)}>
                 <option>Select</option>
                 {
             idetails.map( (val, key) =>
                {
                 return(
                    
                 <option>{val.itemname}</option>
               
                  )
             })
             }
      </select>
    </div>


         <div className='form-group'>
                  <label className='text-white'>Quantity:</label>
                  <input type='number' id='phno' name='phno' className='form-control' onChange={(e) => setsquantity(e.target.value)}></input>
         </div>


         <div className='form-group'>
                  <label for='quan' className='text-white'>Shipping cost:</label>
                  <input type='number' id='quan' name='quan' className='form-control' onChange={(e) => setshipcost(e.target.value)}></input>
         </div>

         <div className='form-group'>
                  <label for='date' className='text-white'>Date:</label>
                  <input type='text' id='date' name='date' className='form-control' onChange={(e) => setsodate(e.target.value)} placeholder='YYYY-MM-DD'></input>
         </div>

         <div className='form-group'>
                  <label for='st' className='text-white'>Status:</label>
                  
                  <select className="form-control" id="sel1" name="sellist1" onChange={(e) => setstatus(e.target.value)}>
                 <option>Select</option>
                 <option>Not confirmed</option>
                 <option>Confirmed</option>
                 <option>Invoiced</option>
                 <option>Shipped</option>
                 <option>Paymemt Received</option>
                 <option>Closed</option>
      </select>
                  
         </div>
         <input type='submit' name='newsales' className='btn text-white btn-secondary' onClick={postData}></input>

              </form>

    
            </div>

    </div>
  )
}

export default Newsalesorder
