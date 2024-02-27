"use client";

import { motion } from "framer-motion";
import { caesar } from "../caesar";
import { socket } from "../socket";
import { useState, useEffect } from "react";
import { Button, Card } from "@nextui-org/react";
import { Back } from "@/public/back";
import Link from "next/link";

export default function Sender() {
    const [mounted, setMounted] = useState(false);
    const [cipherText, setCipherText] = useState([]);
    const [startAnimation, setStartAnimation] = useState(false);

    useEffect(() => {
        setMounted(true);
        function onMessage(message) {
            const cipherTexts = [];
            for (let i = 0; i <= 25; i++) {
                setTimeout(() => {
                    cipherTexts.push(caesar(message, 26 - i));
                    setCipherText([...cipherTexts]);
                    setStartAnimation(true);
                }, i * 100);
            }
        }
        socket.on("message", onMessage);

        return () => {
            socket.off("message", onMessage);
        };
    }, []);

    if (!mounted) return null;
    return (
        <div className="w-svw h-svh flex flex-col items-center justify-center md:p-12 md:gap-12 gap-2">
            <Link
                href="/"
                className="absolute top-12 left-12 text-slate-500 p-2 transition-all hover:bg-slate-300/20 rounded-lg"
            >
                <Back />
            </Link>
            <div className="w-svw text-center flex md:gap-5 gap-2 flex-col">
                <h1 className="md:text-5xl text-2xl font-extrabold text-slate-500 select-none drop-shadow-md">
                    Attacker
                </h1>
                <p className="md:text-2xl text-md px-2 text-slate-400 select-none drop-shadow-sm">
                    You are the attacker! You will receive an encrypted text, and you will brute force every possible
                    key to find the original text
                </p>
            </div>
            <div className="md:h-3/4 h-3/5 overflow-y-scroll w-full flex flex-col gap-2 p-4 rounded-3xl list-container selection:bg-violet-300/70 selection:text-violet-400">
                {cipherText.map((text, index) => (
                    <motion.div
                        key={index}
                        className={`flex flex-row gap-2 ${startAnimation ? "slide-in-right" : ""}`}
                        initial={{ opacity: 0, x: -50 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.2, delay: index * 0.1 }}
                    >
                        <Card
                            key={index}
                            className="w-full md:h-full h-12 md:grow-1 flex justify-center bg-indigo-100/30 p-6 border-indigo-200/40 md:text-2xl text-md text-indigo-400 font-semibold md:border-2 shadow-sm"
                        >
                            {text}
                        </Card>
                        <Button className="bg-indigo-500/80 md:min-w-unit-20 min-w-fit hover:bg-indigo-600 text-white font-bold md:text-4xl md:h-24 md:w-24 text-md h-12 w-12 shrink-0 p-0">
                            {index}
                        </Button>
                    </motion.div>
                ))}
            </div>
        </div>
    );
}
