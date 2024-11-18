import { useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar";
import TransactionTable from "../components/TransactionTable";
import { useEffect } from "react";

const Home = () => {
  // Mengambil data pengguna dari localStorage dan mengubahnya menjadi objek JavaScript
  const users = JSON.parse(localStorage.getItem("user"));
  // Menggunakan useNavigate untuk navigasi antar halaman
  const navigate = useNavigate();

  // Menggunakan useEffect untuk memeriksa keberadaan data pengguna saat komponen dimuat
  useEffect(() => {
    // Mengambil data pengguna dari localStorage lagi di dalam useEffect
    const users = JSON.parse(localStorage.getItem("user"));
    // Memeriksa apakah data pengguna tidak ada
    if (!users) {
      // Jika tidak ada data pengguna, arahkan pengguna kembali ke halaman login
      navigate("/");
    }
  }, [users, navigate]); // Menjalankan efek ini setiap kali 'users' atau 'navigate' berubah

  return (
    <>
      <Navbar />
      <div className="container min-w-full py-2 -mb-7 bg-gray-200">
        <h1 className="text-center text-sm">
          Welcome to Home, {users ? users.fullName : ""}
        </h1>
      </div>
      <div className="pt-16">
        <TransactionTable />
      </div>
    </>
  );
};

export default Home;
