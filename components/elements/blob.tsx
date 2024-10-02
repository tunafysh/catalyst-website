import { motion } from "framer-motion";
import { useState, useEffect } from "react";

export default function Blob(ref: any) {
    const [mousePos, setMousePos] = useState([-500, -500]);
    useEffect(() => {
        const handleMouseMove = (event: MouseEvent) => {
            let x = event.clientX - 64;
            let y = event.clientY - 64;

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
        <motion.div ref={ref} className="fixed w-32 -z-20 aspect-square rounded-full bg-accentclr" animate={{ x: mousePos[0], y: mousePos[1] }} />
    )
}