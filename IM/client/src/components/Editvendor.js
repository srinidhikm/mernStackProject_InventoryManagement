import React, {useState, useEffect} from 'react'
import Axios from 'axios'
import { useParams } from 'react-router-dom';
import { useHistory } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.css';

const Editvendor = () => {

    const {id} = useParams();
    const history = useHistory();
    const [vendorname, setvendorname] = useState("");
    const [address, setaddress] = useState("");
    const [email, setemail] = useState("");
    const [vphno, setvphno] = useState("");

    useEffect(() =>
  {
    Axios.get('/editvendor/'+id).then((response) =>
    {
      
      console.log(response.data)
      setvendorname(response.data.vendorname)
      setaddress(response.data.address)
      setemail(response.data.email)
      setvphno(response.data.vphno)
    })
  }, [])

  const editItem = async(e) =>
  {
    e.preventDefault();
    

    let result = await fetch(`/editthisvend/${id}`,
    {
      method: 'POST',
      headers:
      {
        'Content-Type' : 'application/json'
      },
      body: JSON.stringify(
        {
            vendorname, address, email, vphno
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
      window.alert('Edited Successful')
      history.push('/im');
    }


  }

  return (
    <div className='container bg-dark regis w-50 login'>
              <h1 className='text-monospace text-white text-center'><span className='fontfamabout'>E D I T - V E N D O R</span></h1>
              <form>
                

                <div className='form-group'>
                  <label for='customername' className='text-white'>Name:</label>
                  <input type='text' id='customername' name='customername' className='form-control' value={vendorname}onChange={(e) => setvendorname(e.target.value)}></input>
                </div>

                

                <div className='form-group'>
                  <label for='address' className='text-white'>Address:</label>
                  <input type='text' id='address' name='address' className='form-control' value={address}onChange={(e) => setaddress(e.target.value)}></input>
                </div>


                <div className='form-group'>
                  <label for='email' className='text-white'>Email:</label>
                  <input type='email' id='email' name='email' className='form-control' value={email}onChange={(e) => setemail(e.target.value)}></input>
                </div>

                <div className='form-group'>
                  <label for='address' className='text-white'>Contact Number:</label>
                  <input type='text' id='address' name='address' className='form-control' value={vphno}onChange={(e) => setvphno(e.target.value)}></input>
                </div>

               

                <input type='submit' name='Edit' className='btn text-white btn-secondary' onClick={editItem}></input>
              </form>
            </div>
  )
}

export default Editvendor
