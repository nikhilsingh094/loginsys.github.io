import React from "react";
import { NavLink } from "react-router-dom";

const ErrorPage = () =>{
    return(
        <>
            <div id="notfound">
                <div className="notfound">
                    <div className="notfound-404">
                        <h1 className="text-center mt-5">Sorry page not found</h1>
                        <div className="d-flex align-items-center justify-content-center">
                        <NavLink to ="/">Back To Homepage</NavLink>
                        </div>
                        
                    </div>
                </div>
            </div>
        </>
    )
}

export default ErrorPage;