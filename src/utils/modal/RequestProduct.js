import React from 'react'

const RequestProduct = ({request,setIsRequestProductToggle,onAccept,onReject}) => {
   
    
    const handleReject=(id)=>{
      onReject(id)
        
    }
    const handleAccept=(id)=>{
      onAccept(id)
    }

  return (
    <div className="fixed inset-0 z-50 overflow-hidden bg-gray-900/50 backdrop-blur-sm flex justify-center items-center">
    <div className='bg-white p-8 rounded-lg shadow-lg w-full max-w-lg'>
        <div className=''>
        <div className='mb-2 flex gap-2'>
    <h1 className='text-lg text-gray-800'>Requested By :</h1>
    <h1 className='text-lg text-gray-800'>{request.product.user.username}</h1>
  </div>
  <div className='mb-2 flex gap-2'>
    <h1 className='text-lg text-gray-800'>Actual Amount :</h1>
    <h1 className='text-lg text-gray-800'>₹{request.product.price}</h1>
  </div>
  <div className='mb-2 flex gap-2'>
    <h1 className='text-lg text-gray-800'>Request Amount :</h1>
    <h1 className='text-lg text-gray-800'>₹{request.request_amount}</h1>
  </div>
        </div>
      
      <div className="flex justify-end space-x-4 mt-8">
        <button 
      onClick={()=>handleReject(request.id)}
          className="px-6 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-colors duration-200"
        >
          Reject
        </button>
        <button 
         onClick={()=>handleAccept(request.id)}
         
          className="px-6 py-2 bg-yellow-300 text-gray-900 rounded-lg hover:bg-yellow-400 transition-colors duration-200"
     
        >
          Accept
        </button>
      </div>
      </div>
  </div>
  )
}

export default RequestProduct