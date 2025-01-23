import React from "react";
import Header from "./header";
import Section from "./Section1";
import Sections from "./Section2";


const Home =()=>{
    return (
        <div className="home-container">
        <div className="header-container">
        <Header/>
        </div>
            <div className="section1-container">
              <Section/>
            </div>    
            <div className="section2-container">
              <Sections/>
            </div>
        </div>
    )
};

export default Home;