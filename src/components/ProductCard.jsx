import React from 'react';
import { Link } from 'react-router-dom';

const ProductCard = ({ product }) => {
  console.log("Product Debug:", product);

  return (
    <Link to={`/product/${product.slug}`}>
      <div className="border p-4 rounded-lg shadow hover:shadow-lg transition">
        <img
          src={product.images[0]?.image}
          alt={product.name}
          className="w-full h-48 object-cover rounded mb-4"
        />
        <h2 className="text-lg font-semibold hover:underline">{product.name}</h2>
        <p className="text-sm text-gray-500">{product.description}</p>

        {/* ✅ Fixed Price Display */}
        {product.price && (
          <p className="text-primary font-bold mt-2">
            KES {product.price}
          </p>
        )}
      </div>
    </Link>
  );
};

export default ProductCard;
