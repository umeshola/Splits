import React from "react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";

const transition = {
    type: "spring",
    mass: 0.5,
    damping: 11.5,
    stiffness: 100,
    restDelta: 0.001,
    restSpeed: 0.001,
};

export const MenuItem = ({ setActive, active, item, children }) => {
    return (
        <div onMouseEnter={() => setActive(item)} className="relative  flex">
            <motion.p
                transition={{ duration: 0.3 }}
                className="cursor-pointer  text-black hover:opacity-[0.9] dark:text-white"
            >
                {item}
            </motion.p>
            {active !== null && (
                <motion.div
                    initial={{ opacity: 0, scale: 0.85, y: 10 }}
                    animate={{ opacity: 1, scale: 1, y: 0 }}
                    transition={transition}
                >
                    {active === item && (
                        <div className="absolute  top-[calc(100%_+_1.2rem)] left-1/2 transform -translate-x-1/2 pt-4">
                            <motion.div
                                transition={transition}
                                layoutId="active"
                                className="bg-white dark:bg-black backdrop-blur-sm  rounded-2xl overflow-hidden border border-black/[0.2] dark:border-white/[0.2] shadow-xl"
                            >
                                <motion.div layout className="w-max backdrop-blur-md h-full p-4">
                                    {children}
                                </motion.div>
                            </motion.div>
                        </div>
                    )}
                </motion.div>
            )}
        </div>
    );
};

export const Menu = ({ setActive, children }) => {
    return (
        <nav
            onMouseLeave={() => setActive(null)}
            className="relative z-50 rounded-full border border-transparent dark:bg-black  dark:border-white/[0.2]  bg-white shadow-input flex justify-center space-x-4 px-8 py-6"
        >
            {children}
        </nav>
    );
};

export const ProductItem = ({ title, href, src }) => {
    return (
        <Link to={href} className="flex space-x-2">
            <img
                src={src}
                width={100}
                height={50}
                alt={title}
                className="flex-shrink-0 rounded-md shadow-2xl"
            />
            <div>
                <h4 className="text-xl mt-10 text-black dark:text-white">
                    {title}
                </h4>
            </div>
        </Link>
    );
};
