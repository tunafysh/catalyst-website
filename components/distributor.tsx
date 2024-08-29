import { useEffect, useState } from "react";
import { motion } from "framer-motion";

export default function Distributor() {
    const [url, setUrl] = useState<string | null>(null);
    const [copied, setCopied] = useState<boolean>(false);

    const getOS = (): string => {
        const userAgent = navigator.userAgent;
        const windowsPlatforms = ["Win32", "Win64", "Windows", "WinCE"];
        let os: string = "Unix";

        if (windowsPlatforms.some((platform) => userAgent.includes(platform))) {
            os = "Windows";
        }

        return os;
    };

    let cmdString: string = `bash <(curl -s ${url})`;

    const copyClipboard = () => {
        if (typeof window !== "undefined") {
            navigator.clipboard.writeText(cmdString)
                .then(() => {})
                .catch(() => {
                    document.execCommand("copy");
                });
            setCopied(true);
        }
    };

        if (getOS() === "Windows") {
            cmdString = `irm ${url} | iex`;
        }

    useEffect(() => {
        setUrl(window.location.href);
    }, []);

    return (
        <motion.div
            transition={{ duration: 0.5 }}
            animate={{
                boxShadow: `${copied ? "0px 0px 10px 7px #10B981CC" : "0"}`,
                color: copied ? "#10B981" : "white",
            }}
            className={`min-w-fit text-nowrap w-[30vw] h-10 bg-[#003C39] rounded flex flex-row justify-center items-center p-5 text-white font-bold text-center`}
            onClick={copyClipboard}
        >
            {copied ? "Copied successfully!" : cmdString}
        </motion.div>
    );
}