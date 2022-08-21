const express = require('express');
const router = express.Router();
require('../db/conn');
const AllItems = require('../model/itemSchema')
const Customers = require('../model/customerSchema')
const Salesorder = require('../model/salesSchema')
const Returns = require('../model/returns')
const Vendors = require('../model/vendorSchema')
const Purchases = require('../model/purchaseSchema')

router.get('/totitems', async (req, res) =>
{
    AllItems.find({}, (err, result) => 
    {
        if(err)
        {
            res.send(err)
        }
        res.send(result)
    })
})

global.img
router.post('/try', async (req, res) => 
{
    const {itemimg} = req.body; 
    console.log('postry')      // Fetching data entered into field variables
    console.log(itemimg)

    const imgOw = await AllItems.findOne({itemimg:itemimg})
    
        if(imgOw)
        {
            img=imgOw.itemimg
            console.log(img)
            
        }
    

})



router.get('/image', async (req, res) =>
{
    console.log('getimg')
    console.log(img)
    res.render('sendimage',
        {
            itemimg:img
        })
})


router.get('/edititem/:id', async (req, res, next) =>
{   
    console.log(req.params.id)


   AllItems.findById(req.params.id).then(result =>
    {   
        res.send(result)
    }).catch(err =>
        {
            console.log(err)
            res.status(500)
        })
    

})

// DELETE ITEM
router.get('/delitem/:id', async (req, res, next) =>
{   
    const id = req.params.id
    console.log(id)
    try
    {
        const del = await AllItems.deleteOne({_id: id});
        res.status(201).json({message:"Item Deleted"}); 
    }
    catch(err)
    {
        console.log(err);
        res.status(500).json({error:"Failed to delete item"})
    }

})

// FIND EDITTED ITEMS
router.get('/editteditems', async (req, res) =>
{
    AllItems.find({edate:{$exists : true}}, (err, result) => 
    {
        if(err)
        {
            res.send(err)
        }
        res.send(result)
    })
})

// FIND EDITTED ITEMS BY DATE
router.get('/editteditems/:id', async (req, res) =>
{   
    const date = req.params.id
    console.log(date)
    AllItems.find({edate:{$gte : new Date(date)}}, (err, result) => 
    {
        if(err)
        {
            res.send(err)
        }
        res.send(result)
    })
})

// FIND DISTICT CATEGORIES
router.get('/distinctcat', async (req, res) =>
{
    AllItems.distinct('category', (err, result) => 
    {
        if(err)
        {
            res.send(err)
        }
        res.send(result)
    })
})

// FETCH BY CATEGORY
router.get('/distinctcat/:id', async (req, res) =>
{   
    const categ = req.params.id
    console.log(categ)
    AllItems.find({category:categ}, (err, result) => 
    {
        if(err)
        {
            res.send(err)
        }
        res.send(result)
    })
})

// FETCH ALL CUSTOMER DETAILS
router.get('/totcustomers', async (req, res) =>
{
    Customers.find({}, (err, result) => 
    {
        if(err)
        {
            res.send(err)
        }
        res.send(result)
    })
})

// DELETE CUSTOMER
router.get('/delcustomer/:id', async (req, res, next) =>
{   
    const id = req.params.id
    console.log(id)
    try
    {
        const del = await Customers.deleteOne({_id: id});
        res.status(201).json({message:"Customer Deleted"}); 
    }
    catch(err)
    {
        console.log(err);
        res.status(500).json({error:"Failed to delete customer"})
    }

})

// EDIT CUSTOMER
router.get('/editcustomer/:id', async (req, res, next) =>
{   
    console.log(req.params.id)


   Customers.findById(req.params.id).then(result =>
    {   
        res.send(result)
    }).catch(err =>
        {
            console.log(err)
            res.status(500)
        })
    

})

// EDIT VENDOR
router.get('/editvendor/:id', async (req, res, next) =>
{   
    console.log(req.params.id)


   Vendors.findById(req.params.id).then(result =>
    {   
        res.send(result)
    }).catch(err =>
        {
            console.log(err)
            res.status(500)
        })
    

})

// DELETE VENDOR
router.get('/delvendor/:id', async (req, res, next) =>
{   
    const id = req.params.id
    console.log(id)
    try
    {
        const del = await Vendors.deleteOne({_id: id});
        res.status(201).json({message:"Vendor Deleted"}); 
    }
    catch(err)
    {
        console.log(err);
        res.status(500).json({error:"Failed to delete vendor"})
    }

})

// EDIT SALES
router.get('/editsales/:id/:iid', async (req, res, next) =>
{   
    console.log(req.params.id)
    const id = req.params.id
    const iid = req.params.iid

    const idetails = await Salesorder.findOne({customername:id, itemname:iid});

   if(idetails)
   {
        res.send(idetails);
   }
   else
   {
     res.status(400)
   }
    

})

// EDIT SALES STATUS
router.post('/editthissales/:id/:iid', async (req, res) => 
{   
    console.log("ineditcust")
    const {status} = req.body;       // Fetching data entered into field variables
    
    console.log(req.params.id)
    const cust = req.params.id
    const itm = req.params.iid
    try
    { const thisItem= await Salesorder.updateOne(
                {
                    customername: cust,
                    itemname: itm
                },
                {
                    $set:
                    {
                        status:status
                    }
                }
            )
            

            res.status(201).json({message:"Edited"}); 
    }
    catch(err)
    {
        res.status(500).json({error:"Failed to edit"})
    }
})

// INC SALES
router.get('/incsales/:id', async (req, res) => 
{   
    console.log("incsales")
    
    console.log(req.params.id)
    const id = req.params.id
    const amt = await Salesorder.findById(req.params.id);
    const incby = amt.pamount
    const cust = amt.customername
    console.log(incby);
    console.log(amt.status)
    if(amt.status === 'Paymemt Received')
    {
        console.log(amt.status)
        try
    { const thisCust= await Customers.updateOne(
                {
                    customername: cust
                },
                {
                    $inc:
                    {
                        sales:incby
                    }
                }
            )
            

            res.status(201).json({message:"Edited"}); 
    }
    catch(err)
    {
        res.status(500).json({error:"Failed to edit"})
    }

    try
    { const thisSale= await Salesorder.updateOne(
                {
                    _id:id
                },
                {
                    $set:
                    {
                        pamount: 0,
                        status: 'Close'
                    }
                }
            )
            

            
    }
    catch(err)
    {
        console.log(err)
    }

    }

    
})

router.get('/totsalesorder', async (req, res) =>
{
    Salesorder.find({}, (err, result) => 
    {
        if(err)
        {
            res.send(err)
        }
        res.send(result)
    })
})

router.get('/totreturns', async (req, res) =>
{
    Returns.find({}, (err, result) => 
    {
        if(err)
        {
            res.send(err)
        }
        res.send(result)
    })
})

router.get('/totvendors', async (req, res) =>
{
    Vendors.find({}, (err, result) => 
    {
        if(err)
        {
            res.send(err)
        }
        res.send(result)
    })
})

router.get('/totpurchase', async (req, res) =>
{
    Purchases.find({}, (err, result) => 
    {
        if(err)
        {
            res.send(err)
        }
        res.send(result)
    })
})

router.get('/totsalesamt', async (req, res) =>
{
  const totsales = await Customers.aggregate([{$group : {_id : null, tot : {$sum : "$sales"}}}])

  
  const tots = totsales[0].tot
    console.log(tots)
    res.json({tots}); 
})

module.exports = router;