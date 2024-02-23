"use client";

import { caesar } from "../caesar";
import { socket } from "../socket";
import { useState, useEffect } from "react";
import { Card, Input } from "@nextui-org/react";
import { Back } from "@/public/back";
import Link from "next/link";

export default function Sender() {
    const [mounted, setMounted] = useState(false);
    const [message, setMessage] = useState("");
    const [key, setKey] = useState(1);
    function onSubmit(e) {
        e.preventDefault();
        setKey(+e.target.value);
    }

    useEffect(() => {
        setMounted(true);
        function onMessage(message) {
            setMessage(message);
        }
        socket.on("message", onMessage);

        return () => {
            socket.off("message", onMessage);
        };
    }, []);

    if (!mounted) return null;
    return (
        <div className="w-svw h-svh flex flex-col items-center justify-center">
            <Link href="/" className="absolute top-12 left-12 text-slate-500">
                <Back />
            </Link>
            <div className="w-svw text-center flex md:gap-5 gap-2 flex-col">
                <h1 className="md:text-5xl text-2xl font-extrabold text-slate-500 select-none drop-shadow-md">
                    Receiver
                </h1>
                <p className="md:text-2xl text-md px-2 text-slate-400 select-none drop-shadow-sm">
                    You are the receiver! You will receive an encrypted message when the sender sends it. Use the same
                    key as the sender to decrypt it
                </p>
            </div>
            <div className="md:w-1/2 w-full h-auto flex items-center justify-center md:flex-row flex-col gap-3 selection:bg-violet-300/70 selection:text-violet-400 p-12">
                <Card className="h-24 w-full grow-1 flex justify-center bg-indigo-100/30 p-4 border-indigo-200/40 text-3xl text-indigo-400 font-semibold border-2 shadow-sm">
                    {caesar(message, 26 - key)}
                </Card>
                <Input
                    type="number"
                    name="keyOffset"
                    className="md:w-24 w-20"
                    placeholder="Key"
                    variant="faded"
                    min={1}
                    max={25}
                    defaultValue={1}
                    onChange={onSubmit}
                    classNames={{
                        inputWrapper: [
                            "bg-indigo-200/30",
                            "border-indigo-300/40",
                            "focus-within:bg-indigo-300/70",
                            "hover:!border-indigo-500/40",
                            "md:h-24",
                            "md:w-24",
                            "h-20",
                            "w-20",
                        ],
                        input: [
                            "md:text-3xl",
                            "text-2xl",
                            "font-bold",
                            "text-indigo-400",
                            "placeholder:text-indigo-300/95",
                            "tracking-tight",
                            "text-center",
                        ],
                    }}
                />
            </div>
        </div>
    );
}
