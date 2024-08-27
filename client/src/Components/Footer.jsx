import React from 'react'
import img1 from '../assets/prime.jpeg'
import logo from '../assets/splits_logo.png'
export default function Footer() {
    return (
        <div className='my-20'>
            <div className='w-full h-[1px] bg-neutral-600 opacity-45'></div>

            <div className='flex justify-between'>
                <div className='mt-20 sm:ml-12 '>
                    <div className='flex'>
                        <div className='w-3 h-6 -mt-4 bg-white blur-[28px]'></div>
                        <img className='h-8 -ml-4 w-7 mt-1 rounded-md' src={logo} alt="logo" />
                        <h1 className='mt-[5px] font-bold text-2xl ml-1'>Splits</h1>
                    </div>
                    <div className='mt-4'>
                        <h1 className='text-[14px] text-neutral-500  font-thin'>
                            Builded by <a target='blank' href='https://www.linkedin.com/in/umesh-ola-a07501231' className='text-blue-500 font-semibold text-[14px]'>@Umesh</a>
                        </h1>
                    </div>
                </div>
                <div className='mt-24 sm:mr-24 flex'>
                    <div>
                        <div>
                            <a href="/price">
                                <h1 className='text-[14px] hover:text-neutral-300 hover:cursor-pointer text-neutral-500  font-thin'>
                                    Pricing
                                </h1>
                            </a>
                        </div>
                        <div>
                            <a href="/contact">
                                <h1 className='text-[14px] mt-4  hover:text-neutral-300 hover:cursor-pointer text-neutral-500  font-thin'>
                                    Contact
                                </h1>
                            </a>
                        </div>
                        <div>
                            <a href="/faq">
                                <h1 className='text-[14px] mt-4 hover:text-neutral-300 hover:cursor-pointer text-neutral-500  font-thin'>
                                    FAQ
                                </h1>
                            </a>
                        </div>
                    </div>
                    <div className='ml-10'>
                        <div>
                            <h1 className='text-[14px]  hover:text-neutral-300 hover:cursor-pointer text-neutral-500  font-thin'>
                                GitHub
                            </h1>
                            <h1 className='text-[14px] mt-4  hover:text-neutral-300 hover:cursor-pointer text-neutral-500  font-thin'>
                                LinkedIn
                            </h1>
                            <h1 className='text-[14px] mt-4  hover:text-neutral-300 hover:cursor-pointer text-neutral-500  font-thin'>
                                Twitter
                            </h1>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
