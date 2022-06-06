import React from "react";
import { NavLink } from "react-router-dom";

const Home = () => {
    return(
        <div style={{display: "flex", direction: "column"}}>
            Home Page
            <button><NavLink style={{textDecoration: "none"}} to="/login">login</NavLink></button>
        </div>
    );
}

export default Home;