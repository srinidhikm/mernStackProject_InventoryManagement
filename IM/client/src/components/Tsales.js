import React, {useState, useEffect} from 'react'
import 'bootstrap/dist/css/bootstrap.css';
import Axios from 'axios'

const Tsales = () => {

    const [totsales, settotsales] = useState("");

    useEffect(() =>
    {
      Axios.get('/totsalesamt').then((response) =>
      {
        
        console.log(response.data)
        settotsales(response.data.tots)
       
      })
    }, [])

  return (
    <div>
      
      <div class="container w-25 text-center mt-5 mb-5">

  <div class="card">
    <div class="card-header"><h2>TOTAL SALES</h2></div>
    <div class="card-body"><h2>₹{totsales}</h2></div> 
   
  </div>
</div>
    </div>
  )
}

export default Tsales
