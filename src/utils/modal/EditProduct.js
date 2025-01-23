import React, { useRef } from 'react';
import { uploadImageToCloudinary } from '../../helper/cloudinary';
import { Formik, Form, Field, ErrorMessage } from "formik";
import { productValidation } from '../validation';
const EditProduct = ({onClose,onConfirm,product,error}) => {


     let name=useRef()
      let description=useRef()
      let price=useRef()
      let category=useRef()
      let image=useRef()

      const handleSubmit=async(e)=>{
        e.preventDefault();
     
        
        if(!image.current.files[0]){
            image=product.image
            
        }else{
            image =  await uploadImageToCloudinary(image.current.files[0] )

        }
        
        const updatedProduct = {
            id:product.id,
          name: name.current.value,
          description: description.current.value,
          price: price.current.value,
          category: category.current.value,
          image: image
        };
       onConfirm(updatedProduct);
       
        
      }

      


  return (
    <div className="fixed inset-0 z-50 overflow-hidden bg-gray-900/50 backdrop-blur-sm flex  justify-center items-center">
      <Formik 
      initialValues={{name:product.name,description:product.description,price:product.price,category:product.category,image:product.image}}
      validationSchema={productValidation}
      onSubmit={handleSubmit}
      >
        {({errors,touched})=>(
     <Form className='bg-white p-10 rounded shadow-md w-full max-w-lg'>
        {/* {
                 error && <h1 className='text-red-600'>{error}</h1>
        } */}
        <div className='mb-4'>
          <label className='block text-gray-700 text-sm font-bold mb-2' htmlFor='name'>
            Name
          </label>
          <Form
            className='shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline'
            type='text'
            placeholder='Enter product name'
            // defaultValue={product.name}
            name='name'
          />
           <ErrorMessage name="name" component="div" className="mt-1 text-sm text-red-600" />
        </div>
        <div className='mb-4'>
          <label className='block text-gray-700 text-sm font-bold mb-2' htmlFor='description'>
            Description
          </label>
          <Form
            className='shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline'
            type='text'
            placeholder='Enter product description'
            name='description'
          />
           <ErrorMessage name="description" component="div" className="mt-1 text-sm text-red-600" />
        </div>
        <div className='mb-4'>
          <label className='block text-gray-700 text-sm font-bold mb-2' htmlFor='price'>
            Price
          </label>
          <Form
            className='shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline'
            type='number'
            placeholder='Enter product price'
            name='price'
          />
           <ErrorMessage name="price" component="div" className="mt-1 text-sm text-red-600" />
        </div>
        <div className='mb-4'>
          <label className='block text-gray-700 text-sm font-bold mb-2' htmlFor='category'>
            Category
          </label>
          <Form
            className='shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline'
            type='text'
            placeholder='Enter product category'
            name='category'
          />
           <ErrorMessage name="category" component="div" className="mt-1 text-sm text-red-600" />
        </div>
        <div className='mb-4'>
          <label className='block text-gray-700 text-sm font-bold mb-2' htmlFor='image'>
         Image
          </label>
          <input
            type='file'
            accept='image/*'
            placeholder='Image'
            ref={image}
          />
        </div>
        <div className='flex items-center gap-5'>
          <button
            className='bg-blue-800 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline'
         
        
          >
            Edit Product
         
           
          </button>
      
          <button
          className='bg-red-800 hover:bg-red-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline'
          onClick={onClose}
    
        
        >
         Cancel
        </button>
    
          
        </div>
      </Form>
      )}
      </Formik>
    </div>
    

  );
};

export default EditProduct;