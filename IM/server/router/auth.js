const express = require('express');                     // Express provides a router
const router = express.Router();
const bcrypt = require('bcryptjs');
const authenticate = require("../middleware/authenticate")
const jwt = require('jsonwebtoken')
const cookieParser = require('cookie-parser')
const upload = require('../middleware/upload')


require('../db/conn');
const Users = require('../model/userSchema')            // Users has all the data
const AllItems = require('../model/itemSchema')
const Customers = require('../model/customerSchema')
const Salesorder = require('../model/salesSchema')
const Returns = require('../model/returns')
const Vendors = require('../model/vendorSchema')
const Purchases = require ('../model/purchaseSchema')

// SIGNUP
router.post('/signup', async (req, res) => 
{
    const{compname, email, phno, password, cpassword} = req.body;       // Fetching data entered into field variables
    if(!compname || !email || !phno || !password || !cpassword)
    {
        return res.status(422).json( { error: "Fill all the fields", status: 422});
    }
    try
    {
        const userExists = await Users.findOne({email:email});
        if(userExists)
        {
            return res.status(422).json({error: "Email already exists", status: 422});
        }
        else if(password != cpassword)
        {
            return res.status(422).json({error: "Passwords not matching", status: 422});
        }
        else
        {
            const user = new Users({compname, email, phno, password, cpassword});       // Creating new user
            // Hashing function will be called here
            const userRegister = await user.save();
            if(userRegister)
            {
                res.status(201).json({message:"User registered"});
            }
            else
            {
                res.status(500).json({error:"Failed to register"})
            }      
        }
        
    }
    catch (err)
    {
        console.log(err);
    }
})


//  SIGNIN
router.post('/signin', async (req, res) =>
{
    try
    {
        let token;
        const {email, password} = req.body;
        if(!email || !password)
        {
            return res.status(400).json({error:"Empty credentials", status:400})
        }
        const userLogin = await Users.findOne({email:email})
        if(userLogin)
        {
            const isMatch = await bcrypt.compare(password, userLogin.password)
            token = await userLogin.generateAuthToken();
            res.cookie('imtoken', token);
            if(!isMatch)
            {
                res.status(400).json({error:"Invalid credentials", status:400})
            }
            else
            {
                res.status(200).json({message:"Login successful", status:200})
            }
        }
        else
        {
            res.status(400).json({error:"Invalid credentials", status:400})
        }
    }
    catch(err)
    {
        console.log(err);
    }
})

router.use(cookieParser())
router.get('/im', authenticate, (req, res) =>
{
    console.log('IM')
    res.send(req.rootUser)
    //res.status(req.st).json(status:)
})

// ADD ITEMS
router.post('/additems', upload.single('itemimg'), async (req, res) => 
{
    const {itemname, unit, sellingprice, costprice, dimension, weight, manufacturer, brand, description, openingstock, reorderpoint, quantity, preferredvendor, category, edate, ereason} = req.body;       // Fetching data entered into field variables
    try
    {
       
       
       
            const item = new AllItems({itemname, unit, sellingprice, costprice, dimension, weight, manufacturer, brand, description, openingstock, reorderpoint, quantity, preferredvendor, category, edate, ereason});       // Creating new user
            if(req.file)
            {
                item.itemimg = req.file.path
            }
            const itemRegister = await item.save();
            if(itemRegister)
            {
                res.status(201).json({message:"Item registered"});
            }
            else
            {
                res.status(500).json({error:"Failed to register item"})
            }      
        
        
    }
    catch (err)
    {
        console.log(err);
    }
})

// EDIT ITEM
router.post('/editthisitem/:id', async (req, res) => 
{   
    console.log("inedit")
    const {itemname, unit, sellingprice, costprice, dimension, weight, manufacturer, brand, description, openingstock, reorderpoint, quantity, preferredvendor, category, edate, ereason} = req.body;       // Fetching data entered into field variables
    
    console.log(req.params.id)
    const itemid = req.params.id
    console.log("itemid"+itemid)
    try
    { const thisItem= await AllItems.updateOne(
                {
                    _id: itemid
                },
                {
                    $set:
                    {
                        itemname:itemname,
                        unit:unit,
                        sellingprice:sellingprice,
                        costprice:costprice,
                        dimension:dimension,
                        weight:weight,
                        manufacturer:manufacturer,
                        brand:brand,
                        description:description,
                        openingstock:openingstock,
                        reorderpoint:reorderpoint,
                        quantity:quantity,
                        preferredvendor:preferredvendor,
                        category:category,
                        edate:edate,
                        ereason:ereason
                    }
                }
            )
            console.log(thisItem)

            res.status(201).json({message:"Item registered"}); 
    }
    catch(err)
    {
        res.status(500).json({error:"Failed to register item"})
    }
    
  
    

           
})

//  LOGOUT
router.get('/dologout', (req,res) => 
{
    console.log('logout')
    res.clearCookie('imtoken', {path:'/'})
    res.status(200).send({message:"Logged out", status:200})
})


// ADD CUSTOMER
router.post('/addcustomer', async (req, res) => 
{
    const{customername, address, email, sales} = req.body;    
    try
    {
        const customerExists = await Customers.findOne({customername:customername});
        if(customerExists)
        {
            return res.status(422).json({error: "Customer already exists", status: 422});
        }
        else
        {
            const customer = new Customers({customername, address, email, sales});       // Creating new user
            const customerRegister = await customer.save();
            if(customerRegister)
            {
                res.status(201).json({message:"Customer registered"});
            }
            else
            {
                res.status(500).json({error:"Failed to register"})
            }      
        }
        
    }
    catch (err)
    {
        console.log(err);
    }
})


// EDIT CUSTOMER
router.post('/editthiscust/:id', async (req, res) => 
{   
    console.log("ineditcust")
    const {customername, address, email} = req.body;       // Fetching data entered into field variables
    
    console.log(req.params.id)
    const custid = req.params.id
    console.log("custmid"+custid)
    try
    { const thisItem= await Customers.updateOne(
                {
                    _id: custid
                },
                {
                    $set:
                    {
                        customername:customername,
                        address: address,
                        email: email
                    }
                }
            )
            console.log(thisItem)

            res.status(201).json({message:"Edited"}); 
    }
    catch(err)
    {
        res.status(500).json({error:"Failed to edit"})
    }
})
    
  
    // NEW SALES ORDER
router.post('/newsalesorder', async (req, res) => 
{
    const{customername, itemname, squantity, shipcost, sodate, status} = req.body;       // Fetching data entered into field variables

    try
    {
        const cdetails = await Customers.findOne({customername:customername});

        const idetails = await AllItems.findOne({itemname:itemname});
        const sq = parseInt(squantity)
        const quant = idetails.quantity - sq;
        console.log(quant)
        await AllItems.updateOne(
            {
                itemname:itemname
            },
            {
                $set:
                {
                    quantity: quant
                }
            }
        )

        const address = cdetails.address
        const cid = cdetails._id
        const sc = parseInt(shipcost)
        const amount = idetails.sellingprice * sq + sc
        const pamount = amount
       
            const salesorder = new Salesorder({customername, address, cid, itemname, squantity, shipcost, amount, pamount, sodate, status});       // Creating new user
            // Hashing function will be called here
            const soRegister = await salesorder.save();
            if(soRegister)
            {
                res.status(201).json({message:"Sales order registered"});
            }
            else
            {
                res.status(500).json({error:"Failed to register"})
            }      
        
        
    }
    catch (err)
    {
        console.log(err);
    }
})    


    // NEW RETURN
    router.post('/returnsb', async (req, res) => 
    {
        const{customername, itemname, rquantity, amountret, reasonret} = req.body;       // Fetching data entered into field variables
        console.log('in retirns')
    
        try
        {
            const cdetails = await Customers.findOne({customername:customername});
    
            const idetails = await AllItems.findOne({itemname:itemname});
            const q = parseInt(rquantity)
            const camountret = parseInt(amountret)
            const checkamount = idetails.sellingprice * q
            console.log(q)
            console.log(checkamount)
            console.log(camountret)
            console.log(cdetails)
           
            const setsales = cdetails.sales - camountret
            console.log(setsales)
            if(checkamount === camountret)
            {
                await AllItems.updateOne(
                    {
                        itemname:itemname
                    },
                    {
                        $inc:
                        {
                            quantity: rquantity
                        }
                    }
                )
    
                await Customers.updateOne(
                    {
                        customername:customername
                    },
                    {
                        $set:
                        {
                            sales: setsales
                        }
                    }
                )
        
                
               
                    const returns = new Returns({customername, itemname, rquantity, amountret, reasonret});       
                    
                    const sucRet = await returns.save();
                    if(sucRet)
                    {
                        res.status(201).json({message:"Returned"});
                    }
                    else
                    {
                        res.status(500).json({error:"Failed to return"})
                    }    
            }
            else
            {
                res.status(500).json({error:"Amount not returned properly"})
            }
              
            
            
        }
        catch (err)
        {
            console.log(err);
        }
    })    

    
    // ADD VENDOR
router.post('/addvendor', async (req, res) => 
{
    const{vendorname, address, email, vphno} = req.body;    
    try
    {
        const vendorExists = await Vendors.findOne({vendorname:vendorname});
        if(vendorExists)
        {
            return res.status(422).json({error: "Vendor already exists", status: 422});
        }
        else
        {
            const vendor = new Vendors({vendorname, address, email, vphno});       
            const vendorRegister = await vendor.save();
            if(vendorRegister)
            {
                res.status(201).json({message:"Vendor registered"});
            }
            else
            {
                res.status(500).json({error:"Failed to register"})
            }      
        }
        
    }
    catch (err)
    {
        console.log(err);
    }
})


// EDIT VENDOR
router.post('/editthisvend/:id', async (req, res) => 
{   
    console.log("ineditvend")
    const {vendorname, address, email, vphno} = req.body;       
    console.log(req.params.id)
    const vid = req.params.id
    console.log("vid"+vid)
    try
    { const thisVend= await Vendors.updateOne(
                {
                    _id: vid
                },
                {
                    $set:
                    {
                        vendorname:vendorname,
                        address: address,
                        email: email,
                        vphno:vphno
                    }
                }
            )
            console.log(thisVend)

            res.status(201).json({message:"Edited"}); 
    }
    catch(err)
    {
        res.status(500).json({error:"Failed to edit"})
    }
})


   // ADD PURCHASE
   router.post('/addpurchase', async (req, res) => 
   {
       const{vendorname, itemname, pquantity, purchamt} = req.body;    
       try
       {
           
               const purchase = new Purchases({vendorname, itemname, pquantity, purchamt});       
               const purchaseRegister = await purchase.save();
               if(purchaseRegister)
               {
                   res.status(201).json({message:"Purchase registered"});
               }
               else
               {
                   res.status(500).json({error:"Failed to register"})
               }      
           
           
       }
       catch (err)
       {
           console.log(err);
       }
   })

module.exports = router;