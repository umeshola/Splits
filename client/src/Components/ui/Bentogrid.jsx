import { cn } from "../../lib/utils";

export const BentoGrid = ({ className, children }) => {
    return (
        <div
            className={cn(
                "grid md:auto-rows-[18rem] grid-cols-1 md:grid-cols-12 gap-4 max-w-7xl mx-auto ",
                className
            )}
        >
            {children}
        </div>
    );
};

export const BentoGridItem = ({
    className,
    title,
    header,
}) => {
    return (
        <div
            className={cn(
                "row-span-1 rounded-xl hover:shadow-neutral-950 group/bento hover:shadow-md transition duration-200 shadow-input dark:shadow-none p-2 dark:bg-black  bg-neutral-950 border-[1px] border-black justify-between flex flex-col space-y-4",
                className
            )}
        >
            {header}
            <div className="group-hover/bento:translate-x-2 transition duration-200">
                <div className="font-sans font-bold text-white ">
                    {title}
                </div>
            </div>
        </div>
    );
};