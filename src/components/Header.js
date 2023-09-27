import React from "react";
import { LOGO } from "../utils/constants";

const Header = () => {
  return (
    <div className="absolute w-screen px-8 py-2 bg-gradient-to-b from-black z-10">
      <img src={LOGO} alt="n-logo" className="w-44" />
    </div>
  );
};

export default Header;
