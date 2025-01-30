import React from "react";
import Header from "./header";
import Sections from "./Section2";
import Section from "./Section1";

const Home = () => {
  return (
    <div className="transition-all duration-300">
      <div className="mb-4">
        <Header />
      </div>
      <div className="mb-4">
        <Section />
      </div>
     <div>
      <Sections/>
     </div>
    </div>
  );
};

export default Home;
