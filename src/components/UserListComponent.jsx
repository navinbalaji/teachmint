import React from "react";
import { memo } from "react";
import { Link } from "react-router-dom";

const UserListComponent = ({ user }) => {
  return (
    <div className="userComponent">
      <Link to={`/user/${user.id}`}>
        <div className="userComponentInner">
          <h2>{user.name}</h2>
          <p>Total Posts: {user.totalPostLength}</p>
        </div>
      </Link>
    </div>
  );
};

export default memo(UserListComponent);
