import { useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";

const Profile = () => {
  const users = JSON.parse(localStorage.getItem("user"));
  const navigate = useNavigate();

  useEffect(() => {
    // Mengambil data pengguna dari localStorage
    const users = JSON.parse(localStorage.getItem("user"));

    // Memeriksa apakah data pengguna ada
    if (!users) {
      // Jika tidak ada data pengguna, navigasi ke halaman login
      navigate("/");
    }
  }, [users, navigate]); // Menentukan bahwa efek ini bergantung pada 'navigate'

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100">
      <div className="bg-white shadow-md rounded-lg max-w-md w-full p-6">
        <div className="flex flex-col items-center">
          <img
            src="https://via.placeholder.com/150"
            alt="Profile"
            className="w-32 h-32 rounded-full border-4 border-blue-600 mb-4"
          />
          <h1 className="text-2xl font-bold text-gray-800 mb-2">
            {users.fullName}
          </h1>
          <p className="text-gray-600 text-sm mb-4">{users.email}</p>
          <div className="flex space-x-4">
            <Link
              to="/editprofile"
              className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition"
            >
              Update Profile
            </Link>
            <Link
              to="/home"
              className="bg-gray-300 text-gray-800 px-4 py-2 rounded hover:bg-gray-400 transition"
            >
              Cancel
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;
