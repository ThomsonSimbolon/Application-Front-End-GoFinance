import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { FaRegCircleUser } from "react-icons/fa6";

const Navbar = () => {
  // Menggunakan useState untuk menyimpan status terbuka/tutup menu dan dropdown
  const [isOpen, setIsOpen] = useState(false); // Menyimpan status dropdown (terbuka/tutup)
  const [dropdownOpen, setDropdownOpen] = useState(false);

  // Mengambil data pengguna dari localStorage dan mengubahnya menjadi objek JavaScript
  const users = JSON.parse(localStorage.getItem("user"));

  // Menggunakan useNavigate untuk navigasi antar halaman
  const navigate = useNavigate();

  // Fungsi untuk mengubah status menu utama (toggle)
  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  // Fungsi untuk mengubah status dropdown (toggle)
  const toggleDropdown = () => {
    setDropdownOpen(!dropdownOpen);
  };

  // Fungsi untuk menangani logout pengguna
  const handleLogout = () => {
    localStorage.removeItem("user"); // Menghapus data pengguna dari localStorage
    navigate("/"); // Mengarahkan pengguna kembali ke halaman login
  };

  // Fungsi untuk menangani perubahan ukuran jendela
  const handleResize = () => {
    // Jika lebar jendela lebih besar atau sama dengan 768 piksel, tutup menu
    if (window.innerWidth >= 768) {
      setIsOpen(false);
    }
  };

  // Menggunakan useEffect untuk menambahkan dan menghapus event listener resize
  useEffect(() => {
    window.addEventListener("resize", handleResize);
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []); // Efek ini hanya dijalankan sekali saat komponen dimuat

  const faBars = "fas fa-bars";
  const faTimes = "fas fa-times";

  return (
    <div>
      <nav className="bg-blue-600 px-6 md:px-24">
        <div className="flex justify-between items-center">
          <Link to="/home" className="text-white text-lg italic">
            <strong>Go</strong>Finance
          </Link>
          <div className="md:hidden py-4">
            <button className="text-white" onClick={toggleMenu}>
              <i className={isOpen ? faTimes : faBars} />
            </button>
          </div>
          <div
            className={`hidden md:flex md:items-center ${
              isOpen ? "block" : "hidden"
            }`}
          >
            <div className="border-s border-s-slate-600 pl-5">
              <div className="relative py-2">
                <button
                  onClick={toggleDropdown}
                  className="flex items-center text-white text-left"
                >
                  <FaRegCircleUser className="mr-3 size-10" />
                  <div className="flex items-start flex-col">
                    <div className="items-center -my-1">
                      {users ? users.fullName : ""}
                      <i className="fas fa-caret-down ml-2" />
                    </div>
                    <div className="text-xs">Sales Lead</div>
                  </div>
                </button>

                {dropdownOpen && (
                  <div className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg">
                    <Link
                      to="/profile"
                      className="block px-4 py-2 text-gray-800 hover:bg-gray-200 rounded-t-md"
                    >
                      Profile
                    </Link>
                    <a
                      onClick={handleLogout}
                      className="block px-4 py-2 text-gray-800 hover:bg-gray-200 rounded-b-md cursor-pointer"
                    >
                      Logout
                    </a>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </nav>

      {/* Mobile Sidebar */}
      <div
        className={`fixed inset-0 bg-gray-800 bg-opacity-75 transition-opacity ${
          isOpen ? "opacity-100" : "opacity-0 pointer-events-none"
        }`}
      >
        <div
          className={`fixed left-0 top-0 w-full bg-white h-full shadow-lg transform transition-transform ${
            isOpen ? "translate-x-0" : "-translate-x-full"
          }`}
        >
          <div className="flex justify-between items-center p-4">
            <h2 className="text-lg font-bold">Menu</h2>
            <button onClick={toggleMenu} className="text-gray-600">
              <i className={faTimes} />
            </button>
          </div>
          <nav className="mt-4">
            <Link
              to="/profile"
              className="block px-4 py-2 text-gray-800 hover:bg-gray-200"
            >
              Profile
            </Link>
            <a
              onClick={handleLogout}
              className="block px-4 py-2 text-gray-800 hover:bg-gray-200 cursor-pointer"
            >
              Logout
            </a>
          </nav>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
