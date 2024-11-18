import React from "react";

const ModalAddData = ({ isOpen, onClose, onSave }) => {
  // Menggunakan useState untuk menyimpan data item, harga, tanggal, dan status transaksi
  const [item, setItem] = React.useState(""); // Menyimpan nama item
  const [price, setPrice] = React.useState(""); // Menyimpan harga item
  const [date, setDate] = React.useState(""); // Menyimpan tanggal transaksi
  const [status, setStatus] = React.useState(""); // Menyimpan status transaksi

  // Fungsi untuk menangani pengiriman form
  const handleSubmit = (e) => {
    // Mencegah perilaku default dari form agar tidak melakukan refresh halaman
    e.preventDefault();

    // Membuat objek transaksi baru dengan data yang diambil dari state
    const newTransaction = {
      item,
      price,
      date,
      status,
    };

    // Memanggil fungsi onSave dengan objek transaksi baru sebagai argumen
    onSave(newTransaction);

    // Memanggil fungsi onClose untuk menutup form setelah pengiriman
    onClose();
  };

  // Jika isOpen bernilai false, tidak menampilkan apa pun
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
      <div className="bg-white p-6 rounded shadow-md w-3/4 md:w-1/2 lg:w-1/3">
        <h2 className="text-lg font-bold mb-4">Add New Transaction</h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label className="block mb-1">Item</label>
            <input
              type="text"
              value={item}
              onChange={(e) => setItem(e.target.value)}
              className="border rounded w-full px-2 py-1"
              required
            />
          </div>
          <div className="mb-4">
            <label className="block mb-1">Price</label>
            <input
              type="number"
              value={price}
              onChange={(e) => setPrice(e.target.value)}
              className="border rounded w-full px-2 py-1"
              required
            />
          </div>
          <div className="mb-4">
            <label className="block mb-1">Date</label>
            <input
              type="date"
              value={date}
              onChange={(e) => setDate(e.target.value)}
              className="border rounded w-full px-2 py-1"
              required
            />
          </div>
          <div className="mb-4">
            <label className="block mb-1">Status</label>
            <input
              type="text"
              value={status}
              onChange={(e) => setStatus(e.target.value)}
              className="border rounded w-full px-2 py-1"
              required
            />
          </div>
          <div className="flex justify-end">
            <button
              type="button"
              onClick={onClose}
              className="mr-2 bg-gray-300 px-4 py-2 rounded"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="bg-blue-500 text-white px-4 py-2 rounded"
            >
              Add
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ModalAddData;
