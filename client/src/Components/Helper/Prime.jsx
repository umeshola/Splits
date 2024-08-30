import React, { useEffect, useState } from 'react'
import { BuyPlan } from '../../connection/query';
import { useMutation } from '@apollo/client';
import { Toaster, toast } from 'react-hot-toast'
import qr from '../../assets/QR.jpg'

export default function Prime() {
    const [member1, setMember1] = useState(2);
    const [price1, setPrice1] = useState(169);
    const [member2, setMember2] = useState(2)
    const [price2, setPrice2] = useState(899);
    const [flag1, setFlag1] = useState(false)
    const [flag2, setFlag2] = useState(false)
    let flag = false;
    if (localStorage.getItem('token')) {
        flag = true;
    }
    useEffect(() => {
        // Update the price based on the selected member count
        switch (member1) {
            case 2:
                setPrice1(199);
                break;
            case 3:
                setPrice1(149);
                break;
            case 4:
                setPrice1(119);
                break;
            case 5:
                setPrice1(99);
                break;
            default:
                setPrice1(199);
        }
    }, [member1]);
    const [loading, setLoading] = useState(false);

    const handleDone = () => {
        setLoading(true);
        setTimeout(() => {
            setLoading(false);
            handleprime1();
        }, 2800);
    };
    const [loading1, setLoading1] = useState(false);
    const handleDone1 = () => {
        setLoading1(true);
        setTimeout(() => {
            setLoading1(false);
            handleprime2();
        }, 2800);
    };
    const handleMemberChange1 = (event) => {
        setMember1(parseInt(event.target.value, 10));
    };
    useEffect(() => {
        // Update the price based on the selected member count
        switch (member2) {
            case 2:
                setPrice2(1099);
                break;
            case 3:
                setPrice2(899);
                break;
            case 4:
                setPrice2(799);
                break;
            case 5:
                setPrice2(499);
                break;
            default:
                setPrice2(999);
        }
    }, [member2]);
    const handleMemberChange2 = (event) => {
        setMember2(parseInt(event.target.value, 10));
    };

    const [funx] = useMutation(BuyPlan);
    const handleprime1QR = async (e) => {
        if (flag) {

            e.preventDefault();
            setFlag1(true)
        } else {
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
    const handleprime1 = async () => {
        setFlag1(false)
        try {
            const { data } = await funx({
                variables: {
                    data: {
                        plan: "prime-m",
                        member: member1,
                        platform: "Prime",
                        timePeriod: 1,
                        Ldevice: 5,
                        Ddevice: 5,
                        quality: "4K + HDR",
                        price: price1
                    }
                }
            });
            if (data && data.buyplan) {
                toast.custom((t) => (
                    <div className={`${t.visible ? 'animate-enter' : 'animate-leave'} w-fit  bg-neutral-950 border-[1px] border-neutral-800 rounded-2xl mt-9 pointer-events-auto flex ring-1 ring-black ring-opacity-5 shadow-neutral-900 shadow-[0px_0px_10px_2px_rgba(0,0,0,0.2)]`}>
                        <div className='flex py-2 px-2'>
                            <div>
                                <svg xmlns="http://www.w3.org/2000/svg" class="icon icon-tabler mt-[3px] ml-[3px] icon-tabler-circle-check" width="20" height="20" viewBox="0 0 24 24" stroke-width="2.4" stroke="#00b341" fill="none" stroke-linecap="round" stroke-linejoin="round">
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
                ))
            }
        } catch (error) {
            console.error('Error buying:', error);
            toast.custom((t) => (
                <div className={`${t.visible ? 'animate-enter' : 'animate-leave'} w-fit  bg-neutral-950 border-[1px] border-neutral-800 rounded-2xl mt-9 pointer-events-auto flex ring-1 ring-black ring-opacity-5 shadow-neutral-900 shadow-[0px_0px_10px_2px_rgba(0,0,0,0.2)]`}>
                    <div className='flex py-2 px-2'>
                        <div>
                            <svg xmlns="http://www.w3.org/2000/svg" class="icon icon-tabler mt-[3px] ml-[3px] icon-tabler-playstation-x" width="20" height="20" viewBox="0 0 24 24" stroke-width="2.4" stroke="#ff2825" fill="none" stroke-linecap="round" stroke-linejoin="round">
                                <path stroke="none" d="M0 0h24v24H0z" fill="none" />
                                <path d="M12 21a9 9 0 0 0 9 -9a9 9 0 0 0 -9 -9a9 9 0 0 0 -9 9a9 9 0 0 0 9 9z" />
                                <path d="M8.5 8.5l7 7" />
                                <path d="M8.5 15.5l7 -7" />
                            </svg>
                        </div>
                        <div className='px-2'>
                            <h1 className='text-lg'>already have this plan</h1>
                        </div>
                    </div>
                </div>
            ))
        }
    }
    const handleprime2QR = async (e) => {
        if (flag) {

            e.preventDefault();
            setFlag2(true)
        } else {
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
    const handleprime2 = async () => {
        setFlag2(false)
        try {
            const { data } = await funx({
                variables: {
                    data: {
                        plan: "prime-y",
                        member: member2,
                        platform: "Prime",
                        timePeriod: 12,
                        Ldevice: 5,
                        Ddevice: 5,
                        quality: "4K + HDR",
                        price: price2
                    }
                }
            });
            if (data && data.buyplan) {
                toast.custom((t) => (
                    <div className={`${t.visible ? 'animate-enter' : 'animate-leave'} w-fit  bg-neutral-950 border-[1px] border-neutral-800 rounded-2xl mt-9 pointer-events-auto flex ring-1 ring-black ring-opacity-5 shadow-neutral-900 shadow-[0px_0px_10px_2px_rgba(0,0,0,0.2)]`}>
                        <div className='flex py-2 px-2'>
                            <div>
                                <svg xmlns="http://www.w3.org/2000/svg" class="icon icon-tabler mt-[3px] ml-[3px] icon-tabler-circle-check" width="20" height="20" viewBox="0 0 24 24" stroke-width="2.4" stroke="#00b341" fill="none" stroke-linecap="round" stroke-linejoin="round">
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
                ))
            }
        } catch (error) {
            console.error('Error buying:', error);
            toast.custom((t) => (
                <div className={`${t.visible ? 'animate-enter' : 'animate-leave'} w-fit  bg-neutral-950 border-[1px] border-neutral-800 rounded-2xl mt-9 pointer-events-auto flex ring-1 ring-black ring-opacity-5 shadow-neutral-900 shadow-[0px_0px_10px_2px_rgba(0,0,0,0.2)]`}>
                    <div className='flex py-2 px-2'>
                        <div>
                            <svg xmlns="http://www.w3.org/2000/svg" class="icon icon-tabler mt-[3px] ml-[3px] icon-tabler-playstation-x" width="20" height="20" viewBox="0 0 24 24" stroke-width="2.4" stroke="#ff2825" fill="none" stroke-linecap="round" stroke-linejoin="round">
                                <path stroke="none" d="M0 0h24v24H0z" fill="none" />
                                <path d="M12 21a9 9 0 0 0 9 -9a9 9 0 0 0 -9 -9a9 9 0 0 0 -9 9a9 9 0 0 0 9 9z" />
                                <path d="M8.5 8.5l7 7" />
                                <path d="M8.5 15.5l7 -7" />
                            </svg>
                        </div>
                        <div className='px-2'>
                            <h1 className='text-lg'>already have this plan</h1>
                        </div>
                    </div>
                </div>
            ))
        }
    }

    return (
        <div>
            <div>
                <Toaster position="top-center" reverseOrder={false} />
            </div>
            {flag1 && (<div className='flex -mt-10 justify-center'>
                <div className='bg-neutral-800 relative rounded-3xl w-[350px] h-[500px] shadow-neutral-950 shadow-[0px_0px_250px_200px_rgba(0,0,0,0.25)]'>
                    <button className=' absolute right-1' onClick={() => { setFlag1(false) }}>
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
                            <h1 className='text-[17px]'>Paying :</h1>
                        </div>
                        <div>
                            <h1 className='text-[15px] mt-[3px] ml-2'>{price1}.00</h1>
                        </div>
                    </div>
                    <div className='text-neutral-400 ml-[55px] max-w-[250px]'>
                        <h1> <span className='text-neutral-100'>Note :</span> Send a screen shot of the payment on this whatsApp with your username and email. <span className='text-neutral-200'>6283468927</span> </h1>
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
                            <span className='group-hover/btn:opacity-100 block transition duration-500 opacity-0 absolute h-px w-full -bottom-px inset-x-0 bg-gradient-to-r from-transparent via-blue-700 to-transparent'></span>
                            <span className='group-hover/btn:opacity-100 blur-sm block transition duration-500 opacity-0 absolute h-px w-1/2 mx-auto -bottom-px inset-x-10 bg-gradient-to-r from-transparent via-blue-900 to-transparent'></span>
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
                            <h1 className='text-[17px]'>Paying :</h1>
                        </div>
                        <div>
                            <h1 className='text-[15px] mt-[3px] ml-2'>{price2}.00</h1>
                        </div>
                    </div>
                    <div className='text-neutral-400 ml-[55px] max-w-[250px]'>
                        <h1> <span className='text-neutral-100'>Note :</span> Send a screen shot of the payment on this whatsApp with your username and email. <span className='text-neutral-200'>6283468927</span> </h1>
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
                            <span className='group-hover/btn:opacity-100 block transition duration-500 opacity-0 absolute h-px w-full -bottom-px inset-x-0 bg-gradient-to-r from-transparent via-blue-700 to-transparent'></span>
                            <span className='group-hover/btn:opacity-100 blur-sm block transition duration-500 opacity-0 absolute h-px w-1/2 mx-auto -bottom-px inset-x-10 bg-gradient-to-r from-transparent via-blue-900 to-transparent'></span>
                        </button>
                    </div>
                </div>
            </div>)}
            {(flag1 || flag2) ? null : <div className='sm:h-[540px] h-[600px] w-[360px] sm:w-[800px] shadow-neutral-950 shadow-[0px_0px_100px_10px_rgba(0,0,0,0.25)] bg-neutral-900 rounded-xl border-[1px] border-neutral-900'>
                <div className='flex justify-center mt-[25px] sm:mt-[45px]'>
                    <div className='border-[1px] min-h-[350px] pt-4 px-4 border-neutral-800 bg-neutral-800 shadow-neutral-900 shadow-[0px_0px_10px_2px_rgba(0,0,0,0.25)] bg-opacity-45 rounded-2xl'>
                        <div className='border-[1px] border-neutral-800 px-1 py-1 rounded-2xl bg-neutral-800 bg-opacity-45'>
                            <div>
                                <h1 className='text-[17px] sm:text-[22px]'>Prime</h1>
                            </div>
                            <div className='flex'>
                                <div>
                                    <h1 className='text-[18px] sm:text-[24px]'>₹{price1}</h1>
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
                                <h1 className='text-[13px] sm:text-[15px] text-neutral-500'>5</h1>
                            </div>
                        </div>
                        <div className='my-2'>
                            <div>
                                <h1 className='text-[17px] sm:text-[18px] text-neutral-300'>Download devices</h1>
                            </div>
                            <div>
                                <h1 className='text-[13px] sm:text-[15px] text-neutral-500'>5</h1>
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
                                            className="bg-neutral-900 text-white border border-neutral-800 rounded-md p-1 focus:outline-none focus:ring-1 focus:ring-blue-900"
                                            onChange={handleMemberChange1}
                                            value={member1}
                                        >
                                            <option value='2'>2</option>
                                            <option value='3'>3</option>
                                            <option value='4'>4</option>
                                            <option value='5'>5</option>
                                        </select>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className=' flex mt-4 mb-2 justify-center border-[1px] rounded-xl border-neutral-900 bg-neutral-950'>
                            <button onClick={handleprime1QR} className="bg-gradient-to-br bg-neutral-950 relative group/btn block w-full text-white rounded-xl h-10 font-medium" type='submit'>Buy plan
                                <span className='group-hover/btn:opacity-100 block transition duration-500 opacity-0 absolute h-px w-full -bottom-px inset-x-0 bg-gradient-to-r from-transparent via-blue-700 to-transparent'></span>
                                <span className='group-hover/btn:opacity-100 blur-sm block transition duration-500 opacity-0 absolute h-px w-1/2 mx-auto -bottom-px inset-x-10 bg-gradient-to-r from-transparent via-blue-900 to-transparent'></span>
                            </button>
                        </div>
                    </div>
                    <div className='border-[1px] ml-5 min-h-[350px] pt-4 px-4 border-neutral-800 bg-neutral-800 shadow-neutral-900 shadow-[0px_0px_10px_2px_rgba(0,0,0,0.25)] bg-opacity-45 rounded-2xl'>
                        <div className='border-[1px] border-neutral-800 px-1 py-1 rounded-2xl bg-neutral-800 bg-opacity-45'>
                            <div>
                                <h1 className='text-[18px] sm:text-[22px]'>Prime</h1>
                            </div>
                            <div className='flex'>
                                <div>
                                    <h1 className='text-[18px] sm:text-[24px]'>₹{price2}</h1>
                                </div>
                                <div>
                                    <h1 className='text-neutral-500 text-[14px] sm:mt-[11px] mt-[5px] ml-[2px]'>/year</h1>
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
                                <h1 className='text-[13px] sm:text-[15px] text-neutral-500'>5</h1>
                            </div>
                        </div>
                        <div className='my-2'>
                            <div>
                                <h1 className='text-[17px] sm:text-[18px] text-neutral-300'>Download devices</h1>
                            </div>
                            <div>
                                <h1 className='text-[13px] sm:text-[15px] text-neutral-500'>5</h1>
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
                                            className="bg-neutral-900 text-white border border-neutral-800 rounded-md p-1 focus:outline-none focus:ring-1 focus:ring-blue-900"
                                            onChange={handleMemberChange2}
                                            value={member2}
                                        >
                                            <option value='2'>2</option>
                                            <option value='3'>3</option>
                                            <option value='4'>4</option>
                                            <option value='5'>5</option>
                                        </select>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className=' flex mt-4 mb-2 justify-center border-[1px] rounded-xl border-neutral-900 bg-neutral-950'>
                            <button onClick={handleprime2QR} className="bg-gradient-to-br bg-neutral-950 relative group/btn block w-full text-white rounded-xl h-10 font-medium" type='submit'>Buy plan
                                <span className='group-hover/btn:opacity-100 block transition duration-500 opacity-0 absolute h-px w-full -bottom-px inset-x-0 bg-gradient-to-r from-transparent via-blue-700 to-transparent'></span>
                                <span className='group-hover/btn:opacity-100 blur-sm block transition duration-500 opacity-0 absolute h-px w-1/2 mx-auto -bottom-px inset-x-10 bg-gradient-to-r from-transparent via-blue-900 to-transparent'></span>
                            </button>
                        </div>
                    </div>
                </div>
            </div>}
        </div>
    )
}
