import React from 'react';
import image from '../assets/images/business_14126701.png';
import { useDispatch, useSelector } from 'react-redux';
import { removeUser } from '../redux/slice/userSlice';
import { Link, useNavigate } from 'react-router-dom';
import { logoutApi } from '../helper/api';


const Navbar = () => {
  let user = useSelector(state=>state.user.id)

  
  let dispatch = useDispatch()
  let navigate=useNavigate()

  const handleLogout=async()=>{
    await logoutApi("/logout")
    dispatch(removeUser())
    navigate('/')

  }
  return (
    <div className='bg-blue-950 w-full h-20 flex justify-between items-center px-4 sm:px-8  '>
      <div className='flex items-center '>
        <img className="w-16 h-16 m-2" src={image} alt="Business Logo" />
        <h1 className='text-white font-bold text-lg sm:text-xl'>Deal Zone</h1>
      </div>
      <div>
      {
     
          user && <div className='flex gap-10'>
             <Link to="/products"><p className='text-white mt-2 cursor-pointer hover:border-b'>Product</p></Link>
            <Link to="/myproducts"><p className='text-white mt-2 cursor-pointer hover:border-b'>My Product</p></Link>
            <Link to="/request_status"><p className='text-white mt-2 cursor-pointer hover:border-b'>Request Status</p></Link>
            
            <button className='text-white bg-blue-800 p-2 rounded-lg  hover:bg-blue-700' onClick={handleLogout}>Logout</button>
            </div>
        }
      </div>
     
    </div>
  );
}

export default Navbar;
