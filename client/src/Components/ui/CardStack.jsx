// src/components/ui/CardStack.jsx
import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import img3 from '../../assets/netflix2.jpeg';
import img4 from '../../assets/netflix3.jpeg';
import img6 from '../../assets/prime.jpeg';
import img7 from '../../assets/prime2.jpeg';
import img9 from '../../assets/danjo.jpeg'
import img11 from '../../assets/godd.jpeg'
import img14 from '../../assets/revenent.jpeg'
import img15 from '../../assets/shelby.jpeg'

const items = [
    { id: 3, img: img3 },
    { id: 4, img: img4 },
    { id: 6, img: img6 },
    { id: 7, img: img7 },
    { id: 9, img: img9 },
    { id: 11, img: img11 },
    { id: 14, img: img14 },
    { id: 15, img: img15 },
];
let interval;

const CardStack = ({ offset, scaleFactor }) => {
    const CARD_OFFSET = offset || 5;
    const SCALE_FACTOR = scaleFactor || 0.06;
    const [cards, setCards] = useState(items);

    useEffect(() => {
        startFlipping();
        return () => clearInterval(interval);
    }, []);

    const startFlipping = () => {
        interval = setInterval(() => {
            setCards((prevCards) => {
                const newArray = [...prevCards];
                newArray.unshift(newArray.pop());
                return newArray;
            });
        }, 5000);
    };

    return (
        <div className="relative">
            {cards.map((card, index) => (
                <motion.div
                    key={card.id}
                    className="absolute dark:bg-black bg-white rounded-3xl shadow-xl shadow-black/[0.2] dark:shadow-white/[0.10] flex flex-col justify-between"
                    style={{ transformOrigin: "top center" }}
                    animate={{
                        top: index * -CARD_OFFSET,
                        scale: 1 - index * SCALE_FACTOR,
                        zIndex: cards.length - index,
                    }}
                >
                    <img className="h-[450px] lg:h-[650px] lg:w-[650px] rounded-2xl w-[450px] object-cover" src={card.img} alt="" />
                </motion.div>
            ))}
        </div>
    );
};

export default CardStack;
