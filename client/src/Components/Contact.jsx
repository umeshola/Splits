import React, { useRef, useState } from 'react';
import emailjs from '@emailjs/browser'
import { Toaster, toast } from 'react-hot-toast';
export default function Contact() {
    const formRef = useRef();
    const [form, setForm] = useState({
        name: "",
        email: "",
        message: "",
    });

    const [loading, setLoading] = useState(false);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setForm({
            ...form,
            [name]: value,
        });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        setLoading(true);

        emailjs
            .send(
                'service_a62suil',  // Replace with your EmailJS service ID
                'template_dqefg0a', // Replace with your EmailJS template ID
                {
                    from_name: form.name,
                    to_name: "Splits",
                    from_email: form.email,
                    to_email: "splitscompany1@gmail.com", // Replace with your email
                    message: form.message,
                },
                'Z9rpUPgqKbWNZkUkH'
            )
            .then(
                () => {
                    setLoading(false);
                    toast.custom((t) => (
                        <div className={`${t.visible ? 'animate-enter' : 'animate-leave'} w-fit mt-12 bg-neutral-950 border-[1px] border-neutral-800 rounded-2xl pointer-events-auto flex ring-1 ring-black ring-opacity-5 shadow-neutral-900 shadow-[0px_0px_10px_2px_rgba(0,0,0,0.2)]`}>
                            <div className='flex py-2 px-2'>
                                <div>
                                    <svg xmlns="http://www.w3.org/2000/svg" class="icon icon-tabler mt-[3px] ml-[3px] icon-tabler-circle" width="20" height="20" viewBox="0 0 24 24" stroke-width="2.4" stroke="#ffffff" fill="none" stroke-linecap="round" stroke-linejoin="round">
                                        <path stroke="none" d="M0 0h24v24H0z" fill="none" />
                                        <path d="M12 12m-9 0a9 9 0 1 0 18 0a9 9 0 1 0 -18 0" />
                                    </svg>
                                </div>
                                <div className='px-2'>
                                    <h1 className='text-lg'>We'll get back to you as soon as possible</h1>
                                </div>
                            </div>
                        </div>
                    ));
                    setForm({
                        name: "",
                        email: "",
                        message: "",
                    });
                },
                (error) => {
                    setLoading(false);
                    console.error(error);
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
                                    <h1 className='text-lg'>Aah something went wrong</h1>
                                </div>
                            </div>
                        </div>
                    ));
                }
            );
    };
    return (
        <div>
            <div>
                <Toaster position="top-center" reverseOrder={false} />
            </div>
            <div className='md:flex md:justify-center md:px-32 mb-[182px]'>
                <div className='md:hidden mb-5'>
                    <div>
                        <h1 className='text-[34px]'>Contact us</h1>
                    </div>
                    <div>
                        <h1 className='text-[16px] text-neutral-300'>
                            Have a question? We're always here to help.
                        </h1>
                    </div>
                </div>
                <div className='md:hidden'>
                    <div className='border-[1px] bg-neutral-900 bg-opacity-40 rounded-lg shadow-neutral-900 pb-4 pt-4 border-neutral-800 w-[200px] shadow-[0px_0px_10px_2px_rgba(0,0,0,0.5)]'>
                        <div className='pl-4'>
                            <svg xmlns="http://www.w3.org/2000/svg" class="icon icon-tabler icon-tabler-messages" width="23" height="23" viewBox="0 0 24 24" stroke-width="1.0" stroke="#ffffff" fill="none" stroke-linecap="round" stroke-linejoin="round">
                                <path stroke="none" d="M0 0h24v24H0z" fill="none" />
                                <path d="M21 14l-3 -3h-7a1 1 0 0 1 -1 -1v-6a1 1 0 0 1 1 -1h9a1 1 0 0 1 1 1v10" />
                                <path d="M14 15v2a1 1 0 0 1 -1 1h-7l-3 3v-10a1 1 0 0 1 1 -1h2" />
                            </svg>
                        </div>
                        <div className='pl-4 pt-[19px]'>
                            <div>
                                <h1>Chat with us</h1>
                            </div>
                            <div>
                                <h1 className='text-neutral-400 text-[14px]'>Get in touch over email.</h1>
                            </div>
                            <div className='pt-4'>
                                <h1 className='text-neutral-400 text-[14px]'>splitscompany1@gmail.com</h1>
                            </div>
                        </div>
                    </div>
                    <div className='border-[1px] mt-8 bg-neutral-900 bg-opacity-40 rounded-lg shadow-neutral-900 pb-4 pt-4 border-neutral-800 w-[200px] shadow-[0px_0px_10px_2px_rgba(0,0,0,0.5)]'>
                        <div className='pl-4'>
                            <svg xmlns="http://www.w3.org/2000/svg" class="icon icon-tabler icon-tabler-phone" width="23" height="23" viewBox="0 0 24 24" stroke-width="1.0" stroke="#ffffff" fill="none" stroke-linecap="round" stroke-linejoin="round">
                                <path stroke="none" d="M0 0h24v24H0z" fill="none" />
                                <path d="M5 4h4l2 5l-2.5 1.5a11 11 0 0 0 5 5l1.5 -2.5l5 2v4a2 2 0 0 1 -2 2a16 16 0 0 1 -15 -15a2 2 0 0 1 2 -2" />
                            </svg>
                        </div>
                        <div className='pl-4 pt-4'>
                            <div>
                                <h1>Call us</h1>
                            </div>
                            <div>
                                <h1 className='text-neutral-400 text-[14px]'>Speak to us over the phone.</h1>
                            </div>
                            <div className='pt-4'>
                                <h1 className='text-neutral-400 text-[14px] underline'>+91 6283468927</h1>
                            </div>
                        </div>
                    </div>
                </div>
                <div className='lg:mr-24 '>
                    <div className='hidden md:block'>
                        <div>
                            <h1 className='text-[34px]'>Contact us</h1>
                        </div>
                        <div>
                            <h1 className='text-[16px] text-neutral-300'>
                                Have a question? We're always here to help.
                            </h1>
                        </div>
                    </div>
                    <form
                        ref={formRef}
                        onSubmit={handleSubmit}
                        className='mt-8 flex flex-col gap-4'
                    >
                        <input
                            className='px-2 py-2 text-[15px] bg-neutral-800 bg-opacity-45 border-[1px] border-neutral-800 rounded-md md:w-[380px] placeholder:text-neutral-400'
                            type="text"
                            name="name"
                            value={form.name}
                            onChange={handleChange}
                            placeholder='Name'
                        />
                        <input
                            className='px-2 py-2 my-4 text-[15px] bg-neutral-800 bg-opacity-45 border-[1px] border-neutral-800 rounded-md md:w-[380px] placeholder:text-neutral-400'
                            type='email'
                            name="email"
                            value={form.email}
                            onChange={handleChange}
                            placeholder='Your Email'
                        />
                        <textarea
                            className='px-2 text-[15px] bg-neutral-800 bg-opacity-45 border-[1px] border-neutral-800 rounded-md md:w-[380px] h-44 placeholder:text-neutral-400'
                            name="message"
                            value={form.message}
                            onChange={handleChange}
                            placeholder='Enter a message'
                        />
                        <button
                            type="submit"
                            className="md:w-[380px] w-[210px] bg-neutral-700 hover:bg-neutral-600 text-black font-semibold py-2 rounded-md mt-4"
                        >
                            {loading ? "Sending..." : "Submit"}
                        </button>
                    </form>
                </div>


                <div className='md:mt-[107px] md:ml-24 hidden md:block'>
                    <div className='border-[1px] bg-neutral-900 bg-opacity-40 rounded-lg shadow-neutral-900 pb-4 pt-4 border-neutral-800 w-[400px] shadow-[0px_0px_10px_2px_rgba(0,0,0,0.5)]'>
                        <div className='pl-4'>
                            <svg xmlns="http://www.w3.org/2000/svg" class="icon icon-tabler icon-tabler-messages" width="23" height="23" viewBox="0 0 24 24" stroke-width="1.0" stroke="#ffffff" fill="none" stroke-linecap="round" stroke-linejoin="round">
                                <path stroke="none" d="M0 0h24v24H0z" fill="none" />
                                <path d="M21 14l-3 -3h-7a1 1 0 0 1 -1 -1v-6a1 1 0 0 1 1 -1h9a1 1 0 0 1 1 1v10" />
                                <path d="M14 15v2a1 1 0 0 1 -1 1h-7l-3 3v-10a1 1 0 0 1 1 -1h2" />
                            </svg>
                        </div>
                        <div className='pl-4 pt-[19px]'>
                            <div>
                                <h1>Chat with us</h1>
                            </div>
                            <div>
                                <h1 className='text-neutral-400 text-[14px]'>Get in touch over email.</h1>
                            </div>
                            <div className='pt-4'>
                                <h1 className='text-neutral-400 text-[14px]'>splitscompany1@gmail.com</h1>
                            </div>
                        </div>
                    </div>
                    <div className='border-[1px] mt-8 bg-neutral-900 bg-opacity-40 rounded-lg shadow-neutral-900 pb-4 pt-4 border-neutral-800 w-[400px] shadow-[0px_0px_10px_2px_rgba(0,0,0,0.5)]'>
                        <div className='pl-4'>
                            <svg xmlns="http://www.w3.org/2000/svg" class="icon icon-tabler icon-tabler-phone" width="23" height="23" viewBox="0 0 24 24" stroke-width="1.0" stroke="#ffffff" fill="none" stroke-linecap="round" stroke-linejoin="round">
                                <path stroke="none" d="M0 0h24v24H0z" fill="none" />
                                <path d="M5 4h4l2 5l-2.5 1.5a11 11 0 0 0 5 5l1.5 -2.5l5 2v4a2 2 0 0 1 -2 2a16 16 0 0 1 -15 -15a2 2 0 0 1 2 -2" />
                            </svg>
                        </div>
                        <div className='pl-4 pt-4'>
                            <div>
                                <h1>Call us</h1>
                            </div>
                            <div>
                                <h1 className='text-neutral-400 text-[14px]'>Speak to us over the phone.</h1>
                            </div>
                            <div className='pt-4'>
                                <h1 className='text-neutral-400 text-[14px] '>+91 6283468927</h1>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
