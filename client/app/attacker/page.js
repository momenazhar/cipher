"use client";

import { caesar } from "../caesar";
import { socket } from "../socket";
import { useState, useEffect, useRef } from "react";
import { JetBrains_Mono } from "next/font/google";
import Image from "next/image";
import { useScramble } from "use-scramble";
import { motion } from "framer-motion";

const jetbrains = JetBrains_Mono({ subsets: ["latin"] });

export default function Attacker() {
    const [mounted, setMounted] = useState(false);
    const [appendedTexts, setAppendedTexts] = useState([]);
    const appendedTextsRef = useRef(null);

    const { ref, replay } = useScramble({
        text: "Attacking Page",
        speed: 0.4,
    });

    function append(...text) {
        text.reverse();
        setAppendedTexts((prevTexts) => [...text, ...prevTexts]);
    }

    useEffect(() => {
        setMounted(true);

        function onMessage(message) {
            console.log(message);
            append(`A$T@CK3R❯ An encrypted text has been received: ${message}`);
        }

        socket.on("message", onMessage);

        return () => {
            socket.off("message", onMessage);
        };
    }, []);

    useEffect(() => {
        const intervalId = setInterval(replay, 1000);
        return () => clearInterval(intervalId);
    });

    useEffect(() => {
        if (appendedTextsRef.current) {
            appendedTextsRef.current.scrollTop = appendedTextsRef.current.scrollHeight;
        }
    }, [appendedTexts]);

    const handleBruteForce = (cipher) => {
        for (let i = 0; i <= 25; i++) {
            setTimeout(() => {
                const decryptedText = caesar(cipher, 26 - i);
                append(`Decrypted Text with Key ${i}: ${decryptedText}`);
            }, i * 100);
        }
    };

    const appendText = (event) => {
        if (event.key !== "Enter") return;

        const newText = event.target.value;
        event.target.value = "";

        if (!newText) return;

        const args = newText.split(" ");
        const command = args.shift();

        switch (command) {
            case "clear":
                return setAppendedTexts([]);

            case "decipher": {
                if (args.length != 2 || Number.isNaN(+args[1]))
                    return append(
                        "SYSTEM❯ `decipher` command is missing parameters. Usage: `decipher <Cipher: String> <Key: Integer>`"
                    );
                return append(
                    `$ ${newText}`,
                    `A$T@CK3R❯ Deciphering ${args[0]} with key ${args[1]}: ${caesar(args[0], 26 - args[1])}`
                );
            }

            default: {
                if (newText.includes("bruteforce")) return handleBruteForce(args[0]);
                append(`SYSTEM ERROR! \`${newText}\` is an unknown command!`);
            }
        }
    };

    if (!mounted) return null;

    return (
        <div
            className={`${jetbrains.className} flex flex-col h-screen bg-gradient-to-br from-zinc-950 to-zinc-900 text-white overflow-hidden`}
        >
            <div className="p-5 flex shrink items-center justify-between bg-gradient-to-r from-zinc-900 to-zinc-800">
                <div className="flex flex-row items-center gap-4">
                    <Image height={32} width={32} alt="icon" src={"/reaper.png"} />
                    <span className="text-2xl text-red-400 font-bold select-none" ref={ref} />
                </div>
                <div className="flex flex-row gap-2">
                    <div className="rounded-[50px] bg-green-400 h-5 w-5 shadow-green-400/40 shadow-md" />
                    <div className="rounded-[50px] bg-yellow-400 h-5 w-5 shadow-yellow-400/40 shadow-md" />
                    <div className="rounded-[50px] bg-red-400 h-5 w-5 shadow-red-400/40 shadow-md" />
                </div>
            </div>
            <div className="flex flex-col flex-auto text-3xl p-5 gap-3">
                <div className="grow h-0 flex flex-col-reverse overflow-y-auto scroll-buddy">
                    {appendedTexts.map((text, index) => (
                        <motion.div
                            initial={{ opacity: 0, x: -50 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ duration: 0.2 }}
                            key={appendedTexts.length - index}
                            className={
                                text.includes("SYSTEM ERROR!") || text.includes("A$T@CK3R❯ An encrypted")
                                    ? "text-red-600"
                                    : text.includes("Cipher Text")
                                    ? "text-cyan-400 font-extrabold"
                                    : text.includes("A$T@CK3R❯ Deciphering")
                                    ? "text-[#11ff00]"
                                    : ""
                            }
                        >
                            {text}
                        </motion.div>
                    ))}
                </div>
                <div className="h-[1px] shrink bg-zinc-800" />
                <div className="flex flex-row shirnk gap-4">
                    <span className="text-red-400 font-bold">
                        Attacker@KUST:<span className="text-cyan-500">~</span>
                        <span className="text-white">$</span>
                    </span>
                    <input
                        type="text"
                        spellCheck="false"
                        className="w-full outline-none bg-transparent"
                        onKeyDown={appendText}
                        autoFocus
                    />
                </div>
            </div>
        </div>
    );
}
