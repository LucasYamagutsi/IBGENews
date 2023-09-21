import React from "react";
import trybeLogo from "../../images/logo.svg";
import "./Header.css";

function Header() {
  return (
    <div id="headerDiv">
      <img src={trybeLogo} alt="Trybe Logo" />
      <h1 id="title">TRYBE NEWS</h1>
    </div>
  );
}
export default Header;