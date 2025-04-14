import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import api from "../api/axios";

const ProductDetail = () => {
  const { slug } = useParams();
  const [product, setProduct] = useState(null);

  useEffect(() => {
    api.get(`products/${slug}/`)
      .then(res => setProduct(res.data))
      .catch(err => console.error(err));
  }, [slug]);

  if (!product) return <div>Loading...</div>;

  return (
    <div className="p-6 max-w-4xl mx-auto">
      <img src={product.images[0]?.image} alt={product.name} className="w-full h-80 object-cover mb-4" />
      <h1 className="text-3xl font-bold">{product.name}</h1>
      <p className="text-gray-600 mt-2">{product.description}</p>
      <p className="text-xl font-semibold mt-4">${product.price}</p>
      {/* Add to Cart button here */}
    </div>
  );
};

export default ProductDetail;
