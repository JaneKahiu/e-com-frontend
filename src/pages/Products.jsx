import React, { useState, useEffect } from 'react';
import api from "../api/axios";
import ProductCard from '../components/ProductCard';
import { FiSearch } from 'react-icons/fi';

const Products = () => {
  const [products, setProducts] = useState([]);
  const [pagination, setPagination] = useState({ next: null, previous: null });
  const [currentPage, setCurrentPage] = useState(1);
  const [searchTerm, setSearchTerm] = useState('');
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setLoading(true);
    api.get(`products/?page=${currentPage}`)
      .then((res) => {
        setProducts(res.data.results);
        setPagination({
          next: res.data.next,
          previous: res.data.previous,
        });
        setLoading(false);
      })
      .catch((err) => {
        console.error(err);
        setLoading(false);
      });
  }, [currentPage]);

  const filteredProducts = products.filter((p) =>
    p.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  return (
    <div className="max-w-7xl mx-auto p-6">
      {/* Search bar with icon */}
    <div className="flex items-center mb-6">
      <div className="relative w-full">
        {/* Search Icon */}
        <FiSearch className="absolute top-1/2 left-3 transform -translate-y-1/2 text-gray-400 text-xl" />
        
        {/* Input */}
        <input
          type="text"
          placeholder="Search products..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-400"
        />
      </div>
    </div>


      {/* Product cards */}
      {loading ? (
        <div className="text-center text-blue-500 font-semibold text-lg">
          Loading products...
        </div>
      ) : (
        <>
          {filteredProducts.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
              {filteredProducts.map((product) => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
          ) : (
            <div className="text-center text-gray-500 mt-10">
              No products found.
            </div>
          )}
        </>
      )}

      {/* Pagination controls */}
      <div className="flex justify-between items-center mt-10">
        <button
          className={`px-4 py-2 rounded-lg ${
            pagination.previous
              ? 'bg-blue-500 text-white hover:bg-blue-600'
              : 'bg-gray-300 text-gray-600 cursor-not-allowed'
          }`}
          disabled={!pagination.previous}
          onClick={() => handlePageChange(currentPage - 1)}
        >
          Previous
        </button>

        <span className="text-sm text-gray-500">Page {currentPage}</span>

        <button
          className={`px-4 py-2 rounded-lg ${
            pagination.next
              ? 'bg-blue-500 text-white hover:bg-blue-600'
              : 'bg-gray-300 text-gray-600 cursor-not-allowed'
          }`}
          disabled={!pagination.next}
          onClick={() => handlePageChange(currentPage + 1)}
        >
          Next
        </button>
      </div>
    </div>
  );
};

export default Products;
