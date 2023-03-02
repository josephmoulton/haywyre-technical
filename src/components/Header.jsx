import React from "react";
import "./Header.css";
import StorageIcon from '@mui/icons-material/Storage';
import { useState } from "react";
import {Link} from "react-router-dom"
import { useNavigate } from "react-router-dom";

function Header({ search }) {
  const goHome = () => navigate("/");
  const navigate = useNavigate();
//Header component creation, with links to pages and the page logo
  return (
    <div className="header">
      <div className="container">
        <div className="header__container">
          <div className="logo__container" onClick={goHome}>
            <h3>CRUD-REST</h3>
            <div className="logo__icon">
              <StorageIcon />
            </div>
          </div>
          <div className="header__links">
            <Link to="/" className="header__link">
              Home
            </Link>
            <Link to="/users" className="header__link">
              Users
            </Link>
            <Link to="/comments:1" className="header__link">
              Data Tables
            </Link>
            <Link to="/">
              <button className="header__link header__link--button">
                Contact
              </button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Header;
