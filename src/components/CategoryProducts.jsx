import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import api from '../api/axios';
import ProductCard from './ProductCard';

const CategoryProducts = () => {
  const { slug } = useParams();
  const [products, setProducts] = useState([]);

  useEffect(() => {
    api.get(`/product/products/?category=${slug}`)
      .then(res => {
        setProducts(res.data.results || []);
      })
      .catch(err => {
        console.error('Error loading products by category:', err);
      });
  }, [slug]);

  return (
    <div className="max-w-7xl mx-auto p-6">
      <h2 className="text-2xl font-bold capitalize mb-4">{slug}</h2>
      {products.length === 0 ? (
        <p>No products found in this category.</p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {products.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      )}
    </div>
  );
};

export default CategoryProducts;
