import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import base_url from "../context/context";
import { toast } from "react-toastify";
import { UserPlus, Users, FileText, CalendarDays, X } from "lucide-react";

const UserProfile = () => {
  const { userId } = useParams();
  const [user, setUser] = useState(null);
  const [posts, setPosts] = useState([]);
  const [followers, setFollowers] = useState([]);
  const [following, setFollowing] = useState([]);
  const [isFollowing, setIsFollowing] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const currentUserId = JSON.parse(localStorage.getItem("user"))?._id;

  useEffect(() => {
    const fetchUserAndPosts = async () => {
      try {
        const userRes = await axios.get(`${base_url}users/${userId}`);
        const fetchedUser = userRes.data.user;

        setUser(fetchedUser);
        setFollowers(fetchedUser.followers || []);
        setFollowing(fetchedUser.following || []);
        setIsFollowing(fetchedUser.followers?.includes(currentUserId));

        const postRes = await axios.get(`${base_url}post/user/${userId}`);
        setPosts(postRes.data.posts || []);
      } catch {
        toast.error("Unable to load user profile or posts");
      }
    };

    if (userId) fetchUserAndPosts();
  }, [userId, currentUserId]);

  const toggleFollow = async () => {
    try {
      const res = await axios.post(
        `${base_url}users/${userId}/follow`,
        {},
        { withCredentials: true }
      );
      setFollowers(res.data.followers);
      setIsFollowing((prev) => !prev);
      toast.success(isFollowing ? "Unfollowed" : "Followed");
    } catch {
      toast.error("Failed to follow/unfollow");
    }
  };

  const getProfileImage = () =>
    user.image?.startsWith("http")
      ? user.image
      : `https://ui-avatars.com/api/?name=${encodeURIComponent(
          user.name
        )}&background=6b21a8&color=fff`;

  if (!user) {
    return <p className="text-center mt-10 text-gray-500">Loading user profile...</p>;
  }

  return (
    <div className="max-w-6xl mx-auto mt-20 px-4 sm:px-6 py-10 bg-gradient-to-br from-white via-purple-50 to-indigo-100 shadow-lg rounded-2xl relative">
      {/* Full Image Modal */}
      {isModalOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-80 flex items-center justify-center z-50"
          onClick={() => setIsModalOpen(false)}
        >
          <div className="relative">
            <img
              src={getProfileImage()}
              alt="Full Size"
              className="max-h-[90vh] max-w-[90vw] rounded-lg shadow-2xl"
              onClick={(e) => e.stopPropagation()}
            />
            <button
              onClick={() => setIsModalOpen(false)}
              className="absolute top-2 right-2 bg-white p-1 rounded-full shadow text-black"
            >
              <X size={18} />
            </button>
          </div>
        </div>
      )}

      {/* Profile Header */}
      <div className="flex flex-col items-center mb-12 text-center">
        <img
          src={getProfileImage()}
          alt="Profile"
          onClick={() => setIsModalOpen(true)}
          className="w-24 h-24 sm:w-28 sm:h-28 rounded-full object-cover border-4 border-purple-600 shadow-md mb-3 cursor-pointer hover:scale-105 transition"
        />
        <h2 className="text-2xl sm:text-3xl font-extrabold text-purple-800">{user.name}</h2>
        {user.bio && (
          <p className="text-gray-600 text-sm mt-2 max-w-md mx-auto whitespace-pre-wrap italic">
            {user.bio}
          </p>
        )}
        <div className="flex items-center gap-2 text-sm text-gray-500 mt-3">
          <CalendarDays size={16} />
          Joined on{" "}
          {user.createdAt ? new Date(user.createdAt).toDateString() : "N/A"}
        </div>

        {/* Stats */}
        <div className="flex flex-wrap justify-center gap-4 sm:gap-6 mt-6">
          <Stat label="Followers" icon={<Users size={18} />} value={followers.length} />
          <Stat label="Following" icon={<UserPlus size={18} />} value={following.length} />
          <Stat label="Posts" icon={<FileText size={18} />} value={posts.length} />
        </div>

        {/* Follow/Unfollow Button */}
        {userId !== currentUserId && (
          <button
            onClick={toggleFollow}
            className="mt-6 px-6 py-2 text-sm font-medium bg-purple-600 hover:bg-purple-700 text-white rounded-full transition shadow"
          >
            {isFollowing ? "Unfollow" : "Follow"}
          </button>
        )}
      </div>

      {/* Posts Section */}
      <h3 className="text-xl sm:text-2xl font-bold text-purple-700 mb-6 text-center">
        📝 {user.name}'s Posts
      </h3>

      {posts.length === 0 ? (
        <p className="text-center text-gray-500">No posts yet.</p>
      ) : (
        <div className="grid gap-6 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
          {posts.map((post) => (
            <div
              key={post._id}
              className="bg-white border border-gray-200 rounded-xl p-5 shadow hover:shadow-lg transition"
            >
              <div className="flex items-center gap-3 mb-3">
                <img
                  src={getProfileImage()}
                  alt="Author"
                  className="w-9 h-9 rounded-full border border-purple-500 shadow"
                />
                <div>
                  <p className="text-sm font-semibold text-purple-800">
                    {user.name}
                  </p>
                  <p className="text-xs text-gray-400">
                    {new Date(post.createdAt).toLocaleDateString()}
                  </p>
                </div>
              </div>

              <h4 className="text-base font-semibold text-purple-800 line-clamp-1 mb-1">
                {post.title}
              </h4>
              <p className="text-sm text-gray-600 line-clamp-4 whitespace-pre-wrap mb-2">
                {post.content}
              </p>

              <div className="text-xs text-gray-500 mt-3 flex justify-between">
                <span>❤️ {post.likes?.length || 0} Likes</span>
                <span>💔 {post.dislikes?.length || 0} Dislikes</span>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

// Stat Component
const Stat = ({ icon, label, value }) => (
  <div className="flex items-center gap-2 bg-white px-4 py-2 rounded-lg shadow text-gray-700">
    {icon}
    <span className="font-medium">{value}</span>
    <span className="text-sm text-gray-500">{label}</span>
  </div>
);

export default UserProfile;
