import React, { useState } from 'react'
import { Sidebar, SidebarBody, SidebarLink } from './ui/Sidebar';
import BentogridThirdDemo from './ui/BentogridThirdDemo';
export default function Waiting() {
    const [sidebarOpen, setSidebarOpen] = useState(false);

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
            label: "Waiting", href: "/waiting", icon: (
                <div>
                    <svg xmlns="http://www.w3.org/2000/svg" class="icon icon-tabler icon-tabler-hourglass-high" width="40" height="40" viewBox="0 0 24 24" stroke-width="1.5" stroke="#ffffff" fill="none" stroke-linecap="round" stroke-linejoin="round">
                        <path stroke="none" d="M0 0h24v24H0z" fill="none" />
                        <path d="M6.5 7h11" />
                        <path d="M6 20v-2a6 6 0 1 1 12 0v2a1 1 0 0 1 -1 1h-10a1 1 0 0 1 -1 -1z" />
                        <path d="M6 4v2a6 6 0 1 0 12 0v-2a1 1 0 0 0 -1 -1h-10a1 1 0 0 0 -1 1z" />
                    </svg>
                </div>
            )
        },

    ];
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
                <div className="bg-neutral-800 opacity-90 h-[95vh] rounded-r-2xl my-6 mx-[1px] w-full">
                    <div>
                        <BentogridThirdDemo />
                    </div>
                </div>
            </div>
        </div>
    );
}