import React, { useEffect } from 'react'
import { useSelector } from 'react-redux';
import { NavLink, useNavigate } from 'react-router-dom';
import axios from 'axios';

function Topnavigation() {
    axios.defaults.baseURL = "http://localhost:1234";
    // line 6 to 21 we r not allowing all pages to open without giving login Details
    let navigate=useNavigate();
let storeObj=useSelector((store)=>{return store;});
useEffect(()=>{
    if (storeObj && storeObj.loginReducer.loginDetails && storeObj.loginReducer.loginDetails.email) {
        
    }else{
       navigate("/");
    }
},[])

    let highlightActiveLink=(obj)=>{
        if (obj.isActive==true) {
            return{backgroundColor:"lightgreen",color:"white"};      
        }
    }
    let deleteProfile=async ()=>{
    //     let reqOption={
    //         method:"DELETE",
    //     };
    //     let url=`http://localhost:1234/deleteprofile?email=${storeObj.loginReducer.loginDetails.email}`;
    //  let JSONData=await fetch(url,reqOption);
    //  let JSOData=await JSONData.json();
    let response=await axios.delete(`/deleteprofile?email=${storeObj.loginReducer.loginDetails.email}`)
     if(response.data.status=="success"){
        alert(response.data.msg);
        navigate("/");
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
    <NavLink to="/Editprofile"style={(obj)=>{
        return highlightActiveLink(obj);
    }}>Edit Profile</NavLink>
    <NavLink to="/Leave"style={(obj)=>{
        return highlightActiveLink(obj);
    }}
    onClick={()=>{
       deleteProfile();
    }}
    >Delete Profile</NavLink>
     <NavLink to="/"
     onClick={()=>{
        localStorage.clear();
     }}
    >Logout</NavLink>
    </nav>
   
  )
}

export default Topnavigation