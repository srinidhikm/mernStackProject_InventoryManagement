import React, {useState, useEffect} from 'react'
import Axios from 'axios'
import 'bootstrap/dist/css/bootstrap.css';

const Itemgroups = () => {

  const[name, setName] = useState([])
  const[cname, setCname] = useState([])
  const [id, setid] = useState("");

  useEffect(() =>
  {
    Axios.get('/distinctcat').then((response) =>
    {
      setName(response.data);
      console.log(response.data)
    })
  }, [])

  const bycategory = async(e) =>
  {
    e.preventDefault();

    Axios.get('/distinctcat/'+id).then((response) =>
    {
      setCname(response.data);
      console.log(response.data)
    })
   
  }

  return (
 
    <div>

    <div className='container'>
    <h1 className='text-monospace text-white text-center'><span className='fontfamabout'>F E T C H - B Y - C A T E G O R Y</span></h1>  
    <div className="container form-inline">
    <div className="form-group padleflarge">
      <label for="sel1"></label>
      
      <select className="form-control" id="sel1" name="sellist1" onChange={(e) => setid(e.target.value)}>
      <option>Select</option>
       {
        name.map( (val) =>
        {
          return(
            <option>{val}</option>
          )
        })
       }
      </select>

    
    <button type="submit" className="btn btn-secondary ml-4" onClick={bycategory}>Search</button> <br></br>
    </div>
</div>
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
    <th>CATEGORY</th>
    
  </tr>
</thead>
<tbody>
{ cname.map( (val,key) =>
  {
    return(
  <tr>
    <td>{val.itemname}</td>
    <td>{val.sellingprice}</td>
    <td>{val.manufacturer}</td>
    <td>{val.brand}</td>
    <td>{val.quantity}</td>
    <td>{(val.quantity>val.reorderpoint)?'In Stock':'Low Stock'}</td>
    <td>{val.category}</td>
    
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

export default Itemgroups
