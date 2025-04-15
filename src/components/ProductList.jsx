import React, { useState, useEffect } from 'react';
import api from "../api/axios";
import ProductCard from '../components/ProductCard';

const ProductList = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    setLoading(true);
    setError(null);
    
    // Notice the change from 'products/' to 'product/products/'
    api.get('product/products/')
      .then((res) => {
        console.log("API Response:", res.data);
        setProducts(res.data.results);
        setLoading(false);
      })
      .catch((err) => {
        console.error("API Error:", err);
        setError("Failed to load products");
        setLoading(false);
      });
  }, []);

  return (
    <div className="max-w-7xl mx-auto p-6">
      {error && (
        <div className="text-center text-red-500 font-semibold text-lg mb-4">
          {error}
        </div>
      )}
      
      {loading ? (
        <div className="text-center text-blue-500 font-semibold text-lg">
          Loading products...
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {products.length > 0 ? (
            products.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))
          ) : (
            <div className="text-center text-gray-500 mt-10">
              No products found.
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default ProductList;