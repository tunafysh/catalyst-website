"use client"
import { Badge } from "@/components/ui/badge";
import { motion } from "framer-motion";
import Distributor from "@/components/distributor"
import { ModeToggle } from "@/components/themetoggle";

export default function Home() {

	return (
		<div className="bg-background text-foreground overflow-hidden">
			<div id="navbar" className="fixed top-0 left-0 w-full backdrop-blur-md h-[8vh] z-50 shadow-md shadow-foreground/5 flex flex-row justify-between items-center p-1 px-6">
			<div className="flex flex-row items-center">
			<h1 className="text-xl font-bold mr-2">Catalyst</h1>
			<Badge variant="outline" className="text-emerald-500 border-emerald-500 h-fit rounded-full">Alpha</Badge>

			</div>
			<ul className="flex flex-row list-none justify-between items-center">
				<motion.li whileHover={{ color: "#10B981" }} className="mr-5 font-bold cursor-pointer"><a href="https://github.com/tunafysh/Catalyst/wiki">Docs</a></motion.li>
				<motion.li whileHover={{ color: "#10B981" }} className="mr-5 font-bold cursor-pointer"><a href="https://github.com/tunafysh/Catalyst" target="_blank">Source</a></motion.li>
				<ModeToggle/>
			</ul>
			</div>
		<main className="flex h-screen min-w-screen flex-col items-center justify-center">
			<div className="flex flex-col items-center justify-center">
			<h1 className="text-5xl font-bold mb-5 opacity-70 text-center">Build systems <br /> <span className="bg-clip-text text-transparent bg-gradient-to-br from-cyan-500 to-emerald-500 from-20% to-75%">Made Easy</span></h1>
			<p className="text-lg font-bold mb-5 opacity-70 text-wrap w-[50vw] text-center">A build system, inspired by make, made in rust and that is scriptable with Lua.</p>
			<Distributor />
			</div>
		</main>
		</div>
	)
}
