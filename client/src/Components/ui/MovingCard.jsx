import React, { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import { cn } from "../../lib/utils"; // Adjust the import path based on your project structure

export const InfiniteMovingCards = ({
    items,
    direction = "left",
    speed = "fast",
    pauseOnHover = true,
    className,
}) => {
    const containerRef = useRef(null);
    const scrollerRef = useRef(null);
    const [start, setStart] = useState(false);

    useEffect(() => {
        addAnimation();
    }, []);

    function addAnimation() {
        if (containerRef.current && scrollerRef.current) {
            const scrollerContent = Array.from(scrollerRef.current.children);

            scrollerContent.forEach((item) => {
                const duplicatedItem = item.cloneNode(true);
                if (scrollerRef.current) {
                    scrollerRef.current.appendChild(duplicatedItem);
                }
            });

            getDirection();
            getSpeed();
            setStart(true);
        }
    }

    const getDirection = () => {
        if (containerRef.current) {
            containerRef.current.style.setProperty(
                "--animation-direction",
                direction === "left" ? "forwards" : "reverse"
            );
        }
    };

    const getSpeed = () => {
        if (containerRef.current) {
            const duration = speed === "fast" ? "20s" : speed === "normal" ? "40s" : "80s";
            containerRef.current.style.setProperty("--animation-duration", duration);
        }
    };

    return (
        <div
            ref={containerRef}
            className={cn(
                "scroller relative z-20 max-w-7xl overflow-hidden [mask-image:linear-gradient(to_right,transparent,white_20%,white_80%,transparent)]",
                className
            )}
        >
            <ul
                ref={scrollerRef}
                className={cn(
                    "flex min-w-full shrink-0 gap-4 py-4 w-max flex-nowrap",
                    start && "animate-scroll",
                    pauseOnHover && "hover:[animation-play-state:paused]"
                )}
            >
                {items.map((item, idx) => (
                    <li
                        className="w-[370px] max-w-full relative rounded-2xl border border-b-0 flex-shrink-0 border-neutral-700 px-8 py-6 md:w-[450px]"
                        style={{
                            background: "linear-gradient(180deg, rgba(25, 25, 25), rgba(20, 20, 20))",
                        }}


                        key={item.name}
                    >
                        <blockquote>
                            <div
                                aria-hidden="true"
                                className="user-select-none -z-1 pointer-events-none absolute -left-0.5 -top-0.5 h-[calc(100%_+_4px)] w-[calc(100%_+_4px)]"
                            ></div>
                            <div className="flex">
                                <img className="h-10 w-10 rounded-full object-cover" src={item.img} alt="" />
                                <span className="relative z-20 text-sm leading-[1.6] text-gray-100 mt-2 ml-2 font-normal">
                                    {item.name}
                                </span>
                            </div>
                            <div className="relative z-20 mt-6 flex flex-row items-center">
                                <span className="flex flex-col gap-1">
                                    <span className="text-sm leading-[1.6] text-gray-400 font-normal">
                                        {item.quote}
                                    </span>
                                </span>
                            </div>
                        </blockquote>
                    </li>
                ))}
            </ul>
        </div>
    );
};