import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import pic from "../images/img.jpg";
import about from "../images/kk.png";
const About = () => {

  const navigate = useNavigate();

  const [userData,setUserData] = useState({}); 

  const  callAboutUsPage = async () => {
    try{
      const res = await fetch('/about' , {
        method:"GET",
        headers:{
          Accept : "application/json",
          "Content-Type" :"application/json"
        },
        credentials:"include"
      });

      const data = await res.json();
      setUserData(data);

      console.log(data);
       if(!res.status === 200){
        const error = new Error(res.error);
        throw error;
       }

    }catch(err){
      console.log(err)
      navigate('/login')
    }
  }

  useEffect(()=>{
    callAboutUsPage();
  },[]);

 
  return (
    <>
      <div className="container mt-5">
        <form method="GET">
          <div className="row">
            <div className="col-md-4">
              <img src={userData.name === "Kohli" ? about : pic} alt="pic" className="profile-img"></img>
            </div>

            <div className="col-md-6">
              <div className="profile-head">
                <h5>{userData.name}</h5>
                <h6>{userData.work}</h6>
                <p className="profile-rating mt-3 mb-5">
                  Ranking: <span> 1/10</span>
                </p>

                <ul className="nav nav-tabs" roll="tablist">
                  <li className="nav-item">
                    <a
                      className="nav-link active"
                      id="home-tab"
                      data-bs-toggle="tab"
                      data-bs-target="#home"
                      role="tab"
                      aria-controls="home"
                      aria-selected="true"
                    >
                      About
                    </a>
                  </li>
                  <li className="nav-item">
                    <a
                      className="nav-link"
                      id="profile-tab"
                      data-bs-toggle="tab"
                      data-bs-target="#profile"
                      role="tab"
                      aria-controls="profile"
                      aria-selected="false"
                    >
                      Timeline
                    </a>
                  </li>
                </ul>
              </div>
            </div>

            <div className="col-md-2">
              <input
                type="submit"
                className="btn btn-primary profile-edit-btn"
                name="btn-add-more"
                value="Edit Profile"
              />
            </div>
          </div>

          <div className="row">
            {/* {left side url} */}

            <div className="col-md-4">
              <div className="profile-work">
                <p>WORK LINK</p>
                <a href="https://www.google.com" target="_blank">
                  Google
                </a>
                <br />
                <a href="https://www.youtube.com" target="_blank">
                  Youtube
                </a>
                <br />
                <a href="https://www.facebook.com" target="_blank">
                  Facebook
                </a>
                <br />
                <a href="https://www.linkedin.com" target="_blank">
                  LinkedIn
                </a>
                <br />
                <a href="https://www.quora.com" target="_blank">
                  Quora
                </a>
                <br />
              </div>
            </div>

            {/* right side url */}

            <div className="col-md-8 pl-5 about-info">
              <div className="tab-content profile-tab" id="myTabContent">
                <div
                  className="tab-pane fade show active"
                  id="home"
                  role="tabpanel"
                  aria-labelledby="home-tab"
                >
                  <div className="row">
                    <div className="col-md-6">
                      <label for="User ID">UserID</label>
                    </div>
                    <div className="col-md-6">
                      <p>5555444866554</p>
                    </div>
                  </div>

                  <div className="row">
                    <div className="col-md-6">
                      <label for="User Name">Name</label>
                    </div>
                    <div className="col-md-6">
                      <p>{userData.name}</p>
                    </div>
                  </div>

                  <div className="row">
                    <div className="col-md-6">
                      <label for="User ID">Email</label>
                    </div>
                    <div className="col-md-6">
                      <p>{userData.email}</p>
                    </div>
                  </div>

                  <div className="row">
                    <div className="col-md-6">
                      <label for="User ID">Phone</label>
                    </div>
                    <div className="col-md-6">
                      <p>{userData.phone}</p>
                    </div>
                  </div>

                  <div className="row">
                    <div className="col-md-6">
                      <label for="User ID">Profession</label>
                    </div>
                    <div className="col-md-6">
                      <p>{userData.work}</p>
                    </div>
                  </div>
                </div>

                <div
                  className="tab-pane fade"
                  id="profile"
                  role="tabpanel"
                  aria-labelledby="profile-tab"
                >
                  <div className="row">
                    <div className="col-md-6">
                      <label for="User ID">Experience</label>
                    </div>
                    <div className="col-md-6">
                      <p>Expert</p>
                    </div>
                  </div>

                  <div className="row">
                    <div className="col-md-6">
                      <label for="User ID">Hourly Rate</label>
                    </div>
                    <div className="col-md-6">
                      <p>10$/h</p>
                    </div>
                  </div>

                  <div className="row">
                    <div className="col-md-6">
                      <label for="User ID">Total Projects</label>
                    </div>
                    <div className="col-md-6">
                      <p>150</p>
                    </div>
                  </div>

                  <div className="row">
                    <div className="col-md-6">
                      <label for="User ID">English Level</label>
                    </div>
                    <div className="col-md-6">
                      <p>Expert</p>
                    </div>
                  </div>

                  <div className="row">
                    <div className="col-md-6">
                      <label for="User ID">Availability</label>
                    </div>
                    <div className="col-md-6">
                      <p>6 months</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </form>
      </div>
    </>
  );
};

export default About;
