import { useState } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";

const Login = () => {
  // Menggunakan useState untuk menyimpan email dan password pengguna
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  // Menggunakan useNavigate untuk navigasi antar halaman
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    // Mencegah perilaku default dari form agar tidak melakukan refresh halaman
    e.preventDefault();

    // Mengambil data pengguna dari API
    axios.get("http://localhost:5000/users").then((response) => {
      // Mencari pengguna yang memiliki email dan password yang sesuai
      const user = response.data.find(
        (u) => u.email === email && u.password === password
      );

      // Jika pengguna ditemukan
      if (user) {
        // Menampilkan data pengguna yang berhasil login di konsol
        console.log("User logged in:", user);

        // Simpan data pengguna ke localStorage agar dapat digunakan di halaman lain
        localStorage.setItem("user", JSON.stringify(user)); // Store user data

        // Diredirect ke halaman utama jika berhasil login
        navigate("/home");
      } else {
        // Notifikasi jika gagal login
        alert("Email and password failed");
        // Jika gagal di redirect ke halaman login
        navigate("/");
      }
    });
  };

  return (
    <div className="flex flex-col md:flex-row h-screen">
      <div className="md:w-1/2 w-full flex flex-col justify-center items-start text-white p-16 md:p-8 go-finance">
        <div className="mx-0 md:mx-16">
          <h1 className="text-4xl font-bold mb-4">GoFinance</h1>
          <p className="mb-6">Lorem ipsum dolor sit amet</p>
          <button className="btn text-white py-1 px-5 rounded-full">
            Read More
          </button>
        </div>
      </div>
      <div className="md:w-1/2 w-full bg-white flex flex-col justify-center items-center p-8">
        <div className="w-full max-w-md">
          <h2 className="text-3xl font-bold mb-2 text-center md:text-left">
            Hello Again!
          </h2>
          <p className="mb-6 text-center md:text-left">Welcome Back</p>
          <form className="mb-4" onSubmit={handleLogin}>
            <div className="flex items-center border rounded-full py-3 px-5 mb-4">
              <i
                className="fa-regular fa-envelope text-gray-300 mr-2"
                style={{ fontSize: "1.2rem", marginTop: "1px" }}
              ></i>
              <input
                type="email"
                placeholder="Email Address"
                className="outline-none w-full placeholder:text-sm"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
            <div className="flex items-center border rounded-full py-3 px-5 mb-4">
              <i
                className="fas fa-lock text-gray-300 mr-2"
                style={{ fontSize: "1.1rem" }}
              ></i>
              <input
                type="password"
                placeholder="Password"
                className="outline-none w-full placeholder:text-sm"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>
            <button
              type="submit"
              className="btn text-white font-normal py-3 px-4 rounded-full w-full mb-4"
            >
              Login
            </button>
            <Link
              to="/register"
              className="text-gray-500 block text-center md:text-center"
            >
              Forgot Password
            </Link>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Login;
