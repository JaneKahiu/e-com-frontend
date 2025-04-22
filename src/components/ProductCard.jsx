import React from 'react';
import { Link } from 'react-router-dom';
import toast from 'react-hot-toast';

const ProductCard = ({ product, onAddToCart }) => {
  const handleClick = () => {
    const added = onAddToCart(product);
    if (added) {
      toast.success(`${product.name} added to cart!`);
    }
  };

  return (
    <div className="border p-4 rounded-lg shadow hover:shadow-lg transition flex flex-col justify-between">
      <Link to={`/product/${product.slug}`}>
        <img
          src={product.images[0]?.image}
          alt={product.name}
          className="w-full h-48 object-cover rounded mb-4"
        />
        <h2 className="text-lg font-semibold hover:underline">{product.name}</h2>
        <p className="text-sm text-gray-500">{product.description}</p>

        {product.price && (
          <p className="text-primary font-bold mt-2">
            KES {product.price}
          </p>
        )}
      </Link>

      <button
        onClick={handleClick}
        className="mt-4 bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition"
      >
        Add to Cart
      </button>
    </div>
  );
};

export default ProductCard;
