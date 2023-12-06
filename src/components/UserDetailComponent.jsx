import React from "react";

const UserDetailComponent = ({ user }) => {
  return (
    <div>
      <h1 className="UserDetailComponentHeader">Profile Page</h1>
      <div className="userDetailComponent">
        <div className="userDetailComponentInner">
          <div className="">
            <p>{user.name}</p>
            <p>{user.username} | <span> {user.company.catchPhrase}</span></p> 

          </div>
          <div>
            <p>{user.address.street}</p>
            <p>{user.email} |<span> {user.phone}</span></p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserDetailComponent;

