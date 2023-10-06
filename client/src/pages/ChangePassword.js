import axios from "axios";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

function ChangePassword() {
  const [oldPassword, setOldPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const navigate = useNavigate();

  const changePassword = () => {
    axios
      .put(
        "http://localhost:1234/auth/changepassword",
        {
          oldPassword: oldPassword,
          newPassword: newPassword,
        },
        {
          headers: {
            accessToken: localStorage.getItem("accessToken"),
          },
        }
      )
      .then((response) => {
        if (response.data.error) {
          alert(response.data.error);
        } else {
          navigate(`/profile/${response.data.id}`);
        }
      });
  };

  return (
    <div>
      <h1>Change your password</h1>
      <input
        type="text"
        placeholder="enter old password ..."
        onChange={(e) => setOldPassword(e.target.value)}
      />
      <input
        type="text"
        placeholder="enter new password ..."
        onChange={(e) => setNewPassword(e.target.value)}
      />
      <button onClick={changePassword}>Save</button>
    </div>
  );
}

export default ChangePassword;
