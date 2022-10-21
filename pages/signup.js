import React, { useEffect, useState } from 'react'
import Link from 'next/link'
import { data } from 'autoprefixer'

import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const signup = () => {

    const [name, setname] = useState()
    const [contact, setcontact] = useState()
    const [email, setemail] = useState()
    const [password, setpassword] = useState()

    const handlechange = (e) => {
        if (e.target.name == "name") {
            setname(e.target.value)
        }
        if (e.target.name == "email") {
            setemail(e.target.value)
        }
        if (e.target.name == "password") {
            setpassword(e.target.value)
        }
        if (e.target.name == "contact") {
            setcontact(e.target.value)
        }
    }

    const reset = () => {
        setname("");
        setcontact(0);
        setemail("");
        setpassword("");
    }

    const handlesubmit = async (e) => {
        e.preventDefault()
        const datatosend = { name, email, password, contact }
        console.log(JSON.stringify(datatosend))
        let res = await fetch('http://localhost:3000/api/signup', {
            method: 'POST',
            headers: {
                'Content-Type': 'application / json'
            }, 
            body: JSON.stringify(datatosend),
        })

        let response = await res.json()
        if (response.error)
            toast.error(response.error)
        else
            toast.success("Your Account has been successfully created")

        reset();
    }

    return (
        <section class=" light:bg-gray-900 " >
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
            <div class="flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0 overflow-scroll mt-4">

                <div class="w-full bg-white rounded-lg shadow dark:border md:mt-0 sm:max-w-md xl:p-0  dark:border-gray-700">
                    <div class="p-6 space-y-4 md:space-y-6 sm:p-8">
                        <h1 class="text-xl font-bold leading-tight tracking-tight  md:text-2xl ">
                            Create  account
                        </h1>
                        <form class="space-y-4 md:space-y-6" onSubmit={handlesubmit}>
                            <div>
                                <label for="name" class="block mb-2 text-sm font-medium ">Full Name</label>
                                <input value={name} onChange={handlechange} type="text" name="name" id="name" class="focus:shadow-xl border border-gray-300  sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5  dark:border-gray-600 dark:placeholder-gray-400 dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Darwin Vinayak Gupta" required="true" />
                            </div>
                            <div>
                                <label for="contact" class="block mb-2 text-sm font-medium ">Your Contact</label>
                                <input value={contact} onChange={handlechange} type="number" name="contact" id="contact" class="focus:shadow-xl border border-gray-300  sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5  dark:border-gray-600 dark:placeholder-gray-400 dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="+91 XXXXXXXXXX" required="true" />
                            </div>
                            <div>
                                <label for="email" class="block mb-2 text-sm font-medium ">Your email</label>
                                <input value={email} onChange={handlechange} type="email" name="email" id="email" class="focus:shadow-xl border border-gray-300  sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5  dark:border-gray-600 dark:placeholder-gray-400 dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="name@company.com" required="true" />
                            </div>
                            <div>
                                <label for="password" class="block mb-2 text-sm font-medium ">Password</label>
                                <input value={password} onChange={handlechange} type="password" name="password" id="password" placeholder="••••••••" class="focus:shadow-xl border border-gray-300  sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-400 block w-full p-2.5  dark:border-gray-600 dark:placeholder-gray-400 dark:focus:ring-blue-500 dark:focus:border-blue-500" required="true" />
                            </div>
                            <div class="flex items-start">
                                <div class="flex items-center h-5">
                                    <input onChange={handlechange} id="terms" aria-describedby="terms" type="checkbox" class="w-4 h-4 border border-gray-300 rounded  focus:ring-3 focus:ring-primary-300  dark:border-gray-600 dark:focus:ring-primary-600 dark:ring-offset-gray-800" required="true" />
                                </div>
                                <div class="ml-3 text-sm">
                                    <label for="terms" class="font-light ">I accept the <a class="font-medium text-primary-600 hover:underline dark:text-primary-500" href="https://www.termsandconditionsgenerator.com/live.php?token=kUcotjA761thU88qNnAt9i5dxj6AbhZD">Terms and Conditions</a></label>
                                </div>
                            </div>
                            <button type="submit" class="w-full text-white bg-blue-600 hover:bg-primary-700 focus:ring-4 focus:outline-none focus:ring-primary-300 focus:bg-blue-400 transition-{ ease-out .5s} font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800">Create an account</button>
                            <p class="text-sm font-light ">
                                Already have an account? <Link href={'/login'}><a href="#" class="font-medium text-primary-600 hover:underline dark:text-primary-500">Login here</a></Link>
                            </p>
                        </form>
                    </div>
                </div>
            </div>
        </section >
    )
}

export default signup