import React, {useState, useEffect} from 'react'
import Axios from 'axios'
import 'bootstrap/dist/css/bootstrap.css';

const Totpurchase = () => {

    const[name, setName] = useState([])
    useEffect(() =>
    {
      Axios.get('/totpurchase').then((response) =>
      {
        setName(response.data);
        console.log(response.data)
      })
    }, [])
  return (
    <div className='container'>
    <h1 className='text-monospace text-white text-center'><span className='fontfamabout'>P U R C H A S E S</span></h1>  

<div className="container itemtable">

    
  <table className="table table-dark ">
    <thead>
      <tr>
        <th>VENDOR NAME</th>
        <th>ITEM NAME</th>
        <th>QUANTITY</th> 
        <th>PURCHASE AMOUNT</th>    
      </tr>
    </thead>
    <tbody>
    { name.map( (val,key) =>
      {
        return(
      <tr>
        <td>{val.vendorname}</td>
        <td>{val.itemname}</td>
        <td>{val.pquantity}</td>
        <td>{val.purchamt}</td>

         
        
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

export default Totpurchase
