import React, { useState } from 'react';
import { Player } from "@lottiefiles/react-lottie-player";
import { Formik, Form, Field, ErrorMessage } from "formik";
import { addUser } from '../redux/slice/userSlice';
import { Link, useNavigate } from "react-router";
import { toast } from 'react-toastify';
import { ClipLoader } from 'react-spinners';
import { signUpValidation } from '../utils/validation'
import { postApi } from '../helper/api';
import { useDispatch } from 'react-redux';


const Signup = () => {
    const [isLoading, setIsLoading] = useState(false)
    let navigate = useNavigate()
    let dispatch = useDispatch()
    const handleSubmit = async (values) => {
        setIsLoading(true)
        try {
            console.log(values);
            let response = await postApi('/users', values, "user")
            console.log(response);
            if (response.status == 201) {
                let result = await response.json()
       dispatch(addUser({ id: result.user._id, email: result.user.email, username: result.user.username }))
                navigate('/products')
                toast.success("Welcome to Deal Zone")
            } else {
                let result = await response.json()
                console.log(result);
                
                toast.error(result.message)
            }
        } catch (error) {
            console.log(error.message);
            
            toast.error(error.message)

        } finally {
            setIsLoading(false)
        }


    };

    return (
        <div className="flex  items-center justify-center overflow-hidden ">
            <div className="flex w-full max-w-6xl gap-10 p-4 mt-10 ">
                <div className="flex-1 flex items-center justify-center">
                    <Player
                        autoplay
                        loop
                        src="https://lottie.host/08418f2d-3f4c-4d32-851b-170234d7e500/HHwKUDUX3g.json"
                        className="w-full max-w-lg"

                    />
                </div>


                <div className="flex-1">
                    <div className="w-full max-w-md rounded-lg border border-gray-300 p-8 shadow-sm">
                        <h1 className="mb-6 text-center text-3xl font-bold text-blue-900">

                        </h1>
                        <Formik
                            initialValues={{ username: "", email: "", password: "" }}
                            validationSchema={signUpValidation}
                            onSubmit={handleSubmit}
                        >
                            {({ errors, touched }) => (



                                <Form className="space-y-6">

                                    <div className="space-y-2">

                                        <label
                                            htmlFor="username"
                                            className="block font-bold text-blue-800 text-xl"
                                        >
                                            Username
                                        </label>
                                        <Field


                                            type="text"
                                            name="username"
                                            placeholder="Enter your username"
                                            className={`w-full rounded-md border border-gray-300 p-3 focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500 ${errors.username && touched.username && "border-red-500"}`}
                                        />
                                        <ErrorMessage name="username" component="div" className="mt-1 text-sm text-red-600" />
                                    </div>



                                    <div className="space-y-2">
                                        <label
                                            htmlFor="email"
                                            className="block font-bold text-blue-800 text-xl"
                                        >
                                            Email
                                        </label>
                                        <Field
                                            name="email"
                                            type="email"
                                            placeholder="Enter your email"
                                            className={`w-full rounded-md border border-gray-300 p-3 focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500 ${errors.email && touched.email && "border-red-500"
                                                }`}

                                        />
                                        <ErrorMessage name="email" component="div" className="mt-1 text-sm text-red-600" />
                                    </div>

                                    <div className="space-y-2">
                                        <label
                                            htmlFor="password"
                                            className="block font-bold text-blue-800 text-xl"
                                        >
                                            Password
                                        </label>
                                        <Field
                                            name="password"
                                            type="password"
                                            placeholder="Enter your password"
                                            className={`w-full rounded-md border border-gray-300 p-3 focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500 ${errors.password && touched.password && "border-red-500"
                                                }`}
                                        />
                                        <ErrorMessage name="password" component="div" className="mt-1 text-sm text-red-600" />
                                    </div>

                                    <button
                                        type='submit'
                                        className="w-full rounded-lg bg-blue-800 px-6 py-3 text-white hover:bg-blue-700 transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
                                    >
                                        {
                                            isLoading ? <ClipLoader
                                                color='#ffffff'
                                                loading={isLoading}
                                                size={30}

                                            /> :
                                                "Sign Up"
                                        }

                                    </button>
                                    <p className='text-blue-800'>Already have an account? <Link to="/login"><span className='cursor-pointer'>Log In</span></Link></p>

                                </Form>
                            )}
                        </Formik>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Signup;