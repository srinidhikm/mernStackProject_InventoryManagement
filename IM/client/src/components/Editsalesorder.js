import React, {useState, useEffect} from 'react'
import 'bootstrap/dist/css/bootstrap.css';
import { useParams } from 'react-router-dom';
import Axios from 'axios'
import { useHistory } from 'react-router-dom';

const Editsalesorder = () => {
    const {id, iid} = useParams();
   
    const history = useHistory();
    const[sales, setsales] = useState([])
    const[status, setstatus] = useState("")

    
  useEffect(() =>
  {
    Axios.get('/editsales/'+id+'/'+iid).then((response) =>
    {
      
      console.log(id+" "+iid)
        setsales(response.data)
      setstatus(response.data.status)
    })
  }, [])

  const editsales= async(e) =>
  {
    e.preventDefault();
    

    let result = await fetch(`/editthissales/${id}/${iid}`,
    {
      method: 'POST',
      headers:
      {
        'Content-Type' : 'application/json'
      },
      body: JSON.stringify(
        {
          status
        }
      )
    })

    const data = await result.json();
    if(data.status === 500)
    {
      console.log(data.error);
      const str= JSON.stringify(data.error)
      window.alert(str);
    }
    else
    {
      window.alert('Editted Successful')
      history.push('/im');
    }


  }

  return (
    <div>
      
      <div className='container bg-dark regis w-50'>
              <h1 className='text-monospace text-white text-center'><span className='fontfamabout'>E D I T - S A L E S - O R D E R</span></h1>
              <form>
              <div className='form-group'>
                  <label className='text-white'>Customer name:</label>
                  <input type='text' id='phno' name='phno' className='form-control' value={sales.customername} ></input>
         </div>

         <div className='form-group'>
                  <label className='text-white'>Item Name:</label>
                  <input type='text' id='phno' name='phno' className='form-control' value={sales.itemname} ></input>
         </div>


         <div className='form-group'>
                  <label className='text-white'>Quantity:</label>
                  <input type='number' id='phno' name='phno' className='form-control' value={sales.squantity} ></input>
         </div>


         <div className='form-group'>
                  <label for='quan' className='text-white'>Shipping cost:</label>
                  <input type='number' id='quan' name='quan' className='form-control' value={sales.shipcost}></input>
         </div>

         <div className='form-group'>
                  <label for='date' className='text-white'>Date:</label>
                  <input type='text' id='date' name='date' className='form-control' value={sales.sodate} placeholder='YYYY-MM-DD'></input>
         </div>

         <div className='form-group'>
                  <label for='st' className='text-white'>Status:</label>
                  
                  <select className="form-control" id="sel1" name="sellist1" value={status} onChange={(e) => setstatus(e.target.value)}>
                 <option>{status}</option>
                 <option>Not confirmed</option>
                 <option>Confirmed</option>
                 <option>Invoiced</option>
                 <option>Shipped</option>
                 <option>Paymemt Received</option>
                 <option>Close</option>
      </select>
                  
         </div>
         <input type='submit' name='newsales' className='btn text-white btn-secondary' value='Edit Status' onClick={editsales}></input>

              </form>

    
            </div>

    </div>
  )
}

export default Editsalesorder
