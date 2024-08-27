import React from 'react'

export default function NotFoundShow() {
    return (
        <div className='mb-[450px]'>
            <div className='flex justify-center'>
                <div>
                    <h1 className='text-4xl my-4 text-center'>404 Not Found</h1>
                    <h1 className='text-center text-neutral-400'>This is not a pre-define page you can go to <a href='/' className=' text-blue-500 hover:cursor-pointer hover:underline'>home</a></h1>
                </div>
            </div>
        </div>
    )
}
