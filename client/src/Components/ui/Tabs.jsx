import { useState } from "react";
import { motion } from "framer-motion";
import { cn } from "../../lib/utils"; // Ensure this utility function is compatible with your setup

export const Tabs = ({
    tabs: propTabs,
    containerClassName,
    activeTabClassName,
    tabClassName,
    contentClassName,
}) => {
    const [active, setActive] = useState(propTabs[0]);
    const [tabs, setTabs] = useState(propTabs);
    const [hovering, setHovering] = useState(false);

    const moveSelectedTabToTop = (idx) => {
        const newTabs = [...propTabs];
        const selectedTab = newTabs.splice(idx, 1);
        newTabs.unshift(selectedTab[0]);
        setTabs(newTabs);
        setActive(newTabs[0]);
    };

    return (
        <>
            <div
                className={cn(
                    "flex flex-row -ml-12 sm:ml-0 items-center justify-start  md:ml-32 mt-5 [perspective:1000px] relative overflow-auto sm:overflow-visible no-visible-scrollbar max-w-full w-full",
                    containerClassName
                )}
            >
                {propTabs.map((tab, idx) => (
                    <button
                        key={tab.title}
                        onClick={() => {
                            moveSelectedTabToTop(idx);
                        }}
                        onMouseEnter={() => setHovering(true)}
                        onMouseLeave={() => setHovering(false)}
                        className={cn("relative px-4 py-2 rounded-full", tabClassName)}
                        style={{
                            transformStyle: "preserve-3d",
                        }}
                    >
                        {active.value === tab.value && (
                            <motion.div
                                layoutId="clickedbutton"
                                transition={{ type: "spring", bounce: 0.3, duration: 0.6 }}
                                className={cn(
                                    "absolute inset-0 bg-neutral-900 border-[1px] border-neutral-600  bg-opacity-55 dark:bg-zinc-800 shadow-neutral-800 shadow-[0px_0px_10px_2px_rgba(0,0,0,0.5)] rounded-full ",
                                    activeTabClassName
                                )}
                            />
                        )}
                        {/* border-[1px] bg-neutral-900 bg-opacity-40 rounded-lg shadow-neutral-900 pb-4 pt-4 border-neutral-800 w-[400px] shadow-[0px_0px_10px_2px_rgba(0,0,0,0.5)] */}
                        <span className="relative block dark:text-white">
                            {tab.title}
                        </span>
                    </button>
                ))}
            </div>
            <FadeInDiv
                tabs={tabs}
                active={active}
                key={active.value}
                hovering={hovering}
                className={cn("mt-[100px] flex justify-center", contentClassName)}
            />
        </>
    );
};

export const FadeInDiv = ({
    className,
    tabs,
    hovering,
}) => {
    const isActive = (tab) => {
        return tab.value === tabs[0].value;
    };

    return (
        <div className="relative w-full h-full">
            {tabs.map((tab, idx) => (
                <motion.div
                    key={tab.value}
                    layoutId={tab.value}
                    style={{
                        scale: 1 - idx * 0.1,
                        top: hovering ? idx * -50 : 0,
                        zIndex: -idx,
                        opacity: idx < 3 ? 1 - idx * 0.1 : 0,
                    }}
                    animate={{
                        y: isActive(tab) ? [0, 40, 0] : 0,
                    }}
                    className={cn("w-full h-full absolute top-0 left-0", className)}
                >
                    {tab.content}
                </motion.div>
            ))}
        </div>
    );
};