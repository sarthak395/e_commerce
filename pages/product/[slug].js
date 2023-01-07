import React, { useState } from 'react'
import router, { useRouter } from 'next/router'

import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const slug = ({ buyNow, clearCart, addtocart, tshirt, colorsizeslug }) => {
  const router = useRouter()
  const { slug } = router.query

  const [pincode, setpincode] = useState()
  const [service, setservice] = useState()

  const checkservice = async () => {
    let pins = await fetch('http://localhost:3000/api/pincode')
    let pinjson = await pins.json()
    if (pinjson.includes(parseInt(pincode))) {
      setservice(true)
      toast.success("Your Pincode is Servicable")
    }
    else {
      setservice(false)
      toast.error("Sorry !! Your Pincode is Not Servicable")
    }
  }

  const changepin = (e) => {
    setpincode(e.target.value)
  }

  const [color, setcolor] = useState(tshirt.color)
  const [size, setsize] = useState(tshirt.size)

  const refreshvariants = (newcolor, newsize) => {
    let url = `http://localhost:3000/product/${colorsizeslug[newcolor][newsize]['slug']}`
    window.location = url
  }

  return (
    <section className="text-gray-600 body-font overflow-hidden">

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

      <div className="container px-5 py-24 mx-auto">
        <div className="lg:w-4/5 mx-auto flex flex-wrap">
          <img alt="ecommerce" className="lg:w-1/2 w-full lg:h-auto h-64 object-cover object-center rounded" src={tshirt.img} />
          <div className="lg:w-1/2 w-full lg:pl-10 lg:py-6 mt-6 lg:mt-0">
            <h2 className="text-sm title-font text-gray-500 tracking-widest">BRAND NAME</h2>
            <h1 className="text-gray-900 text-3xl title-font font-medium mb-1">{tshirt.title} ({size}/{color})</h1>

            <p className="leading-relaxed">{tshirt.desc}</p>
            <div className="flex mt-6 items-center pb-5 border-b-2 border-gray-100 mb-5">
              <div className="flex">
                <span className="mr-3">Color</span>

                <div className="mt-1">
                  {Object.keys(colorsizeslug).map((item) => {
                    return (Object.keys(colorsizeslug[item]).includes(size) && <button key ={item} onClick={(e) => { refreshvariants(item, size) }} className={`border-2  ml-1  rounded-full w-6 h-6 focus:outline-none ${color == item ? "border-black" : "border-gray-300"}`} style={{ backgroundColor: item }}></button>)
                  })}
                </div>

              </div>
              <div className="flex ml-6 items-center">
                <span className="mr-3">Size</span>
                <div className="relative">

                  <select value={size} onChange={(e) => { refreshvariants(color, e.target.value); }} className="rounded border appearance-none border-gray-300 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-200 focus:border-indigo-500 text-base pl-3 pr-10">
                    {Object.keys(colorsizeslug[color]).map((size) => {
                      return (<option key = {size}>{size}</option>)
                    })}
                  </select>


                  <span className="absolute right-0 top-0 h-full w-10 text-center text-gray-600 pointer-events-none flex items-center justify-center">
                    <svg fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" className="w-4 h-4" viewBox="0 0 24 24">
                      <path d="M6 9l6 6 6-6"></path>
                    </svg>
                  </span>
                </div>
              </div>
            </div>
            <div className="flex">
              <span className="title-font font-medium text-2xl text-gray-900">₹{tshirt.price}</span>
              <button onClick={() => { buyNow(tshirt.slug, 1, tshirt.price, tshirt.title, tshirt.size, tshirt.color) }} className="flex ml-auto text-white bg-indigo-500 border-0 py-2 px-6 focus:outline-none hover:bg-indigo-600 rounded">Buy Now</button>

              <button onClick={() => { addtocart(slug, 1, tshirt.price, tshirt.title, tshirt.size, tshirt.color) }} className="flex ml-auto text-white bg-indigo-500 border-0 py-2 px-6 focus:outline-none hover:bg-indigo-600 rounded">Add to Cart</button>


              <button className="rounded-full w-10 h-10 bg-gray-200 p-0 border-0 inline-flex items-center justify-center text-gray-500 ml-4">
                <svg fill="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" className="w-5 h-5" viewBox="0 0 24 24">
                  <path d="M20.84 4.61a5.5 5.5 0 00-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 00-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 000-7.78z"></path>
                </svg>
              </button>
            </div>

            <div className="pin mt-5 flex text-sm space-x-2">
              <input type="text" onChange={changepin} placeholder='Enter Pincode' value={pincode} />
              <button onClick={checkservice} className="flex ml-auto text-white bg-indigo-500 border-0 py-2 px-6 focus:outline-none hover:bg-indigo-600 rounded">Check</button>
            </div>

          </div>
        </div>
      </div>
    </section>
  )
}

export async function getServerSideProps(context) {
  let data = await fetch(`http://localhost:3000/api/gettshirt?slug=${context.query.slug}`)
  let datajs = await data.json()
  let colorsizeslug = {}


  for (let i = 0; i < datajs.variants.length; i++) {
    if (Object.keys(colorsizeslug).includes(datajs.variants[i].color))
      colorsizeslug[datajs.variants[i].color][datajs.variants[i].size] = { slug: datajs.variants[i].slug }
    else {
      colorsizeslug[datajs.variants[i].color] = {}
      colorsizeslug[datajs.variants[i].color][datajs.variants[i].size] = { slug: datajs.variants[i].slug }
    }
  }


  return {
    props: { tshirt: datajs.tshirt, colorsizeslug: colorsizeslug }, // will be passed to the page component as props
  }
}

export default slug