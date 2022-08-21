import React, {useState, useEffect} from 'react'
import Axios from 'axios'
import 'bootstrap/dist/css/bootstrap.css';

const Editsdash = () => {

    
    const[name, setName] = useState([])
    const[bdname, setBdname] = useState([])
    const [id, setid] = useState("");
  useEffect(() =>
  {
    Axios.get('/editteditems').then((response) =>
    {
      setName(response.data);
      console.log(response.data)
    })
  }, [])

  const bydate = async(e) =>
  {
    e.preventDefault();

    Axios.get('/editteditems/'+id).then((response) =>
    {
      setBdname(response.data);
      console.log(response.data)
    })
   
  }

  return (
    <div>
    <div className='container'>
    <h1 className='text-monospace text-white text-center'><span className='fontfamabout'>E D I T E D - I T E M S</span></h1>  

<div className="container itemtable">

    
  <table className="table table-dark ">
    <thead>
      <tr>
        <th>ITEM NAME</th>
        <th>SELLING PRICE</th>
        <th>MANUFACTURER</th>
        <th>BRAND</th>
        <th>QUANTITY</th>
        <th>STATUS</th>
        <th>EDITED ON</th>
        <th>REASON</th>
        
      </tr>
    </thead>
    <tbody>
    { name.map( (val,key) =>
      {
        return(
      <tr>
        <td>{val.itemname}</td>
        <td>{val.sellingprice}</td>
        <td>{val.manufacturer}</td>
        <td>{val.brand}</td>
        <td>{val.quantity}</td>
        <td>{(val.quantity>val.reorderpoint)?'In Stock':'Low Stock'}</td>
        <td>{val.edate}</td>
        <td>{val.ereason}</td>
        
      </tr>
            ) 
          } )
          }
    </tbody>

   
  </table>
</div>
     
    </div>

<div className='container'>
    <div class="form-inline padleftmore" >
<h1 className='text-monospace text-white '><span className='fontfamabout'>E D I T E D - I T E M S - B Y - D A T E</span></h1>  
<div className="col-sm-3 my-1 text-center">
      <label className="sr-only col-sm-3 my-1" htmlFor="inlineFormInputName"></label>
      <input type="text" className="form-control" id="inlineFormInputName" placeholder="Edited on (YYYY-MM-DD)" onChange={(e) => setid(e.target.value)} required/>
    </div> 


      <button type="submit" class="btn btn-secondary " onClick={bydate}>Search</button>
    
    </div>   

<div className="container itemtable">


<table className="table table-dark ">
<thead>
  <tr>
    <th>ITEM NAME</th>
    <th>SELLING PRICE</th>
    <th>MANUFACTURER</th>
    <th>BRAND</th>
    <th>QUANTITY</th>
    <th>STATUS</th>
    <th>EDITED ON</th>
    <th>REASON</th>
    
  </tr>
</thead>
<tbody>
{ bdname.map( (val,key) =>
  {
    return(
  <tr>
    <td>{val.itemname}</td>
    <td>{val.sellingprice}</td>
    <td>{val.manufacturer}</td>
    <td>{val.brand}</td>
    <td>{val.quantity}</td>
    <td>{(val.quantity>val.reorderpoint)?'In Stock':'Low Stock'}</td>
    <td>{val.edate}</td>
    <td>{val.ereason}</td>
    
  </tr>
        ) 
      } )
      }
</tbody>


</table>
</div>
  
 
</div>
</div>


  )
}

export default Editsdash
