import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
  useNavigate,
} from "react-router-dom";
import { ToastContainer } from "react-toastify";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import CreatePost from "./pages/CreatePost";
import PostList from "./pages/PostList";
import EditPost from "./pages/EditPost";
import Login from "./pages/LogIn";
import Signup from "./pages/SingUp";
import Mypost from "./components/Mypost";
import Profile from "./pages/profile";

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
              isAuthenticated ? <CreatePostWrapper /> : <Navigate to="/login" />
            }
          />
          <Route
            path="/edit/:id"
            element={isAuthenticated ? <EditPost /> : <Navigate to="/login" />}
          />
          <Route
            path="/profile"
            element={isAuthenticated ? <Profile /> : <Navigate to="/login" />}
          />

          <Route path="/myposts" element={<Mypost />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
        </Routes>
      </main>

      <ToastContainer position="top-center" autoClose={2000} />
      <Footer />
    </Router>
  );
}

function CreatePostWrapper() {
  const navigate = useNavigate();

  const handlePostCreated = () => {
    navigate("/");
  };

  return (
    <div className="w-full max-w-2xl mx-auto">
      <CreatePost onPostCreated={handlePostCreated} />
    </div>
  );
}

export default App;
