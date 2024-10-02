import { motion } from "framer-motion";
import { useState, useEffect } from "react";
import { appstate } from "../definitions/defs";

export default function Blob({ status }: { status: number }) {
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
        <motion.div className={`${status === appstate.ok? "bg-accentclr": status === appstate.warn? "bg-yellow-300": "bg-red-500"} fixed w-32 -z-20 aspect-square rounded-full`} animate={{ x: mousePos[0], y: mousePos[1] }} />
    )
}