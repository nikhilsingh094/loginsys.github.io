import React, { useContext, useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import  { UserContext } from '../App' 

const Login = () => {

  const  { state, dispatch } = useContext(UserContext);

  const navigate = useNavigate();
  const [email,setEmail] = useState('');
  const [password,setPassword] = useState('');

  const sendLogin = async(e)=>{
    e.preventDefault();

    const res = await fetch('/signin',{
      method:"POST",
      headers:{
        "Content-Type":"application/json"
      },
      body:JSON.stringify({
        email,password
      })
    })

    const data = await res.json();

    if(res.status === 400 || !data){
      window.alert("Invalid Credentials");

    }else{
      dispatch({type:"USER",payload:true})
      window.alert("Login Successful");
      navigate('/');
    }
  }

  return (
    <>
      <section className="signin">
        <div className="container mt-3 w-25">
          <div className="signin-content">
            <div className="signin-form">
              <h2 className="form-title">Sign In</h2>
              <form id="login-form" className="signupForm" method="POST">
                <div className="mb-1">
                  <label for="email">
                    {" "}
                    <i className="zmdi zmdi-email material-icons-name"></i>
                  </label>
                  <input
                    type="email"
                    className="form-control"
                    autoComplete="off"
                    placeholder="Enter Your Email"
                    name="email"
                    id="email"
                    value={email}
                    onChange={(e)=> setEmail(e.target.value)}
                  />
                </div>

                <div className="mb-1">
                  <label for="password">
                    <i className="zmdi zmdi-lock material-icons-name"></i>
                  </label>
                  <input
                    type="password"
                    className="form-control"
                    autoComplete="off"
                    placeholder="Enter Your Password"
                    name="password"
                    id="password"
                    value={password}
                    onChange={(e)=>setPassword(e.target.value)}
                  />
                </div>

                <div className="mb-1">
                  <input
                    type="submit"
                    name="signin"
                    id="signip"
                    className="btn btn-primary mt-3"
                    value="Log In"
                    onClick={sendLogin}
                  />
                </div>
              </form>
              <NavLink to="/signup" className="sign-in-link">
                Create an Account
              </NavLink>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default Login;
