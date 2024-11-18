import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

const EditProfile = () => {
  // Menggunakan useState untuk menyimpan data pengguna
  const [userData, setUserData] = useState({
    fullName: "",
    email: "",
  });

  // Menggunakan useNavigate untuk navigasi antar halaman
  const navigate = useNavigate();

  // Menggunakan useEffect untuk memeriksa data pengguna saat komponen dimuat
  useEffect(() => {
    // Mengambil data pengguna dari localStorage dan mengubahnya menjadi objek JavaScript
    const users = JSON.parse(localStorage.getItem("user"));

    // Jika tidak ada data pengguna, arahkan pengguna kembali ke halaman utama
    if (!users) {
      navigate("/");
    } else {
      // Jika ada data pengguna, setel state userData dengan informasi pengguna
      setUserData({
        fullName: users.fullName,
        email: users.email,
      });
    }
  }, [navigate]); // Menggunakan 'navigate' sebagai dependensi untuk memastikan efek berjalan kembali jika 'navigate' berubah

  // Fungsi untuk menangani perubahan input pada form
  const handleChange = (e) => {
    // Mengambil nama dan nilai dari input yang berubah
    const { name, value } = e.target;
    // Memperbarui state userData dengan nilai baru, menjaga nilai lainnya tetap utuh
    setUserData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  // Fungsi untuk menangani pengiriman form
  const handleSubmit = (e) => {
    e.preventDefault();

    // Menyimpan data pengguna yang diperbarui ke localStorage
    localStorage.setItem("user", JSON.stringify(userData));
    // Menampilkan pesan sukses kepada pengguna
    alert("Profile updated successfully!");
    // Mengarahkan pengguna ke halaman profil setelah pengiriman berhasil
    navigate("/profile");
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100">
      <div className="bg-white shadow-md rounded-lg max-w-md w-full p-6">
        <h1 className="text-2xl font-bold text-gray-800 mb-4">Edit Profile</h1>
        {/* Form Edit Profile */}
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label
              className="block text-gray-700 text-sm font-bold mb-2"
              htmlFor="fullName"
            >
              Full Name
            </label>
            <input
              type="text"
              id="fullName"
              name="fullName"
              value={userData.fullName}
              onChange={handleChange}
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              required
            />
          </div>
          <div className="mb-4">
            <label
              className="block text-gray-700 text-sm font-bold mb-2"
              htmlFor="email"
            >
              Email
            </label>
            <input
              type="email"
              id="email"
              name="email"
              value={userData.email}
              onChange={handleChange}
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              required
            />
          </div>
          <div className="flex items-center justify-between">
            <button
              type="submit"
              className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition"
            >
              Save Changes
            </button>
            <button
              type="button"
              onClick={() => navigate("/profile")}
              className="bg-gray-300 text-gray-800 px-4 py-2 rounded hover:bg-gray-400 transition"
            >
              Cancel
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default EditProfile;
