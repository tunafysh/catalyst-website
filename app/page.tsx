"use client"
import Distributor from "@/components/distributor"
import Blob from "@/components/misc/blob";
import { ModeToggle } from "@/components/theme/themetoggle";
import { useRef } from "react"

export default function Home() {
	const blobref = useRef(null);

	return (
		<div id="main" className="dark:bg-emerald-950 dark:text-white bg-emerald-50 text-emerald-950 -z-10">
            <Blob />
            <div id="navbar" className="fixed top-0 left-0 w-full backdrop-blur-md h-10 z-50 shadow-md flex flex-row justify-between p-1 px-6">
              <h1 className="text-xl font-bold">Catalyst</h1>
              <div id="modetoggle">
              <ModeToggle />
              </div>
            </div>
		<main className="flex min-h-screen flex-col items-center justify-center dark:bg-primaryclr dark:text-white bg-emerald-50 text-black">
			<div className="flex flex-col items-center justify-center">
			<h1 className="text-5xl font-bold mb-10">Build systems <br /> <span className="text-accentclr">Made Easy</span></h1>
			<div className="fixed w-[100vw] h-[100vh] top-0 left-0 backdrop-blur-sm -z-10"/>
			<Distributor />
			</div>
		</main>
		</div>
	)
}