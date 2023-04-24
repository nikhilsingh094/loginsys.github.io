import React, { useState} from "react";
import { useNavigate } from 'react-router-dom';
import { NavLink } from 'react-router-dom';

const Signup = () => {

  const navigate = useNavigate();

  const [user,setUser] = useState({
    name:'', email:'', phone:'', work:'', password:'', cpassword:''
  });

  let name,value;
  const handleSignup = (e) => {
      name = e.target.name;
      value = e.target.value;

      setUser({...user, [name]:value});
  }

  const sendData = async (e)=>{
    e.preventDefault();

    const { name, email, phone, work, password, cpassword } = user;

    const res =  await fetch("/register",{
        method:"POST",
        headers:{
          "Content-Type": "application/json"
        },
        body:JSON.stringify({
          name,email,phone,work,password,cpassword
        })
    });
   
    const data = await res.json();
   

    if(res.status === 422 || !data){
      window.alert("Invalid data");
      console.log("invalid data")
    }else{
      window.alert("Registration Successful");
      console.log("Registration Successful");

      navigate('/login');
    }

  }

  return (
    <>
      <section className="signup">
        <div className="container mt-3 w-25">
          <div className="signup-content">
            <div className="signup-form">
              <h2 className="form-title">Sign up</h2>
              <form id="register-form" className="signupForm" method="POST"> 
                <div className="mb-1">
                  <label for="name">
                  <i className="zmdi zmdi-assignment-account material-icons-name"></i>
                  </label>
                 
                  <input
                    type="text"
                    className="form-control"
                    autoComplete="off"
                    placeholder="Enter Your Name"
                    name="name"
                    id="name"
                    value={user.name}
                    onChange={handleSignup}
                  />
                </div>

                <div className="mb-1">
                  <label for="email"> <i className="zmdi zmdi-email material-icons-name"></i></label>
                  <input
                    type="email"
                    className="form-control"
                    autoComplete="off"
                    placeholder="Enter Your Email"
                    name="email"
                    id="email"
                    value={user.email}
                    onChange={handleSignup}
                  />
                </div>

                <div className="mb-1">
                  <label for="phone"><i className="zmdi zmdi-phone material-icons-name"></i></label>
                  <input
                    type="text"
                    className="form-control"
                    autoComplete="off"
                    placeholder="Enter Your Number"
                    name="phone"
                    id="phone"
                    value={user.phone}
                    onChange={handleSignup}
                  />
                </div>

                <div className="mb-1">
                  <label for="work"><i class="zmdi zmdi-assignment-o material-icons-name"></i></label>
                  <input
                    type="text"
                    className="form-control"
                    autoComplete="off"
                    placeholder="Enter Your Profession"
                    name="work"
                    id="work"
                    value={user.work}
                    onChange={handleSignup}
                  />
                </div>

                <div className="mb-1">
                  <label for="password"><i className="zmdi zmdi-lock material-icons-name"></i></label>
                  <input
                    type="password"
                    className="form-control"
                    autoComplete="off"
                    placeholder="Enter Your Password"
                    name="password"
                    id="password"
                    value={user.password}
                    onChange={handleSignup}
                  />
                </div>

                <div className="mb-1">
                  <label for="cpassword"><i className="zmdi zmdi-lock material-icons-name"></i></label>
                  <input
                    type="password"
                    className="form-control"
                    autoComplete="off"
                    placeholder="Enter Your Confirm Password"
                    name="cpassword"
                    id="cpassword"
                    value={user.cpassword}
                    onChange={handleSignup}
                  />
                </div>
                <div className="mb-1">
                 <input type="submit" name="signup" id="signup" className="btn btn-primary mt-3" value="register" onClick={sendData}/>
                </div>
              </form>
              <NavLink to ="/login" className="sign-up-link">I am already register</NavLink>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default Signup;
