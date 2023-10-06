import axios from "axios";
import React, { useContext, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { AuthContext } from "../helpers/AuthContext";

function Profile() {
  let { id } = useParams();
  const navigate = useNavigate();
  const [username, setUsername] = useState("");
  const [listOfPosts, setListOfPosts] = useState([]);
  const { authState } = useContext(AuthContext);

  useEffect(() => {
    axios.get(`http://localhost:1234/auth/basicinfo/${id}`).then((response) => {
      setUsername(response.data.username);
    });
    axios.get(`http://localhost:1234/posts/byUserId/${id}`).then((response) => {
      setListOfPosts(response.data);
    });
  }, []);

  return (
    <div className="profilePageContainer">
      <div className="basicInfo">Username: {username}</div>
      {authState.username === username && (
        <button onClick={() => navigate("/changepassword")}>
          Change my password
        </button>
      )}
      <div className="listOfPosts">
        {listOfPosts.map((value, key) => {
          return (
            <div className="post">
              <div className="title">{value.title}</div>
              <div
                className="body"
                onClick={() => {
                  navigate(`/post/${value.id}`);
                }}
              >
                {value.postText}
              </div>
              <div className="footer">
                {value.username} <label>Likes: {value.Likes.length}</label>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default Profile;
