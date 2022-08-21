import React, {useState, useEffect} from 'react'
import Axios from 'axios'
import 'bootstrap/dist/css/bootstrap.css';



const Totalitems = () => {


    const[name, setName] = useState([])
  useEffect(() =>
  {
    Axios.get('/totitems').then((response) =>
    {
      setName(response.data);
      console.log(response.data)
    })
  }, [])


  let itemimg;
  const sendImg = async (e) =>
  { e.preventDefault();
    console.log('sendImg called')
    itemimg = e.target.name;
   console.log(itemimg);

    
   const res = await fetch('/try',
    {
      method:'POST',
      headers:
      {
        'Content-Type' : 'application/json'
      },
      body: JSON.stringify(
        {
          itemimg
        }
      )
    })

  
  }



  const delItem = async (e) =>
  { e.preventDefault();
    console.log('delItemcalled')
    const delit = e.target.name;
    
   const res = await fetch(`/delitem/${delit}`,
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
      window.alert('Deleted Successful')
  
    }
    
  }

  return (
    <div className='container'>
    <h1 className='text-monospace text-white text-center'><span className='fontfamabout'>I T E M S</span></h1>  

<div className="container itemtable">

    
  <table className="table table-dark ">
    <thead>
      <tr>
        <th>ITEM NAME</th>
        <th>UNIT</th>
        <th>SELLING PRICE</th>
        <th>COST PRICE</th>
        <th>DIMENSION</th>
        <th>WEIGHT</th>
        <th>MANUFACTURER</th>
        <th>BRAND</th>
        <th>OPENING STOCK</th>
        <th>REORDER POINT</th>
        <th>QUANTITY</th>
        <th>CATEGORY</th>
        <th>STATUS</th>
        <th>ACTIONS</th>
        <th>IMAGE</th>
        <th>PREFERRED VENDOR</th>
        <th>DESCRIPTION</th>
       
        
      </tr>
    </thead>
    <tbody>
    { name.map( (val,key) =>
      {
        return(
      <tr>
        <td>{val.itemname}</td>
        <td>{val.unit}</td>
        <td>{val.sellingprice}</td>
        <td>{val.costprice}</td>
        <td>{val.dimension}</td>
        <td>{val.weight}</td>
        <td>{val.manufacturer}</td>
        <td>{val.brand}</td>
        <td>{val.openingstock}</td>
        <td>{val.reorderpoint}</td>
        <td>{val.quantity}</td>
        <td>{val.category}</td>
        <td>{(val.quantity>val.reorderpoint)?'In Stock':'Low Stock'}</td>
        <td className='text-center'><a className='text-white'  href={"/edititem/"+val._id} >Edit</a>
        <input type='button' name={val._id} value='Delete' className='btn text-white btn-secondary' onClick={delItem}></input>
        </td>
        <td><input type='button' name={val.itemimg} value='Fetch Image' className='btn text-white btn-secondary' onClick={sendImg}></input>
        <a className='text-white' rel="noopener noreferrer" href="http://localhost:5000/image" target="_blank">View here</a></td>
        <td>{val.preferredvendor}</td>
        <td>{val.description}</td>
        
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

export default Totalitems
