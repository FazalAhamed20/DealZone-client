import React, { useState } from 'react';
import ConfirmationModel from '../utils/modal/ConfirmationModel';

const MyProductList = ({ products }) => {
  const [isModel, setIsModel] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState(null);

  const handleDelete = (product) => {
    setSelectedProduct(product);
    setIsModel(true);
  };

  const handleEdit = (product) => {
    console.log("Editing product:", product);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="mx-auto max-w-2xl px-4 py-8 sm:px-6 sm:py-12 lg:max-w-7xl lg:px-8">
        {isModel && (
          <ConfirmationModel 
            onClose={() => setIsModel(false)}
            product={selectedProduct}
          />
        )}

        <h2 className="text-2xl font-bold tracking-tight text-gray-900">My Products</h2>

        <div className="mt-6 grid grid-cols-1 gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-4 xl:gap-x-8">
          {products.map((product) => (
            <div key={product.id} className="group relative bg-white p-4 rounded-lg shadow-sm">
              <div className="aspect-h-1 aspect-w-1 w-full overflow-hidden rounded-lg">
                <img
                  src={product.image}
                  alt={product.name}
                  className="h-48 w-full object-cover object-center group-hover:opacity-75"
                />
              </div>
              <div className="mt-4 space-y-2">
                <h3 className="text-sm font-medium text-gray-900">{product.name}</h3>
                <p className="text-sm text-gray-500">{product.category}</p>
                <p className="text-sm text-gray-500 line-clamp-2">{product.description}</p>
                <div className="flex items-center justify-between">
                  <p className="text-lg font-semibold text-gray-900">₹{product.price}</p>
                  <div className="flex gap-2">
                    <button
                      onClick={() => handleEdit(product)}
                      className="px-3 py-1.5 text-sm font-medium text-white bg-blue-500 rounded-md hover:bg-blue-600 transition-colors"
                    >
                      Edit
                    </button>
                    <button
                      onClick={() => handleDelete(product)}
                      className="px-3 py-1.5 text-sm font-medium text-white bg-red-500 rounded-md hover:bg-red-600 transition-colors"
                    >
                      Delete
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default MyProductList;