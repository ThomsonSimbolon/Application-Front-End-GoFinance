import { useEffect, useState } from "react";
import { MdOutlineEdit } from "react-icons/md";
import { BsTrash } from "react-icons/bs";
import { IoSearchSharp } from "react-icons/io5";
import axios from "axios";
import Modal from "../components/Modal";
import ModalAddData from "../components/ModalAddData";

const TransactionTable = () => {
  // Menggunakan useState untuk menyimpan berbagai state yang diperlukan
  const [transactions, setTransactions] = useState([]); // Menyimpan daftar transaksi
  const [isModalOpen, setIsModalOpen] = useState(false); // Menyimpan status modal edit
  const [isModalAddOpen, setIsModalAddOpen] = useState(false); // Menyimpan status modal tambah
  const [currentTransaction, setCurrentTransaction] = useState(null); // Menyimpan transaksi yang sedang diedit
  const [selectedTransactions, setSelectedTransactions] = useState([]); // Menyimpan transaksi yang dipilih
  const [searchTerm, setSearchTerm] = useState(""); // Menyimpan kata kunci pencarian

  // Fungsi untuk memformat tanggal menjadi format DD/MM/YYYY javascript
  const formatDate = (dateString) => {
    const date = new Date(dateString);
    const day = String(date.getDate()).padStart(2, "0");
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const year = date.getFullYear();
    return `${day}/${month}/${year}`;
  };

  // Mengambil data transaksi saat komponen dimuat
  useEffect(() => {
    const fetchTransactions = async () => {
      try {
        // Mengambil data transaksi dari json-server
        const response = await axios.get("http://localhost:5000/transactions");
        setTransactions(response.data); // Menyimpan data transaksi ke state
      } catch (error) {
        // Menangani kesalahan jika terjadi
        console.error(error);
      }
    };
    fetchTransactions(); // Memanggil fungsi untuk mengambil transaksi
  }, []); // Efek ini hanya dijalankan sekali saat komponen dimuat

  // Fungsi untuk menambahkan data transaksi baru
  const handleAddData = async (transaction) => {
    try {
      // Mengirimkan data transaksi baru ke json-server
      const response = await axios.post(
        "http://localhost:5000/transactions",
        transaction
      );
      // Menambahkan transaksi baru ke daftar transaksi yang ada
      setTransactions([...transactions, response.data]);
    } catch (error) {
      // Menangani kesalahan jika terjadi
      console.error(error);
    }
  };

  // Fungsi untuk membuka modal tambah transaksi
  const handleTambah = (transaction) => {
    setCurrentTransaction(transaction); // Menyimpan transaksi yang dipilih
    setIsModalAddOpen(true); // Membuka modal tambah
  };

  // Fungsi untuk membuka modal edit transaksi
  const handleEdit = (transaction) => {
    setCurrentTransaction(transaction); // Menyimpan transaksi yang akan diedit
    setIsModalOpen(true); // Membuka modal edit
  };

  // Fungsi untuk menyimpan transaksi yang telah diedit atau ditambahkan
  const handleSave = async (updatedTransaction) => {
    try {
      if (updatedTransaction.id) {
        // Jika transaksi sudah ada, lakukan update
        await axios.put(
          `http://localhost:5000/transactions/${updatedTransaction.id}`,
          updatedTransaction
        );
        // Memperbarui daftar transaksi dengan transaksi yang telah diperbarui
        setTransactions(
          transactions.map((transaction) =>
            transaction.id === updatedTransaction.id
              ? updatedTransaction
              : transaction
          )
        );
      } else {
        // Jika transaksi baru, lakukan penambahan
        const response = await axios.post(
          "http://localhost:5000/transactions",
          updatedTransaction
        );
        setTransactions([...transactions, response.data]);
      }
    } catch (error) {
      // Menangani kesalahan jika terjadi
      console.error(error);
    }
  };

  // Fungsi untuk menghapus transaksi berdasarkan ID
  const handleDelete = async (id) => {
    try {
      await axios.delete(`http://localhost:5000/transactions/${id}`); // Menghapus transaksi dari json-server
      // Memperbarui daftar transaksi dengan menghapus transaksi yang telah dihapus
      setTransactions(
        transactions.filter((transaction) => transaction.id !== id)
      );
    } catch (error) {
      // Menangani kesalahan jika terjadi
      console.error(error);
    }
  };

  // Fungsi untuk memilih atau membatalkan pemilihan transaksi
  const handleSelectTransaction = (id) => {
    setSelectedTransactions((prevSelected) => {
      if (prevSelected.includes(id)) {
        // Jika transaksi sudah dipilih, hapus dari daftar terpilih
        return prevSelected.filter((transactionId) => transactionId !== id);
      } else {
        // Jika belum dipilih, tambahkan ke daftar terpilih
        return [...prevSelected, id];
      }
    });
  };

  // Fungsi untuk memilih semua transaksi
  const handleSelectAll = (e) => {
    if (e.target.checked) {
      // Jika checkbox dipilih, tambahkan semua ID transaksi ke daftar terpilih
      setSelectedTransactions(
        transactions.map((transaction) => transaction.id)
      );
    } else {
      // Jika checkbox tidak dipilih, kosongkan daftar terpilih
      setSelectedTransactions([]);
    }
  };

  // Fungsi untuk menghapus semua transaksi yang dipilih
  const handleDeleteSelected = async () => {
    try {
      // Menghapus semua transaksi yang dipilih secara bersamaan
      await Promise.all(
        selectedTransactions.map((id) =>
          axios.delete(`http://localhost:5000/transactions/${id}`)
        )
      );
      // Memperbarui daftar transaksi dengan menghapus transaksi yang telah dihapus
      setTransactions(
        transactions.filter(
          (transaction) => !selectedTransactions.includes(transaction.id)
        )
      );
      setSelectedTransactions([]); // Mengosongkan daftar terpilih setelah penghapusan
    } catch (error) {
      // Menangani kesalahan jika terjadi
      console.error(error);
    }
  };

  // Memfilter transaksi berdasarkan kata kunci pencarian
  const filteredTransactions = transactions.filter((transaction) =>
    transaction.item.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="container mx-auto px-4 lg:px-24">
      <div className="flex items-center mb-2 px-0">
        <button
          onClick={() => handleTambah(transactions)}
          className="bg-green-500 p-2 rounded text-white shadow-sm"
        >
          &rarr; Add
        </button>
      </div>

      <div className="border border-gray-300 rounded-lg shadow-md">
        <div className="flex items-center mb-2 px-4 mt-2">
          <input
            type="text"
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full px-3 py-2 border-0 rounded-md focus:outline-none outline-none placeholder:text-sm placeholder:md:text-xl"
            placeholder="Search Transaction"
          />
          <button type="submit">
            <IoSearchSharp className="size-7 text-gray-500" />
          </button>
        </div>
        <div className="overflow-x-auto">
          {/* Table Transaction */}
          <table className="min-w-full">
            <thead>
              <tr className="bg-gray-100 border border-y-2 border-gray-300">
                <th className="py-2 px-4 text-left">
                  <input
                    type="checkbox"
                    className="size-4 flex justify-center"
                    onChange={handleSelectAll}
                    checked={
                      selectedTransactions.length === transactions.length &&
                      transactions.length > 0
                    }
                  />
                </th>
                <th className="py-4 px-4 text-left">Item</th>
                <th className="py-2 px-4 text-left">Price</th>
                <th className="py-2 px-4 text-left">Date</th>
                <th className="py-2 px-4 text-left">Status</th>
                <th className="py-2 px-4 text-left">Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredTransactions.map((transaction) => (
                <tr
                  key={transaction.id}
                  className="bg-gray-100 border border-y-2 border-gray-300"
                >
                  <td className="py-2 px-4">
                    <input
                      type="checkbox"
                      checked={selectedTransactions.includes(transaction.id)}
                      onChange={() => handleSelectTransaction(transaction.id)}
                      className="size-4 flex justify-center"
                    />
                  </td>
                  <td className="py-2 px-4">{transaction.item}</td>
                  <td className="py-2 px-4">${transaction.price}</td>
                  <td className="py-2 px-4">{formatDate(transaction.date)}</td>
                  <td className="py-2 px-4">{transaction.status}</td>
                  <td className="py-2 px-4">
                    <div className="flex items-center space-x-2">
                      <button
                        onClick={() => handleEdit(transaction)}
                        className="bg-slate-200 rounded-full p-2 text-slate-600 hover:text-blue-400"
                      >
                        <MdOutlineEdit className="size-6 text-center" />
                      </button>
                      <button
                        onClick={() => handleDelete(transaction.id)}
                        className="text-slate-600 hover:text-red-700"
                      >
                        <BsTrash className="size-6 text-center" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <div className="flex justify-end p-4">
          <button
            onClick={handleDeleteSelected}
            className="bg-red-500 hover:bg-red-700 transition-all text-white px-2 py-2 rounded shadow-sm cursor-pointer xs"
            disabled={selectedTransactions.length === 0}
          >
            Delete All Selected
          </button>
        </div>
      </div>
      {isModalOpen && (
        <Modal
          isOpen={isModalOpen}
          onClose={() => setIsModalOpen(false)}
          transaction={currentTransaction}
          onSave={handleSave}
        />
      )}
      {isModalAddOpen && (
        <ModalAddData
          isOpen={isModalAddOpen}
          onClose={() => setIsModalAddOpen(false)}
          transaction={currentTransaction}
          onSave={handleAddData}
        />
      )}
    </div>
  );
};

export default TransactionTable;
