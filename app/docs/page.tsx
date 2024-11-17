"use client"
import Showdown from "showdown";
import { ModeToggle } from "@/components/elements/themetoggle";
import { motion } from "framer-motion";
import { getDocs } from "./actions";
import Link from "next/link";
import { useEffect } from "react";

export default function Docs() {
	const converter = new Showdown.Converter();
	var convertHTML = "";
	useEffect(() => {
		getDocs().then((data) => convertHTML = converter.makeHtml(data));
	}, [convertHTML])
	return (
		<div className="bg-transparent text-foreground overflow-hidden">
			<div id="navbar" className="fixed top-0 left-0 w-full bg-background h-[8vh] z-50 shadow-md shadow-foreground/5 flex flex-row justify-between items-center p-1 px-6">
			<div className="flex flex-row items-center">
			<h1 className="text-xl font-bold mr-2 pr-2 border-r-2 border-accentclr ">Catalyst</h1>

            <h1 className="text-xl font-bold mr-2 ">Docs</h1>
			</div>
			<ul className="flex flex-row list-none justify-between items-center">
				<motion.li whileHover={{ color: "#10B981"}} className="mr-5 font-bold cursor-pointer"><a href="https://github.com/tunafysh/Catalyst" target="_blank">Source</a></motion.li>
				<ModeToggle/>
			</ul>
			</div>
			<ul>


			<div dangerouslySetInnerHTML={{ __html: convertHTML }}></div>
			{/* {docs.map((doc) => (
				<li key={doc.fields.slug}>
					<Link href={"/content/" + doc.fields.slug}>
					{doc.fields.title}
					</Link>
					<p>{doc.fields.date}</p>
				</li>
			))} */}

			</ul>
        </div>
    )
}