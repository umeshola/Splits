import React, { useEffect, useState } from 'react';
import { BuyPlan } from '../../connection/query';
import { useMutation } from '@apollo/client';
import { Toaster, toast } from 'react-hot-toast';
import qr from '../../assets/QR.jpg'

export default function Netflix() {
    const [member, setMember] = useState(2);
    const [price, setPrice] = useState(449);
    const [funx] = useMutation(BuyPlan);
    const [flag1, setFlag1] = useState(false)
    const [flag2, setFlag2] = useState(false)
    let flag = false;
    if (localStorage.getItem('token')) {
        flag = true;
    }
    useEffect(() => {
        switch (member) {
            case 2:
                setPrice(399);
                break;
            case 3:
                setPrice(299);
                break;
            case 4:
                setPrice(249);
                break;
            default:
                setPrice(449);
        }
    }, [member]);
    const [loading, setLoading] = useState(false);

    const handleDone = () => {
        setLoading(true);
        setTimeout(() => {
            setLoading(false);
            handleStandard();
        }, 2800);
    };

    const [loading1, setLoading1] = useState(false);
    const handleDone1 = () => {
        setLoading1(true);
        setTimeout(() => {
            setLoading1(false);
            handlePremium();
        }, 2800);
    };
    const handleMemberChange = (event) => {
        setMember(parseInt(event.target.value, 10));
    };
    const handleStandardQR = async (e) => {
        if (flag) {
            e.preventDefault();
            setFlag1(true)
        }
        else {
            toast.custom((t) => (
                <div className={`${t.visible ? 'animate-enter' : 'animate-leave'} w-fit mt-12 bg-neutral-950 border-[1px] border-neutral-800 rounded-2xl pointer-events-auto flex ring-1 ring-black ring-opacity-5 shadow-neutral-900 shadow-[0px_0px_10px_2px_rgba(0,0,0,0.2)]`}>
                    <div className='flex py-2 px-2'>
                        <div>
                            <svg xmlns="http://www.w3.org/2000/svg" className="icon icon-tabler mt-[3px] ml-[3px] icon-tabler-playstation-x" width="20" height="20" viewBox="0 0 24 24" stroke-width="2.4" stroke="#ff2825" fill="none" stroke-linecap="round" stroke-linejoin="round">
                                <path stroke="none" d="M0 0h24v24H0z" fill="none" />
                                <path d="M12 21a9 9 0 0 0 9 -9a9 9 0 0 0 -9 -9a9 9 0 0 0 -9 9a9 9 0 0 0 9 9z" />
                                <path d="M8.5 8.5l7 7" />
                                <path d="M8.5 15.5l7 -7" />
                            </svg>
                        </div>
                        <div className='px-2'>
                            <h1 className='text-lg'>Your are not loged in</h1>
                        </div>
                    </div>
                </div>
            ));
        }
    }
    const handleStandard = async () => {
        setFlag1(false)
        try {
            const { data } = await funx({
                variables: {
                    data: {
                        plan: "Standard",
                        member: 2,
                        platform: "Netflix",
                        timePeriod: 1,
                        Ldevice: 2,
                        Ddevice: 2,
                        quality: "1080p HD",
                        price: 299
                    }
                }
            });
            if (data && data.buyplan) {
                toast.custom((t) => (
                    <div className={`${t.visible ? 'animate-enter' : 'animate-leave'} w-fit bg-neutral-950 border-[1px] border-neutral-800 rounded-2xl pointer-events-auto flex ring-1 mt-12 ring-black ring-opacity-5 shadow-neutral-900 shadow-[0px_0px_10px_2px_rgba(0,0,0,0.2)]`}>
                        <div className='flex py-2 px-2'>
                            <div>
                                <svg xmlns="http://www.w3.org/2000/svg" className="icon icon-tabler mt-[3px] ml-[3px] icon-tabler-circle-check" width="20" height="20" viewBox="0 0 24 24" stroke-width="2.4" stroke="#00b341" fill="none" stroke-linecap="round" stroke-linejoin="round">
                                    <path stroke="none" d="M0 0h24v24H0z" fill="none" />
                                    <path d="M12 12m-9 0a9 9 0 1 0 18 0a9 9 0 1 0 -18 0" />
                                    <path d="M9 12l2 2l4 -4" />
                                </svg>
                            </div>
                            <div className='px-2'>
                                <h1 className='text-lg'>Added to queue</h1>
                            </div>
                        </div>
                    </div>
                ));
            }

        } catch (error) {
            console.error('Error buying:', error);
            toast.custom((t) => (
                <div className={`${t.visible ? 'animate-enter' : 'animate-leave'} w-fit mt-12 bg-neutral-950 border-[1px] border-neutral-800 rounded-2xl pointer-events-auto flex ring-1 ring-black ring-opacity-5 shadow-neutral-900 shadow-[0px_0px_10px_2px_rgba(0,0,0,0.2)]`}>
                    <div className='flex py-2 px-2'>
                        <div>
                            <svg xmlns="http://www.w3.org/2000/svg" className="icon icon-tabler mt-[3px] ml-[3px] icon-tabler-playstation-x" width="20" height="20" viewBox="0 0 24 24" stroke-width="2.4" stroke="#ff2825" fill="none" stroke-linecap="round" stroke-linejoin="round">
                                <path stroke="none" d="M0 0h24v24H0z" fill="none" />
                                <path d="M12 21a9 9 0 0 0 9 -9a9 9 0 0 0 -9 -9a9 9 0 0 0 -9 9a9 9 0 0 0 9 9z" />
                                <path d="M8.5 8.5l7 7" />
                                <path d="M8.5 15.5l7 -7" />
                            </svg>
                        </div>
                        <div className='px-2'>
                            <h1 className='text-lg'>Payment failed or already have this plan</h1>
                        </div>
                    </div>
                </div>
            ));
        }
    };
    const handlePremiumQR = async (e) => {
        if (flag) {
            e.preventDefault();
            setFlag2(true)
        }
        else {
            toast.custom((t) => (
                <div className={`${t.visible ? 'animate-enter' : 'animate-leave'} w-fit mt-12 bg-neutral-950 border-[1px] border-neutral-800 rounded-2xl pointer-events-auto flex ring-1 ring-black ring-opacity-5 shadow-neutral-900 shadow-[0px_0px_10px_2px_rgba(0,0,0,0.2)]`}>
                    <div className='flex py-2 px-2'>
                        <div>
                            <svg xmlns="http://www.w3.org/2000/svg" className="icon icon-tabler mt-[3px] ml-[3px] icon-tabler-playstation-x" width="20" height="20" viewBox="0 0 24 24" stroke-width="2.4" stroke="#ff2825" fill="none" stroke-linecap="round" stroke-linejoin="round">
                                <path stroke="none" d="M0 0h24v24H0z" fill="none" />
                                <path d="M12 21a9 9 0 0 0 9 -9a9 9 0 0 0 -9 -9a9 9 0 0 0 -9 9a9 9 0 0 0 9 9z" />
                                <path d="M8.5 8.5l7 7" />
                                <path d="M8.5 15.5l7 -7" />
                            </svg>
                        </div>
                        <div className='px-2'>
                            <h1 className='text-lg'>Your are not loged in</h1>
                        </div>
                    </div>
                </div>
            ));
        }

    }
    const handlePremium = async () => {
        setFlag2(false)
        try {
            const { data } = await funx({
                variables: {
                    data: {
                        plan: "Premium",
                        member: member,
                        platform: "Netflix",
                        timePeriod: 1,
                        Ldevice: 4,
                        Ddevice: 6,
                        quality: "4K + HDR",
                        price: price
                    }
                }
            });
            if (data && data.buyplan) {
                toast.custom((t) => (
                    <div className={`${t.visible ? 'animate-enter' : 'animate-leave'} w-fit mt-9 bg-neutral-950 border-[1px] border-neutral-800 rounded-2xl pointer-events-auto flex ring-1 ring-black ring-opacity-5 shadow-neutral-900 shadow-[0px_0px_10px_2px rgba(0,0,0,0.2)]`}>
                        <div className='flex py-2 px-2'>
                            <div>
                                <svg xmlns="http://www.w3.org/2000/svg" className="icon icon-tabler mt-[3px] ml-[3px] icon-tabler-circle-check" width="20" height="20" viewBox="0 0 24 24" stroke-width="2.4" stroke="#00b341" fill="none" stroke-linecap="round" stroke-linejoin="round">
                                    <path stroke="none" d="M0 0h24v24H0z" fill="none" />
                                    <path d="M12 12m-9 0a9 9 0 1 0 18 0a9 9 0 1 0 -18 0" />
                                    <path d="M9 12l2 2l4 -4" />
                                </svg>
                            </div>
                            <div className='px-2'>
                                <h1 className='text-lg'>Added to queue</h1>
                            </div>
                        </div>
                    </div>
                ));
            }

        } catch (error) {
            console.error('Error buying:', error);
            toast.custom((t) => (
                <div className={`${t.visible ? 'animate-enter' : 'animate-leave'} w-fit mt-9 bg-neutral-950 border-[1px] border-neutral-800 rounded-2xl pointer-events-auto flex ring-1 ring-black ring-opacity-5 shadow-neutral-900 shadow-[0px_0px_10px_2px rgba(0,0,0,0.2)]`}>
                    <div className='flex py-2 px-2'>
                        <div>
                            <svg xmlns="http://www.w3.org/2000/svg" className="icon icon-tabler mt-[3px] ml-[3px] icon-tabler-playstation-x" width="20" height="20" viewBox="0 0 24 24" stroke-width="2.4" stroke="#ff2825" fill="none" stroke-linecap="round" stroke-linejoin="round">
                                <path stroke="none" d="M0 0h24v24H0z" fill="none" />
                                <path d="M12 21a9 9 0 0 0 9 -9a9 9 0 0 0 -9 -9a9 9 0 0 0 -9 9a9 9 0 0 0 9 9z" />
                                <path d="M8.5 8.5l7 7" />
                                <path d="M8.5 15.5l7 -7" />
                            </svg>
                        </div>
                        <div className='px-2'>
                            <h1 className='text-lg'>Payment failed or already have this plan</h1>
                        </div>
                    </div>
                </div>
            ));
        }
    };

    return (
        <div>
            <div>
                <Toaster position="top-center" reverseOrder={false} />
            </div>
            {flag1 && (<div className='flex -mt-24 justify-center'>
                <div className='bg-neutral-800 relative rounded-3xl md:w-[350px] w-[200px] h-[500px] md:h-[500px] shadow-neutral-950 shadow-[0px_0px_250px_200px_rgba(0,0,0,0.25)]'>
                    <button className=' absolute right-1' onClick={() => { setFlag1(false) }}>
                        <svg xmlns="http://www.w3.org/2000/svg" class="icon icon-tabler icon-tabler-x" width="36" height="36" viewBox="0 0 24 24" stroke-width="1.5" stroke="#ffffff" fill="none" stroke-linecap="round" stroke-linejoin="round">
                            <path stroke="none" d="M0 0h24v24H0z" fill="none" />
                            <path d="M18 6l-12 12" />
                            <path d="M6 6l12 12" />
                        </svg>
                    </button>
                    <div className='flex justify-center'>
                        <img className='h-[250px] mt-8 w-[250px]' src={qr} alt="QR" />
                    </div>
                    <div className='flex ml-[55px] mt-2'>
                        <div>
                            <h1 className='text-[17px]'>Amount :</h1>
                        </div>
                        <div>
                            <h1 className='text-[15px] mt-[3px] ml-2'>299.00</h1>
                        </div>
                    </div>
                    <div className='text-neutral-400 ml-[55px] max-w-[250px]'>
                        <h1> <span className='text-neutral-100'>Note :</span> Send a screen-shot of the payment on this whatsApp with your username and email. <span className='text-neutral-200'>6283468927</span> </h1>
                    </div>
                    <div className='flex mt-[20px] w-[270px] ml-10 justify-center border-[1px] rounded-xl border-neutral-900 bg-neutral-950'>
                        <button
                            onClick={handleDone}
                            className={`bg-gradient-to-br bg-neutral-950 relative group/btn block w-full text-white rounded-xl h-10 font-medium ${loading ? 'cursor-not-allowed opacity-50' : ''
                                }`}
                            type='button'
                            disabled={loading}>
                            {loading ? (
                                <div className="flex items-center justify-center space-x-2">
                                    <div className="animate-spin h-5 w-5 border-4 border-white border-t-transparent rounded-full"></div>

                                </div>
                            ) : (
                                'Done'
                            )}
                            <span className='group-hover/btn:opacity-100 block transition duration-500 opacity-0 absolute h-px w-full -bottom-px inset-x-0 bg-gradient-to-r from-transparent via-red-700 to-transparent'></span>
                            <span className='group-hover/btn:opacity-100 blur-sm block transition duration-500 opacity-0 absolute h-px w-1/2 mx-auto -bottom-px inset-x-10 bg-gradient-to-r from-transparent via-red-900 to-transparent'></span>
                        </button>
                    </div>
                </div>
            </div>)}
            {flag2 && (<div className='flex -mt-10 justify-center'>
                <div className='bg-neutral-800 relative rounded-3xl w-[350px] h-[500px] shadow-neutral-950 shadow-[0px_0px_250px_200px_rgba(0,0,0,0.25)]'>

                    <button className=' absolute right-1' onClick={() => { setFlag2(false) }}>
                        <svg xmlns="http://www.w3.org/2000/svg" class="icon icon-tabler icon-tabler-x" width="36" height="36" viewBox="0 0 24 24" stroke-width="1.5" stroke="#ffffff" fill="none" stroke-linecap="round" stroke-linejoin="round">
                            <path stroke="none" d="M0 0h24v24H0z" fill="none" />
                            <path d="M18 6l-12 12" />
                            <path d="M6 6l12 12" />
                        </svg>
                    </button>
                    <div className='flex justify-center'>
                        <img className='h-[250px] mt-8 w-[250px]' src={qr} alt="Code" />
                    </div>
                    <div className='flex ml-[55px] mt-2'>
                        <div>
                            <h1 className='text-[17px]'>Amount :</h1>
                        </div>
                        <div>
                            <h1 className='text-[15px] mt-[3px] ml-2'>{price}.00</h1>
                        </div>
                    </div>
                    <div className='text-neutral-400 ml-[55px] max-w-[250px]'>
                        <h1> <span className='text-neutral-100'>Note :</span> Send a screen-shot of the payment on this whatsApp with your username and email. <span className='text-neutral-200'>6283468927</span> </h1>
                    </div>
                    <div className='flex mt-[20px] w-[270px] ml-10 justify-center border-[1px] rounded-xl border-neutral-900 bg-neutral-950'>
                        <button
                            onClick={handleDone1}
                            className={`bg-gradient-to-br bg-neutral-950 relative group/btn block w-full text-white rounded-xl h-10 font-medium ${loading1 ? 'cursor-not-allowed opacity-50' : ''
                                }`}
                            type='button'
                            disabled={loading1}>
                            {loading1 ? (
                                <div className="flex items-center justify-center space-x-2">
                                    <div className="animate-spin h-5 w-5 border-4 border-white border-t-transparent rounded-full"></div>

                                </div>
                            ) : (
                                'Done'
                            )}
                            <span className='group-hover/btn:opacity-100 block transition duration-500 opacity-0 absolute h-px w-full -bottom-px inset-x-0 bg-gradient-to-r from-transparent via-red-700 to-transparent'></span>
                            <span className='group-hover/btn:opacity-100 blur-sm block transition duration-500 opacity-0 absolute h-px w-1/2 mx-auto -bottom-px inset-x-10 bg-gradient-to-r from-transparent via-red-900 to-transparent'></span>
                        </button>
                    </div>
                </div>
            </div>)}

            {(flag1 || flag2) ? null : <div className='sm:h-[540px] h-[600px] w-[340px] sm:w-[800px] shadow-neutral-950 shadow-[0px_0px_100px_10px_rgba(0,0,0,0.25)] bg-neutral-900 rounded-xl border-[1px] border-neutral-900'>
                <div className='flex justify-center mt-[25px] sm:mt-[45px]'>
                    <div className='border-[1px] h-fit pt-4 px-4 border-neutral-800 bg-neutral-800 shadow-neutral-900 shadow-[0px_0px_10px_2px_rgba(0,0,0,0.25)] bg-opacity-45 rounded-2xl'>
                        <div className='border-[1px] border-neutral-800 px-1 py-1 rounded-2xl bg-neutral-800 bg-opacity-45'>
                            <div>
                                <h1 className='text-[17px] sm:text-[22px]'>Standard</h1>
                            </div>
                            <div className='flex'>
                                <div>
                                    <h1 className='text-[18px] sm:text-[24px]'>₹299</h1>
                                </div>
                                <div>
                                    <h1 className='text-neutral-500 text-[14px] sm:mt-[11px] mt-[5px] ml-[2px]'>/month</h1>
                                </div>
                            </div>
                        </div>
                        <div className='mb-2 mt-4'>
                            <div>
                                <h1 className='text-[17px] sm:text-[18px]  text-neutral-300'>Resolution</h1>
                            </div>
                            <div>
                                <h1 className='text-[13px] sm:text-[15px] text-neutral-500'>1080p HD</h1>
                            </div>
                        </div>
                        <div>
                            <div>
                                <h1 className='text-[17px] sm:text-[18px] text-neutral-300'>Supported devices</h1>
                            </div>
                            <div>
                                <h1 className='text-[13px] sm:text-[15px] text-neutral-500'>
                                    TV, computer, mobile phone, tablet
                                </h1>
                            </div>
                        </div>
                        <div className='my-2'>
                            <div>
                                <h1 className='text-[17px] sm:text-[18px] text-neutral-300'>Devices can watch at the same time</h1>
                            </div>
                            <div>
                                <h1 className='text-[13px] sm:text-[15px] text-neutral-500'>2</h1>
                            </div>
                        </div>
                        <div className='my-2'>
                            <div>
                                <h1 className='text-[17px] sm:text-[18px] text-neutral-300'>Download devices</h1>
                            </div>
                            <div>
                                <h1 className='text-[13px] sm:text-[15px] text-neutral-500'>2</h1>
                            </div>
                        </div>
                        <div>
                            <div>
                                <h1 className='text-[18px] text-neutral-300'>Members</h1>
                            </div>
                            <div>
                                <h1 className='text-[15px] text-neutral-500'>2</h1>
                            </div>
                        </div>
                        <div className=' flex mt-[21px] mb-2 justify-center border-[1px] rounded-xl border-neutral-900 bg-neutral-950'>
                            <button onClick={handleStandardQR} className="bg-gradient-to-br bg-neutral-950 relative group/btn block w-full text-white rounded-xl h-10 font-medium" type='submit'>Buy plan
                                <span className='group-hover/btn:opacity-100 block transition duration-500 opacity-0 absolute h-px w-full -bottom-px inset-x-0 bg-gradient-to-r from-transparent via-red-700 to-transparent'></span>
                                <span className='group-hover/btn:opacity-100 blur-sm block transition duration-500 opacity-0 absolute h-px w-1/2 mx-auto -bottom-px inset-x-10 bg-gradient-to-r from-transparent via-red-900 to-transparent'></span>
                            </button>
                        </div>
                    </div>
                    <div className='border-[1px] ml-5 min-h-[350px] pt-4 px-4 border-neutral-800 bg-neutral-800 shadow-neutral-900 shadow-[0px_0px_10px_2px_rgba(0,0,0,0.25)] bg-opacity-45 rounded-2xl'>
                        <div className='border-[1px] border-neutral-800 px-1 py-1 rounded-2xl bg-neutral-800 bg-opacity-45'>
                            <div>
                                <h1 className='text-[17px] sm:text-[22px]'>Premium</h1>
                            </div>
                            <div className='flex'>
                                <div>
                                    <h1 className='text-[18px] sm:text-[24px]'>₹{price}</h1>
                                </div>
                                <div>
                                    <h1 className='text-neutral-500 text-[14px] sm:mt-[11px] mt-[5px] ml-[2px]'>/month</h1>
                                </div>
                            </div>
                        </div>
                        <div className='mb-2 mt-4'>
                            <div>
                                <h1 className='text-[17px] sm:text-[18px] text-neutral-300'>Resolution</h1>
                            </div>
                            <div>
                                <h1 className='text-[13px] sm:text-[15px] text-neutral-500'>4K + HDR</h1>
                            </div>
                        </div>
                        <div className='my-2'>
                            <div>
                                <h1 className='text-[17px] sm:text-[18px] text-neutral-300'>Supported devices</h1>
                            </div>
                            <div>
                                <h1 className='text-[13px] sm:text-[15px] text-neutral-500'>
                                    TV, computer, mobile phone, tablet
                                </h1>
                            </div>
                        </div>
                        <div className='my-2'>
                            <div>
                                <h1 className='text-[17px] sm:text-[18px] text-neutral-300'>Devices can watch at the same time</h1>
                            </div>
                            <div>
                                <h1 className='text-[13px] sm:text-[15px] text-neutral-500'>4</h1>
                            </div>
                        </div>
                        <div className='my-2'>
                            <div>
                                <h1 className='text-[17px] sm:text-[18px] text-neutral-300'>Download devices</h1>
                            </div>
                            <div>
                                <h1 className='text-[13px] sm:text-[15px] text-neutral-500'>6</h1>
                            </div>
                        </div>
                        <div>
                            <div>
                                <h1 className='text-[17px] sm:text-[18px] text-neutral-300'>Members</h1>
                            </div>
                            <div>
                                <div className='border-[1px] w-fit bg-neutral-900 border-neutral-800 rounded-md'>
                                    <div>
                                        <select
                                            id='number-dd'
                                            name='number'
                                            className="bg-neutral-900 text-white border border-neutral-800 rounded-md p-1 focus:outline-none focus:ring-1 focus:ring-red-900"
                                            onChange={handleMemberChange}
                                            value={member}
                                        >
                                            <option value='2'>2</option>
                                            <option value='3'>3</option>
                                            <option value='4'>4</option>
                                        </select>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className=' flex mt-3 mb-2 justify-center border-[1px] rounded-xl border-neutral-900 bg-neutral-950'>
                            <button onClick={handlePremiumQR} className="bg-gradient-to-br bg-neutral-950 relative group/btn block w-full text-white rounded-xl h-10 font-medium" type='submit'>Buy plan
                                <span className='group-hover/btn:opacity-100 block transition duration-500 opacity-0 absolute h-px w-full -bottom-px inset-x-0 bg-gradient-to-r from-transparent via-red-700 to-transparent'></span>
                                <span className='group-hover/btn:opacity-100 blur-sm block transition duration-500 opacity-0 absolute h-px w-1/2 mx-auto -bottom-px inset-x-10 bg-gradient-to-r from-transparent via-red-900 to-transparent'></span>
                            </button>
                        </div>
                    </div>
                </div>
            </div>}
        </div>
    )
}
