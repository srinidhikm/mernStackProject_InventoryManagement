import React, {useState, useEffect} from 'react'
import 'bootstrap/dist/css/bootstrap.css';
import { useHistory } from 'react-router-dom';
import Axios from 'axios'


const Additemcomp = () => {

  const history = useHistory();
  const [itemimg, setitemimg] = useState("");
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
  
  const[cname, setCname] = useState([])
  useEffect(() =>
  {
    Axios.get('/distinctcat').then((response) =>
    {
      setCname(response.data);
      console.log(response.data)
    })
  }, [])
  
  async function addItem()
  {
    const formData = new FormData();
    formData.append('itemname', itemname);
    formData.append('unit', unit);
    formData.append('sellingprice', sellingprice);
    formData.append('costprice', costprice);
    formData.append('dimension', dimension);
    formData.append('manufacturer', manufacturer);
    formData.append('brand', brand);
    formData.append('description', description);
    formData.append('weight', weight);
    formData.append('openingstock', openingstock);
    formData.append('reorderpoint', reorderpoint);
    formData.append('quantity', quantity);
    formData.append('preferredvendor', preferredvendor);
    formData.append('category', category);
    formData.append('itemimg', itemimg);

    let result = await fetch('/additems',
    {
      method: 'POST',
      body: formData
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
      window.alert('Registration Successful')
      history.push('/im');
    }
  }

  return (
    <div className='container bg-dark additem w-85'>
      <h1 className='text-monospace text-white text-center'><span className='fontfamabout'>A D D I T E M</span></h1>
            <form>
  <div className="form-row align-items-center">
    <div className="col-sm-3 my-1">
      <label className="sr-only" htmlFor="inlineFormInputName"></label>
      <input type="text" className="form-control" id="inlineFormInputName" placeholder="Item Name" onChange={(e) => setitemname(e.target.value)} required/>
    </div>

    <div className="col-sm-3 my-1">
      <label className="sr-only" htmlFor="inlineFormInputName"></label>
      <input type="text" className="form-control" id="inlineFormInputName" placeholder="Unit" onChange={(e) => setunit(e.target.value)} required/>
    </div>

    <div className="col-sm-3 my-1">
      <label className="sr-only" htmlFor="inlineFormInputName"></label>
      <input type="number" className="form-control" id="inlineFormInputName" placeholder="Selling Price" onChange={(e) => setsellingprice(e.target.value)} required/>
    </div>

    <div className="col-sm-3 my-1">
      <label className="sr-only" htmlFor="inlineFormInputName"></label>
      <input type="number" className="form-control" id="inlineFormInputName" placeholder="Cost Price" onChange={(e) => setcostprice(e.target.value)} required/>
    </div>

    <div className="col-sm-3 my-1">
      <label className="sr-only" htmlFor="inlineFormInputName"></label>
      <input type="text" className="form-control" id="inlineFormInputName" placeholder="Dimensions" onChange={(e) => setdimension(e.target.value)} required/>
    </div>

    <div className="col-sm-3 my-1">
      <label className="sr-only" htmlFor="inlineFormInputName"></label>
      <input type="text" className="form-control" id="inlineFormInputName" placeholder="Weight" onChange={(e) => setweight(e.target.value)} required/>
    </div>

    <div className="col-sm-3 my-1">
      <label className="sr-only" htmlFor="inlineFormInputName"></label>
      <input type="text" className="form-control" id="inlineFormInputName" placeholder="Manufacturer" onChange={(e) => setmanufacturer(e.target.value)} required/>
    </div>

    <div className="col-sm-3 my-1">
      <label className="sr-only" htmlFor="inlineFormInputName"></label>
      <input type="text" className="form-control" id="inlineFormInputName" placeholder="Brand" onChange={(e) => setbrand(e.target.value)} required/>
    </div>

    <div className="col-sm-3 my-1">
      <label className="sr-only" htmlFor="inlineFormInputName"></label>
      <input type="number" className="form-control" id="inlineFormInputName" placeholder="Opening Stock" onChange={(e) => setopeningstock(e.target.value)} required/>
    </div>

    <div className="col-sm-3 my-1">
      <label className="sr-only" htmlFor="inlineFormInputName"></label>
      <input type="number" className="form-control" id="inlineFormInputName" placeholder="Reorder Point" onChange={(e) => setreorderpoint(e.target.value)} required/>
    </div>

    <div className="col-sm-3 my-1">
      <label className="sr-only" htmlFor="inlineFormInputName"></label>
      <input type="number" className="form-control" id="inlineFormInputName" placeholder="Present Quantity" onChange={(e) => setquantity(e.target.value)} required/>
    </div>

    <div className="col-sm-3 my-1">
      <label className="sr-only" htmlFor="inlineFormInputName"></label>
      <input type="text" className="form-control" id="inlineFormInputName" placeholder="Category ( Scroll down for list )" onChange={(e) => setcategory(e.target.value)} required/>
    </div>
    

    <div className="col-sm-3 my-1">
      <label className="sr-only" htmlFor="inlineFormInputName"></label>
      <input type="text" className="form-control" id="inlineFormInputName" placeholder="Preferred Vendor" onChange={(e) => setpreferredvendor(e.target.value)} />
    </div>
   
  </div>


  <div className="textarea">
    <label className="sr-only" htmlFor="comment"></label>
    <textarea className="form-control" rows="5" id="comment" placeholder="Item Description" onChange={(e) => setdescription(e.target.value)}></textarea>
    </div>

    <div className="form-group mt-3">
    <label htmlFor="exampleFormControlFile1" className='text-white'>IMAGE: Only jpg, jpeg, png formats allowed</label>
    <input type="file" className="form-control-file text-white" id="exampleFormControlFile1" name='itemimg' onChange={(e) => setitemimg(e.target.files[0])} required/>
  </div>


  <div className='mt-4'>
      <button type="submit" class="btn btn-secondary " onClick={addItem}>Add Item</button>
    </div>
</form>

<div class="card mt-5 w-50">
  <div class="card-body text-center">CATEGORY-LIST</div>
  <p className='text-center'>You can copy category from here and paste in the category field to be accurate or you can type a new category in the category field.</p>
  <ul class="list-group text-center">

  {
        cname.map( (val) =>
        {
          return(
            <li className="list-group-item">{val}</li>
          )
        })
       }

</ul>
</div>

    </div>
  )
}

export default Additemcomp
