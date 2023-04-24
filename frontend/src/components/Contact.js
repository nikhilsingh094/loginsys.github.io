import React, { useEffect, useState } from "react";

const Contact = () => {

const [userData,setUserData] = useState({name:'',email:'',phone:"",message:''});

const getContactUsPage = async () => {
  try{
      const res = await fetch('/getcontactdata', {
        method : "GET",
        headers:{
          "Content-Type" : "application/json"
        }
      })

      const data = await res.json();
      setUserData({...userData,name:data.name,email:data.email,phone:data.phone});

      console.log(data);

       if(!res.status === 200){
        const error = new Error(res.error);
        throw error;
       }

  }catch(err){
    console.log(err)
  }
}

useEffect(()=>{
  getContactUsPage();
},[])

//storing data in state

const handleInputs = (e) =>{
    const name = e.target.name;
    const value = e.target.value;

    setUserData({...userData,[name]:value});

}


//send to backend

const contactClick = async (e) =>{
  e.preventDefault();

  const {name,email,phone,message} = userData;

 const res =   await fetch ('/contact',{
  method:"POST",
  headers:{
  "Content-Type":"application/json"
  }, 
  body:JSON.stringify({
    name,email,phone, message 
   })
 });

 const data = await res.json();
 if(!data){
  console.log("mesage not send")
 }else{
  alert("message sent")
  setUserData({...userData,message:""});
 }
}

  return (
    <>
      <div className="container mt-5">
      <h1 className="text-center">Contact US</h1>
        <form className="border mt-5" id="contact-form" method="POST">
          <div className="row mx-auto mt-5">
            <div className="col-md-4">
              <input
                type="text"
                name="name"
                className="form-control mt-2"
                placeholder="Your Name"
                id="contact-form-name"
                required="true"
                value={userData.name}
                onChange={handleInputs}
              />
            </div>

            <div className="col-md-4">
              <input
                type="text"
                name="email"
                className="form-control mt-2"
                placeholder="Your Email"
                id="contact-form-email"
                required="true"
                value={userData.email}
                onChange={handleInputs}
              />
            </div>

            <div className="col-md-4">
              <input
                type="text"
                name="phone"
                className="form-control mt-2"
                placeholder="Your Number"
                id="contact-form_number"
                required="true"
                value={userData.phone}
                onChange={handleInputs}
              />
            </div>
          </div>

          <div className="row mt-3 mx-auto mb-5">
            <div className="col-md-12">
              <textarea
                className="form-control"
                placeholder="Message"
                id="textarea"
                value={userData.message}
                name="message"
                onChange={handleInputs}
              ></textarea>
            </div>
          </div>
          <div className="mb-1 d-flex align-items-center justify-content-center">
            <input
              type="submit"
              name="message"
              id="message"
              className="btn btn-primary mb-3"
              value="Send Message"
              onClick={contactClick}
            />
          </div>
        </form>
      </div>
    </>
  );
};

export default Contact;
