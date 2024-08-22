import { motion } from "framer-motion";
import { useState, useEffect } from "react";

export default function Blob(ref: any) {
    const [mousePos, setMousePos] = useState([0, 0]);
    useEffect(() => {
        const handleMouseMove = (event: MouseEvent) => {
            let x = event.clientX - 32 ;
            let y = event.clientY - 32;

            setMousePos([x, y]);
        };

        window.addEventListener('mousemove', handleMouseMove);

        return () => {
            window.removeEventListener(
                'mousemove',
                handleMouseMove
            );
        };
    }, []);

    return (
        <motion.div ref={ref} className="fixed -z-10 w-16 aspect-square rounded-full bg-accentclr" animate={{ x: mousePos[0], y: mousePos[1] }} />
    )
}