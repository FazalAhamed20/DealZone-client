import React, { useState } from 'react';
import Request from '../utils/modal/Request';


const ProductList = ({products,onRequestSubmit,isRequestToggle,setIsRequestToggle}) => {
    
      const [requestProduct,setRequestProduct]=useState(null)


    const handleRequest=(product)=>{
      
        setRequestProduct(product)
        setIsRequestToggle(true)


    }
    const handleSubmitRequest=async(price)=>{
        onRequestSubmit(price,requestProduct.id)
        
       
        

    }
    return (
        <>
         {isRequestToggle && <Request setIsRequestToggle={setIsRequestToggle} onRequest={handleSubmitRequest} />}
        <div className="w-full">
            <div className="bg-white">
                <div className="mx-auto max-w-2xl px-4 py-8 sm:px-6 sm:py-12 lg:max-w-7xl lg:px-8">
                    <h2 className="text-2xl font-bold tracking-tight text-gray-900">Products</h2>
                    
                    <div className="mt-6 grid grid-cols-1 gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-4 xl:gap-x-8">
                        {products.map(product => (
                            <div key={product.id} className="group relative">
                                <div className="aspect-square w-full overflow-hidden rounded-md bg-gray-200">
                                    <img 
                                        src={product.image} 
                                        alt={`${product.name}`} 
                                       
                                    />
                                </div>
                                <div className="mt-4 flex flex-col gap-2">
                                    <div className="flex justify-between">
                                        <div>
                                            <h3 className="text-sm text-gray-700">
                                                {product.name}
                                            </h3>
                                            <h2 className="text-sm text-gray-700">
                                                {product.description}
                                            </h2>
                                            <p className="mt-1 text-sm text-gray-500">{product.category}</p>
                                        </div>
                                        <p className="text-sm font-medium text-gray-900">₹{product.price}</p>
                                    </div>
                                    <button 
                                        onClick={() =>handleRequest(product)}
                                        className="w-full bg-yellow-300 text-sm rounded-lg py-2 px-4 hover:bg-yellow-400 transition-colors duration-200 cursor-pointer"
                                    >
                                        Request
                                    </button>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
        </>
    );
};

export default ProductList;