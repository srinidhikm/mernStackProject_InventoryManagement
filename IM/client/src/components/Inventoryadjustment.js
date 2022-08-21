import React, {useState, useEffect} from 'react'
import Axios from 'axios'
import { useParams } from 'react-router-dom';
import { useHistory } from 'react-router-dom';

import 'bootstrap/dist/css/bootstrap.css';

const Inventoryadjustment = () => {
  const {id} = useParams();
  const history = useHistory();

  const [itemname, setitemname] = useState("");
  const [unit, setunit] = useState("");
  const [sellingprice, setsellingprice] = useState("");
  const [costprice, setcostprice] = useState("");
  const [dimension, setdimension] = useState("");
  const [weight, setweight] = useState("");
  const [manufacturer, setmanufacturer] = useState("");
  const [brand, setbrand] = useState("");
  const [description, setdescription] = useState("");
  const [openingstock, setopeningstock] = useState("");
  const [reorderpoint, setreorderpoint] = useState("");
  const [quantity, setquantity] = useState("");
  const [preferredvendor, setpreferredvendor] = useState("");
  const [category, setcategory] = useState("");
  const [edate, setedate] = useState("");
  const [ereason, setereason] = useState("");


  useEffect(() =>
  {
    Axios.get('/edititem/'+id).then((response) =>
    {
      
      console.log(response.data)
      setitemname(response.data.itemname)
      setunit(response.data.unit)
      setsellingprice(response.data.sellingprice)
      setcostprice(response.data.costprice)
      setdimension(response.data.dimension)
      setweight(response.data.weight)
      setmanufacturer(response.data.manufacturer)
      setbrand(response.data.brand)
      setdescription(response.data.description)
      setopeningstock(response.data.openingstock)
      setreorderpoint(response.data.reorderpoint)
      setquantity(response.data.quantity)
      setpreferredvendor(response.data.preferredvendor)
      setcategory(response.data.category)
    })
  }, [])

 
 const editItem = async(e) =>
  {
    e.preventDefault();
    

    let result = await fetch(`/editthisitem/${id}`,
    {
      method: 'POST',
      headers:
      {
        'Content-Type' : 'application/json'
      },
      body: JSON.stringify(
        {
          itemname, unit, sellingprice, costprice, dimension, manufacturer, brand, description, weight, openingstock, reorderpoint, quantity, preferredvendor, category, edate, ereason
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
    <div className='container bg-dark additem w-85'>
      <h1 className='text-monospace text-white text-center'><span className='fontfamabout'>E D I T - I T E M</span></h1>
            <form>
  <div className="form-row align-items-center">
    <div className="col-sm-3 my-1">
      <label className="sr-only" htmlFor="inlineFormInputName"></label>
      <input type="text" className="form-control" id="inlineFormInputName" placeholder="Item Name" value={itemname} onChange={(e) => setitemname(e.target.value)} required/>
    </div>

    <div className="col-sm-3 my-1">
      <label className="sr-only" htmlFor="inlineFormInputName"></label>
      <input type="text" className="form-control" id="inlineFormInputName" placeholder="Unit" value={unit} onChange={(e) => setunit(e.target.value)} required/>
    </div>

    <div className="col-sm-3 my-1">
      <label className="sr-only" htmlFor="inlineFormInputName"></label>
      <input type="number" className="form-control" id="inlineFormInputName" placeholder="Selling Price" value={sellingprice} onChange={(e) => setsellingprice(e.target.value)} required/>
    </div>

    <div className="col-sm-3 my-1">
      <label className="sr-only" htmlFor="inlineFormInputName"></label>
      <input type="number" className="form-control" id="inlineFormInputName" placeholder="Cost Price" value={costprice} onChange={(e) => setcostprice(e.target.value)} required/>
    </div>

    <div className="col-sm-3 my-1">
      <label className="sr-only" htmlFor="inlineFormInputName"></label>
      <input type="text" className="form-control" id="inlineFormInputName" placeholder="Dimensions" value={dimension} onChange={(e) => setdimension(e.target.value)} required/>
    </div>

    <div className="col-sm-3 my-1">
      <label className="sr-only" htmlFor="inlineFormInputName"></label>
      <input type="text" className="form-control" id="inlineFormInputName" placeholder="Weight" value={weight} onChange={(e) => setweight(e.target.value)} required/>
    </div>

    <div className="col-sm-3 my-1">
      <label className="sr-only" htmlFor="inlineFormInputName"></label>
      <input type="text" className="form-control" id="inlineFormInputName" placeholder="Manufacturer" value={manufacturer} onChange={(e) => setmanufacturer(e.target.value)} required/>
    </div>

    <div className="col-sm-3 my-1">
      <label className="sr-only" htmlFor="inlineFormInputName"></label>
      <input type="text" className="form-control" id="inlineFormInputName" placeholder="Brand" value={brand} onChange={(e) => setbrand(e.target.value)} required/>
    </div>

    <div className="col-sm-3 my-1">
      <label className="sr-only" htmlFor="inlineFormInputName"></label>
      <input type="number" className="form-control" id="inlineFormInputName" placeholder="Opening Stock" value={openingstock} onChange={(e) => setopeningstock(e.target.value)} required/>
    </div>

    <div className="col-sm-3 my-1">
      <label className="sr-only" htmlFor="inlineFormInputName"></label>
      <input type="number" className="form-control" id="inlineFormInputName" placeholder="Reorder Point" value={reorderpoint} onChange={(e) => setreorderpoint(e.target.value)} required/>
    </div>

    <div className="col-sm-3 my-1">
      <label className="sr-only" htmlFor="inlineFormInputName"></label>
      <input type="number" className="form-control" id="inlineFormInputName" placeholder="Present Quantity" value={quantity} onChange={(e) => setquantity(e.target.value)} required/>
    </div>

    <div className="col-sm-3 my-1">
      <label className="sr-only" htmlFor="inlineFormInputName"></label>
      <input type="text" className="form-control" id="inlineFormInputName" placeholder="Category" value={category} onChange={(e) => setcategory(e.target.value)} required/>
    </div>

    <div className="col-sm-3 my-1">
      <label className="sr-only" htmlFor="inlineFormInputName"></label>
      <input type="text" className="form-control" id="inlineFormInputName" placeholder="Editted on (YYYY-MM-DD)" onChange={(e) => setedate(e.target.value)} required/>
    </div>

    <div className="col-sm-3 my-1">
      <label className="sr-only" htmlFor="inlineFormInputName"></label>
      <input type="text" className="form-control" id="inlineFormInputName" placeholder="Preferred Vendor" value={preferredvendor} onChange={(e) => setpreferredvendor(e.target.value)} />
    </div>
   
  </div>


  <div className="textarea">
    <label className="sr-only" htmlFor="comment"></label>
    <textarea className="form-control" rows="5" id="comment" placeholder="Item Description" value={description} onChange={(e) => setdescription(e.target.value)} required></textarea>
    </div>

    <div className="textarea">
    <label className="sr-only" htmlFor="comment"></label>
    <textarea className="form-control" rows="5" id="comment" placeholder="Reason for modification" onChange={(e) => setereason(e.target.value)} required></textarea>
    </div>


  <div className='mt-4'>
      <button type="submit" class="btn btn-secondary " onClick={editItem}>Edit Item</button>
    </div>
</form>
    </div>
  )
}

export default Inventoryadjustment
