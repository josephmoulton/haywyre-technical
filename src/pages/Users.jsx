import React from "react";
import Header from "../components/Header";
import "./Users.css";
import axios from "axios";
import { useState, useEffect } from "react";
import UserCard from "../components/UserCard";

function Users() {
  const api = axios.create({
    baseURL: `https://jsonplaceholder.typicode.com`,
  });

  const [userData, setUserData] = useState([]);
  const [loading, setLoading] = useState(true);

  async function fetchData() {
    const getUserData = api.get("/users");
    axios.all([getUserData]).then(
      axios.spread((...allData) => {
        const userData = allData[0];
        setUserData(userData.data);
        setLoading(false);
      })
    );
  }

  useEffect(() => {
    fetchData();
  }, []);
  return (
    <>
      <Header />
      <div className="container">
        <div className="users__list">
          {userData.map((user) => (
            <UserCard userInfo={user} key={user.id}/>
          ))}
        </div>
      </div>
    </>
  );
}

export default Users;
