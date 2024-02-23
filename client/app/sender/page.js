"use client";

import { caesar } from "../caesar";
import { socket } from "../socket";
import { useState, useEffect } from "react";
import { Button, Input, Textarea } from "@nextui-org/react";
import { Send } from "@/public/send";
import { Back } from "@/public/back";
import Link from "next/link";

export default function Sender() {
    const [mounted, setMounted] = useState(false);

    function onSubmit(e) {
        e.preventDefault();
        const formData = new FormData(e.target);
        socket.emit("message", caesar(formData.get("plainText"), +formData.get("keyOffset")));
    }

    useEffect(() => {
        setMounted(true);
    }, []);

    if (!mounted) return null;
    return (
        <div className="w-svw h-svh flex flex-col items-center justify-center">
            <Link href="/" className="absolute top-12 left-12 text-slate-500">
                <Back />
            </Link>
            <div className="w-svw text-center flex md:gap-5 gap-2 flex-col">
                <h1 className="md:text-5xl text-2xl font-extrabold text-slate-500 select-none drop-shadow-md">
                    Sender
                </h1>
                <p className="md:text-2xl text-md px-2 text-slate-400 select-none drop-shadow-sm">
                    You are the sender! Enter a message and choose a key to encrypt it and send it
                </p>
            </div>
            <form onSubmit={onSubmit} className="md:w-1/2 w-full h-auto flex items-center justify-center flex-col p-12">
                <div className="flex md:flex-row flex-col w-full gap-3 selection:bg-violet-300/70 selection:text-violet-400">
                    <Textarea
                        type="text"
                        name="plainText"
                        variant="faded"
                        className="md:h-24 grow-1"
                        placeholder="Enter your message"
                        spellCheck="false"
                        classNames={{
                            inputWrapper: [
                                "bg-indigo-100/30",
                                "border-indigo-200/40",
                                "focus-within:bg-indigo-200/70",
                                "hover:!border-indigo-400/40",
                            ],
                            input: [
                                "md:!text-3xl",
                                "font-medium",
                                "text-indigo-400",
                                "placeholder:text-indigo-300/50",
                                "tracking-tight",
                            ],
                        }}
                    />
                    <div className="flex flex-row gap-3 justify-center">
                        <Input
                            type="number"
                            name="keyOffset"
                            className="md:w-24 w-20"
                            placeholder="Key"
                            variant="faded"
                            min={1}
                            max={25}
                            defaultValue={1}
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
                        <Button
                            type="submit"
                            className="bg-indigo-500/80 hover:bg-indigo-600 text-white font-medium text-md md:h-24 md:w-24 w-20 h-20 p-0"
                            startContent={<Send />}
                        />
                    </div>
                </div>
            </form>
        </div>
    );
}
