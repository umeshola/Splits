import { useMutation, useQuery } from '@apollo/client';
import React, { useState, useEffect } from 'react';
import { CHECK, Get_UnCHECK, Not_Paid } from '../../connection/query';

export default function Queue() {
    const { data: d1, refetch: r1 } = useQuery(Get_UnCHECK);
    const [check_user] = useMutation(CHECK);
    const [notPaid] = useMutation(Not_Paid)
    const [flag, setFlag] = useState(false);

    // Use useEffect to update the flag based on the data
    useEffect(() => {
        if (d1?.get_unCheck.length === 0) {
            setFlag(true);
        } else {
            setFlag(false);
        }
    }, [d1]);

    const fun = async (id) => {
        try {
            await check_user({
                variables: {
                    data: id
                }
            });
            r1();
        } catch (error) {
            console.error("ApolloError:", error);
        }
    };
    const can = async (id) => {
        try {
            await notPaid({
                variables: {
                    data: id
                }
            });
            r1();
        } catch (error) {
            console.error("ApolloError:", error);
        }
    };

    return (
        flag ?
            <div className='flex justify-center mt-20'>
                <h1 className='text-3xl'>
                    Empty Queue
                </h1>
            </div>
            :
            <div className='mt-5 max-h-[650px] overflow-auto'>
                <div className='flex flex-wrap justify-center'>
                    {d1?.get_unCheck.map((item, index) => (
                        <div
                            key={index}
                            className='h-[300px] w-[300px] rounded-3xl m-2 bg-neutral-700 bg-opacity-50 border-neutral-800 border-[2px] shadow-neutral-800 shadow-[0px_0px_20px_1px_rgba(0,0,0,0.25)]'
                        >
                            <div className='border-[1px] relative w-[250px] mx-auto mt-[10px] border-neutral-700 px-1 py-1 rounded-2xl bg-neutral-700 bg-opacity-45'>
                                <div>
                                    <h1 className='text-[20px]'>{item.platform} - {item.plan}</h1>
                                </div>
                                <div className='flex'>
                                    <div>
                                        <h1 className='text-[22px]'>₹{item.price}</h1>
                                    </div>
                                    <div>
                                        <h1 className='text-neutral-500 text-[14px] mt-[10px] ml-[2px]'>/ {item.timePeriod} month</h1>
                                    </div>
                                </div>
                                <div className=' absolute right-0 top-0'>
                                    <button onClick={() => can(item.id)}>
                                        <svg xmlns="http://www.w3.org/2000/svg" class="icon icon-tabler icon-tabler-x" width="32" height="32" viewBox="0 0 24 24" stroke-width="1.5" stroke="#ffffff" fill="none" stroke-linecap="round" stroke-linejoin="round">
                                            <path stroke="none" d="M0 0h24v24H0z" fill="none" />
                                            <path d="M18 6l-12 12" />
                                            <path d="M6 6l12 12" />
                                        </svg>
                                    </button>
                                </div>
                            </div>
                            <div className='mt-2 ml-7'>
                                <div>
                                    <div>
                                        <h1 className='text-[14px]'>UserName</h1>
                                    </div>
                                    <div>
                                        <h1 className='text-[13px] text-neutral-400 -mt-1'>{item.userName}</h1>
                                    </div>
                                </div>
                                <div className='my-1'>
                                    <div>
                                        <h1 className='text-[14px]'>Email</h1>
                                    </div>
                                    <div>
                                        <h1 className='text-[13px] text-neutral-400 -mt-1'>{item.email}</h1>
                                    </div>
                                </div>
                                <div>
                                    <div>
                                        <h1 className='text-[14px]'>Members</h1>
                                    </div>
                                    <div>
                                        <h1 className='text-[13px] text-neutral-400 -mt-1'>{item.members}</h1>
                                    </div>
                                </div>
                            </div>
                            <div className='flex mt-[21px] justify-center border-[1px] rounded-lg mx-7 border-neutral-800 bg-neutral-700'>
                                <button onClick={() => fun(item.id)}
                                    className="bg-gradient-to-br bg-neutral-700 relative group/btn block w-full text-white rounded-xl h-10 font-medium"
                                    type='submit'
                                >
                                    Accept
                                    <span className='group-hover/btn:opacity-100 block transition duration-500 opacity-0 absolute h-px w-full -bottom-px inset-x-0 bg-gradient-to-r from-transparent via-red-700 to-transparent'></span>
                                    <span className='group-hover/btn:opacity-100 blur-sm block transition duration-500 opacity-0 absolute h-px w-1/2 mx-auto -bottom-px inset-x-10 bg-gradient-to-r from-transparent via-red-900 to-transparent'></span>
                                </button>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
    );
}
