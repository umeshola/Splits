import React, { useState } from 'react';
import { Sidebar, SidebarBody, SidebarLink } from './ui/Sidebar';
import { BentoGridSecondDemo } from './ui/BentogridSecond';
import { Get_Plan, GetOnePlanData, MEINFO, remove_plan_after_time } from '../connection/query';
import { useQuery } from '@apollo/client';
import { useParams } from 'react-router-dom'

export default function Profile() {
    const { id } = useParams()
    const [sidebarOpen, setSidebarOpen] = useState(false);
    const [fun1] = useMutation(remove_plan_after_time)
    const { data: d1, loading: l1, error: e1, refetch: r1 } = useQuery(Get_Plan);
    const { data: d2, loading: l2, error: e2, refetch: r2 } = useQuery(GetOnePlanData, {
        skip: !id,
        variables: { data: id }
    });
    const { data: d3 } = useQuery(MEINFO);

    const handleRemoveWaiting = async () => {
        try {
            await fun1();
            r1();
            r2();
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

    }, []);
    if (l1 || l2) return <p className='text-white text-2xl text-center'>Loading...</p>;
    if (e1 || e2) return <p className='text-4xl text-neutral-300 text-center mt-24'>You are not Loged in<a href='/login' className=' underline text-xl text-blue-500 ml-2 hover:cursor-pointer'>(login)</a> </p>;

    const icons = {
        "Netflix": (
            <svg xmlns="http://www.w3.org/2000/svg" className="icon icon-tabler icon-tabler-brand-netflix" width="40" height="40" viewBox="0 0 24 24" strokeWidth="1.8" stroke="#ffffff" fill="none" strokeLinecap="round" strokeLinejoin="round">
                <path stroke="none" d="M0 0h24v24H0z" fill="none" />
                <path d="M9 3l10 18h-4l-10 -18z" />
                <path d="M5 3v18h4v-10.5" />
                <path d="M19 21v-18h-4v10.5" />
            </svg>
        ),
        "Prime": (
            <svg xmlns="http://www.w3.org/2000/svg" className="icon icon-tabler icon-tabler-brand-amazon" width="40" height="40" viewBox="0 0 24 24" strokeWidth="2" stroke="#ffffff" fill="none" strokeLinecap="round" strokeLinejoin="round">
                <path stroke="none" d="M0 0h24v24H0z" fill="none" />
                <path d="M17 12.5a15.198 15.198 0 0 1 -7.37 1.44a14.62 14.62 0 0 1 -6.63 -2.94" />
                <path d="M19.5 15c.907 -1.411 1.451 -3.323 1.5 -5c-1.197 -.773 -2.577 -.935 -4 -1" />
            </svg>
        ),
        "Diseny": (
            <svg xmlns="http://www.w3.org/2000/svg" className="icon icon-tabler icon-tabler-jewish-star" width="40" height="40" viewBox="0 0 24 24" strokeWidth="2" stroke="#ffffff" fill="none" strokeLinecap="round" strokeLinejoin="round">
                <path stroke="none" d="M0 0h24v24H0z" fill="none" />
                <path d="M12 2l3 5h6l-3 5l3 5h-6l-3 5l-3 -5h-6l3 -5l-3 -5h6z" />
            </svg>
        ),
        "Sonyliv": (
            <svg xmlns="http://www.w3.org/2000/svg" className="icon icon-tabler icon-tabler-circle-letter-s" width="40" height="40" viewBox="0 0 24 24" strokeWidth="2" stroke="#ffffff" fill="none" strokeLinecap="round" strokeLinejoin="round">
                <path stroke="none" d="M0 0h24v24H0z" fill="none" />
                <path d="M12 12m-9 0a9 9 0 1 0 18 0a9 9 0 1 0 -18 0" />
                <path d="M10 15a1 1 0 0 0 1 1h2a1 1 0 0 0 1 -1v-2a1 1 0 0 0 -1 -1h-2a1 1 0 0 1 -1 -1v-2a1 1 0 0 1 1 -1h2a1 1 0 0 1 1 1" />
            </svg>
        ),
        "Youtube": (
            <svg xmlns="http://www.w3.org/2000/svg" className="icon icon-tabler icon-tabler-brand-youtube" width="40" height="40" viewBox="0 0 24 24" strokeWidth="2" stroke="#ffffff" fill="none" strokeLinecap="round" strokeLinejoin="round">
                <path stroke="none" d="M0 0h24v24H0z" fill="none" />
                <path d="M2 8a4 4 0 0 1 4 -4h12a4 4 0 0 1 4 4v8a4 4 0 0 1 -4 4h-12a4 4 0 0 1 -4 -4v-8z" />
                <path d="M10 9l5 3l-5 3z" />
            </svg>
        ),
        "Spotify": (
            <svg xmlns="http://www.w3.org/2000/svg" className="icon icon-tabler icon-tabler-brand-spotify" width="40" height="40" viewBox="0 0 24 24" strokeWidth="2" stroke="#ffffff" fill="none" strokeLinecap="round" strokeLinejoin="round">
                <path stroke="none" d="M0 0h24v24H0z" fill="none" />
                <path d="M12 12m-9 0a9 9 0 1 0 18 0a9 9 0 1 0 -18 0" />
                <path d="M8 11.973c2.5 -1.473 5.5 -.973 7.5 .527" />
                <path d="M9 15c1.5 -1 4 -1 5 .5" />
                <path d="M7 9c2 -1 6 -2 10 .5" />
            </svg>
        )
    };

    const plansLinks = d1.giveplan.map(plan => {
        return {
            label: plan.platform,
            href: `/profile/${plan.id}`,
            icon: icons[plan.platform] || (
                <svg xmlns="http://www.w3.org/2000/svg" className="icon icon-tabler icon-tabler-alert-circle" width="40" height="40" viewBox="0 0 24 24" strokeWidth="2" stroke="#ffffff" fill="none" strokeLinecap="round" strokeLinejoin="round">
                    <path stroke="none" d="M0 0h24v24H0z" fill="none" />
                    <path d="M12 12v2m0 -4v.01" />
                    <path d="M12 5c-3.86 0 -7 3.14 -7 7s3.14 7 7 7s7 -3.14 7 -7s-3.14 -7 -7 -7z" />
                </svg>
            )
        };
    });

    const links = [
        {
            label: "", href: "/", icon: (
                <div>
                    <svg xmlns="http://www.w3.org/2000/svg" className="icon icon-tabler icon-tabler-chevron-left" width="28" height="28" viewBox="0 0 24 24" strokeWidth="2.5" stroke="#ffffff" fill="none" strokeLinecap="round" strokeLinejoin="round">
                        <path stroke="none" d="M0 0h24v24H0z" fill="none" />
                        <path d="M15 6l-6 6l6 6" />
                    </svg>
                </div>
            )
        },
        {
            label: "Info", href: "/profile", icon: (
                <div>
                    <svg xmlns="http://www.w3.org/2000/svg" className="icon icon-tabler icon-tabler-id" width="40" height="40" viewBox="0 0 24 24" strokeWidth="2" stroke="#ffffff" fill="none" strokeLinecap="round" strokeLinejoin="round">
                        <path stroke="none" d="M0 0h24v24H0z" fill="none" />
                        <path d="M3 4m0 3a3 3 0 0 1 3 -3h12a3 3 0 0 1 3 3v10a3 3 0 0 1 -3 3h-12a3 3 0 0 1 -3 -3z" />
                        <path d="M9 10m-2 0a2 2 0 1 0 4 0a2 2 0 1 0 -4 0" />
                        <path d="M15 8l2 0" />
                        <path d="M15 12l2 0" />
                        <path d="M7 16l10 0" />
                    </svg>
                </div>
            )
        },
        ...plansLinks
    ];
    const bentoData = id ? d2 : { oneplan: [] };
    const bentoInfo = id ? null : d3?.me;
    return (
        <div>
            <div className="flex">
                <Sidebar open={sidebarOpen} setOpen={setSidebarOpen}>
                    <SidebarBody>
                        {links.map((link) => (
                            <SidebarLink key={link.label} link={link} />
                        ))}
                    </SidebarBody>
                </Sidebar>
                <div className="bg-neutral-800 opacity-90 rounded-r-2xl my-6 mx-[1px] h-[95vh] w-full">
                    <div>
                        <BentoGridSecondDemo data={bentoData} info={bentoInfo} id={id} />
                    </div>
                </div>
            </div>
        </div>
    );
}
