import "./App.css";
import { BrowserRouter as Router, Route, Routes, Link } from "react-router-dom";
import Home from "./pages/Home";
import CreatePost from "./pages/CreatePost";
import Post from "./pages/Post";
import Login from "./pages/Login";
import Registration from "./pages/Registration";

function App() {
  return (
    <div className="App">
      <Router>
        <div className="navbar">
          <Link to="/createpost">Create a post</Link>
          <Link to="/">Home Page</Link>
          <Link to="/login">Login</Link>
          <Link to="/registration">Registration</Link>
        </div>
        <Routes>
          <Route path="/" exact Component={Home} />
          <Route path="/createpost" exact Component={CreatePost} />
          <Route path="/post/:id" exact Component={Post} />
          <Route path="/login" exact Component={Login} />
          <Route path="/registration" exact Component={Registration} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
