import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import api from "../api/axios";
import CategorySidebar from '../components/CategorySidebar'; // ✅ import

const ProductDetail = () => {
  const { slug } = useParams();
  const [product, setProduct] = useState(null);

  useEffect(() => {
    api.get(`product/products/${slug}/`)
      .then(res => setProduct(res.data))
      .catch(err => console.error(err));
  }, [slug]);

  const addToCart = (product) => {
    // Placeholder: you can connect this to your CartContext logic
    console.log("Adding to cart:", product);
  };

  if (!product) return <div>Loading...</div>;

  return (
    <div className="flex gap-6 max-w-6xl mx-auto p-6">
      {/* Sidebar */}
      <CategorySidebar />

      {/* Product detail card */}
      <div className="flex-1">
        <div className="bg-white rounded-xl shadow-md overflow-hidden">
          <img
            src={product.images[0]?.image}
            alt={product.name}
            className="w-full h-96 object-cover"
          />
          <div className="p-6">
            <h1 className="text-3xl font-bold mb-2">{product.name}</h1>
            <p className="text-gray-600 mb-4">{product.description}</p>
            <p className="text-xl font-semibold text-green-600">Ksh {product.price}</p>
            <button
              onClick={() => addToCart(product)}
              className="bg-blue-600 text-white px-4 py-2 mt-4 rounded hover:bg-blue-700"
            >
              Add to Cart
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetail;
