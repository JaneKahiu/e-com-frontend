import React, { useState, useEffect, useContext } from 'react';
import api from "../api/axios";
import ProductCard from '../components/ProductCard';
import { FiSearch } from 'react-icons/fi';
import CategorySidebar from '../components/CategorySidebar';
import { CartContext } from "../context/CartContext";
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-hot-toast';

const Products = () => {
  const [products, setProducts] = useState([]);
  const [pagination, setPagination] = useState({ next: null, previous: null });
  const [currentPage, setCurrentPage] = useState(1);
  const [searchTerm, setSearchTerm] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  
  const { addToCart } = useContext(CartContext);
  const navigate = useNavigate();

  const handleAddToCart = (product) => {
    const success = addToCart(product);
    if (success) {
      toast.success(`${product.name} added to cart!`);
    } else {
      navigate("/login");
    }
  };

  useEffect(() => {
    setLoading(true);
    setError(null);
    api.get(`product/products/?page=${currentPage}`)
      .then((res) => {
        setProducts(res.data.results);
        setPagination({
          next: res.data.next,
          previous: res.data.previous,
        });
        setLoading(false);
      })
      .catch((err) => {
        console.error("API Error:", err);
        setError("Failed to load products. Please try again later.");
        setLoading(false);
      });
  }, [currentPage]);

  const filteredProducts = products?.filter((p) =>
    p.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="max-w-7xl mx-auto px-6 py-6">
      {/* Search bar */}
      <div className="flex items-center mb-6">
        <div className="relative w-full">
          <FiSearch className="absolute top-1/2 left-3 transform -translate-y-1/2 text-gray-400 text-xl" />
          <input
            type="text"
            placeholder="Search products..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-400"
          />
        </div>
      </div>

      <div className="flex gap-6">
        {/* Sidebar */}
        <div className="w-1/5">
          <CategorySidebar />
        </div>

        {/* Product List */}
        <div className="w-4/5">
          {error && (
            <div className="text-center text-red-500 font-semibold text-lg mb-6">
              {error}
            </div>
          )}

          {loading ? (
            <div className="text-center text-blue-500 font-semibold text-lg">
              Loading products...
            </div>
          ) : (
            <>
              {filteredProducts.length > 0 ? (
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                  {filteredProducts.map((product) => (
                    <ProductCard
                      key={product.id}
                      product={product}
                      onAddToCart={handleAddToCart} // ✅ Pass here
                    />
                  ))}
                </div>
              ) : (
                <div className="text-center text-gray-500 mt-10">
                  {!error && "No products found."}
                </div>
              )}
            </>
          )}

          {/* Pagination */}
          <div className="flex justify-between items-center mt-10">
            <button
              className={`px-4 py-2 rounded-lg ${
                pagination.previous
                  ? 'bg-blue-500 text-white hover:bg-blue-600'
                  : 'bg-gray-300 text-gray-600 cursor-not-allowed'
              }`}
              disabled={!pagination.previous}
              onClick={() => pagination.previous && setCurrentPage(currentPage - 1)}
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
              onClick={() => pagination.next && setCurrentPage(currentPage + 1)}
            >
              Next
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Products;
