import React, { useEffect } from 'react'
import { useSelector } from 'react-redux';
import { NavLink, useNavigate } from 'react-router-dom'

function Topnavigation() {
    // line 6 to 21 we r not allowing all pages to open without giving login Details
    let navigate=useNavigate();
let storeObj=useSelector((store)=>{return store;});
useEffect(()=>{
    if (storeObj && storeObj.loginDetails && storeObj.loginDetails.email) {
        
    }else{
       navigate("/");
    }
},[])

    let highlightActiveLink=(obj)=>{
        if (obj.isActive==true) {
            return{backgroundColor:"lightgreen",color:"white"};      
        }
    }
  return (
    <nav>
    <NavLink to="/Home" style={(obj)=>{
        return highlightActiveLink(obj);
    }}>Home</NavLink>
    <NavLink to="/Tasks"style={(obj)=>{
        return highlightActiveLink(obj);
    }}>Task</NavLink>
    <NavLink to="/Leave"style={(obj)=>{
        return highlightActiveLink(obj);
    }}>Leave</NavLink>
     <NavLink to="/"style={(obj)=>{
        return highlightActiveLink(obj);
    }}>Logout</NavLink>
    </nav>
   
  )
}

export default Topnavigation