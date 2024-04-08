"use client";

import { caesar } from "../../caesar";
import { socket } from "../../socket";
import { useState, useEffect, useRef } from "react";
import { Button, Input } from "@nextui-org/react";
import { Send } from "@/public/send";
import { Encrypt } from "@/public/encrypt";
import { Divider } from "@nextui-org/react";
import Image from "next/image";
import { Menu } from "@/public/menu";
import { Settings } from "@/public/settings";

export default function UserOne() {
    const [mounted, setMounted] = useState(false);
    const [msg, setMsg] = useState("");
    const [messages, setMessages] = useState([]);
    const inputRef = useRef(null);
    const [offset, setOffset] = useState(0);

    const [received, setReceived] = useState([]);

    function sendMessage() {
        if (msg.trim() !== "") {
            setMessages((prevMessages) => [
                ...prevMessages,
                {
                    content: msg,
                    timestamp: new Date(),
                    sender: "user1",
                },
            ]);
            if (inputRef.current) {
                inputRef.current.focus();
            }
        }
    }

    function emitMessage(e) {
        e.preventDefault();
        const formData = new FormData(e.target);
        if (/\S/.test(formData.get("messageText"))) {
            socket.emit("message", formData.get("messageText"));
            setMsg("");
        }
    }

    function encryptMessage() {
        setMsg(caesar(msg, offset));
        if (inputRef.current) {
            inputRef.current.focus();
        }
    }

    function onKeyChange(e) {
        e.preventDefault();
        setOffset(+e.target.value);
    }

    useEffect(() => {
        setMounted(true);

        socket.on("message", (newMessage) => {
            setReceived((prevMessages) => [
                ...prevMessages,
                {
                    content: newMessage,
                    timestamp: new Date(),
                    sender: "user2",
                },
            ]);
        });

        return () => {
            socket.off("message");
        };
    }, []);

    const allMessages = [...messages, ...received].sort((a, b) => {
        return new Date(a.timestamp) - new Date(b.timestamp);
    });

    if (!mounted) return null;
    return (
        <div className="w-3/4 h-full flex flex-col items-center justify-center">
            <div className="w-full bg-red-200 rounded-tl-3xl rounded-tr-3xl h-10 bg-gradient-to-r from-indigo-800 to-indigo-700 text-slate-50 flex justify-center items-center font-bold border-t-3 border-l-3 border-r-3 border-b-0 border-slate-200">
                User #1
            </div>
            <form
                onSubmit={emitMessage}
                className="w-full h-[85%] flex items-center justify-center flex-row z-50 rounded-bl-3xl rounded-br-3xl overflow-hidden border-t-0 border-l-3 border-r-3 border-b-3 border-slate-200 shadow-2xl shadow-indigo-400/40"
            >
                <div className="h-full basis-1/4 flex flex-col items-center shadow-2xl shadow-slate-600/30 z-10">
                    <div className="w-full h-16 z-20 bg-gradient-to-r from-indigo-500 to-indigo-400 text-white font-bold text-2xl flex items-center p-5 justify-between">
                        <p>CHATS</p>
                        <Menu />
                    </div>
                    <div className="bg-slate-200/60 flex-grow flex flex-row items-center pl-5 gap-5 w-full">
                        <Image
                            src="/avatar1.png"
                            height={12}
                            width={12}
                            quality={100}
                            unoptimized
                            alt="avatar"
                            className="h-16 w-16 rounded-[50px] bg-slate-300"
                        />
                        <div className="flex flex-col">
                            <p className="font-bold text-xl leading-6 text-slate-700">User #2</p>
                            <div className="flex flex-row items-center gap-1">
                                <div className="h-2.5 w-2.5 rounded-[50px] bg-green-400"></div>
                                <p className="leading-5 text-slate-500">Online</p>
                            </div>
                        </div>
                    </div>
                    {[1, 2, 3, 4].map((index) => (
                        <div
                            key={index}
                            className="bg-slate-100/50 flex-grow flex flex-row items-center pl-5 gap-5 w-full"
                        >
                            <Image
                                src={`/avatar${index + 1}.png`}
                                height={12}
                                width={12}
                                quality={100}
                                unoptimized
                                alt="avatar"
                                className="h-16 w-16 rounded-[50px] bg-slate-300/70 opacity-75"
                            />
                            <div className="flex flex-col">
                                <p className="font-medium text-xl leading-6 text-slate-500">User #{index + 2}</p>
                                <div className="flex flex-row items-center gap-1">
                                    <div className="h-2.5 w-2.5 rounded-[50px] bg-slate-300"></div>
                                    <p className="leading-5 text-slate-500">Offline</p>
                                </div>
                            </div>
                        </div>
                    ))}
                    <Divider className="w-full bg-slate-200" />
                    <div className="h-20 w-full bg-slate-100 flex items-center justify-center">
                        <div className="flex flex-row w-full gap-2 p-4">
                            <Input
                                type="number"
                                name="keyOffset"
                                variant="faded"
                                className="w-12 h-12"
                                min={0}
                                max={25}
                                onChange={onKeyChange}
                                defaultValue="0"
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
                                        "text-lg",
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
                                onClick={encryptMessage}
                                className="bg-indigo-500/80 hover:bg-indigo-600 text-white font-bold flex-grow h-12 text-md"
                                endContent={<Encrypt size={6} />}
                            >
                                Encrypt Message
                            </Button>
                        </div>
                    </div>
                </div>
                <div className="basis-3/4 flex flex-col h-full">
                    <div className="w-full h-16 z-20 bg-gradient-to-r from-indigo-400 to-indigo-600 text-white font-bold text-2xl flex items-center p-4 justify-between">
                        <div className="flex flex-row items-center gap-2">
                            <Image
                                src="/avatar1.png"
                                height={8}
                                width={8}
                                quality={100}
                                unoptimized
                                alt="avatar"
                                className="h-8 w-8 rounded-[50px] bg-slate-300"
                            />
                            <p className="font-semibold text-lg text-white">User #2</p>
                        </div>
                        <Settings />
                    </div>
                    <div className="w-full flex flex-col h-full bg-slate-50/50">
                        <div className="m-2 p-2 flex flex-col-reverse h-0 grow overflow-y-auto gap-2">
                            {allMessages
                                .map((message, index) => (
                                    <div
                                        key={index}
                                        className={`flex flex-row items-end gap-1 ${
                                            message.sender === "user1" ? "justify-end" : "justify-start"
                                        }`}
                                    >
                                        <div
                                            className={`flex items-end gap-1 ${
                                                message.sender === "user1" ? "flex-row-reverse" : "flex-row"
                                            }`}
                                        >
                                            <div
                                                className={`px-5 py-2 text-lg font-medium w-fit rounded-2xl ${
                                                    message.sender === "user1"
                                                        ? "bg-indigo-400 text-white"
                                                        : "bg-slate-200 text-zinc-700"
                                                }`}
                                            >
                                                {message.content}
                                            </div>
                                            <p className="text-xs font-medium text-slate-400/50">
                                                {message.timestamp.toLocaleString([], {
                                                    hour: "2-digit",
                                                    minute: "2-digit",
                                                })}
                                            </p>
                                        </div>
                                    </div>
                                ))
                                .reverse()}
                        </div>
                        <div className="w-full min-h-20 bg-white z-1 p-4 flex gap-2 justify-between items-center text-slate-700">
                            <Input
                                type="text"
                                name="messageText"
                                value={msg}
                                onChange={(e) => setMsg(e.target.value)}
                                variant="faded"
                                className="w-full"
                                ref={inputRef}
                                autoComplete="off"
                                spellCheck="false"
                                placeholder="Message"
                                classNames={{
                                    inputWrapper: [
                                        "bg-slate-200/30",
                                        "hover:bg-slate-200/50",
                                        "border-none",
                                        "w-full",
                                        "h-full",
                                        "shadow-md",
                                        "shadow-slate-300/30",
                                    ],
                                    input: [
                                        "text-xl",
                                        "px-1",
                                        "py-0.5",
                                        "text-slate-600",
                                        "placeholder:text-slate-500/50",
                                        "tracking-tight",
                                    ],
                                }}
                            />
                            <Button
                                id="send-message"
                                onClick={sendMessage}
                                type="submit"
                                className="h-12 w-12 min-w-12 rounded-[50px] p-0 bg-indigo-500 text-white flex items-center justify-center shadow-lg shadow-indigo-300/50"
                                endContent={<Send size={6} />}
                            />
                        </div>
                    </div>
                </div>
            </form>
        </div>
    );
}
