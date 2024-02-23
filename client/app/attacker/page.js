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
            for (let i = 1; i <= 25; i++) {
                cipherTexts.push(caesar(message, i));
            }
            setCipherText(cipherTexts);
            console.log(cipherText);
        }
        socket.on("message", onMessage);

        return () => {
            socket.off("message", onMessage);
        };
    }, []);

    if (!mounted) return null;
    return (
        <div>
            <div className="w-svw h-svh flex flex-col items-center justify-center">
                <div className="w-svw text-center flex gap-5 flex-col">
                    <h1 className="text-5xl font-extrabold text-slate-500 select-none drop-shadow-md">Attacker</h1>
                    <p className="text-2xl text-slate-400 select-none drop-shadow-sm">
                        You are the attacker! You will receive an encrypted text, and you will brute force every
                        possible key to find the original text
                    </p>
                </div>
                <div className="h-1/2 w-full overflow-y-scroll">
                    {cipherText.map((text, index) => (
                        <div className="flex flex-row">
                            <Card
                                key={index}
                                className="w-full grow-1 flex justify-center bg-indigo-100/30 p-4 border-indigo-200/40 text-xl text-indigo-400 font-semibold border-2 shadow-sm"
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
