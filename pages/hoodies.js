import Link from 'next/link'
import React from 'react'

const hoodies = ({ products }) => {
  return (
    <section className="text-gray-600 body-font">
      <div className="container px-5 py-24 mx-auto">
        <div className="flex flex-wrap -m-4 justify-center">

          {Object.keys(products).map((item) => {
            return (
              <Link key={products[item]._id} href={`/product/${products[item].slug}`}><div className="relative cursor-pointer lg:w-1/5 md:w-1/4 p-4 w-full shadow-lg m-4 ">
                <a className="block relative rounded overflow-scroll ">
                  <img alt="ecommerce" className="object-cover object-center w-full h-56 block" src={products[item].img} />
                </a>
                <div className="mt-4 inset-x-0 bottom-0">
                  <h3 className="text-gray-500 text-xs tracking-widest title-font mb-1">{products[item].category}</h3>
                  <h2 className="text-gray-900 title-font text-lg font-medium">{products[item].title}</h2>
                  <p className="mt-1">{products[item].desc}</p>
                  <p className="mt-1">{products[item].price}</p>
                  <div className="mt-1">
                    {products[item].size.includes("S") && <span className='border border-black px-2 '>S</span>}
                    {products[item].size.includes("M") && <span className='border border-black px-2 '>M</span>}
                    {products[item].size.includes("L") && <span className='border border-black px-2 '>L</span>}
                    {products[item].size.includes("XL") && <span className='border border-black px-2 '>XL</span>}
                    {products[item].size.includes("XXL") && <span className='border border-black px-2 '>XXL</span>}
                  </div>
                  <div className="mt-1">
                    {products[item].color.map((col)=>{
                      return (<button key={col} className="border-2 border-gray-300 ml-1  rounded-full w-6 h-6 focus:outline-none" style={{backgroundColor:col}}></button>)
                    })}
                    </div>
                </div>
              </div></Link>
            )
          })}
        </div>
      </div>
    </section>
  )
}

export async function getServerSideProps(context) {
  let data = await fetch("http://localhost:3000/api/gethoodies")
  let products = await data.json()

  let hoodies = {}
  products.products.map((item) => {
    if (item.title in hoodies) {
      if (!hoodies[item.title].color.includes(item.color) && item.availabilQty > 0) {
        hoodies[item.title].color.push(item.color);
      }
      if (!hoodies[item.title].size.includes(item.size) && item.availabilQty > 0) {
        hoodies[item.title].size.push(item.size);
      }
    }
    else {
      hoodies[item.title] = JSON.parse(JSON.stringify(item)); // deep copying
      if (item.availabilQty > 0) {
        hoodies[item.title].color = [item.color];
        hoodies[item.title].size = [item.size];
      }
    }
  })

  return {
    props: { products: JSON.parse(JSON.stringify(hoodies)) }, // will be passed to the page component as props
  }
}

export default hoodies