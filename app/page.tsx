"use client"
import { Switch } from "@/components/ui/switch";
import { Badge } from "@/components/ui/badge";
import { motion } from "framer-motion";
import Distributor from "@/components/elements/distributor"
import { ModeToggle } from "@/components/elements/themetoggle";
import Blob from "@/components/elements/blob";
import { useState } from "react";
import { appstate } from "@/components/definitions/defs";
import { Button } from "@/components/ui/button";

export default function Home() {
	const [status, setStatus] = useState<number>(appstate.ok);

	return (
		<div className="bg-transparent text-foreground overflow-hidden">
			<div id="blur" className="fixed top-0 left-0 w-full -z-10 h-screen backdrop-blur-3xl"/>
			<Blob status={status}/>
			<div id="navbar" className="fixed top-0 left-0 w-full bg-white h-[8vh] z-50 shadow-md shadow-foreground/5 flex flex-row justify-between items-center p-1 px-6">
			<div className="flex flex-row items-center">
			<h1 className="text-xl font-bold mr-2">Catalyst</h1>
			
			{status === appstate.ok? <Badge variant="outline" className="text-accentclr border-accentclr h-fit rounded-full">Alpha</Badge>: status === appstate.warn? <Badge variant="outline" className="text-yellow-300 border-yellow-300 h-fit rounded-full">Alpha</Badge>: <Badge variant="outline" className="text-red-500 border-red-500 h-fit rounded-full">Alpha</Badge>}

			</div>
			<ul className="flex flex-row list-none justify-between items-center">
				<motion.li whileHover={{ color: status === appstate.ok? "#10B981": status === appstate.warn? "#F59E0B": "#EF4444" }} className="mr-5 font-bold cursor-pointer"><a href="https://github.com/tunafysh/Catalyst/wiki">Docs</a></motion.li>
				<motion.li whileHover={{ color: status === appstate.ok? "#10B981": status === appstate.warn? "#F59E0B": "#EF4444" }} className="mr-5 font-bold cursor-pointer"><a href="https://github.com/tunafysh/Catalyst" target="_blank">Source</a></motion.li>
				<ModeToggle/>
			</ul>
			</div>
		<main className="flex h-screen min-w-screen flex-col items-center justify-center">
			<div className="flex flex-col items-center justify-center">
			<h1 className="text-5xl font-bold mb-5 opacity-70 text-center">Build systems <br /> <span className={`bg-clip-text text-transparent bg-gradient-to-br ${status === appstate.ok? "from-cyan-500 to-emerald-500 from-20% to-75%": status === appstate.warn? "from-yellow-300 to-amber-500 from-20% to-75%": "from-red-500 to-rose-500 from-20% to-75%"}`}>Made Easy</span></h1>
			<p className="text-lg font-bold mb-5 opacity-70 text-wrap w-[50vw] text-center">A build system, inspired by make, made in rust and that is scriptable with Lua.</p>
			<Distributor status={status} />
			</div>
		</main>
		</div>
	)
}