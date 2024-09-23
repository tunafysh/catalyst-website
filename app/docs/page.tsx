"use client"
import { ModeToggle } from "@/components/themetoggle";
import { Badge } from "@/components/ui/badge";
import { ExclamationTriangleIcon } from "@radix-ui/react-icons";
import { motion } from "framer-motion";
import { useState, useEffect, use } from "react";
import Markdown from "react-markdown"
import remarkGfm from "remark-gfm"

export default function Docs() {
    const [url, setUrl] = useState<string | null>(null);
    useEffect(() => {
        if (typeof window !== "undefined") {
        setUrl(window.location.host);
        }
    }, []);

    let markdown = `> [!NOTE]
    test`

    return (
        <main>
            <div id="navbar" className="fixed top-0 left-0 w-full backdrop-blur-md h-[8vh] z-50 flex flex-row justify-between items-center p-1 px-6">
			<div className="flex flex-row items-center">
			<a href={`${url}/`}><h1 className="text-xl font-bold mr-2">Catalyst</h1></a>
			<Badge variant="outline" className="text-emerald-500 border-emerald-500 h-fit rounded-full">Alpha</Badge>

			</div>
			<ul className="flex flex-row list-none justify-between items-center">
				<motion.li whileHover={{ color: "#10B981" }} className="mr-5 font-bold cursor-pointer"><a href="https://github.com/tunafysh/Catalyst/wiki">Docs</a></motion.li>
				<motion.li whileHover={{ color: "#10B981" }} className="mr-5 font-bold cursor-pointer"><a href="https://github.com/tunafysh/Catalyst" target="_blank">Source</a></motion.li>
				<ModeToggle/>
			</ul>
			</div>
            <div id="sidebar" className="fixed top-[8vh] text-foreground bg-background left-0 min-w-7 w-[250px] h-screen backdrop-blur-md z-40 shadow-md shadow-foreground/5 flex flex-col py-5 px-10 border-r">
                <ol>
                <motion.li
                    className="mb-2"
                    whileHover={{ color: "#10B981" }}
                    ><a href="#Introduction">Under Construction</a></motion.li>
                </ol>
            </div>
            <div className="fixed top-[8vh] left-[250px] w-[100%] h-[100%]">
            <div className="h-[4vh] bg-yellow-200 text-yellow-500 flex items-center justify-center"> <ExclamationTriangleIcon />Under Construction</div>
            <Markdown remarkPlugins={[remarkGfm]}></Markdown>
            </div>
        </main>
    );
}