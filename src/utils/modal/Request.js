import React, { useRef } from 'react';

const Request = ({setIsRequestToggle,onRequest}) => {

    let price=useRef()

    const handleClose=()=>{
        setIsRequestToggle(false)
    }
    const handleRequest=(e)=>{
        e.preventDefault()
        onRequest(price.current.value)
    }
   
  return (
    <div className="fixed inset-0 z-50 overflow-hidden bg-gray-900/50 backdrop-blur-sm flex justify-center items-center">
      <form className="bg-white p-8 rounded-lg shadow-lg w-full max-w-lg">
        <div className="mb-6">
          <label className="block text-gray-700 text-sm font-semibold mb-2">
            Your Price
          </label>
          <input
          ref={price}
            type="number"
            placeholder="Enter the amount"
            className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-yellow-300 focus:border-transparent"
          />
        </div>
        
        <div className="flex justify-end space-x-4 mt-8">
          <button 
          onClick={handleClose}
            className="px-6 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-colors duration-200"
          >
            Cancel
          </button>
          <button 
           
            className="px-6 py-2 bg-yellow-300 text-gray-900 rounded-lg hover:bg-yellow-400 transition-colors duration-200"
           onClick={handleRequest}
          >
            Send Request
          </button>
        </div>
      </form>
    </div>
  );
};

export default Request;