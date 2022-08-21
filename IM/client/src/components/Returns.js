import React, {useState, useEffect} from 'react'
import 'bootstrap/dist/css/bootstrap.css';
import Axios from 'axios'
import { useHistory } from 'react-router-dom';

const Returns = () => {

    const history = useHistory();
    const[cdetails, setcdetails] = useState([])
    const[idetails, setidetails] = useState([])
    const[customername, setcustomername] = useState("")
    const[itemname, setitemname] = useState("")
    const[rquantity, setrquantity] = useState("")
    const[amountret, setamountret] = useState("")
    const[reasonret, setreasonret] = useState("")

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
     console.log('in post data')
      const res = await fetch('/returnsb',
      {
        method:'POST',
        headers:
        {
          'Content-Type' : 'application/json'
        },
        body: JSON.stringify(
          {
              customername, itemname, rquantity, amountret, reasonret 
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
        window.alert('Successful')
        history.push('/im'); 
      }
    }

  return (
    <div>
      
      <div className='container bg-dark regis w-50'>
              <h1 className='text-monospace text-white text-center'><span className='fontfamabout'>R E T U R N S</span></h1>
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
                  <input type='number' id='phno' name='phno' className='form-control' onChange={(e) => setrquantity(e.target.value)}></input>
         </div>


         <div className='form-group'>
                  <label for='quan' className='text-white'>Payment Returned:</label>
                  <input type='number' id='quan' name='quan' className='form-control' onChange={(e) => setamountret(e.target.value)}></input>
         </div>

         <div className='form-group'>
                  <label for='date' className='text-white'>Reason:</label>
                  <input type='text' id='date' name='date' className='form-control' onChange={(e) => setreasonret(e.target.value)} ></input>
         </div>

         <input type='submit' name='returns' className='btn text-white btn-secondary' onClick={postData}></input>

              </form>

    
            </div>

    </div>
  )
}

export default Returns
