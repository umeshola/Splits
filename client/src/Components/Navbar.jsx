import React, { useState } from 'react';
import Avatar from 'boring-avatars';
import { useNavigate } from 'react-router-dom';
import { MEINFO } from '../connection/query';
import { useQuery } from '@apollo/client';
import logo from '../assets/splits_logo.png'
export default function Navbar() {
    const navigate = useNavigate();
    const [isMenuOpen, setIsMenuOpen] = useState(false);

    const toggleMenu = () => {
        setIsMenuOpen(!isMenuOpen);
    };

    const { data: d1 } = useQuery(MEINFO);
    let flag = false;
    if (localStorage.getItem('token')) {
        flag = true;
    }

    const signout = () => {
        localStorage.removeItem("token");
        flag = false;
        window.location.reload()
    }

    return (
        <div className='flex justify-center relative'>
            <div className='flex -ml-16 sm:ml-0 mt-1 absolute left-0'>
                <a href="/">
                    <img className='md:h-[60px] md:w-[50px] h-[45px] w-[35px] rounded-lg' src={logo} alt="" />
                </a>
                <a href="/" className='md:mt-[8px]'>
                    <p className='text-xl md:text-4xl hidden lg:block font-semibold md:ml-1'>Splits</p>
                </a>
            </div>
            <div className='mb-12 flex mt-1'>
                <div className='flex shadow-xl w-fit dark:border-white/[0.1] shadow-white/[0.05] dark:shadow-white/[0.05] h-[55px] pt-[6px] rounded-full border-[1px] border-neutral-800 mt-[2px] pl-2 backdrop-blur-md text-white z-10'>
                    {(d1?.me?.userName === "Umeshola07" && d1?.me?.email === "umeshola07@gmail.com") ?
                        <div className='mt-[2px]'>
                            <a href='/dashboard' className='text-2xl'>Dashboard</a>
                        </div>
                        : null}
                    <div className='flex mr-11'>
                        <div className='mx-2 h-10 hover:bg-red-500 bg-red-700 rounded-full'>
                            <button onClick={() => navigate('/price')} className='flex mt-[2px] px-2'>
                                <p className='hidden md:block md:text-2xl font-medium text-white'>Get plan</p>
                                <svg xmlns="http://www.w3.org/2000/svg" className='-mt-[1px] -mr-1' width="40" height="40" viewBox="0 0 24 24" strokeWidth="1.5" stroke="#000000" fill="none" strokeLinecap="round" strokeLinejoin="round">
                                    <path stroke="none" d="M0 0h24v24H0z" fill="none" />
                                    <path d="M5 12l14 0" />
                                    <path d="M15 16l4 -4" />
                                    <path d="M15 8l4 4" />
                                </svg>
                            </button>
                        </div>
                        <div className='hidden md:block'>
                            <div className='flex'>
                                <div>
                                    {flag ?
                                        <div onClick={signout} className='block px-4 py-1 cursor-pointer rounded-lg hover:bg-red-900 hover:bg-opacity-35'>
                                            <h1 className='text-2xl'>Signout</h1>
                                        </div>
                                        :
                                        <a href="/login" className='block px-4 py-1 rounded-lg hover:bg-neutral-800 text-2xl hover:bg-opacity-45'>Login</a>
                                    }
                                </div>
                                <div>
                                    {flag ? null : <a href="/singup" className='block px-4 py-1 rounded-lg text-2xl hover:bg-neutral-800 hover:bg-opacity-45'>Signup</a>}
                                </div>
                            </div>
                        </div>
                        <div
                            className='h-12 w-12 -mt-[4px] -mr-9 border-[0.5px] border-neutral-800 rounded-full relative'
                            onMouseEnter={toggleMenu}
                            onMouseLeave={toggleMenu}
                            onClick={toggleMenu}
                        >
                            {flag ? (
                                <div className='relative'>
                                    <div className=' absolute top-1 right-[7px]'>
                                        <svg xmlns="http://www.w3.org/2000/svg" class="icon icon-tabler icon-tabler-user" width="32" height="32" viewBox="0 0 24 24" stroke-width="0.5" stroke="#000000" fill="none" stroke-linecap="round" stroke-linejoin="round">
                                            <path stroke="none" d="M0 0h24v24H0z" fill="none" />
                                            <path d="M8 7a4 4 0 1 0 8 0a4 4 0 0 0 -8 0" />
                                            <path d="M6 21v-2a4 4 0 0 1 4 -4h4a4 4 0 0 1 4 4v2" />
                                        </svg>
                                    </div>
                                    <div className='p-[1px]'>

                                        <Avatar name={d1?.me?.userName} variant='marble' size={44} colors={["#fb6900", "#f63700", "#004853", "#007e80", "#00b9bd"]} />
                                    </div>
                                </div>
                            ) : (
                                <div className='p-[1px]'>
                                    <Avatar name="Umesh" variant="beam" size={44} />
                                </div>
                            )}
                            {isMenuOpen && (
                                <div className='absolute text-xl top-full right-0 bg-neutral-900 text-white rounded-xl px-4 py-2 shadow-neutral-950 shadow-[0px_10px_10px_1px_rgba(0,0,0,0.5)]'>
                                    <a href="/profile" className='block px-4 py-2 rounded-lg hover:bg-neutral-800 hover:bg-opacity-45'>Profile</a>
                                    <a href="/waiting" className='block px-4 py-2 rounded-lg hover:bg-neutral-800 hover:bg-opacity-45'>Waiting</a>
                                    <a href="/contact" className='block px-4 py-2 rounded-lg hover:bg-neutral-800 hover:bg-opacity-45'>Contact</a>
                                    <div className='md:hidden'>
                                        {flag ?
                                            <div onClick={signout} className='block px-4 py-1 cursor-pointer rounded-lg hover:bg-red-900 hover:bg-opacity-35'>
                                                <h1 className='text-2xl'>Signout</h1>
                                            </div>
                                            :
                                            <a href="/login" className='block px-4 py-1 rounded-lg hover:bg-neutral-800 text-2xl hover:bg-opacity-45'>Login</a>
                                        }
                                        {flag ? null : <a href="/singup" className='block px-4 py-1 rounded-lg text-2xl hover:bg-neutral-800 hover:bg-opacity-45'>Signup</a>}
                                    </div>

                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </div>
            <div className='md:hidden absolute right-0 mt-4 -mr-20'>
                <div>
                    <div>
                        {flag ? null : <a href="/singup" className='block px-4 py-1 rounded-lg text-lg hover:bg-neutral-800 hover:bg-opacity-45'>Signup</a>}
                    </div>
                </div>
            </div>
        </div>
    );
}