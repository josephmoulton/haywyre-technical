import "./App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./pages/Home.jsx";
import Users from "./pages/Users.jsx";
import Comments from "./pages/Comments";
import Posts from "./pages/Posts";

function App() {
  return (
    <div className="App">
      <Router>
        <Routes>
          <Route path="/" element={<Home />}></Route>
          <Route path="/users" element={<Users />}></Route>
          <Route path="/comments/:id" element={<Comments />}></Route>
          <Route path="/posts/:id" element={<Posts />}></Route>
        </Routes>
      </Router>
    </div>
  );
}

export default App;
