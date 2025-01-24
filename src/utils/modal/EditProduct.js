import React, { useRef } from 'react';
import { uploadImageToCloudinary } from '../../helper/cloudinary';
import { Formik, Form, Field, ErrorMessage } from "formik";
import { productValidation } from '../validation';
import { ClipLoader } from 'react-spinners';
import useCategories from '../../hooks/useCategories';

const EditProduct = ({onClose,onConfirm,product,isLoading,setIsLoading}) => {
         


  let categories = useCategories()
  console.log(categories);
    
      let imageRef=useRef()

      const handleSubmit=async(values)=>{
        setIsLoading(true)
       let image;
        if(imageRef.current.files[0]){
          image =  await uploadImageToCloudinary(imageRef.current.files[0] )  
        }else{
          image=product.image
           

        }
        
    
       onConfirm({...values,image:image,id:product.id});
       
        
      }

      


  return (
    <div className="fixed inset-0 z-50 overflow-hidden bg-gray-900/50 backdrop-blur-sm flex  justify-center items-center">
      <Formik 
      initialValues={{name:product.name,description:product.description,price:product.price,category:product.category,image:product.image}}
      validationSchema={productValidation}
      onSubmit={handleSubmit}
      >
        {({errors,touched,setFieldValue})=>(
     <Form className='bg-white p-10 rounded shadow-md w-full max-w-lg'>
       
        <div className='mb-4'>
          <label className='block text-gray-700 text-sm font-bold mb-2' htmlFor='name'>
            Name
          </label>
          <Field
            className={`shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline ${errors.name && touched.name && "border-red-500"}`}
            type='text'
            placeholder='Enter product name'
            name='name'
          />
           <ErrorMessage name="name" component="div" className="mt-1 text-sm text-red-600" />
        </div>
        <div className='mb-4'>
          <label className='block text-gray-700 text-sm font-bold mb-2' htmlFor='description'>
            Description
          </label>
          <Field
            className={`shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline ${errors.description && touched.description && "border-red-500"}`}
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
          <Field
            className={`shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline ${errors.price && touched.price && "border-red-500"}`}
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
          <div className="flex gap-10">
             <select 
               onChange={(e) => {
                 setFieldValue('category', e.target.value)
               }}
               className="border border-black rounded-lg py-2"
             >
            {
            categories.map(category => {
              return (
                <option key={category.category} value={category.category}>
                  {category.category}
                </option>
              );
            })
          }
          
             </select>
          
             <Field
               type='text'
               name='category'
               placeholder='Enter product category'
               className={`shadow appearance-none border rounded w-1/2 py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline ${errors.category && touched.category && "border-red-500"}`}

             />
           </div>
        </div>
        <div className='mb-4'>
          <label className='block text-gray-700 text-sm font-bold mb-2' htmlFor='image'>
         Image
          </label>
          <input
            type='file'
            accept='image/*'
            placeholder='Image'
            ref={imageRef}
          />
        </div>
        <div className='flex items-center gap-5'>
          <button
            className='bg-blue-800 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline'
         
        
          >
              {
                                    isLoading ? <ClipLoader
                                        color='#ffffff'
                                        loading={isLoading}
                                        size={40}

                                    /> :
                                   "Edit Product"
                                        
                                }
           
         
           
          </button>
          {!isLoading &&
           <button
           className='bg-red-800 hover:bg-red-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline'
           onClick={onClose}
     
         
         >
          Cancel
         </button>

          }
      
         
    
          
        </div>
      </Form>
      )}
      </Formik>
    </div>
    

  );
};

export default EditProduct;