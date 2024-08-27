// src/components/ui/Spotlight.jsx
import React from "react";
import { cn } from "../../lib/utils";

const Spotlight = ({ className, fill }) => {
    return (
        <svg
            className={cn(
                "animate-spotlight pointer-events-none absolute h-[169%] w-[138%] lg:w-[84%] opacity-0",
                className
            )}
            xmlns="http://www.w3.org/2000/svg"
            viewBox="1700 -250 2107 4542"
            fill="none"
        >
            <g filter="url(#filter)">
                <ellipse
                    cx="1924.71"
                    cy="273.501"
                    rx="1924.71"
                    ry="403.501"
                    transform="matrix(-0.822377 -0.568943 -0.568943 0.822377 3631.88 2291.09)"
                    fill={fill || "white"}
                    fillOpacity="0.19"
                />
            </g>
            <defs>
                <filter
                    id="filter"
                    x="0.760352"
                    y="0.738989"
                    width="4785.16"
                    height="3840.26"
                    filterUnits="userSpaceOnUse"
                    colorInterpolationFilters="sRGB"
                >
                    <feFlood floodOpacity="0" result="BackgroundImageFix" />
                    <feBlend
                        mode="normal"
                        in="SourceGraphic"
                        in2="BackgroundImageFix"
                        result="shape"
                    />
                    <feGaussianBlur stdDeviation="151" result="effect1_foregroundBlur_1065_8" />
                </filter>
            </defs>
        </svg>
    );
};

export default Spotlight;
