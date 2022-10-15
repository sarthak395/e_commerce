import '../styles/globals.css'
import Navbar from '../components/Navbar'
import Footer from '../components/Footer'
import { useEffect, useState } from 'react'
import { useRouter } from 'next/router'

function MyApp({ Component, pageProps }) {
  const [cart, setcart] = useState({})
  const router=useRouter()

  useEffect(() => {
    if (localStorage.getItem("cart")) {
      setcart(JSON.parse(localStorage.getItem("cart")))
    }
  }, [])


  const saveCart = (mycart) => {
    localStorage.setItem("cart", JSON.stringify(mycart))
  }

  const addtocart = (itemcode, quantity, price, name, size, variant) => {
    let mycart = JSON.parse(JSON.stringify(cart)) // to copy accurately
    if (itemcode in cart) {
      mycart[itemcode].quantity = mycart[itemcode].quantity + quantity
    }
    else {
      mycart[itemcode] = { quantity: 1, price, name, size, variant }
    }
    setcart(mycart)
    saveCart(mycart) // adds our cart to local storage so that it stays there on reload
  }

  const clearCart = () => {
    setcart({})
    saveCart({})
    console.log("Cart cleared")
  }

  const removefromcart = (itemcode, quantity, price, name, size, variant) => {
    let mycart = JSON.parse(JSON.stringify(cart)) // to copy accurately
    if (itemcode in cart) {
      mycart[itemcode].quantity = mycart[itemcode].quantity - quantity
    }
    if (mycart[itemcode].quantity <= 0)
      delete mycart[itemcode]

    setcart(mycart)
    saveCart(mycart) // adds our cart to local storage so that it stays there on reload
  }

  const buyNow=(itemcode,quantity, price, name, size, variant)=>{
    let newcart={}
    newcart[itemcode]={ quantity: 1, price, name, size, variant }
    setcart(newcart)
    saveCart(newcart)
    router.push('/checkout')
  }

  return <div>
    <Navbar cart={cart} addtocart={addtocart} removefromcart={removefromcart} clearCart={clearCart} />
    <Component buyNow={buyNow} cart={cart} addtocart={addtocart} removefromcart={removefromcart} clearCart={clearCart} {...pageProps} />
    <Footer />
  </div>
}

export default MyApp
