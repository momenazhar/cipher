"use client";

import { caesar } from "../../caesar";
import { socket } from "../../socket";
import { useState, useEffect } from "react";
import { Card, Divider, Input } from "@nextui-org/react";
import { Back } from "@/public/back";
import Link from "next/link";

export default function Receiver() {
    const [mounted, setMounted] = useState(false);
    const [message, setMessage] = useState("");
    const [original, setOriginal] = useState("");

    const [key, setKey] = useState(1);
    function onChange(e) {
        e.preventDefault();
        setKey(+e.target.value);
    }

    useEffect(() => {
        setMounted(true);

        socket.on("message", setMessage);
        socket.on("originalmessage", setOriginal);

        return () => {
            socket.off("message", setMessage);
            socket.off("originalmessage", setOriginal);
        };
    }, []);

    if (!mounted) return null;
    return (
        <div className="w-svw h-svh flex flex-col items-center justify-center">
            <Link
                href="/"
                className="absolute top-12 left-12 text-slate-500 p-2 transition-all hover:bg-slate-300/20 rounded-lg"
            >
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
            <div className="w-3/4 h-1/3 flex gap-3 items-center justify-center flex-row m-12 z-50">
                <div style={{ gridTemplateRows: "1fr 0.1fr 1fr" }} className="grid grid-cols-5 gap-3 w-full h-full">
                    <Card
                        style={{ gridArea: "1 / 1 / 2 / 6" }}
                        className="h-full w-full flex justify-center bg-indigo-100/30 p-4 border-indigo-200/40 text-3xl text-indigo-400 font-semibold border-2 shadow-sm truncate"
                    >
                        {original}
                    </Card>
                    <div style={{ gridArea: "2 / 1 / 3 / 6" }} className="flex items-center justify-center w-full">
                        <Divider className="w-[95%] bg-indigo-400/50" />
                    </div>
                    <Card
                        style={{ gridArea: "3 / 1 / 4 / 5" }}
                        className="h-full w-full flex justify-center bg-indigo-100/30 p-4 border-indigo-200/40 text-3xl text-indigo-400 font-semibold border-2 shadow-sm truncate"
                    >
                        {caesar(message, 26 - key)}
                    </Card>
                    <div style={{ gridArea: "3 / 5 / 4 / 6" }} className="w-full h-full">
                        <Input
                            type="number"
                            name="keyOffset"
                            variant="faded"
                            className="w-full h-full"
                            placeholder="Key"
                            min={1}
                            max={25}
                            defaultValue={1}
                            onChange={onChange}
                            classNames={{
                                inputWrapper: [
                                    "bg-indigo-100/30",
                                    "border-indigo-200/40",
                                    "focus-within:bg-indigo-200/70",
                                    "hover:!border-indigo-400/40",
                                    "w-full",
                                    "h-full",
                                ],
                                input: [
                                    "md:text-3xl",
                                    "font-bold",
                                    "text-indigo-400",
                                    "placeholder:text-indigo-300/50",
                                    "tracking-tight",
                                    "text-center",
                                ],
                            }}
                        />
                    </div>
                </div>
            </div>
        </div>
    );
}
