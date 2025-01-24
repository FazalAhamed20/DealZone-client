import React, { useState } from 'react';
import Request from '../utils/modal/Request';
import { useSelector } from 'react-redux';
import { ProductCard } from './ProductCard';



const ProductList = ({ products, onRequestSubmit, isRequestToggle, setIsRequestToggle, selectedCategory }) => {
    let user = useSelector(state => state.user)
    const [requestProduct, setRequestProduct] = useState(null)

    const handleRequest = (product) => {
        setRequestProduct(product)
        setIsRequestToggle(true)
    }

    const handleSubmitRequest = async (price) => {
        onRequestSubmit(price, requestProduct.id)
    }



    return (
        <>
            {isRequestToggle && <Request setIsRequestToggle={setIsRequestToggle} onRequest={handleSubmitRequest} requestProduct={requestProduct} />}
            <div className="min-h-screen bg-white ">
      <div className="mx-auto max-w-2xl px-4 py-8 sm:px-6 sm:py-12 lg:max-w-7xl lg:px-8">

                        <h2 className="text-2xl font-bold tracking-tight text-gray-900">{selectedCategory == "All" ? "Products" : selectedCategory}</h2>

                        <div className="mt-6 grid grid-cols-1 gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-4 xl:gap-x-8 ">
                            {products.map((product) => {

                                const userRequest = product.requests?.find(
                                    (request) => request.user_id === user.id
                                );

                                return (
                                    
                                    <ProductCard key={product.id} userRequest={userRequest} product={product} handleRequest={handleRequest} />
                                )
                            })}
                        </div>
                    </div>
                </div>
          
        </>
    );
};

export default ProductList;

