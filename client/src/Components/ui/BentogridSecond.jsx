import React, { useState, useEffect, useRef } from "react";
import { BentoGrid, BentoGridItem } from "./Bentogrid";
import Avatar from 'boring-avatars';
import { ask_for_help, Get_msg, Send_msg } from "../../connection/query";
import { useMutation, useQuery } from "@apollo/client";

export function BentoGridSecondDemo({ data, info, id }) {
    const [msg, setMsg] = useState("")
    const [sendmsg] = useMutation(Send_msg)
    const [hellpp] = useMutation(ask_for_help)
    const { data: d1, refetch: r1 } = useQuery(Get_msg, {
        variables: {
            data: id
        }
    });
    const fun = async () => {
        try {
            await sendmsg({
                variables: {
                    data: {
                        id,
                        msg
                    }
                }
            });
            r1()
        } catch (e) {
            console.error("Error sending msg", e);
        }
    }
    const fun1 = async () => {
        try {
            await hellpp({
                variables: {
                    data: id
                }
            });
        } catch (e) {
            console.error("Error sending msg", e);
        }
    }
    const allItems = [];
    if (data?.oneplan && data.oneplan.length > 0) {
        const dynamicItems = data.oneplan.map((item, i) => ({
            title: `${item.platform} + ${item.plan}`,
            header: (
                <Skeleton count={item.members.length} members={item.members} details={[`${item.quality}`, `Live on - ${item.Ldevice}`, `Download on - ${item.Ddevice}`, `Price - ${item.price}`,]} timeLeft={item.left} timePeriod={item.timePeriod} />
            ),
            className: "md:col-span-8",
        }));
        allItems.push(...dynamicItems);
        const dataleft = [
            {
                header: <Hover fun1={fun1} />,
                className: "md:col-span-4",
            },
            {
                title: "Password",
                header: <Password data={data} />,
                className: "md:col-span-6",
            },
            {
                header: <Chat datamsg={d1?.get_msg?.messages || []} plan={data?.oneplan[0]?.platform} fun={fun} setMsg={setMsg} />,
                className: "md:col-span-6"
            },
        ];
        allItems.push(...dataleft);
    } else if (info) {
        allItems.push({
            title: "Personal info",
            header: <Info user={info} />,
            className: "md:col-span-8",
        });
    }

    return (
        <BentoGrid className="xl:max-w-4xl md:mt-8 mx-auto md:auto-rows-[20rem]">
            {allItems.map((item, i) => (
                <BentoGridItem
                    key={i}
                    title={item.title}
                    description={item.description}
                    header={item.header}
                    className={item.className}
                    icon={item.icon}
                />
            ))}
        </BentoGrid>
    );
}

const Skeleton = ({ count = 0, members = [], details = [], timeLeft = 0, timePeriod }) => {
    const timePeriodInMs = timePeriod * 30 * 24 * 60 * 60 * 1000;
    const expirationTime = Number(timeLeft) + timePeriodInMs;
    const daysLeft = Math.floor((expirationTime - Date.now()) / (1000 * 60 * 60 * 24));
    return (
        <div className="w-full h-full rounded-xl bg-neutral-800 bg-opacity-65 ">
            <div className="flex justify-center">
                <h1 className="text-[26px]">Plan</h1>
            </div>
            <div className="flex mt-5 justify-center">
                <div className="py-2 md:px-4 px-[2px] border-[1px] border-neutral-950 rounded-xl bg-neutral-800 bg-opacity-75 ml-5">
                    <div className="mb-2">
                        <h1 className="md:text-[20px] text-[17px]">{`Members - ${count}`}</h1>
                    </div>
                    {members.map((member) => (
                        <div key={member.id}>
                            <h1 className="md:text-[18px] text-[15px] text-neutral-200">{member.userName}</h1>
                        </div>
                    ))}
                </div>
                <div className="py-2 md:px-5 px-[3px] border-[1px] border-neutral-950 rounded-xl bg-neutral-800 bg-opacity-75 mx-2">
                    <div className="mb-2">
                        <h1 className="md:text-[20px] text-[17px]">Details</h1>
                    </div>
                    {details.map((detail, index) => (
                        <div key={index}>
                            <h1 className="md:text-[18px] text-[15px] text-neutral-200">{detail}</h1>
                        </div>
                    ))}
                </div>
                <div className="py-2 md:px-5 px-[2px] border-[1px] border-neutral-950 rounded-xl bg-neutral-800 bg-opacity-75 mr-5">
                    <div className="mb-2">
                        <h1 className="md:text-[20px] text-[17px]">Time</h1>
                    </div>
                    <div>
                        <h1 className="md:text-[18px] text-[15px] text-neutral-200">
                            {daysLeft >= 0 ? `${daysLeft} days left` : "Expired"}
                        </h1>
                    </div>
                </div>
            </div>
        </div>
    );
};

import { toast, Toaster } from 'react-hot-toast';
import { EvervaultCardDemo } from "./EvervalutCardDemo";

const Hover = ({ fun1 }) => {
    const showToast = () => {
        fun1()
        toast.custom((t) => (
            <div className={`${t.visible ? 'animate-enter' : 'animate-leave'} md:w-fit  bg-neutral-950 border-[1px] border-neutral-800 rounded-lg pointer-events-auto flex ring-1 ring-black ring-opacity-5 shadow-neutral-900 shadow-[0px_0px_10px_2px_rgba(0,0,0,0.2)]`}>
                <div className='flex py-1 px-2'>
                    <div>
                        <svg xmlns="http://www.w3.org/2000/svg" class="icon icon-tabler mt-[3px] ml-[3px] icon-tabler-circle" width="20" height="20" viewBox="0 0 24 24" stroke-width="2.4" stroke="#ffffff" fill="none" stroke-linecap="round" stroke-linejoin="round">
                            <path stroke="none" d="M0 0h24v24H0z" fill="none" />
                            <path d="M12 12m-9 0a9 9 0 1 0 18 0a9 9 0 1 0 -18 0" />
                        </svg>
                    </div>
                    <div className='px-2'>
                        <h1 className='text-lg'>Help is coming</h1>
                    </div>
                </div>
            </div>
        ))
    };

    return (
        <div className="flex justify-center">
            <div className="md:w-full md:h-full rounded-xl bg-neutral-800 bg-opacity-65" onClick={showToast}>
                <EvervaultCardDemo />
                <Toaster position="top-center" reverseOrder={false} />
            </div>
        </div>
    );
};

const Chat = ({ datamsg, plan, fun, setMsg }) => {
    const getColorClass = (plan) => {
        switch (plan) {
            case "Netflix":
            case "Youtube":
                return { msgClass: "bg-red-800", btnClass: "bg-red-600" };
            case "Prime":
                return { msgClass: "bg-blue-800", btnClass: "bg-blue-600" };
            case "Spotify":
                return { msgClass: "bg-green-800", btnClass: "bg-green-600" };
            case "Sonyliv":
                return { msgClass: "bg-yellow-800", btnClass: "bg-yellow-600" };
            case "Diseny":
                return { msgClass: "bg-purple-900", btnClass: "bg-purple-600" };
            default:
                return { msgClass: "bg-neutral-800", btnClass: "bg-neutral-600" };
        }
    };

    const { msgClass, btnClass } = getColorClass(plan);
    const bottomRef = useRef(null);

    useEffect(() => {
        bottomRef.current?.scrollIntoView({ behavior: "smooth" });
    }, [datamsg]);

    return (
        <div className="relative  rounded-xl h-[150px] bg-neutral-800 bg-opacity-65  md:w-full md:h-full md:pt-2 md:px-2">
            <div className="overflow-auto h-[calc(100%-4rem)] pb-1">
                {datamsg.map((msg, index) => {
                    const showAvatar = index === 0 || datamsg[index - 1].userName !== msg.userName;
                    const isRightSide = msg.side;

                    let roundedClass = '';
                    let paddingClass = '';

                    if (isRightSide) {
                        if (showAvatar) {
                            roundedClass = 'rounded-b-xl rounded-l-xl';
                        } else {
                            roundedClass = 'rounded-xl';
                            paddingClass = 'mr-8';
                        }
                    } else {
                        if (showAvatar) {
                            roundedClass = 'rounded-b-xl rounded-r-xl';
                        } else {
                            roundedClass = 'rounded-xl';
                            paddingClass = 'ml-8';
                        }
                    }

                    return (
                        <div key={index} className={`flex ${isRightSide ? 'justify-end' : 'justify-start'} pb-2`}>
                            {isRightSide ? (
                                <div className="flex md:max-w-[270px]">
                                    <div className={`relative bg-opacity-40 ${msgClass} ${roundedClass} ${paddingClass} mr-2 w-fit px-3 py-[2px]`}>
                                        <div className="text-[10px] absolute right-0 text-neutral-500 pr-1">{msg.userName}</div>
                                        <h1 className="text-[15px] mt-[14px]">{msg.msg}</h1>
                                    </div>
                                    {showAvatar && <Avatar name={msg.userName} variant='marble' size={25} colors={["#fb6900", "#f63700", "#004853", "#007e80", "#00b9bd"]} />}
                                </div>
                            ) : (
                                <div className="flex md:max-w-[270px]">
                                    {showAvatar && <Avatar name={msg.userName} variant='marble' size={25} colors={["#fb6900", "#f63700", "#004853", "#007e80", "#00b9bd"]} />}
                                    <div className={`bg-neutral-700 bg-opacity-30 ${roundedClass} ${paddingClass} ml-2 w-fit px-3 py-[2px]`}>
                                        <div className="text-[10px] text-neutral-500">{msg.userName}</div>
                                        <h1 className="text-[15px]">{msg.msg}</h1>
                                    </div>
                                </div>
                            )}
                        </div>
                    );
                })}
                <div ref={bottomRef} />
            </div>
            <div className="absolute bottom-0 left-0 w-fit flex items-center bg-neutral-800 bg-opacity-60 p-2 rounded-xl">
                <input
                    onChange={(e) => { setMsg(e.target.value) }}
                    type="text"
                    className="flex-grow md:p-2 p-[3px] rounded-xl bg-neutral-700 bg-opacity-40 text-white focus:outline-none md:mr-4"
                    placeholder="Type a message..."
                />
                <button
                    onClick={fun}
                    className={`${btnClass} p-1 rounded-full text-white hover:opacity-75 focus:outline-none`}
                >
                    <svg xmlns="http://www.w3.org/2000/svg" class="icon icon-tabler icon-tabler-send-2" width="28" height="28" viewBox="0 0 24 24" stroke-width="1.8" stroke="#ffffff" fill="none" stroke-linecap="round" stroke-linejoin="round">
                        <path stroke="none" d="M0 0h24v24H0z" fill="none" />
                        <path d="M4.698 4.034l16.302 7.966l-16.302 7.966a.503 .503 0 0 1 -.546 -.124a.555 .555 0 0 1 -.12 -.568l2.468 -7.274l-2.468 -7.274a.555 .555 0 0 1 .12 -.568a.503 .503 0 0 1 .546 -.124z" />
                        <path d="M6.5 12h14.5" />
                    </svg>
                </button>
            </div>
        </div>
    );
};

const Password = ({ data }) => (
    <div className="w-full h-full  flex justify-center rounded-xl bg-neutral-800 bg-opacity-65 ">
        <div className=" md:w-[350px] md:h-[100px] w-fit h-fit md:mt-[80px] mt-[40px] mb-[10px] md:mb-0 rounded-md bg-neutral-900 bg-opacity-45 border-[1px] border-neutral-950">
            <div className=" mx-3 py-4">
                <div className="flex">
                    <div className="">
                        <h1 className="md:text-[20px] text-[17px]">Email</h1>
                    </div>
                    <div>
                        <h1 className="md:text-[18px] text-[15px] text-neutral-500 md:ml-2 ml-[1px] mt-[3px]"> {data?.oneplan[0]?.email}</h1>
                    </div>
                </div>
                <div className="flex relative">
                    <div>
                        <h1 className="md:text-[20px] text-[17px]">Password</h1>
                    </div>
                    <div>
                        <h1 className="md:text-[18px] text-[15px] text-neutral-500 md:ml-2 ml-[1px] mt-[3px]"> {data?.oneplan[0]?.password}</h1>
                    </div>
                </div>
            </div>
        </div>
    </div>
);

const Info = ({ user }) => (
    <div className="md:w-full sm:w-full sm:h-full md:h-full rounded-xl bg-neutral-800 bg-opacity-65 flex justify-center">
        <div className="md:w-fit md:min-w-[300px] w-fit h-fit md:h-[220px] mt-[20px] rounded-md bg-neutral-900 bg-opacity-45 border-[1px] border-neutral-950">
            <div className="mx-3 py-4">
                <div className="flex">
                    <div className="">
                        <h1 className="text-[17px] md:text-[20px]">Email </h1>
                    </div>
                    <div>
                        <h1 className="md:text-[18px] text-[16px] text-neutral-500 md:ml-2 mt-[3px]">{user?.email}</h1>
                    </div>
                </div>
                <div className="flex">
                    <div className="">
                        <h1 className="md:text-[20px] text-[17px]">Username </h1>
                    </div>
                    <div>
                        <h1 className="md:text-[18px] text-[16px] text-neutral-500 md:ml-2 mt-[3px]">{user?.userName}</h1>
                    </div>
                </div>
                <div className="flex">
                    <div className="">
                        <h1 className="md:text-[20px] text-[17px]">First Name</h1>
                    </div>
                    <div>
                        <h1 className="md:text-[18px] text-[16px] text-neutral-500 md:ml-2 mt-[3px]">{user?.firstName}</h1>
                    </div>
                </div>
                <div className="flex">
                    <div className="">
                        <h1 className="md:text-[20px] text-[17px]">Last Name</h1>
                    </div>
                    <div>
                        <h1 className="md:text-[18px] text-[14px] text-neutral-500 md:ml-2 mt-[3px]">{user?.lastName}</h1>
                    </div>
                </div>
                <div className="flex relative">
                    <div className="">
                        <h1 className="md:text-[20px] text-[17px]">Password</h1>
                    </div>
                    <div className="flex">
                        <h1 className="md:text-[18px] text-[16px] text-neutral-500 ml-2 mt-[3px]">{user.password.substring(0, 2)}....</h1>
                    </div>
                </div>
            </div>
        </div>
    </div>
);
