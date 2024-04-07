"use client";

import { caesar } from "../../caesar";
import { socket } from "../../socket";
import { useState, useEffect } from "react";
import { Button, Divider, Input } from "@nextui-org/react";
import { Back } from "@/public/back";
import Link from "next/link";
import { Download } from "@/public/download";
import { Settings } from "@/public/settings";
import Image from "next/image";

export default function Receiver() {
    const [mounted, setMounted] = useState(false);
    const [messages, setMessages] = useState([]);
    const [keyOffset, setKeyOffset] = useState(0);
    const [shiftedTexts, setShiftedTexts] = useState([]);

    useEffect(() => {
        setMounted(true);

        socket.on("message", (newMessage) => {
            setMessages((prevMessages) => [
                ...prevMessages,
                {
                    content: newMessage,
                    timestamp: new Date().toLocaleTimeString([], {
                        hour: "2-digit",
                        minute: "2-digit",
                    }),
                },
            ]);

            setShiftedTexts((prevShiftedTexts) => [...prevShiftedTexts, ""]);
        });

        return () => {
            socket.off("message");
        };
    }, []);

    const onChange = (e) => {
        setKeyOffset(parseInt(e.target.value));
    };

    const decryptMessage = (index, message) => {
        console.log(message);
        const shiftedText = caesar(message, 26 - keyOffset);
        setShiftedTexts((prevShiftedTexts) => {
            const newShiftedTexts = [...prevShiftedTexts];
            newShiftedTexts[index] = shiftedText;
            return newShiftedTexts;
        });
    };

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
                <div className="flex flex-row justify-center items-end gap-2 text-slate-500 drop-shadow-md">
                    <h1 className="md:text-5xl text-2xl font-extrabold select-none">Receiver</h1>
                    <Download size={44} />
                </div>
                <p className="md:text-2xl text-md px-2 text-slate-400 select-none drop-shadow-sm">
                    You are the receiver! You will receive an encrypted message when the sender sends it. Use the same
                    key as the sender to decrypt it
                </p>
            </div>
            <div className="w-3/4 h-[65%] flex items-center justify-center flex-row m-12 z-50 rounded-3xl overflow-hidden border-3 border-indigo-500/30 shadow-2xl shadow-indigo-400/40">
                <div className="flex flex-col h-full w-full">
                    <div className="w-full h-16 z-20 bg-gradient-to-r from-indigo-600 via-indigo-400 to-indigo-600 text-white font-bold text-2xl flex items-center p-4 justify-between">
                        <div className="flex flex-row items-center gap-2">
                            <Image
                                src="/avatar2.png"
                                height={8}
                                width={8}
                                quality={100}
                                unoptimized
                                alt="avatar"
                                className="h-8 w-8 rounded-[50px] bg-slate-300"
                            />
                            <p className="font-semibold text-lg text-white">Sender</p>
                        </div>
                        <Settings />
                    </div>
                    <div className="w-full flex flex-col h-full bg-slate-50/50">
                        <div className="m-2 p-2 flex flex-col-reverse h-0 grow overflow-y-auto gap-3 ">
                            {messages.length === 0 ? (
                                <div className="w-full h-full flex items-center justify-center">
                                    <p className="text-2xl font-medium text-slate-400 select-none">
                                        There are no messages yet.
                                    </p>
                                </div>
                            ) : (
                                messages
                                    .map((message, index) => (
                                        <div key={index} className="flex flex-row gap-2">
                                            <div className="flex flex-row w-[40%] bg-slate-100 border-slate-200 border-2 p-3 rounded-xl ">
                                                <div className="flex flex-row items-end gap-1">
                                                    <div
                                                        className="px-6 py-3 text-lg text-slate-600 font-semibold w-fit bg-slate-200 
                                        rounded-md"
                                                    >
                                                        {message.content}
                                                    </div>
                                                    <p className="text-xs font-medium  text-slate-400/50">
                                                        {message.timestamp}
                                                    </p>
                                                </div>
                                            </div>
                                            <div className="flex flex-row w-[20%] h-full gap-2">
                                                <Input
                                                    type="number"
                                                    name="keyOffset"
                                                    variant="faded"
                                                    className="w-1/2 h-full"
                                                    placeholder="0"
                                                    min={0}
                                                    max={25}
                                                    onChange={onChange}
                                                    classNames={{
                                                        inputWrapper: [
                                                            "bg-indigo-100/30",
                                                            "border-indigo-200/40",
                                                            "focus-within:bg-indigo-200/70",
                                                            "hover:!border-indigo-400/40",
                                                            "w-full",
                                                            "h-full",
                                                            "!rounded-xl",
                                                        ],
                                                        input: [
                                                            "text-2xl",
                                                            "font-bold",
                                                            "text-indigo-400",
                                                            "placeholder:text-indigo-300/50",
                                                            "tracking-tight",
                                                            "text-center",
                                                        ],
                                                    }}
                                                />
                                                <Button
                                                    id="send-encrypted"
                                                    onClick={() => decryptMessage(index, message.content)}
                                                    className="bg-indigo-500/80 hover:bg-indigo-600 text-white font-bold flex-grow h-full text-lg"
                                                >
                                                    Shift
                                                </Button>
                                            </div>
                                            <div className="flex flex-row w-[40%] bg-slate-100 border-slate-200 border-2 p-3 rounded-xl ">
                                                <div className="flex flex-row items-end">
                                                    {shiftedTexts[index] !== "" &&
                                                    shiftedTexts[index] !== message.content ? (
                                                        <div
                                                            className="px-6 py-3 text-lg text-slate-600 font-semibold w-fit bg-slate-200 
        rounded-md"
                                                        >
                                                            {shiftedTexts[index]}
                                                        </div>
                                                    ) : null}
                                                </div>
                                            </div>
                                        </div>
                                    ))
                                    .reverse()
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
