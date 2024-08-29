import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { useRouter } from "next/router";
import { useUrl } from "nextjs-current-url";

export default function Distributor() {
    const url = window.location.href
    const [copied, setCopied] = useState(false)
    const getOS = () => {
        const userAgent = window.navigator.userAgent;
        const windowsPlatforms = ['Win32', 'Win64', 'Windows', 'WinCE'];
        let os = null;

        if (windowsPlatforms.some(platform => userAgent.includes(platform))) {
            os = 'Windows';
        } else {
            os = 'Unix';
        }

        return os;
    }

    const [cmdString, setCmdString] = useState("")

    const copyClipboard = () => {
        navigator.clipboard.writeText(cmdString).then(() => {}).catch(() => {
            document.execCommand("copy")
        })
        setCopied(true)
    }

    useEffect(() => {

        if (getOS() == "Windows"){
            setCmdString(`irm ${url} | iex`)
    }
    else {
            setCmdString(`bash <(curl -s ${url})`)
    }
    }, [url])
    
    return (
        <motion.div transition={{ duration: 0.5 }} animate={{
            boxShadow: `${copied == true? "0px 0px 10px 7px #10B981CC" : "0"}`,
            color: `${copied == true? "#10B981" : "white"}`,
        }} className={`min-w-fit text-nowrap w-[30vw] h-10  bg-[#003C39] rounded flex flex-row justify-center items-center p-5 text-white font-bold text-center`} onClick={copyClipboard} >
            {copied == true? "Copied successfully!" : cmdString}
        </motion.div>
    )
}