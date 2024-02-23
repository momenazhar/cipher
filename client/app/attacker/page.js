"use client";

import { caesar } from "../caesar";
import { socket } from "../socket";
import { useState, useEffect } from "react";
import { Button, Card } from "@nextui-org/react";

export default function Sender() {
    const [mounted, setMounted] = useState(false);
    const [cipherText, setCipherText] = useState([]);

    useEffect(() => {
        setMounted(true);
        function onMessage(message) {
            const cipherTexts = [];
            for (let i = 0; i <= 25; i++) {
                cipherTexts.push(caesar(message, 26 - i));
            }
            setCipherText(cipherTexts);
        }
        socket.on("message", onMessage);

        return () => {
            socket.off("message", onMessage);
        };
    }, []);

    if (!mounted) return null;
    return (
        <div>
            <div className="w-svw h-svh flex flex-col items-center justify-center p-12 gap-12">
                <div className="w-svw text-center flex gap-5 flex-col">
                    <h1 className="text-5xl font-extrabold text-slate-500 select-none drop-shadow-md">Attacker</h1>
                    <p className="text-2xl text-slate-400 select-none drop-shadow-sm">
                        You are the attacker! You will receive an encrypted text, and you will brute force every
                        possible key to find the original text
                    </p>
                </div>
                <div className="h-3/4 overflow-y-scroll w-full flex flex-col gap-2 p-4 rounded-xl list-container selection:bg-violet-300/70 selection:text-violet-400">
                    {cipherText.map((text, index) => (
                        <div className="flex flex-row gap-2">
                            <Card
                                key={index}
                                className="w-full grow-1 flex justify-center bg-indigo-100/30 p-6 border-indigo-200/40 text-2xl text-indigo-400 font-semibold border-2 shadow-sm"
                            >
                                {text}
                            </Card>
                            <Button className="bg-indigo-500/80 hover:bg-indigo-600 text-white font-bold text-4xl h-24 w-24 shrink-0">
                                {index}
                            </Button>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}
