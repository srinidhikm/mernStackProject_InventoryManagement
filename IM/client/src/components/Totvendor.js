import React, {useState, useEffect} from 'react'
import Axios from 'axios'
import 'bootstrap/dist/css/bootstrap.css';


const Totvendor = () => {

    const[name, setName] = useState([])
    useEffect(() =>
    {
      Axios.get('/totvendors').then((response) =>
      {
        setName(response.data);
        console.log(response.data)
      })
    }, [])

    const delItem = async (e) =>
    { e.preventDefault();
      console.log('delCustcalled')
      const delit = e.target.name;
      
     const res = await fetch(`/delvendor/${delit}`,
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
    <h1 className='text-monospace text-white text-center'><span className='fontfamabout'>V E N D O R S</span></h1>  

<div className="container itemtable">

    
  <table className="table table-dark ">
    <thead>
      <tr>
        <th>VENDOR NAME</th>
        <th>ADDRESS</th>
        <th>EMAIL</th> 
        <th>CONTACT NUMBER</th>
        <th>ACTIONS</th>    
      </tr>
    </thead>
    <tbody>
    { name.map( (val,key) =>
      {
        return(
      <tr>
        <td>{val.vendorname}</td>
        <td>{val.address}</td>
        <td>{val.email}</td>
        <td>{val.vphno}</td>

        <td className='text-center'>
        <input type='button' name={val._id} value='Delete' className='btn text-white btn-secondary' onClick={delItem}></input><br></br>

        <a className='text-white' href={"/editvendor/"+val._id} >Edit</a>
   
        
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

export default Totvendor
