import { useMutation, useQuery } from '@apollo/client';
import React, { useState } from 'react';
import { CHANGE, GET_PLAN_INFO } from '../../connection/query';
import { PlaceholdersAndVanishInputDemo } from '../ui/PlaceholderAndVanishInputDemo';

export default function Group() {
    const { data: d1, refetch: r1 } = useQuery(GET_PLAN_INFO);
    const [update] = useMutation(CHANGE);
    const [selectedPlan, setSelectedPlan] = useState(null);
    const [showUpdateModal, setShowUpdateModal] = useState(false);
    const [email, setEmail] = useState("");
    const [pass, setPass] = useState("");

    if (!d1) return <p className='text-3xl text-center text-neutral-300 mt-24'>Loading...</p>;

    const handleUpdateClick = (plan) => {
        setSelectedPlan(plan);
        setShowUpdateModal(true);
    };

    const handleCloseClick = () => {
        setShowUpdateModal(false);
        setSelectedPlan(null);
    };

    const fun = async (id) => {
        try {
            await update({
                variables: {
                    data: {
                        id: id,
                        email,
                        password: pass,
                    }
                }
            });
            r1();
            setShowUpdateModal(false);
        } catch (error) {
            console.error("ApolloError:", error);
        }
    };

    const handlePlanSelect = (plan) => {
        setSelectedPlan(plan);
        setShowUpdateModal(true);
    };

    return (
        <div className='relative'>
            <div className='flex justify-center mt-2 -mb-3'>
                <PlaceholdersAndVanishInputDemo onPlanSelect={handlePlanSelect} />
            </div>
            {showUpdateModal && selectedPlan && (
                <div className='flex justify-center items-center fixed inset-0 z-50'>
                    <div className='h-[340px] w-[350px] rounded-3xl m-2 bg-neutral-800 border-neutral-800 border-[2px] shadow-neutral-905 shadow-[0px_0px_300px_100px_rgba(14,17,15,10)]'>
                        <div className='border-[1px] relative w-[300px] mx-auto mt-[20px] border-neutral-700 px-1 py-1 rounded-2xl bg-neutral-700 bg-opacity-45'>
                            <div>
                                <h1 className='text-[20px]'>{selectedPlan.plan} - {selectedPlan.platform}</h1>
                            </div>
                            <div className='flex'>
                                <div>
                                    <h1 className='text-[22px]'>{"\u20B9"}{selectedPlan.price}</h1>
                                </div>
                            </div>
                            <div className='absolute right-0 top-0 cursor-pointer' onClick={handleCloseClick}>
                                <svg xmlns="http://www.w3.org/2000/svg" className="icon icon-tabler icon-tabler-x" width="28" height="28" viewBox="0 0 24 24" stroke-width="2" stroke="#ffffff" fill="none" stroke-linecap="round" stroke-linejoin="round">
                                    <path stroke="none" d="M0 0h24v24H0z" fill="none" />
                                    <path d="M18 6l-12 12" />
                                    <path d="M6 6l12 12" />
                                </svg>
                            </div>
                        </div>
                        <div className='mt-2 ml-[27px]'>
                            <div>
                                <h1 className='text-[14px]'>Members</h1>
                            </div>
                            <div className='flex w-fit flex-wrap'>
                                {selectedPlan.members.map(member => (
                                    <div key={member.id} className='mr-3'>
                                        <h1 className='text-[13px] text-neutral-400 -mt-1'>{member.userName}</h1>
                                    </div>
                                ))}
                            </div>
                        </div>
                        <div className='mt-2 ml-[27px]'>
                            <div>
                                <h1 className='text-[14px]'>Email</h1>
                            </div>
                            <div>
                                <input onChange={(e) => { setEmail(e.target.value) }} className='w-[300px] h-[30px] bg-neutral-700 text-neutral-300 bg-opacity-80 rounded-md px-1 focus:outline-none focus:ring-0 focus:border-none' type='email' placeholder={selectedPlan.email} />
                            </div>
                        </div>
                        <div className='mt-2 ml-[27px]'>
                            <div>
                                <h1 className='text-[14px]'>Password</h1>
                            </div>
                            <div>
                                <input
                                    onChange={(e) => { setPass(e.target.value) }}
                                    className='w-[300px] h-[30px] bg-neutral-700 text-neutral-300 bg-opacity-80 rounded-md px-1 focus:outline-none focus:ring-0 focus:border-none'
                                    type="text"
                                    placeholder={selectedPlan.password}
                                />
                            </div>
                        </div>
                        <div onClick={() => fun(selectedPlan.id)} className='flex w-[300px] mt-[16px] h-[30px] justify-center border-[1px] rounded-md mx-7 border-neutral-700 hover:bg-neutral-900 hover:cursor-pointer bg-neutral-950'>
                            <button>Update</button>
                        </div>
                    </div>
                </div>
            )}
            <div className={`mt-5 max-h-[650px] overflow-auto ${showUpdateModal ? 'opacity-20' : ''}`}>
                <div className='flex flex-wrap justify-center'>
                    {d1.giveallplan.map(plan => (
                        <div key={plan.id} className='h-[300px] w-[300px] lg:w-[30%] md:w-[45%] sm:w-[90%] rounded-3xl m-2 bg-neutral-700 bg-opacity-50 border-neutral-800 border-[2px] shadow-neutral-800 shadow-[0px_0px_20px_1px_rgba(0,0,0,0.25)]'>
                            <div className='border-[1px] w-[250px] mx-auto mt-[10px] border-neutral-700 px-1 py-1 rounded-2xl bg-neutral-700 bg-opacity-45'>
                                <div>
                                    <h1 className='text-[20px]'>{plan.plan} - {plan.platform}</h1>
                                </div>
                                <div className='flex'>
                                    <div>
                                        <h1 className='text-[22px]'>{"\u20B9"}{plan.price}</h1>
                                    </div>
                                </div>
                            </div>
                            <div className='mt-2 ml-7'>
                                <div>
                                    <div>
                                        <h1 className='text-[14px]'>Time</h1>
                                    </div>
                                    <div>
                                        <h1 className='text-[13px] text-neutral-400 -mt-1'>
                                            {new Date(parseInt(plan.starting)).toLocaleDateString('en-GB')} - {new Date(plan.ending).toLocaleDateString('en-GB')}
                                        </h1>
                                    </div>
                                </div>
                                <div>
                                    <div>
                                        <h1 className='text-[14px]'>Members</h1>
                                    </div>
                                    <div className='flex w-fit flex-wrap'>
                                        {plan.members.map(member => (
                                            <div key={member.id} className='mr-3'>
                                                <h1 className='text-[13px] text-neutral-400 -mt-1'>{member.userName}</h1>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                                <div>
                                    <div>
                                        <h1 className='text-[14px]'>Email</h1>
                                    </div>
                                    <div>
                                        <h1 className='text-[13px] text-neutral-400 -mt-1'>{plan.email}</h1>
                                    </div>
                                </div>
                                <div>
                                    <div>
                                        <h1 className='text-[14px]'>Password</h1>
                                    </div>
                                    <div>
                                        <h1 className='text-[13px] text-neutral-400 -mt-1'>{plan.password}</h1>
                                    </div>
                                </div>
                            </div>
                            <div onClick={() => handleUpdateClick(plan)} className='flex mt-[16px] h-[30px] justify-center border-[1px] rounded-md mx-7 border-neutral-800 hover:bg-neutral-600 hover:cursor-pointer bg-neutral-700'>
                                <button>Update</button>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}