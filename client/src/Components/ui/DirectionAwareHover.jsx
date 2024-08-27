import React, { useRef, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { cn } from "../../lib/utils"; // Adjust the import path based on your project structure

export const DirectionAwareHover = ({
    videoUrl,
    children,
    childrenClassName,
    videoClassName,
    className,
}) => {
    const ref = useRef(null);
    const videoRef = useRef(null);
    const [direction, setDirection] = useState("left");
    const [isPlaying, setIsPlaying] = useState(false);
    const [isMuted, setIsMuted] = useState(true);
    const [progress, setProgress] = useState(0);
    const [showControls, setShowControls] = useState(false); // State to manage visibility of controls

    const handleMouseEnter = (event) => {
        if (!ref.current) return;

        const direction = getDirection(event, ref.current);
        setShowControls(true); // Show controls on hover
        switch (direction) {
            case 0:
                setDirection("top");
                break;
            case 1:
                setDirection("right");
                break;
            case 2:
                setDirection("bottom");
                break;
            case 3:
                setDirection("left");
                break;
            default:
                setDirection("left");
                break;
        }
    };

    const handleMouseLeave = () => {
        setShowControls(false); // Hide controls when not hovering
    };

    const getDirection = (ev, obj) => {
        const { width: w, height: h, left, top } = obj.getBoundingClientRect();
        const x = ev.clientX - left - (w / 2) * (w > h ? h / w : 1);
        const y = ev.clientY - top - (h / 2) * (h > w ? w / h : 1);
        const d = Math.round(Math.atan2(y, x) / 1.57079633 + 5) % 4;
        return d;
    };

    const togglePlay = () => {
        if (isPlaying) {
            videoRef.current.pause();
        } else {
            videoRef.current.play();
        }
        setIsPlaying(!isPlaying);
    };

    const toggleMute = () => {
        videoRef.current.muted = !isMuted;
        setIsMuted(!isMuted);
    };

    const handleTimeUpdate = () => {
        if (videoRef.current) {
            const progress = (videoRef.current.currentTime / videoRef.current.duration) * 100;
            setProgress(progress);
        }
    };

    return (
        <motion.div
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
            ref={ref}
            className={cn(
                "md:h-96 w-80 h-60 md:w-96 bg-transparent rounded-lg overflow-hidden group/card relative",
                className
            )}
        >
            <AnimatePresence mode="wait">
                <motion.div
                    className="relative h-full w-full"
                    initial="initial"
                    whileHover={direction}
                    exit="exit"
                >
                    <motion.div className="group-hover/card:block hidden absolute inset-0 w-full h-full bg-black/40 z-10 transition duration-500" />
                    <motion.div
                        className="h-full w-full relative bg-gray-50 dark:bg-black"
                        transition={{
                            duration: 0.2,
                            ease: "easeOut",
                        }}
                    >
                        <video
                            ref={videoRef}
                            className={cn(
                                "h-full w-full object-cover scale-[1.15]",
                                videoClassName
                            )}
                            width="1000"
                            height="1000"
                            src={videoUrl}
                            autoPlay
                            loop
                            muted
                            onTimeUpdate={handleTimeUpdate}
                        />
                    </motion.div>
                    {showControls && ( // Render controls only if showControls is true
                        <div className="absolute bottom-2 left-4 z-50 flex items-center">
                            <button onClick={togglePlay} className="bg-white text-black px-2 py-1 rounded">
                                {isPlaying ? "Pause" : "Play"}
                            </button>
                            <button onClick={toggleMute} className="bg-white text-black px-2 py-1 rounded ml-2">
                                {isMuted ? "Unmute" : "Mute"}
                            </button>
                            <div className="relative w-32 ml-2">
                                <input
                                    type="range"
                                    value={progress}
                                    onChange={(e) => {
                                        const newTime = (e.target.value / 100) * videoRef.current.duration;
                                        videoRef.current.currentTime = newTime;
                                    }}
                                    className="w-full"
                                />
                            </div>
                        </div>
                    )}
                    <motion.div
                        transition={{
                            duration: 0.5,
                            ease: "easeOut",
                        }}
                        className={cn(
                            "text-white absolute bottom-4 left-4 z-40",
                            childrenClassName
                        )}
                    >
                        {children}
                    </motion.div>
                </motion.div>
            </AnimatePresence>
        </motion.div>
    );
};