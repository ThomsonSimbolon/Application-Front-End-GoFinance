import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const Register = () => {
  // Menggunakan useState untuk menyimpan nama lengkap, email, dan password pengguna
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  // Menggunakan useNavigate untuk navigasi antar halaman
  const navigate = useNavigate();

  // Fungsi untuk menangani proses pendaftaran pengguna
  const handleRegister = async (e) => {
    // Mencegah perilaku default dari form agar tidak melakukan refresh halaman
    e.preventDefault();

    // Membuat objek user dengan data yang diambil dari state
    const user = { fullName, email, password };

    // Mengirimkan data pengguna ke server menggunakan POST request
    await axios
      .post("http://localhost:5000/users", user) // Mengirim data pengguna ke endpoint yang ditentukan
      .then(() => {
        // Jika pendaftaran berhasil, tampilkan notifikasi sukses
        alert("User  registered!");

        // Redirect ke halaman utama setelah pendaftaran berhasil
        navigate("/");
      })
      .catch(() => {
        // Jika pendaftaran gagal, tampilkan notifikasi kesalahan
        alert("Registration failed. Please try again.");
      });
  };

  return (
    <div className="flex flex-col md:flex-row h-screen">
      <div className="md:w-1/2 w-full flex flex-col justify-center items-start text-white p-16 md:p-8 go-finance">
        <div className="mx-0 md:mx-16">
          <h1 className="text-4xl font-bold mb-4">GoFinance</h1>
          <p className="mb-6">Lorem ipsum dolor sit amet</p>
          <button className="btn text-white font-normal py-1 px-5 rounded-full">
            Read More
          </button>
        </div>
      </div>
      <div className="md:w-1/2 w-full bg-white flex flex-col justify-center items-center p-8">
        <div className="w-full max-w-md">
          <h2 className="text-3xl font-bold mb-2 text-center md:text-left">
            Hello!
          </h2>
          <p className="mb-6 text-center md:text-left">
            Sign Up to Get Started
          </p>
          <form className="mb-4" onSubmit={handleRegister}>
            <div className="flex items-center border rounded-full py-3 px-5 mb-4">
              <i
                className="fas fa-user text-gray-300 mr-3"
                style={{ fontSize: "1.2rem", marginTop: "1px" }}
              ></i>
              <input
                type="text"
                placeholder="Full Name"
                className="outline-none w-full placeholder:text-sm"
                value={fullName}
                onChange={(e) => setFullName(e.target.value)}
                required
              />
            </div>
            <div className="flex items-center border rounded-full py-3 px-5 mb-4">
              <i
                className="fa-regular fa-envelope text-gray-300 mr-3"
                style={{ fontSize: "1.2rem", marginTop: "1px" }}
              ></i>
              <input
                type="email"
                placeholder="Email Address"
                className="outline-none w-full placeholder:text-sm"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>
            <div className="flex items-center border rounded-full py-3 px-5 mb-4">
              <i
                className="fas fa-lock text-gray-300 mr-3"
                style={{ fontSize: "1.1rem" }}
              ></i>
              <input
                type="password"
                placeholder="Password"
                className="outline-none w-full placeholder:text-sm"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>
            <button
              type="submit"
              className="btn text-white font-normal py-3 px-4 rounded-full w-full mb-4"
            >
              Register
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Register;
