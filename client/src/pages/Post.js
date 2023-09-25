import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";

function Post() {
  let { id } = useParams();

  const [postContents, setPostContents] = useState({});

  useEffect(() => {
    axios.get(`http://localhost:1234/posts/byId/${id}`).then((response) => {
      setPostContents(response.data);
    });
  }, [id]);

  return (
    <div className="postPage">
      <div className="leftSide">
        <div className="post" id="individual">
          <div className="title">{postContents.title}</div>
          <div className="body">{postContents.postText}</div>
          <div className="footer">{postContents.username}</div>
        </div>
      </div>
      <div className="rightSide">Comment Section</div>
    </div>
  );
}

export default Post;
