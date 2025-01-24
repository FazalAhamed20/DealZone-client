import React, { useEffect, useState } from 'react'
import { getApi } from '../helper/api';
import { ShimmerPostList } from 'react-shimmer-effects';
import { ProductCard } from './ProductCard';

const RequestStatus = () => {
    const [requestDetails,setRequestDetails] = useState(null)

    useEffect(()=>{
        fetchRequest()
    },[])

    const fetchRequest=async()=>{
        try {
            let response= await getApi("/requests")
         
            if (response.status == 200){
                let result = await response.json()
                setRequestDetails(result.requests)
            }  
        } catch (error) {
            console.log(error);   
        }
    }
    if(requestDetails==null){
       return (<ShimmerPostList postStyle="STYLE_FOUR" col={3} row={2} gap={30} />)
    }
    if (requestDetails.length ==0){
        return <p className='align-middle justify-center flex mt-40 font-bold text-4xl'>No Requested Products</p>
    }


  return (

<div className="min-h-screen bg-white">
<div className="mx-auto max-w-2xl px-4 py-8 sm:px-6 sm:py-12 lg:max-w-7xl lg:px-8">
  <h2 className="text-2xl font-bold tracking-tight text-gray-900">Your Requests</h2>
  <div className="mt-6 grid grid-cols-1 gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-4 xl:gap-x-8">

  { requestDetails.map((request) => (
    <ProductCard product={request.product} request={request} isRequest={true}/>
      // <div key={request.id} className="group relative bg-white p-4 rounded-lg shadow-sm">
      //   <div className="aspect-h-1 aspect-w-1 w-full overflow-hidden rounded-lg">
      //     <img
      //       src={request.product.image}
      //       alt={request.product.name}
      //       className="h-48 w-full object-cover object-center group-hover:opacity-75"
      //     />
      //   </div>
      //   <div className="mt-4 space-y-2">
      //     <h3 className="text-sm font-medium text-gray-900">Product:{request.product.name}</h3>
      //     <p className="text-sm text-gray-500">Actual Price:₹{request.product.price}</p>
          // <p className="text-sm text-gray-500 line-clamp-2">Your Price:₹{request.request_amount}</p>
          // <div className="flex items-center justify-between">
          // <p className={`${request.status === 'pending' ? 'text-yellow-500' : request.status == 'accepted' ? 'text-green-500' : 'text-red-500'}`}>
          //    Status: {request.status}
          //     </p>
          // </div>
      //   </div>
      // </div>
    ))}
  </div>
</div>
</div>
  )
}

export default RequestStatus