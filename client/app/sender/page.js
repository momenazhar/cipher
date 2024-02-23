"use client";

import { caesar } from "../caesar";
import { socket } from "../socket";
import { useState, useEffect } from "react";
import { Button, Input, Textarea } from "@nextui-org/react";
import { Send } from "@/public/send";

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
            <div className="w-svw text-center flex gap-5 flex-col">
                <h1 className="text-5xl font-extrabold text-slate-500 select-none drop-shadow-md">Sender</h1>
                <p className="text-2xl text-slate-400 select-none drop-shadow-sm">
                    You are the sender! Enter a message and choose a key to encrypt it and send it
                </p>
            </div>
            <form
                onSubmit={onSubmit}
                className="w-1/2 h-auto flex items-center justify-center flex-col p-12 rounded-3xl"
            >
                <div className="flex flex-row w-full gap-3 selection:bg-violet-300/70 selection:text-violet-400">
                    <Textarea
                        type="text"
                        name="plainText"
                        variant="faded"
                        className="h-24 grow-1"
                        placeholder="Enter your message"
                        spellCheck="false"
                        classNames={{
                            inputWrapper: [
                                "bg-indigo-100/30",
                                "border-indigo-200/40",
                                "focus-within:bg-indigo-200/70",
                                "hover:!border-indigo-400/40",
                            ],
                            input: ["!text-xl", "text-indigo-400", "placeholder:text-indigo-300/50", "tracking-tight"],
                        }}
                    />
                    <Input
                        type="number"
                        name="keyOffset"
                        className="w-24"
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
                                "h-24",
                                "w-24",
                            ],
                            input: [
                                "text-3xl",
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
                        className="bg-indigo-500/80 hover:bg-indigo-600 text-white font-medium text-md h-24 w-24 shrink-0"
                        startContent={<Send />}
                    />
                </div>
            </form>
        </div>
    );
}
