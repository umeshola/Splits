import { useMutation, useQuery } from '@apollo/client'
import React, { useEffect, useState } from 'react'
import { done_refunding, get_refund } from '../../connection/query'

export default function Refund() {
    const { data: d1, refetch: r1 } = useQuery(get_refund)
    const [handleDone] = useMutation(done_refunding)
    const [flag, setFlag] = useState(false);
    useEffect(() => {
        if (d1?.get_refund.length === 0) {
            setFlag(true);
        } else {
            setFlag(false);
        }
    }, [d1]);
    const fun = async (id) => {
        try {
            await handleDone({
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
                    No refund
                </h1>
            </div>
            :
            <div className='mt-5 max-h-[650px] overflow-auto'>
                <div className='flex flex-wrap justify-center'>
                    {d1?.get_refund.map((item, index) => (
                        <div
                            key={index}
                            className='h-[300px] w-[300px] rounded-3xl m-2 bg-neutral-700 bg-opacity-50 border-neutral-800 border-[2px] shadow-neutral-800 shadow-[0px_0px_20px_1px_rgba(0,0,0,0.25)]'>
                            <div className='border-[1px] w-[250px] mx-auto mt-[10px] border-neutral-700 px-1 py-3 rounded-2xl bg-neutral-700 bg-opacity-45'>
                                <div>
                                    <h1 className='text-[20px]'>{item.platform} - {item.plan}</h1>
                                </div>
                            </div>
                            <div className='mt-5 ml-7'>
                                <div>
                                    <div>
                                        <h1 className='text-[14px]'>UserName</h1>
                                    </div>
                                    <div>
                                        <h1 className='text-[13px] text-neutral-400 -mt-1'>{item.by[0].userName}</h1>
                                    </div>
                                </div>
                                <div className='my-1'>
                                    <div>
                                        <h1 className='text-[14px]'>Email</h1>
                                    </div>
                                    <div>
                                        <h1 className='text-[13px] text-neutral-400 -mt-1'>{item.by[0].email}</h1>
                                    </div>
                                </div>
                                <div className='my-1'>
                                    <div>
                                        <h1 className='text-[14px]'>Phone</h1>
                                    </div>
                                    <div>
                                        <h1 className='text-[13px] text-neutral-400 -mt-1'>{item.by[0].phone}</h1>
                                    </div>
                                </div>
                            </div>
                            <div className='flex mt-[30px] justify-center border-[1px] rounded-lg mx-7 border-neutral-800 bg-neutral-700'>
                                <button onClick={() => fun(item.id)}
                                    className="bg-gradient-to-br bg-neutral-700 relative group/btn block w-full text-white rounded-xl h-10 font-medium"
                                    type='submit'
                                >
                                    Done
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
