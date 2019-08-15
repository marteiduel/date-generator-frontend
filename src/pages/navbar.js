import React from "react";
import { NavLink } from "react-router-dom";

const Navbar = () => {
  return (
    <div className="nav-bar-wrapper">
      <div className="btn-wrapper">
        <NavLink className="btn" to="/">
          HOME
        </NavLink>
        <NavLink className="btn" to="/picts">
          PICTURES
        </NavLink>
        <NavLink className="btn" to="/about">
          ABOUT
        </NavLink>
        <NavLink className="btn" to="/message">
          MESSAGE
        </NavLink>
      </div>
    </div>
  );
};
export default Navbar;
