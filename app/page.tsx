"use client"
import Distributor from "@/components/distributor"
import { Badge } from "@/components/ui/badge";
import { motion } from "framer-motion";

export default function Home() {
	return (
		<div id="main" className="bg-emerald-50 text-emerald-950 overflow-hidden">
			<div id="navbar" className="fixed top-0 left-0 w-full backdrop-blur-md h-[7vh] z-50 shadow-md flex flex-row justify-between items-center p-1 px-6">
			<div className="flex flex-row items-center">
			<h1 className="text-xl font-bold mr-2">Catalyst</h1>
			<Badge variant="outline" className="text-emerald-500 border-emerald-500 h-fit">Alpha</Badge>
			</div>
			<ul className="flex flex-row list-none justify-between">
				<motion.li whileHover={{ color: "#10B981" }} className="mr-5 font-bold cursor-pointer"><a href="https://github.com/tunafysh/Catalyst/wiki">Docs</a></motion.li>
				<motion.li whileHover={{ color: "#10B981" }} className="font-bold cursor-pointer"><a href="https://github.com/tunafysh/Catalyst" target="_blank">Source</a></motion.li>
			</ul>
			</div>
		<main className="flex h-screen min-w-screen flex-col items-center justify-center bg-emerald-50 text-black">
			<div className="flex flex-col items-center justify-center">
			<h1 className="text-5xl font-bold mb-5 opacity-70 text-center">Build systems <br /> <span className="bg-clip-text text-transparent bg-gradient-to-br from-cyan-500 to-emerald-500 from-40% to-60%">Made Easy</span></h1>
			<p className="text-lg font-bold mb-5 opacity-70 text-wrap w-[50vw] text-center">A build system, inspired by make, made in rust and that is scriptable with Lua.</p>
			<Distributor />
			</div>
		</main>
		</div>
	)
}