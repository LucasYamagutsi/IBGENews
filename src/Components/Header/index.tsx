import React from "react";
import { useNavigate } from "react-router-dom";
import trybeLogo from "../../images/Logo.svg";
import "./Header.css";

function Header() {
  const navigate = useNavigate();

  return (
    <div id="headerDiv">
      <img src={trybeLogo} alt="Trybe Logo" />
      <h1 id="title">TRYBE NEWS</h1>
      {/* <div id="buttonsDiv">
        <button
          onClick={() => navigate("/")}
          className="favoritesButton"
        >
          Home
        </button>

        <button
          onClick={() => navigate("/favorites")}
          className="favoritesButton"
        >
          Favoritos
        </button>
      </div> */}
    </div>
  );
}
export default Header;