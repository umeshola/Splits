import { useMutation, useQuery } from '@apollo/client';
import React, { useEffect, useRef } from 'react';
import { Cancle, GET_WAITING, remove_waiting_after7 } from '../../connection/query';

export default function BentogridThirdDemo() {
    const { data: d1, refetch: r1 } = useQuery(GET_WAITING);
    const [fun] = useMutation(Cancle);
    const [fun1] = useMutation(remove_waiting_after7);


    const handleRemoveWaiting = async () => {
        try {
            await fun1();
            r1();
        } catch (error) {
            console.error("Error removing waiting entries:", error);
        }
    };

    const initialized = useRef(false);
    useEffect(() => {
        if (!initialized.current) {
            initialized.current = true;
            handleRemoveWaiting();
        }

    }, []); // Add hasRun as a dependency

    const handlecancle = async (plan, platform, member) => {
        try {
            await fun({
                variables: {
                    data: {
                        plan,
                        platform,
                        member,
                    }
                }
            });
            r1();
        } catch (error) {
            console.error("Error cancelling:", error);
        }
    };

    const waitingData = d1?.get_waiting || [];

    const calculateProgress = (timeRN) => {
        const startTime = new Date(parseInt(timeRN)).getTime();
        const currentTime = new Date().getTime();
        const timePassed = currentTime - startTime;
        const totalPeriod = 7 * 24 * 60 * 60 * 1000;

        return Math.min((timePassed / totalPeriod) * 100, 100);
    };

    return (
        <div className='overflow-auto max-h-[645px]'>
            {waitingData.length === 0 ? (
                <div className='text-center mt-16 text-neutral-400'>
                    <h1 className='text-[24px]'>Nothing to show</h1>
                </div>
            ) : (
                waitingData.map(({ id, plan, platform, member, timeRN }) => (
                    <div key={id} className='flex justify-center my-16'>
                        <div className='md:h-fit md:w-fit w-full h-full md:min-w-[600px] rounded-xl bg-neutral-700 bg-opacity-40'>
                            <div className='bg-neutral-600 w-full h-[40px] rounded-t-xl bg-opacity-35'>
                                <h1 className='md:text-[26px] sm:text-[24px] text-[20px] ml-1 pt-1'>{platform} - {plan} for {member} members</h1>
                            </div>
                            <div className='relative flex'>
                                <div className='h-[6px] rounded-xl ml-12 mt-6 w-[500px] bg-slate-50'>
                                    <div
                                        className='h-[6px] rounded-xl bg-green-500'
                                        style={{ width: `${calculateProgress(timeRN)}%` }}
                                    />
                                </div>
                                <div className='absolute left-11'>
                                    <h1 className='text-[17px]'>0</h1>
                                </div>
                                <div className='absolute right-2'>
                                    <h1 className='text-[17px]'>7 days</h1>
                                </div>
                            </div>
                            <div className='mt-1'>
                                <h1 className='text-[12px] text-neutral-400 max-w-[500px] ml-12 flex-wrap text-center'>
                                    Note: If your group is not formed in 7 days, your money will be refunded in 3 to 4 business days.
                                </h1>
                            </div>
                            <div className='flex justify-center mt-1'>
                                <div className='pt-1 px-2 rounded-sm bg-opacity-45 bg-neutral-800 mr-2 hover:bg-green-900 hover:bg-opacity-10 border-[1px] border-neutral-700'>
                                    <button>Speed Up</button>
                                </div>
                                <div className='pt-1 px-2 rounded-sm bg-opacity-45 bg-neutral-800 hover:bg-red-900 hover:bg-opacity-10 border-[1px] border-neutral-700'>
                                    <button onClick={() => handlecancle(plan, platform, member)}>Cancel</button>
                                </div>
                            </div>
                        </div>
                    </div>
                ))
            )}
        </div>
    );
}
