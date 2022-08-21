import React from 'react'
import { Route } from 'react-router-dom'
import './App.css'
import Navbar from './components/Navbar'
import Home from './components/Home'
import Aboutus from './components/Aboutus'
import Signup from './components/Signup'
import Signin from './components/Signin'
import Im from './components/Im'
import Navbartwo from './components/Navbartwo'
import Additems from './components/Additems'
import Itemgroups from './components/Itemgroups'
import Inventoryadjustment from './components/Inventoryadjustment'
import Logout from './components/Logout'
import Editsdash from './components/Editsdash'
import Addcustomer from './components/Addcustomer'
import Editcustomer from './components/Editcustomer'
import Newsalesorder from './components/Newsalesorder'
import Editsalesorder from './components/Editsalesorder'
import Returns from './components/Returns'
import Addvendor from './components/Addvendor'
import Editvendor from './components/Editvendor'
import Addpurchase from './components/Addpurchase'


const App = () => {

  return (
    <>
      
      <Route exact path='/'><Navbar/><Home/></Route>
      <Route exact path='/aboutus'><Navbar/><Aboutus/></Route>
      <Route exact path='/signup'><Navbar/><Signup/></Route>
      <Route exact path='/signin'><Navbar/><Signin/></Route> 
      <Route exact path='/im'><Navbartwo/><Im/></Route>
      <Route exact path='/additems'><Navbartwo/><Additems/></Route>
      <Route exact path='/itemgroups'><Navbartwo/><Itemgroups/></Route>
      <Route exact path='/editsdash'><Navbartwo/><Editsdash/></Route>
      <Route exact path='/edititem/:id'><Navbartwo/><Inventoryadjustment/></Route>
      <Route exact path='/logout'><Navbar/><Logout/></Route>
      <Route exact path='/addcustomer'><Navbartwo/><Addcustomer/></Route>
      <Route exact path='/editcustomer/:id'><Navbartwo/><Editcustomer/></Route>
      <Route exact path='/editsales/:id/:iid'><Navbartwo/><Editsalesorder/></Route>
      <Route exact path='/newsalesorder'><Navbartwo/><Newsalesorder/></Route>
      <Route exact path='/returns'><Navbartwo/><Returns/></Route>
      <Route exact path='/addvendor'><Navbartwo/><Addvendor/></Route>
      <Route exact path='/editvendor/:id'><Navbartwo/><Editvendor/></Route>
      <Route exact path='/addpurchase'><Navbartwo/><Addpurchase/></Route>
    </>
  )
}

export default App

