import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import CardStack from './ui/CardStack';
import ss from '../assets/ss.png'
import img2 from '../assets/netflix.jpeg';
import img12 from '../assets/got.jpeg'

import img1 from '../assets/sony.jpeg';
import img16 from '../assets/dislogo.jpeg'
import img18 from '../assets/netflox.jpeg'
import img19 from '../assets/primelogo1.jpeg'
import img20 from '../assets/spotify.jpeg'
import img21 from '../assets/youtube1.jpeg'
import vid from '../assets/video.mp4'
import test1 from '../assets/test1.jpeg'
import test2 from '../assets/test2.jpeg'
import test3 from '../assets/test3.jpeg'
import test4 from '../assets/test4.jpeg'
import test5 from '../assets/test5.jpeg'
import test6 from '../assets/test6.jpeg'
import test7 from '../assets/test7.jpeg'
import test8 from '../assets/test8.jpeg'
import test9 from '../assets/test9.jpeg'

import { FlipWords } from './ui/typewriter-effect';
import Hoverbutton from './ui/Hoverbutton'
import { LampContainer } from './ui/Lamp';
import { InfiniteMovingCards } from './ui/MovingCard';
import Spotlight from './ui/Spotlight';
import { People } from './Helper/People';
export default function Landing() {
    const items1 = [
        { quote: "Amazing app but the waiting time for me in netflix group is 4 days the most time I every waited.", name: "Kunal07", img: test1 },
        { quote: "Love it!", name: "Samura123", img: test2 },
        { quote: "The group was made in one day.", name: "Subhamraj", img: test3 },
        { quote: "The Netflix and Prime 4 members plan is very cheap. Nice one guys.", name: "Nid23", img: test4 },
        { quote: "The refund process is fast and easy.", name: "fade32d", img: test5 },

    ];
    const items2 = [
        { quote: "make sure to send the screeshot after that they will give you plan in 2 days.", name: "Price1425", img: test6 },
        { quote: "The support are good and supportive.", name: "sachin07", img: test7 },
        { quote: "Can you get it for more app.", name: "02hardik", img: test8 },
        { quote: "Email and the password is avaliable in less then 24 hours.I this app is great.", name: "Ksun", img: test9 },



    ];
    const words = ["new-movie", "web-series", "short-flims"];
    return (
        <div>
            <div className='z-0'>
                <Spotlight className="bg-black" fill="#ff0000" />
            </div>
            <div className='flex justify-between relative z-10'>
                <div className='flex-1 mt-4'>
                    <div>
                        <h1 className='lg:text-[52px] text-[40px] sm:text-[52px] md:text-[42px] 2xl:text-[72px] xl:text-[62px] font-semi-bold leading-[1.1]'>
                            Bored of buying expensive subscription. Now enjoy
                            <FlipWords words={words} duration={3000} className="text-[40px] sm:text-[52px] md:text-[42px] lg:text-[52px] xl:text-[62px] 2xl:text-[72px] text-white font-bold" />
                            at half of the price with <span className='text-red-500'>Splits</span>.
                        </h1>
                    </div>
                    <div className='2xl:mt-12 md:mt-36 xl:mt-16 lg:mt-28 sm:mt-32 mt-28'>
                        <div className='flex'>
                            <svg className='lg:w-[28px] h-[22px] w-[22px] md:w-[24px] md:h-[24px] lg:h-[28px]' xmlns="http://www.w3.org/2000/svg" class="icon icon-tabler icon-tabler-check" width="36" height="36" viewBox="0 0 24 24" stroke-width="2" stroke="#00b341" fill="none" stroke-linecap="round" stroke-linejoin="round">
                                <path stroke="none" d="M0 0h24v24H0z" fill="none" />
                                <path d="M5 12l5 5l10 -10" />
                            </svg>
                            <h2 className='xl:text-xl 2xl:text-2xl text-neutral-400  font-light'>At best price</h2>
                        </div>
                        <div className='flex'>
                            <svg className='lg:w-[28px] h-[22px] w-[22px] lg:h-[28px] md:w-[24px] md:h-[24px]' xmlns="http://www.w3.org/2000/svg" class="icon icon-tabler icon-tabler-check" width="36" height="36" viewBox="0 0 24 24" stroke-width="2" stroke="#00b341" fill="none" stroke-linecap="round" stroke-linejoin="round">
                                <path stroke="none" d="M0 0h24v24H0z" fill="none" />
                                <path d="M5 12l5 5l10 -10" />
                            </svg> <h2 className='xl:text-xl 2xl:text-2xl text-neutral-400 font-light'>First of it's kind</h2>
                        </div>
                        <div className='flex'>
                            <svg className='lg:w-[28px] h-[22px] w-[22px] lg:h-[28px] md:w-[24px] md:h-[24px]' xmlns="http://www.w3.org/2000/svg" class="icon icon-tabler icon-tabler-check" width="36" height="36" viewBox="0 0 24 24" stroke-width="2" stroke="#00b341" fill="none" stroke-linecap="round" stroke-linejoin="round">
                                <path stroke="none" d="M0 0h24v24H0z" fill="none" />
                                <path d="M5 12l5 5l10 -10" />
                            </svg>
                            <h2 className='xl:text-xl 2xl:text-2xl text-neutral-400 font-light'>2k user joined with us</h2>
                        </div>

                    </div>
                    <div className='2xl:mt-24 mt-32 sm:mt-32 md:mt-[180px] lg:mt-[160px] xl:mt-[150px] relative '>
                        <div>
                            <div className='absolute left-0'>
                                <People />
                            </div>
                        </div>
                        <div className='top-16 left-[55px] absolute'>
                            <div className='flex absolute'>
                                <svg xmlns="http://www.w3.org/2000/svg" class="icon icon-tabler icon-tabler-star" width="32" height="32" viewBox="0 0 24 24" stroke-width="2" stroke="#ffec00" fill="none" stroke-linecap="round" stroke-linejoin="round">
                                    <path stroke="none" d="M0 0h24v24H0z" fill="none" />
                                    <path d="M12 17.75l-6.172 3.245l1.179 -6.873l-5 -4.867l6.9 -1l3.086 -6.253l3.086 6.253l6.9 1l-5 4.867l1.179 6.873z" />
                                </svg>
                                <svg xmlns="http://www.w3.org/2000/svg" class="icon icon-tabler icon-tabler-star" width="32" height="32" viewBox="0 0 24 24" stroke-width="2" stroke="#ffec00" fill="none" stroke-linecap="round" stroke-linejoin="round">
                                    <path stroke="none" d="M0 0h24v24H0z" fill="none" />
                                    <path d="M12 17.75l-6.172 3.245l1.179 -6.873l-5 -4.867l6.9 -1l3.086 -6.253l3.086 6.253l6.9 1l-5 4.867l1.179 6.873z" />
                                </svg>
                                <svg xmlns="http://www.w3.org/2000/svg" class="icon icon-tabler icon-tabler-star" width="32" height="32" viewBox="0 0 24 24" stroke-width="2" stroke="#ffec00" fill="none" stroke-linecap="round" stroke-linejoin="round">
                                    <path stroke="none" d="M0 0h24v24H0z" fill="none" />
                                    <path d="M12 17.75l-6.172 3.245l1.179 -6.873l-5 -4.867l6.9 -1l3.086 -6.253l3.086 6.253l6.9 1l-5 4.867l1.179 6.873z" />
                                </svg>
                                <svg xmlns="http://www.w3.org/2000/svg" class="icon icon-tabler icon-tabler-star" width="32" height="32" viewBox="0 0 24 24" stroke-width="2" stroke="#ffec00" fill="none" stroke-linecap="round" stroke-linejoin="round">
                                    <path stroke="none" d="M0 0h24v24H0z" fill="none" />
                                    <path d="M12 17.75l-6.172 3.245l1.179 -6.873l-5 -4.867l6.9 -1l3.086 -6.253l3.086 6.253l6.9 1l-5 4.867l1.179 6.873z" />
                                </svg>
                                <svg xmlns="http://www.w3.org/2000/svg" class="icon icon-tabler icon-tabler-star-half" width="32" height="32" viewBox="0 0 24 24" stroke-width="2" stroke="#ffec00" fill="none" stroke-linecap="round" stroke-linejoin="round">
                                    <path stroke="none" d="M0 0h24v24H0z" fill="none" />
                                    <path d="M12 17.75l-6.172 3.245l1.179 -6.873l-5 -4.867l6.9 -1l3.086 -6.253z" />
                                </svg>
                            </div>
                        </div>
                        <div className='top-24 left-[55px] absolute'>
                            <h1 className='text-neutral-400 text-lg'>from 30+ reviews</h1>
                        </div>
                    </div>
                </div>

                <div className='flex-1 hidden sm:hidden md:block lg:block xl:block 2xl:block mt-20 ml-32'>
                    <CardStack offset={12} scaleFactor={0.06} />
                </div>

            </div>


            <div className='overflow-hidden mt-72 relative w-full h-36'>
                <motion.div
                    className='flex animate-slide'
                    initial={{ x: 0 }}
                    animate={{ x: '-100%' }}
                    transition={{
                        duration: 20,
                        repeat: Infinity,
                        ease: 'linear'
                    }}
                >
                    {[img1, img16, img18, img19, img20, img21].map((img, index) => (
                        <img key={index} className='h-32 mx-44 w-48 grayscale object-cover' src={img} alt={`Client Logo ${index + 1}`} />
                    ))}
                    {[img1, img16, img18, img19, img20, img21].map((img, index) => (
                        <img key={index + 7} className='h-32 mx-44 w-48 grayscale object-cover' src={img} alt={`Client Logo ${index + 1}`} />
                    ))}
                </motion.div>
            </div>
            <div className='flex justify-center mt-44'>
                <h1 className='lg:text-[52px] text-center text-[32px] sm:text-[32px] md:text-[42px] 2xl:text-[72px] xl:text-[62px] font-thin'>Get your <span className='text-red-500 font-semibold'>subscription</span> with us.</h1>
            </div>
            <div className='flex justify-center mt-20'>
                <div>
                    <img className='h-[220px] w-[260px] 2xl:h-[500px]  2xl:w-[570px] xl:h-[500px]  xl:w-[570px] lg:h-[450px]  lg:w-[500px] md:h-[400px]  md:w-[450px]' src={ss} alt="" />
                </div>
                <div className='lg:block hidden'>
                    <video className="rounded-[30px] muted hidden aspect-video lg:block 2xl:h-[400px] 2xl:w-fit xl:w-[500px] md:w-[400px] xl:h-[420px] lg:h-[400px] object-cover"
                        src={vid}
                        controls
                    ></video>
                </div>
            </div>
            <div className='flex justify-center mb-10'>
                <div className='lg:hidden'>
                    <video className="rounded-[10px] muted lg:hidden aspect-video h-[200px] sm:h-[240px] w-[340px] sm:w-[500px] xl:w-fit xl:h-[420px]  object-cover"
                        src={vid}
                        allowFullScreen
                        controls
                    ></video>
                </div>
            </div>
            <div className='flex justify-center'>
                <Hoverbutton>
                    <a href="/price">Get plan</a>
                </Hoverbutton>
            </div>
            <div className='mt-56 justify-center'>
                <div className='flex justify-center '>
                    <h1 className='lg:text-[52px] text-[32px] text-center sm:text-[32px] md:text-[42px] 2xl:text-[72px] text-white relative z-10'>Chaim your entertainment quickly
                        <span className=' absolute inset-0 rounded-full h-[1px] mt-6 w-[1px] bg-transparent shadow-white shadow-[0px_0px_3000px_38px_rgba(0,0,0,0.5)]'></span>
                    </h1>
                </div>
                <div className='flex mt-8 justify-center'>
                    <h1 className='text-center sm:text-[13px] md:text-[17px] lg:text-[20px] text-neutral-500'>
                        Buy and enjoy subscription at by far the lowest rate in the industrie. <br /> Seemless experince with payment and fast group elocation.
                    </h1>
                </div>
                <div className=' md:flex sm:ml-24 ml-6 md:ml-0 md:justify-center mt-20'>
                    <div className='h-[100px]  sm:h-[120px] md:h-[140px] lg:h-[160px] xl:h-[180px] 2xl:h-[200px] border-neutral-900 border-[1.3px] mx-4 sm:mx-8 w-[200px] sm:w-[220px] md:w-[240px] lg:w-[260px] xl:w-[280px] 2xl:w-[300px] rounded-xl bg-neutral-800 bg-opacity-45 flex flex-col items-center justify-center'>
                        <h1 className='text-3xl font-medium text-center text-white'>1k+</h1>
                        <h2 className='text-md text-center font-extralight text-white'>Happy User</h2>
                    </div>
                    <div className='h-[100px] my-5 md:my-0 sm:h-[120px] md:h-[140px] lg:h-[160px] xl:h-[180px] 2xl:h-[200px] border-neutral-900 border-[1.3px] mx-4 sm:mx-8 w-[200px] sm:w-[220px] md:w-[240px] lg:w-[260px] xl:w-[280px] 2xl:w-[300px] rounded-xl bg-neutral-800 bg-opacity-45 flex flex-col items-center justify-center'>
                        <h1 className='text-3xl font-medium text-center text-white'>2.5x</h1>
                        <h2 className='text-md text-center font-extralight text-white'>Saving</h2>
                    </div>
                    <div className='h-[100px] my-5 md:my-0 sm:h-[120px] md:h-[140px] lg:h-[160px] xl:h-[180px] 2xl:h-[200px] border-neutral-900 border-[1.3px] mx-4 sm:mx-8 w-[200px] sm:w-[220px] md:w-[240px] lg:w-[260px] xl:w-[280px] 2xl:w-[300px] rounded-xl bg-neutral-800 bg-opacity-45 flex flex-col items-center justify-center'>
                        <h1 className='text-3xl font-medium text-center text-white'>6+</h1>
                        <h2 className='text-md text-center font-extralight text-white'>Domain</h2>
                    </div>
                    <div className='h-[100px] sm:h-[120px] md:h-[140px] lg:h-[160px] xl:h-[180px] 2xl:h-[200px] border-neutral-900 border-[1.3px] mx-4 sm:mx-8 w-[200px] sm:w-[220px] md:w-[240px] lg:w-[260px] xl:w-[280px] 2xl:w-[300px] rounded-xl bg-neutral-800 bg-opacity-45 flex flex-col items-center justify-center'>
                        <h1 className='text-3xl font-medium text-center text-white'>2x</h1>
                        <h2 className='text-md text-center font-extralight text-white'>User Experience</h2>
                    </div>
                </div>
                <div>

                </div>
            </div>
            <div className="mt-96">
                <div className="flex justify-center z-50">
                    <h1 className="text-[52px]">Testimony</h1>
                </div>
                <div className="z-0 md:-mt-1 hidden md:block">
                    <LampContainer className={"z-0 mb-16"} />
                </div>
                <div className="z-50 sm:mt-20 md:-mt-28">
                    <div className='flex justify-center'>
                        <InfiniteMovingCards
                            items={items1}
                            direction="right"
                            speed="slow"
                            pauseOnHover={true}
                            className="custom-class"
                        />
                    </div>
                    <div className='flex justify-center'>
                        <InfiniteMovingCards
                            items={items2}
                            direction="left"
                            speed="slow"
                            pauseOnHover={true}
                            className="custom-class"
                        />
                    </div>
                </div>
            </div>
        </div>
    );
}



