import React from "react";
import "./UserCard.css";
import { Avatar } from "@mui/material";
import { useNavigate } from "react-router-dom";

function UserCard({ userInfo }) {
  const navigate = useNavigate();
  return (
    <div
      className="userCard__container"
      onClick={() => navigate(`/comments/:${userInfo.id}`)}
    >
      <div className="user__logo">
        <Avatar
          sx={{
            bgcolor: "#3d538d",
          }}
        >
          {userInfo.username.slice(0, 1)}
        </Avatar>
        <div className="user__username">{userInfo.username}</div>
      </div>
      <div className="user__data">
        <div className="user__phone">{userInfo.name}</div>
        <div className="user__email">{userInfo.email}</div>
        <div className="user__website">{userInfo.website}</div>
        <div className="user__phone">{userInfo.phone}</div>
      </div>
    </div>
  );
}

export default UserCard;
