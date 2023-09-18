import React from "react";
import { useNavigate } from "react-router-dom";
import trybeLogo from "../../images/trybeLogo.jpg";
import "./Header.css";

function Header() {
  const navigate = useNavigate();

  const handleButtonClick = () => {
    navigate("/favorites");
  };
  return (
    <div id="headerDiv">
      <img src={trybeLogo} alt="Trybe Logo" />
      <h1 id="title">Trybe News</h1>
      <button
        onClick={handleButtonClick}
        id="favoritesButton"
      >
        Favoritos
      </button>
    </div>
  );
}
export default Header;