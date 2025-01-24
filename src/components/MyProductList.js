import React, { useState } from 'react';
import ConfirmationModel from '../utils/modal/ConfirmationModel';
import EditProduct from '../utils/modal/EditProduct';
import RequestProduct from '../utils/modal/RequestProduct';
import { ProductCard } from './ProductCard';

const MyProductList = ({ products,onDelete,onEdit,error,setError,requests,onAccept,isRequestProductToggle,setIsRequestProductToggle,onReject,isLoading,setIsLoading }) => {
  const [isModel, setIsModel] = useState(false);
  const [request,setRequest] = useState(null)
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [isEditToggle , setIsEditToggle] = useState(false)
 
    
  const handleDelete = (product) => {
    setSelectedProduct(product);
    setIsModel(true);
  };

  const handleEdit = (product) => {
    setSelectedProduct(product);
    setIsEditToggle(true)
  };

  const handleConfirmDelete = () => {
    if (selectedProduct) {
      onDelete(selectedProduct);  
      setIsModel(false);
      setSelectedProduct(null);
    }
  };
  const handleConfirmEdit=async (updatedProduct)=>{  
     let error =await onEdit(updatedProduct)
     if(!error){
      setIsEditToggle(false)
      setSelectedProduct(null);
     }  
  }

  const handleClosToggle=()=>{
    setIsEditToggle(false)
    setError('')
  }
  const handleProductRequest=(id)=>{
    setIsRequestProductToggle(true)
    const request = requests.find(request => request.product_id ==id);
     if (request){ 
      setRequest(request)
    }
  }
  const handleProductRequestAccept=(requestId)=>{
    onAccept(requestId)
  }
  const handleProductRequestReject=(requestId)=>{
    onReject(requestId)
  }
  

  return (
    <div className="min-h-screen bg-white ">
      <div className="mx-auto max-w-2xl px-4 py-8 sm:px-6 sm:py-12 lg:max-w-7xl lg:px-8">
        {isModel && (
          <ConfirmationModel 
            onClose={() => setIsModel(false)}
            onConfirm={handleConfirmDelete}
          />
        )}
        {isEditToggle && <EditProduct onClose={handleClosToggle} onConfirm={handleConfirmEdit} product={selectedProduct} error={error} isLoading={isLoading} setIsLoading={setIsLoading}/>}
        {isRequestProductToggle && <RequestProduct request={request} setIsRequestProductToggle={setIsRequestProductToggle} onAccept={handleProductRequestAccept} onReject={handleProductRequestReject}/>}

        <h2 className="text-2xl font-bold tracking-tight text-gray-900">My Products</h2>

        <div className="mt-6 grid grid-cols-1 gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-4 xl:gap-x-8 ">
          {products.map((product) => (
          <ProductCard product={product} isEdit={true}  handleDelete={handleDelete} handleEdit={handleEdit} handleProductRequest={handleProductRequest} requests={requests}  />
          ))}
        </div>
      </div>
    </div>
  );
};

export default MyProductList;