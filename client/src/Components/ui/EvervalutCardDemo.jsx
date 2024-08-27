import React from "react";
import { EvervaultCard, Icon } from "./EvervalutCard";

export function EvervaultCardDemo() {
    return (
        <div className="border border-black/[0.2] dark:border-white/[0.2] flex flex-col items-start w-full md:max-w-sm p-4 relative">
            <Icon className="absolute h-6 w-6 -top-3 -left-3 dark:text-white text-black" />
            <Icon className="absolute h-6 w-6 -bottom-3 -left-3 dark:text-white text-black" />
            <Icon className="absolute h-6 w-6 -top-3 -right-3 dark:text-white text-black" />
            <Icon className="absolute h-6 w-6 -bottom-3 -right-3 dark:text-white text-black" />

            <EvervaultCard text="Help" />
        </div>
    );
}