import "./App.css";
import axios from "axios";
import { useEffect, useState } from "react";

function App() {
  const [allPosts, setAllPosts] = useState([]);

  useEffect(() => {
    axios.get("http://localhost:1234/posts").then((response) => {
      setAllPosts(response.data);
    });
  }, []);

  return (
    <div className="App">
      {allPosts.map((value, key) => {
        return (
          <div className="post">
            <div className="title">{value.title}</div>
            <div className="body">{value.postText}</div>
            <div className="footer">{value.username}</div>
          </div>
        );
      })}
    </div>
  );
}

export default App;
