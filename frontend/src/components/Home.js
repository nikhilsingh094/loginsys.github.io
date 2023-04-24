import React, { useEffect, useState } from "react";

const Home = () => {
  const [userName, setUserName] = useState("");
  const [show, setShow] = useState(false);

  const homePage = async () => {
    try {
      const res = await fetch("/getcontactdata", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      });

      const data = await res.json();
      setUserName(data.name);
      setShow(true);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    homePage();
  }, []);
  return (
    <>
      <div className="container">
        <p className="text-center mt-5 font-weight-bold">Welcome To</p>
        <h1 className="text-center mt-5">{userName}</h1>
        <h2 className="text-center mt-5">
          {show
            ? "Happy, to see you again"
            : "This is Home Page of MERN DEVELOPMENT"}
        </h2>
      </div>
    </>
  );
};

export default Home;
