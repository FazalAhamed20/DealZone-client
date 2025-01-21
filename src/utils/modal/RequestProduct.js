import React from 'react'

const RequestProduct = ({request,setIsRequestProductToggle}) => {
    console.log("request.....",request.id);
    
    const handleReject=()=>{
        setIsRequestProductToggle(false)
    }
  return (
    <div className="fixed inset-0 z-50 overflow-hidden bg-gray-900/50 backdrop-blur-sm flex justify-center items-center">
    <div className='bg-white p-8 rounded-lg shadow-lg w-full max-w-lg'>
        <div className='flex flex-col justify-center items-center'>
            <h1 className='text-black font-bold text-2xl'>Request Amount</h1>
        <h1 className='text-black font-bold text-xl'>₹{request.request_amount}</h1>
        </div>
      
      <div className="flex justify-end space-x-4 mt-8">
        <button 
      onClick={handleReject}
          className="px-6 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-colors duration-200"
        >
          Reject
        </button>
        <button 
         
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