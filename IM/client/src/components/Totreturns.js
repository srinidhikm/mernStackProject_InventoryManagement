import React, {useState, useEffect} from 'react'
import Axios from 'axios'
import 'bootstrap/dist/css/bootstrap.css';

const Totreturns = () => {

    const[name, setName] = useState([])
    useEffect(() =>
    {
      Axios.get('/totreturns').then((response) =>
      {
        setName(response.data);
        console.log(response.data)
      })
    }, [])

  return (
    <div className='container'>
    <h1 className='text-monospace text-white text-center'><span className='fontfamabout'>R E T U R N S</span></h1>  

<div className="container itemtable">

    
  <table className="table table-dark ">
    <thead>
      <tr>
        <th>CUSTOMER NAME</th>
        <th>ITEM NAME</th>
        <th>QUANTITY</th> 
        <th>₹</th> 
        <th>REASON</th>   
      </tr>
    </thead>
    <tbody>
    { name.map( (val,key) =>
      {
        return(
      <tr>
        <td>{val.customername}</td>
        <td>{val.itemname}</td>
        <td>{val.rquantity}</td>
        <td>{val.amountret}</td>
        <td>{val.reasonret}</td>

        
        
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

export default Totreturns
