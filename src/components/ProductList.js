import React from 'react'


const ProductList = ({products}) => {
    return (
        <div className='flex'>
            <div class="bg-white">
                <div class="mx-auto max-w-2xl px-4 py-8 sm:px-6 sm:py-12 lg:max-w-7xl lg:px-8">

                    <h2 class="text-2xl font-bold tracking-tight text-gray-900">Products</h2>
                    <div class="mt-6 grid grid-cols-1 gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-4 xl:gap-x-8">
                        { 
                            
                            products.map(product => (

                                <div key={product.id} class="group relative">
                                    <img src={product.image} alt={`${product.name}`} class="aspect-square w-full rounded-md bg-gray-200 object-cover group-hover:opacity-75 lg:aspect-auto lg:h-80" />
                                    <div class="mt-4 flex justify-between">
                                        <div>
                                            <h3 class="text-sm text-gray-700">
            
                                                    <span aria-hidden="true" class="absolute inset-0"></span>
                                                    {product.name}
                                                
                                            </h3>
                                            <p class="mt-1 text-sm text-gray-500">{product.category}</p>
                                        </div>
                                        <p class="text-sm font-medium text-gray-900">₹{product.price}</p>
                                    </div>
                                </div>



                            )) 
                        }
                    </div>
                </div>
            </div>

        </div>
    )
}

export default ProductList