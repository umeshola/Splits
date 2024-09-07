import React, { useState } from 'react';
import { Input } from './ui/Input';
import { useNavigate } from 'react-router-dom';
import { SIGNUP } from '../connection/query';
import { useMutation } from '@apollo/client';
import { Toaster, toast } from 'react-hot-toast';

export default function Signup() {
    const [fname, setFname] = useState('');
    const [lname, setLname] = useState('');
    const [userName, setName] = useState("");
    const [email, setMail] = useState("");
    const [password, setPass] = useState("");
    const [passwordError, setPasswordError] = useState("");
    const [phone, setPhone] = useState("");
    const [phoneError, setPhoneError] = useState("");
    const navigate = useNavigate();

    const [funxtion, { data, loading, error }] = useMutation(SIGNUP);
    if (error) {
        console.log(error);
    }

    const handlePhoneChange = (e) => {
        const value = e.target.value;
        if (value.length > 10) return; // Prevent entering more than 10 digits
        setPhone(value);

        // Check if the phone number is exactly 10 digits
        if (value.length === 10) {
            setPhoneError("");
        } else {
            setPhoneError("Phone number should be exactly 10 digits.");
        }
    };

    // Password validation function
    const validatePassword = (pass) => {
        const isValidLength = pass.length >= 8;
        const hasSpecialChar = /[!@#$%^&*(),.?":{}|<>]/.test(pass);
        const hasNumber = /\d/.test(pass);

        if (!isValidLength || !hasSpecialChar || !hasNumber) {
            setPasswordError('Password must be at least 8 characters long, include a number and a special character.');
        } else {
            setPasswordError('Password is strong and good!'); // Green message
        }
    };

    const handlePasswordChange = (e) => {
        const newPassword = e.target.value;
        setPass(newPassword);
        validatePassword(newPassword); // Call password validation on every change
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (phone.length !== 10) {
            setPhoneError("Phone number should be exactly 10 digits.");
            return;
        }

        // Ensure the password is valid before submitting
        if (passwordError.includes('must')) {
            toast.error("Please provide a valid password.");
            return;
        }

        try {
            const { data } = await funxtion({
                variables: {
                    data: {
                        firstName: fname,
                        lastName: lname,
                        userName,
                        email,
                        password,
                        phone
                    }
                }
            });
            if (data && data.signup && data.signup.token) {
                localStorage.setItem('token', data.signup.token);
                window.location = '/';
            }
        } catch (error) {
            console.error('Error signing up:', error);
            toast.custom((t) => (
                <div className={`${t.visible ? 'animate-enter' : 'animate-leave'} w-fit bg-neutral-950 border-[1px] border-neutral-800 rounded-lg pointer-events-auto flex ring-1 ring-black ring-opacity-5 shadow-neutral-900 shadow-[0px_0px_10px_2px_rgba(0,0,0,0.2)]`}>
                    <div className='flex py-1 px-2'>
                        <div>
                            <svg xmlns="http://www.w3.org/2000/svg" className="icon icon-tabler mt-[3px] ml-[3px] icon-tabler-circle" width="20" height="20" viewBox="0 0 24 24" strokeWidth="2.4" stroke="#ffffff" fill="none" strokeLinecap="round" strokeLinejoin="round">
                                <path stroke="none" d="M0 0h24v24H0z" fill="none" />
                                <path d="M12 12m-9 0a9 9 0 1 0 18 0a9 9 0 1 0 -18 0" />
                            </svg>
                        </div>
                        <div className='px-2'>
                            <h1 className='text-lg'>Account already exists</h1>
                        </div>
                    </div>
                </div>
            ));
        }
    };

    return (
        <div>
            <Toaster position="top-center" reverseOrder={false} />
            <div className="flex justify-center mt-10">
                <div className='flex justify-center border-[1px] border-neutral-700 p-7 rounded-2xl w-fit bg-black'>
                    <div>
                        <div className='space-y-2 mb-4'>
                            <h1 className='text-xl text-left'>Welcome to Splits</h1>
                            <h1 className='text-neutral-400'>If you already have an account click here <span onClick={() => navigate('/login')} className='text-blue-500 hover:cursor-pointer underline'>login</span>.</h1>
                        </div>
                        <div className='flex mb-4 pt-6'>
                            <div className='mr-2'>
                                <h1 className='text-left'>First name</h1>
                                <Input onChange={(e) => setFname(e.target.value)} id="first-name" type="text" placeholder="Karan" />
                            </div>
                            <div>
                                <h1 className='text-left'>Last name</h1>
                                <Input onChange={(e) => setLname(e.target.value)} id="last-name" type="text" placeholder="Yadav" />
                            </div>
                        </div>
                        <div className='mb-4'>
                            <h1 className='text-left'>Username</h1>
                            <Input onChange={(e) => setName(e.target.value)} id="username" type="text" placeholder="karan121203" />
                        </div>
                        <div className='mb-4'>
                            <h1 className='text-left'>Email Address</h1>
                            <Input onChange={(e) => setMail(e.target.value)} id="email" type="email" placeholder="yourmail@gmail.com" />
                        </div>
                        <div className='mb-4'>
                            <h1 className='text-left'>Phone number</h1>
                            <Input onChange={handlePhoneChange} id='phone' type='number' value={phone} placeholder="9989897889" />
                            {phoneError && <p className="text-red-500 text-sm">{phoneError}</p>}
                        </div>
                        <div className='mb-4'>
                            <h1 className='text-left'>Password</h1>
                            <Input onChange={handlePasswordChange} id="password" type="password" placeholder="......" />
                            <p className={passwordError.includes('strong') ? "text-green-500 text-sm" : "text-red-500 text-sm"}>
                                {passwordError}
                            </p>
                        </div>
                        <div className='mt-16'>
                            <button onClick={handleSubmit} className="bg-gradient-to-br bg-neutral-950 border-[0.8px] border-neutral-900 relative group/btn block w-full text-white rounded-md h-10 font-medium" type='submit'>Sign Up
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
