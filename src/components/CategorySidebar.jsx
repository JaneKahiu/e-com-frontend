import React, { useEffect, useState } from 'react';
import api from '../api/axios';
import { Link } from 'react-router-dom';

const CategorySidebar = () => {
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    api.get('/product/categories/')
      .then(res => setCategories(res.data))
      .catch(err => console.error(err));
  }, []);

  return (
    <div className="bg-white p-4 rounded shadow-md w-64">
      <h2 className="text-xl font-bold mb-4">Categories</h2>
      <ul>
        {categories.map(cat => (
          <li key={cat.id} className="mb-2">
            <Link to={`/category/${cat.slug}`} className="text-blue-600 hover:underline">
              {cat.name}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default CategorySidebar;
