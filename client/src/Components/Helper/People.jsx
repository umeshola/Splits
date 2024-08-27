import React from "react";
import { AnimatedTooltip } from "../ui/AnimatedTootip";
import img1 from '../../assets/boys1.jpeg'
import img2 from '../../assets/boys2.jpeg'
import img3 from '../../assets/boys3.jpeg'
import img4 from '../../assets/boys4.jpeg'
import img5 from '../../assets/boys5.jpeg'
import img6 from '../../assets/boys6.jpeg'
const people = [
    {
        id: 1,
        name: "travlar",
        designation: "Wow this think exisited.",
        image: img1,
    },
    {
        id: 2,
        name: "kulDS",
        designation: "Cheap then original.",
        image: img6,
    },
    {
        id: 3,
        name: "syf4Xd",
        designation: "My group is made in a day.",
        image: img3,
    },
    {
        id: 4,
        name: "JaneSmith",
        designation: "Nice",
        image: img4,
    },
    {
        id: 5,
        name: "nodead4",
        designation: "good support",
        image: img5,
    },
    {
        id: 6,
        name: "sahilJat",
        designation: "nice",
        image: img2,
    },
];

export function People() {
    return (
        <div className="flex flex-row items-center justify-center w-full">
            <AnimatedTooltip items={people} />
        </div>
    );
}
