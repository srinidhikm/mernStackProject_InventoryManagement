import React, {useState, useEffect} from 'react'
import Axios from 'axios'
import 'bootstrap/dist/css/bootstrap.css';

const Totsalesorder = () => {

    const[name, setName] = useState([])
    useEffect(() =>
    {
      Axios.get('/totsalesorder').then((response) =>
      {
        setName(response.data);
        console.log(response.data)
      })
    }, [])

    const confirm = async (e) =>
    { e.preventDefault();
      console.log('confirm')
      const cit = e.target.name;
      
     const res = await fetch(`/incsales/${cit}`,
      {
        method:'GET'
        
      })
  
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
    
      }
      
    }




  return (
    <div className='container'>
    <h1 className='text-monospace text-white text-center'><span className='fontfamabout'>S A L E S - O R D E R S</span></h1>  

<div className="container itemtable">

    
  <table className="table table-dark ">
    <thead>
      <tr>
        <th>CUSTOMER NAME</th>
        <th>ITEM NAME</th>
        <th>QUANTITY</th> 
        <th>₹</th>  
        <th>STATUS</th>
        <th>ACTIONS</th>
        <th>CONFIRM PAYMENT</th>
          
      </tr>
    </thead>
    <tbody>
    { name.map( (val,key) =>
      {
        return(
      <tr>
        <td>{val.customername}</td>
        <td>{val.itemname}</td>
        <td>{val.squantity}</td>
        <td>{val.amount}</td>
        <td>{val.status}</td>

        <td>
        <a className='text-white' href={"/editsales/"+val.customername+'/'+val.itemname} >Edit Status</a>
        </td>

            <td>
            <input type='submit' value='Confirm' name={val._id} className='btn text-white btn-secondary' onClick={confirm}></input>
            </td>
        
        
      </tr>
            ) 
          } )
          }
    </tbody>

   
  </table>
</div>
          
     
    </div>
  )
}

export default Totsalesorder

