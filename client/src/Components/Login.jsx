import React, { useState } from 'react';
import { Input } from './ui/Input';
import { useNavigate } from 'react-router-dom';
import { Toaster, toast } from 'react-hot-toast'
import { LOGIN } from '../connection/query';
import { useMutation } from '@apollo/client';
export default function Login() {
    const [token, setToken] = useState("");
    const [password, setPass] = useState("");
    const [userName, setName] = useState("")
    const navigate = useNavigate();

    const [funxtion, { data, loading, error }] = useMutation(LOGIN);
    if (error) {
        console.log(error)
    }
    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const { data } = await funxtion({
                variables: {
                    data: {
                        userName,
                        password
                    }
                }
            });
            if (data && data.login && data.login.token) {
                setToken(data.login.token);
                localStorage.setItem('token', data.login.token);
                window.location = '/'
            }
        } catch (error) {
            console.error('Error login up:', error);
            toast.custom((t) => (
                <div className={`${t.visible ? 'animate-enter' : 'animate-leave'} w-fit  bg-neutral-950 border-[1px] border-neutral-800 rounded-lg pointer-events-auto flex ring-1 ring-black ring-opacity-5 shadow-neutral-900 shadow-[0px_0px_10px_2px_rgba(0,0,0,0.2)]`}>
                    <div className='flex py-1 px-2'>
                        <div>
                            <svg xmlns="http://www.w3.org/2000/svg" class="icon icon-tabler mt-[3px] ml-[3px] icon-tabler-circle" width="20" height="20" viewBox="0 0 24 24" stroke-width="2.4" stroke="#ffffff" fill="none" stroke-linecap="round" stroke-linejoin="round">
                                <path stroke="none" d="M0 0h24v24H0z" fill="none" />
                                <path d="M12 12m-9 0a9 9 0 1 0 18 0a9 9 0 1 0 -18 0" />
                            </svg>
                        </div>
                        <div className='px-2'>
                            <h1 className='text-lg'>Username or password is incorrect</h1>
                        </div>
                    </div>
                </div>
            ))
        }
    };

    return (
        <div>
            <div>
                <Toaster position="top-center" reverseOrder={false} />
            </div>
            <div className="flex justify-center mt-20">
                <div className='flex justify-center border-[1px] border-neutral-700 p-7 rounded-2xl w-fit bg-black'>
                    <div>
                        <div className='space-y-2 mb-4'>
                            <h1 className='text-xl text-left'>Welcome to Splits</h1>
                            <h1 className='text-neutral-400'>If you don't have account click here <span onClick={() => navigate('/singup')} className='text-blue-500 hover:cursor-pointer underline'>signup</span>.</h1>
                        </div>
                        <div className='mb-4'>
                            <h1 className='text-left'>Username</h1>
                            <Input onChange={(e) => setName(e.target.value)} id="username" type="text" placeholder="Karan481" />
                        </div>
                        <div className='mb-4'>
                            <h1 className='text-left'>Password</h1>
                            <Input onChange={(e) => setPass(e.target.value)} id="password" type="password" placeholder="......" />
                        </div>
                        <div className='mt-16'>
                            <button onClick={handleSubmit} className="bg-gradient-to-br bg-neutral-950 border-[0.8px] border-neutral-900 relative group/btn  block  w-full text-white rounded-md h-10 font-medium" type='submit'>Login
                                <span className='group-hover/btn:opacity-100 block transition duration-500 opacity-0 absolute h-px w-full -bottom-px inset-x-0 bg-gradient-to-r from-transparent via-cyan-500 to-transparent'></span>
                                <span className='group-hover/btn:opacity-100 blur-sm block transition duration-500 opacity-0 absolute h-px w-1/2 mx-auto -bottom-px inset-x-10 bg-gradient-to-r from-transparent via-indigo-500 to-transparent'></span>
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}