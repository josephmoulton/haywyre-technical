import React from "react";
import Header from "../components/Header";
import HomeImage from "../assets/undraw_dashboard_re_3b76.svg";
import "./Home.css";
import { Link } from "react-router-dom";

function Home() {
  return (
    <>
      <Header></Header>
      <div className="container">
        <div className="top__conatiner">
          <h1 className="page__title">
            A website that issues CRUD commands on a REST API
          </h1>
          <h3 className="page__subtitle">
            View our users to <span className="coloured">get started</span>
          </h3>
        </div>
        <div className="button__container">
          <Link to="/users">
            <button className="started__button">GET STARTED</button>
          </Link>
        </div>
        <div className="image__container">
          <img
            className="home__image"
            src={HomeImage}
            alt="An image that shows a man with a chart"
          />
        </div>
      </div>
    </>
  );
}

export default Home;
