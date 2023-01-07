import React from 'react'

import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const order = ({cart}) => {

  var subtotal = 0;
  let keys = Object.keys(cart) // itemcode is the key
  for (var i = 0; i < keys.length; i++) {
    subtotal += cart[keys[i]].quantity * cart[keys[i]].price
  }

  

  return (
    <section className="text-gray-600 body-font overflow-hidden">
      
      <div className="container px-5 py-24 mx-auto">
        <div className="lg:w-4/5 mx-auto flex flex-wrap">
          <div className="lg:w-1/2 w-full lg:pr-10 lg:py-6 mb-6 lg:mb-0">
            <h2 className="text-sm title-font text-gray-500 tracking-widest">PeHnoDabake</h2>
            <h1 className="text-green-600 text-3xl title-font font-medium mb-4">Order id : #973939 </h1>
            <p className="text-blue-700 leading-relaxed mb-4">Your Order has been successfully placed</p>
            <div className="flex mb-4">
              <a className="flex-grow border-b-2 border-gray-300 py-2 text-lg px-1">Item Description</a>
              <a className="flex-grow border-b-2 border-gray-300 py-2 text-lg px-1">Quantity</a>
              <a className="flex-grow border-b-2 border-gray-300 py-2 text-lg px-1">Total</a>
            </div>
            
            {Object.keys(cart).map((k) => {
                  return (<div key={k} className="flex border-t border-gray-200 py-2">
                  <span className="text-gray-900">{cart[k].name}</span>
                  <span className="ml-[30%] text-gray-900">{cart[k].quantity}</span>
                  <span className="ml-[30%] text-gray-900">${cart[k].price * cart[k].quantity}</span>
                </div>)
                })}
            
            <div className="flex mt-36">
              <span className="title-font font-medium text-2xl text-gray-900">Subtotal : ${subtotal}</span>
              <button className="flex ml-auto text-white bg-indigo-500 border-0 py-2 px-6 focus:outline-none hover:bg-indigo-600 rounded">Track</button>
            </div>
          </div>
          <img alt="ecommerce" className="lg:w-1/2 w-full lg:h-auto h-64 object-cover object-center rounded" src="https://dummyimage.com/400x400" />
        </div>
      </div>
    </section>
  )
}

export default order