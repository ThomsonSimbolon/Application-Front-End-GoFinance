import React from "react";

const Modal = ({ isOpen, onClose, transaction, onSave }) => {
  // Menggunakan useState untuk menyimpan nilai item, harga, tanggal, dan status transaksi
  const [item, setItem] = React.useState(transaction ? transaction.item : ""); // Menyimpan nama item transaksi
  const [price, setPrice] = React.useState(
    transaction ? transaction.price : ""
  ); // Menyimpan harga transaksi
  const [date, setDate] = React.useState(transaction ? transaction.date : ""); // Menyimpan tanggal transaksi
  const [status, setStatus] = React.useState(
    transaction ? transaction.status : ""
  ); // Menyimpan status transaksi

  // Menggunakan useEffect untuk memperbarui state jika transaksi yang diberikan berubah
  React.useEffect(() => {
    // Jika ada transaksi yang diberikan, setel nilai state sesuai dengan nilai transaksi
    if (transaction) {
      setItem(transaction.item);
      setPrice(transaction.price);
      setDate(transaction.date);
      setStatus(transaction.status);
    }
  }, [transaction]); // Efek ini dijalankan setiap kali 'transaction' berubah

  // Fungsi untuk menangani pengiriman form
  const handleSubmit = (e) => {
    e.preventDefault(); // Mencegah perilaku default form (refresh halaman)
    // Membuat objek transaksi yang diperbarui dengan nilai-nilai dari state
    const updatedTransaction = {
      ...transaction,
      item,
      price,
      date,
      status,
    };
    onSave(updatedTransaction);
    onClose();
  };

  // Jika isOpen bernilai false, tidak melakukan render apa pun (mengembalikan null)
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
      <div className="bg-white p-6 rounded shadow-md w-3/4  md:w-1/2 lg:w-1/3">
        <h2 className="text-lg font-bold mb-4">Edit Transaction</h2>
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
              Save
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Modal;
