import React from "react";
import { Link } from "react-router-dom";
import { FiHome } from "react-icons/fi";

const NotFoundPage = () => {
  return (
    <section className="container mx-auto py-16 px-4 flex flex-col items-center justify-center text-center">
      <h2 className="text-8xl font-bold text-white mb-4">404</h2>
      <p className="text-2xl text-gray-400 mb-8">
        Halaman yang kamu cari tidak ditemukan.
      </p>
      <Link
        to="/"
        className="bg-transparent border border-blue-500 text-blue-500 py-3 px-8 rounded-lg font-bold hover:bg-blue-500 hover:text-white flex items-center gap-2 transition-colors duration-200"
      >
        <FiHome /> Kembali ke Beranda
      </Link>
    </section>
  );
};

export default NotFoundPage;
