import React, { useRef } from 'react'
import Link from 'next/link'
import { AiOutlineShoppingCart, AiOutlinePlusCircle, AiOutlineMinusCircle } from 'react-icons/ai'
import { AiFillCloseCircle } from 'react-icons/ai'
import { IoIosContact } from 'react-icons/io'

import { useState } from 'react'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


const Navbar = ({ logout, user, cart, addtocart, removefromcart, clearCart, subtotal }) => {

  const togglecart = () => {
    console.log("hi")
    if (ref.current.classList.contains('translate-x-full')) {
      ref.current.classList.remove('translate-x-full')
      ref.current.classList.add('translate-x-0')
    }
    else if (!ref.current.classList.contains('translate-x-full')) {
      ref.current.classList.remove('translate-x-0')
      ref.current.classList.add('translate-x-full')
    }
  }
  const [dropdown, setdropdown] = useState(false)
  const toggleDropdown = () => {
    setdropdown(!dropdown)
  }

  const handlelogout = () => {
    toast.success("You are Successfully logged out")
    setTimeout(() => {
      logout();
    }, 2000);
  }

  console.log(cart)

  const ref = useRef()
  return (
    <header className="text-gray-600 body-font shadow-xl my-3 top-0 sticky bg-white z-10" >
      <ToastContainer
        position="top-right"
        autoClose={3000}
        hideProgressBar={true}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
      />

      <div className="container mx-auto flex flex-wrap p-5 flex-col md:flex-row items-center ">
        <Link href={'/'}>
          <a className="flex title-font font-medium items-center text-gray-900 mb-4 md:mb-0">
            <img src='./logo.png' className='h-10 w-10'></img>
            <span className="ml-3 text-xl">PeHnoDabaKe</span>
          </a></Link>
        <nav className="md:mr-auto md:ml-4 md:py-1 md:pl-4 md:border-l md:border-gray-400	flex flex-wrap items-center text-base justify-center">
          <Link href={'/tshirts'}><a className="mr-5 hover:text-gray-900">T-shirts</a></Link>
          <Link href={'/hoodies'}><a className="mr-5 hover:text-gray-900">Hoodies</a></Link>
          <Link href={'/mugs'}><a className="mr-5 hover:text-gray-900">Mugs</a></Link>
          <Link href={'/'}><a className="mr-5 hover:text-gray-900">Others</a></Link>
        </nav>

        {user.value && <IoIosContact onMouseEnter={toggleDropdown} size={40} />}

        {!user.value && <Link href={"/login"} className='mr-7'>
          <button className='cursor-pointer inline-flex items-center bg-blue-500 border-0 py-1 px-3 focus:outline-none hover:bg-gray-200 rounded text-base text-black mt-4 md:mt-0'>Login</button>
        </Link>}

        <button onClick={togglecart} className="cursor-pointer inline-flex items-center bg-gray-100 border-0 py-1 px-3 mx-2 focus:outline-none hover:bg-gray-200 rounded text-base mt-4 md:mt-0">Cart
          <AiOutlineShoppingCart />
          <svg fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" className="w-4 h-4 ml-1" viewBox="0 0 24 24">
            <path d="M5 12h14M12 5l7 7-7 7"></path>
          </svg>

        </button>



        {/* Dropdown Menu */}
        {dropdown && <div id="dropdown" onMouseLeave={toggleDropdown} className="absolute top-12 right-16 z-10 w-44  bg-white rounded my-3 divide-y divide-gray-100 shadow dark:bg-gray-700">
          <ul className="py-1 text-sm text-gray-700 dark:text-gray-200 transition ease-in origin-top-left duration-200" aria-labelledby="dropdownDefault">
            <li className='dark:hover:bg-gray-500'>
              <a href="#" className="block py-2 px-4">My Account</a>
            </li>
            <li className='dark:hover:bg-gray-500'>
              <a href="#" className="block py-2 px-4">Orders</a>
            </li>
            <li className='dark:hover:bg-gray-500'>
              <button onClick={handlelogout} href="#" className="block py-2 px-4">Logout</button>
            </li>
          </ul>
        </div>}

      </div>

      <div ref={ref} className='w-80 h-[100vh] z-20 sidecart absolute top-0 right-0 bg-pink-100 px-4 py-10 transform transition-transform translate-x-full m-4 overflow-y-scroll'>
        <h2 className='font-bold text-xl text-center my-2'>My shopping Cart</h2>
        <span onClick={togglecart} className="absolute top-3 right-3 cursor-pointer text-xl "><AiFillCloseCircle /></span>

        <ol className='list-decimal font-semibold mx-2'>
          {Object.keys(cart).length == 0 && <div className='mt-3 text-red-600'>Your Cart is Empty </div>}
          {Object.keys(cart).map((key) => {
            return <li key={key}>
              <div className='item flex m-5' >
                <div className='font-semibold w-2/3'> {cart[key].name} ({cart[key].variant}/{cart[key].size})</div>

                <div className='font-semibold w-1/3 flex items-center justify-center'><AiOutlineMinusCircle className='cursor-pointer mx-2' onClick={() => { removefromcart(key, 1, cart[key].price, cart[key].name, cart[key].size, cart[key].variant) }} />{cart[key].quantity} <AiOutlinePlusCircle className='cursor-pointer mx-2' onClick={() => { addtocart(key, 1, cart[key].price, cart[key].name, cart[key].size, cart[key].variant) }} /></div>
              </div>
            </li>
          })}
        </ol>

        <div className="flex">
          <Link href={'/checkout'}><button className="flex mx-auto mt-10 text-white bg-pink-500 border-0 py-2 px-8 focus:outline-none hover:bg-indigo-600 rounded text-lg">Checkout</button></Link>
          <button onClick={clearCart} className="flex mx-auto mt-10 text-white bg-pink-500 border-0 py-2 px-8 focus:outline-none hover:bg-indigo-600 rounded text-lg">Clear Cart</button>
        </div>

      </div>
    </header>
  )
}

export default Navbar