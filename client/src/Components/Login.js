
import React, {useRef} from 'react'
import { useDispatch } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';

function Login() {
  let dispatch=useDispatch();
    let navigate= useNavigate();
    let emailRef=useRef();
    let passwordRef=useRef();
    let sendDataToServerThruFormData= async()=>{
        let dataToSend=new FormData();
        
        dataToSend.append("email",emailRef.current.value);
        dataToSend.append("password",passwordRef.current.value);
        let reqOption={
            method:"Post",
            body:dataToSend
          };
          let JSONData=await fetch("http://localhost:1234/login",reqOption);
          let JSOData= await JSONData.json();
          console.log(JSOData);
          if (JSOData.status=="failure") {
            alert(JSOData.msg);
            
          }else{
            dispatch({type:"login",data:JSOData.data});
            navigate("/Home");
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
         sendDataToServerThruFormData();
        }}>Login</button>
      </form>
      <div>
        <Link to="/Signup">Signup</Link>
      </div>
    </div>
  )
}
export default Login