import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import { ToastContainer } from "react-toastify";

import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import CreatePost from "./pages/CreatePost";
import PostList from "./pages/PostList";
import EditPost from "./pages/EditPost";
import Login from "./pages/LogIn";
import Signup from "./pages/SingUp";
import MyPosts from "./pages/MyPosts";
import Profile from "./pages/profile";
import UserProfile from "./pages/userProfile";
import Help from "./pages/Help";
import SinglePost from "./pages/SinglePost";

function App() {
  const isAuthenticated = !!localStorage.getItem("token");

  return (
    <Router>
      <Navbar />

      <main className="min-h-[900px] bg-gradient-to-br from-blue-100 to-purple-200 p-6 font-sans">
        <Routes>
          <Route path="/" element={<PostList />} />

          <Route
            path="/create"
            element={
              <PrivateRoute>
                <CreatePost />
              </PrivateRoute>
            }
          />

          <Route
            path="/edit/:id"
            element={
              <PrivateRoute>
                <EditPost />
              </PrivateRoute>
            }
          />

          <Route
            path="/profile"
            element={
              <PrivateRoute>
                <Profile />
              </PrivateRoute>
            }
          />

          <Route path="/users/:userId" element={<UserProfile />} />
          <Route path="/help" element={<Help />} />
           <Route path="/posts/:id" element={<SinglePost />} />
          <Route
            path="/myposts"
            element={
              <PrivateRoute>
                <MyPosts />
              </PrivateRoute>
            }
          />

          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
        </Routes>
      </main>

      <ToastContainer position="top-center" autoClose={2000} />
      <Footer />
    </Router>
  );
}

function PrivateRoute({ children }) {
  const token = localStorage.getItem("token");
  return token ? children : <Navigate to="/login" />;
}

export default App;
