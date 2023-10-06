import React, { useContext, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import { AuthContext } from "../helpers/AuthContext";

function Post() {
  let { id } = useParams();

  const [postContents, setPostContents] = useState({});
  const [comments, setComments] = useState([]);
  const [newComment, setNewComment] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    axios.get(`http://localhost:1234/posts/byId/${id}`).then((response) => {
      setPostContents(response.data);
    });

    axios.get(`http://localhost:1234/comments/${id}`).then((response) => {
      setComments(response.data);
    });
  }, [id]);

  const addComment = () => {
    axios
      .post(
        "http://localhost:1234/comments",
        {
          commentBody: newComment,
          PostId: id,
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
          setComments([
            ...comments,
            { commentBody: newComment, username: response.data.username },
          ]);
          setNewComment("");
        }
      });
  };

  const { authState } = useContext(AuthContext);
  const deleteComment = (id) => {
    axios
      .delete(`http://localhost:1234/comments/${id}`, {
        headers: {
          accessToken: localStorage.getItem("accessToken"),
        },
      })
      .then((response) => {
        setComments(
          comments.filter((val) => {
            return val.id !== id;
          })
        );
      });
  };

  const deletePost = (postID) => {
    axios
      .delete(`http://localhost:1234/posts/${postID}`, {
        headers: {
          accessToken: localStorage.getItem("accessToken"),
        },
      })
      .then((response) => {
        navigate("/");
      });
  };

  const editPost = (edit) => {
    if (edit === "title") {
      let newTitle = prompt("Enter new title");
      axios
        .put(
          "http://localhost:1234/posts/title",
          { newTitle: newTitle, id: id },
          { headers: { accessToken: localStorage.getItem("accessToken") } }
        )
        .then((response) => {
          setPostContents({ ...postContents, title: newTitle });
        });
    } else {
      let newPostText = prompt("Enter new post text");
      axios
        .put(
          "http://localhost:1234/posts/postText",
          { newPostText: newPostText, id: id },
          { headers: { accessToken: localStorage.getItem("accessToken") } }
        )
        .then((response) => {
          setPostContents({ ...postContents, postText: newPostText });
        });
    }
  };

  return (
    <div className="postPage">
      <div className="leftSide">
        <div className="post" id="individual">
          <div
            className="title"
            onClick={() => {
              if (authState.username === postContents.username) {
                editPost("title");
              }
            }}
          >
            {postContents.title}
          </div>
          <div
            className="body"
            onClick={() => {
              if (authState.username === postContents.username) {
                editPost("body");
              }
            }}
          >
            {postContents.postText}
          </div>
          <div className="footer">
            {postContents.username}
            {authState.username === postContents.username && (
              <button
                onClick={() => {
                  deletePost(postContents.id);
                }}
              >
                Delete Post
              </button>
            )}
          </div>
        </div>
      </div>
      <div className="rightSide">
        <div className="addCommentContainer">
          <input
            type="text"
            placeholder="comment..."
            value={newComment}
            onChange={(event) => {
              setNewComment(event.target.value);
            }}
          />
          <button type="submit" onClick={addComment}>
            Add Comment
          </button>
        </div>
        <div className="listOfComments">
          {comments.map((comment, key) => {
            return (
              <div className="comment" key={key}>
                {comment.commentBody}
                <label> Username: {comment.username}</label>
                {authState.username === comment.username && (
                  <button
                    onClick={() => {
                      deleteComment(comment.id);
                    }}
                  >
                    X
                  </button>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}

export default Post;
