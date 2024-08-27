import React, { useState } from 'react'
import { Sidebar, SidebarBody, SidebarLink } from './ui/Sidebar';
import BentogridFirstDemo from './ui/BentogridFirstDemo';
import Queue from './Helper/Queue';
import Group from './Helper/Group';
import Refund from './Helper/Refund';
import { useLocation } from 'react-router-dom';
import Help from './Helper/Help';

export default function Dashboard() {
    const [sidebarOpen, setSidebarOpen] = useState(false);
    const location = useLocation(); // Get the current location

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
            label: "Revenue", href: "/dashboard", icon: (
                <div>
                    <svg xmlns="http://www.w3.org/2000/svg" className="icon icon-tabler icon-tabler-wallet" width="40" height="40" viewBox="0 0 24 24" stroke-width="1.5" stroke="#ffffff" fill="none" stroke-linecap="round" stroke-linejoin="round">
                        <path stroke="none" d="M0 0h24v24H0z" fill="none" />
                        <path d="M17 8v-3a1 1 0 0 0 -1 -1h-10a2 2 0 0 0 0 4h12a1 1 0 0 1 1 1v3m0 4v3a1 1 0 0 1 -1 1h-12a2 2 0 0 1 -2 -2v-12" />
                        <path d="M20 12v4h-4a2 2 0 0 1 0 -4h4" />
                    </svg>
                </div>
            )
        },
        {
            label: "Queue", href: "/dashboard/queue", icon: (
                <div>
                    <svg xmlns="http://www.w3.org/2000/svg" class="icon icon-tabler icon-tabler-address-book" width="40" height="40" viewBox="0 0 24 24" stroke-width="1.5" stroke="#ffffff" fill="none" stroke-linecap="round" stroke-linejoin="round">
                        <path stroke="none" d="M0 0h24v24H0z" fill="none" />
                        <path d="M20 6v12a2 2 0 0 1 -2 2h-10a2 2 0 0 1 -2 -2v-12a2 2 0 0 1 2 -2h10a2 2 0 0 1 2 2z" />
                        <path d="M10 16h6" />
                        <path d="M13 11m-2 0a2 2 0 1 0 4 0a2 2 0 1 0 -4 0" />
                        <path d="M4 8h3" />
                        <path d="M4 12h3" />
                        <path d="M4 16h3" />
                    </svg>
                </div>
            )
        },
        {
            label: "Groups", href: "/dashboard/groups", icon: (
                <div>
                    <svg xmlns="http://www.w3.org/2000/svg" class="icon icon-tabler icon-tabler-users-group" width="40" height="40" viewBox="0 0 24 24" stroke-width="1.5" stroke="#ffffff" fill="none" stroke-linecap="round" stroke-linejoin="round">
                        <path stroke="none" d="M0 0h24v24H0z" fill="none" />
                        <path d="M10 13a2 2 0 1 0 4 0a2 2 0 0 0 -4 0" />
                        <path d="M8 21v-1a2 2 0 0 1 2 -2h4a2 2 0 0 1 2 2v1" />
                        <path d="M15 5a2 2 0 1 0 4 0a2 2 0 0 0 -4 0" />
                        <path d="M17 10h2a2 2 0 0 1 2 2v1" />
                        <path d="M5 5a2 2 0 1 0 4 0a2 2 0 0 0 -4 0" />
                        <path d="M3 13v-1a2 2 0 0 1 2 -2h2" />
                    </svg>
                </div>
            )
        },
        {
            label: "Refund", href: "/dashboard/refund", icon: (
                <div>
                    <svg xmlns="http://www.w3.org/2000/svg" class="icon icon-tabler icon-tabler-credit-card-refund" width="40" height="40" viewBox="0 0 24 24" stroke-width="1.5" stroke="#ffffff" fill="none" stroke-linecap="round" stroke-linejoin="round">
                        <path stroke="none" d="M0 0h24v24H0z" fill="none" />
                        <path d="M12 19h-6a3 3 0 0 1 -3 -3v-8a3 3 0 0 1 3 -3h12a3 3 0 0 1 3 3v4.5" />
                        <path d="M3 10h18" />
                        <path d="M7 15h.01" />
                        <path d="M11 15h2" />
                        <path d="M16 19h6" />
                        <path d="M19 16l-3 3l3 3" />
                    </svg>
                </div>
            )
        },
        {
            label: "Help", href: "/dashboard/help", icon: (
                <div>
                    <svg xmlns="http://www.w3.org/2000/svg" class="icon icon-tabler icon-tabler-help-circle" width="40" height="40" viewBox="0 0 24 24" stroke-width="1.5" stroke="#ffffff" fill="none" stroke-linecap="round" stroke-linejoin="round">
                        <path stroke="none" d="M0 0h24v24H0z" fill="none" />
                        <path d="M3 12a9 9 0 1 0 18 0a9 9 0 0 0 -18 0" />
                        <path d="M12 16v.01" />
                        <path d="M12 13a2 2 0 0 0 .914 -3.782a1.98 1.98 0 0 0 -2.414 .483" />
                    </svg>
                </div>
            )
        },

    ];
    const renderContent = () => {
        switch (location.pathname) {
            case '/dashboard':
                return <BentogridFirstDemo />;
            case '/dashboard/queue':
                return <Queue />;
            case '/dashboard/groups':
                return <Group />;
            case '/dashboard/refund':
                return <Refund />;
            case '/dashboard/help':
                return <Help />;
            default:
                return <BentogridFirstDemo />;
        }
    };

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
                <div className="bg-neutral-800 opacity-90 rounded-r-2xl my-6 mx-[1px] w-full">
                    <div>
                        {renderContent()}
                    </div>
                </div>
            </div>
        </div>
    );
}