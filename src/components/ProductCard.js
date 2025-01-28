


export const ProductCard = ({ product, userRequest, ...props }) =>{
    const {isRequest} =props
   


return (

    <div key={product?.id} className="group relative">
        <div className="aspect-h-1 aspect-w-1  w-full overflow-hidden rounded-md bg-gray-200">
            <img
                src={product.image}
                alt={`${product.name}`}
                className='h-48 w-full object-cover object-center group-hover:opacity-75'

            />
        </div>
        <div className="mt-4 flex flex-col gap-2">
            <div className="flex justify-between">
                <div>
                    <h3 className="text-lg font-bold text-black-700">
                        {product.name}
                    </h3>
                    {!isRequest &&
                        <h2 className="text-sm font-medium text-gray-700 line-clamp-2 text-ellipsis">
                            {product.description}
                        </h2>

                    }

                    <p className="mt-1 text-sm text-gray-500 ">{product.category}</p>
                </div>
                <p className="text-lg font-semibold text-gray-900">₹{product.price}</p>
            </div>
            {
                isRequest ?

                    <>
                        <p className="text-base text-black-500 font-semibold line-clamp-2">Your Price:₹{props.request.request_amount}</p>
                        <div className="flex items-center justify-between">
                            <p className={`${props.request.status === 'pending' ? 'text-yellow-500' : props.request.status == 'accepted' ? 'text-green-500' : 'text-red-500'}`}>
                                Status: {props.request.status}
                            </p>
                        </div></>
                    :


                    props?.isEdit ? (
                        <>
                            {props?.requests?.some(request => request.product_id === product.id && request.status === 'pending') ? (
                                <button onClick={() => props.handleProductRequest(product.id)} className="bg-yellow-300 text-sm p-2 rounded-lg">
                                    Requested
                                </button>
                            ) : props?.requests?.some(request => request.product_id === product.id && request.status === 'accepted') ? (
                                <h1 className="bg-green-300 text-sm p-2 rounded-lg">Sold</h1>
                            ) : (
                                <div className="gap-2 flex">
                                    <button
                                        onClick={() => props.handleEdit(product)}
                                        className="px-3 py-1.5 text-sm font-medium text-white bg-blue-500 rounded-md hover:bg-blue-600 transition-colors"
                                    >
                                        Edit
                                    </button>
                                    <button
                                        onClick={() => props.handleDelete(product)}
                                        className="px-3 py-1.5 text-sm font-medium text-white bg-red-500 rounded-md hover:bg-red-600 transition-colors"
                                    >
                                        Delete
                                    </button>
                                </div>
                            )}
                        </>
                    ) : userRequest ? (
                        <p className={`${userRequest.status === 'pending' ? 'text-yellow-500' : userRequest.status === 'accepted' ? 'text-green-500' : 'text-red-500'}`}>
                            Status: {userRequest.status}
                        </p>
                    ) : (
                        <button
                            onClick={() => props.handleRequest(product)}
                            className="w-full bg-yellow-300 text-sm rounded-lg py-2 px-4 hover:bg-yellow-400 transition-colors duration-200 cursor-pointer"
                            aria-label="Request product"
                        >
                            Request
                        </button>
                    )
            }

        </div>
    </div>
)}

