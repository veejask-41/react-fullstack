import React, { useContext } from "react";
import axios from "axios";
import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { AuthContext } from "../helpers/AuthContext";

function Home() {
  const [allPosts, setAllPosts] = useState([]);
  const [likedPosts, setLikedPosts] = useState([]);
  let navigate = useNavigate();
  const { authState } = useContext(AuthContext);

  useEffect(() => {
    if (!authState.status) {
      navigate("/login");
    } else {
      axios
        .get("http://localhost:1234/posts", {
          headers: {
            accessToken: localStorage.getItem("accessToken"),
          },
        })
        .then((response) => {
          if (response.data.error) {
            alert(response.data.error);
          } else {
            setAllPosts(response.data.allPosts);
            setLikedPosts(
              response.data.likedPosts.map((likedPost) => {
                return likedPost.PostId;
              })
            );
          }
        });
    }
  }, []);

  const likePost = (PostId) => {
    axios
      .post(
        "http://localhost:1234/like",
        { PostId: PostId },
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
          setAllPosts(
            allPosts.map((post) => {
              if (post.id === PostId) {
                if (response.data.liked) {
                  return { ...post, Likes: [...post.Likes, 0] };
                } else {
                  const likesArr = post.Likes;
                  likesArr.pop();
                  return { ...post, Likes: likesArr };
                }
              } else {
                return post;
              }
            })
          );

          if (!likedPosts.includes(PostId)) {
            setLikedPosts([...likedPosts, PostId]);
          } else {
            setLikedPosts(
              likedPosts.filter((likedPost) => {
                return likedPost !== PostId;
              })
            );
          }
        }
      });
  };

  return (
    <div>
      {allPosts.map((value, key) => {
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
              <Link to={`/profile/${value.UserId}`}>{value.username}</Link>{" "}
              <button
                onClick={() => {
                  likePost(value.id);
                }}
              >
                {likedPosts.includes(value.id) ? "Unlike" : "Like"}
              </button>
              <label>{value.Likes.length}</label>
            </div>
          </div>
        );
      })}
    </div>
  );
}

export default Home;
