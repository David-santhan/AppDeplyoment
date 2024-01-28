
import React, {useEffect, useRef} from 'react'
import { useDispatch } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import axios from "axios";

function Login() {
  axios.defaults.baseURL = "http://localhost:1234";
  let dispatch=useDispatch();
    let navigate= useNavigate();
    let emailRef=useRef();
    let passwordRef=useRef();

    useEffect(()=>{
      emailRef.current.value=localStorage.getItem("email");
      passwordRef.current.value=localStorage.getItem("password");
      if (localStorage.getItem("token")) {
        validateLoginonLoad();
      }
    },[])
    let validateLoginonLoad= async()=>{
      let dataToSend=new FormData();
      
      dataToSend.append("token",localStorage.getItem("token"));
      // dataToSend.append("password",localStorage.getItem("password"));

      // let reqOption={
      //     method:"Post",
      //     body:dataToSend
      //   };
      //   let JSONData=await fetch("http://localhost:1234/validateToken",reqOption);
      //   let JSOData= await JSONData.json();
      //   console.log(JSOData);
      let response=await axios.post("/validateToken",dataToSend);
        if (response.data=="failure") {
          alert(response.data.msg);
        }else{
          dispatch({type:"login",data:response.data});
          navigate("/Home");
        }     
  }
    // let sendloginDataToServerThruFormData= async()=>{
    //     let dataToSend=new FormData();
        
    //     dataToSend.append("email",emailRef.current.value);
    //     dataToSend.append("password",passwordRef.current.value);
    //     // let reqOption={
    //     //     method:"Post",
    //     //     body:dataToSend
    //     //   };
    //     //   let JSONData=await fetch("http://localhost:1234/login",reqOption);
    //     //   let JSOData= await JSONData.json();
    //     //   console.log(JSOData);
    //     let response=await axios.post("/login",dataToSend);
    //       if (response.data.status=="failure") {
    //         alert(response.data.msg);
            
    //       }else{
    //         // localStorage.setItem("email",emailRef.current.value);
    //         // localStorage.setItem("password",passwordRef.current.value);
    //         localStorage.setItem("token",response.data.token);
    //         dispatch({type:"login",data:response.data});
    //         navigate("/Home");
    //       }     
    // }

    let validateLogin=()=>{
       return async()=>{
        let dataToSend=new FormData();
        
        dataToSend.append("email",emailRef.current.value);
        dataToSend.append("password",passwordRef.current.value);
        // let reqOption={
        //     method:"Post",
        //     body:dataToSend
        //   };
        //   let JSONData=await fetch("http://localhost:1234/login",reqOption);
        //   let JSOData= await JSONData.json();
        //   console.log(JSOData);

       
        let response=await axios.post("/login",dataToSend);
          if (response.data.status=="failure") {
            alert(response.data.msg);
            console.log(response.data);
          }else{
            // localStorage.setItem("email",emailRef.current.value);
            // localStorage.setItem("password",passwordRef.current.value);
            localStorage.setItem("token",response.data.token);
            dispatch({type:"login",data:response.data.data});
            navigate("/Home");
          }     
       }
    }
  return (
    <div className='App'>
        <form className='loginform'>
        <h3>Login Form</h3>
        <div>
          <label>Email</label>
          <input ref={emailRef}></input>
        </div>
        <div>
          <label>Password</label>
          <input type='password' ref={passwordRef}></input>
        </div>
        <button type='button' onClick={()=>{
        //  sendloginDataToServerThruFormData();
        dispatch(validateLogin());
        }}>Login</button>
      </form>
      <div>
        <Link to="/Signup">Signup</Link>
      </div>
    </div>
  )
}
export default Login