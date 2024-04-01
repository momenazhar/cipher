"use client";

import { caesar } from "../../caesar";
import { socket } from "../../socket";
import { useState, useEffect, useRef } from "react";
import { Button, Card, Input } from "@nextui-org/react";
import { Send } from "@/public/send";
import { Back } from "@/public/back";
import Link from "next/link";
import { Encrypt } from "@/public/encrypt";

export default function Sender() {
    const [mounted, setMounted] = useState(false);
    const [offset, setOffset] = useState(1);
    const [msg, setMsg] = useState("");
    const textAreaRef = useRef(null);

    function onSubmit(e) {
        e.preventDefault();
        const formData = new FormData(e.target);
        if (e.nativeEvent.submitter === e.target.querySelector("#send-original")) {
            console.log("Submit Original");
            onSubmitOriginal(formData);
        } else if (e.nativeEvent.submitter === e.target.querySelector("#send-encrypted")) {
            console.log("Submit Encrypted");
            onSubmitEncrypted(formData);
        }
    }

    function onSubmitOriginal(formData) {
        socket.emit("originalmessage", formData.get("plainText"));
    }

    function onSubmitEncrypted(formData) {
        socket.emit("message", caesar(formData.get("plainText"), +formData.get("keyOffset")));
    }

    function onKeyChange(e) {
        e.preventDefault();
        setOffset(+e.target.value);
    }

    function onEncrypt(e) {
        e.preventDefault();
        setMsg(caesar(textAreaRef.current.value, offset));
    }

    useEffect(() => {
        setMounted(true);
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
                    Sender
                </h1>
                <p className="md:text-2xl text-md px-2 text-slate-400 select-none drop-shadow-sm">
                    You are the sender! Enter a message and choose a key to encrypt it and send it
                </p>
            </div>
            <form onSubmit={onSubmit} className="w-3/4 h-1/3 flex gap-3 items-center justify-center flex-row m-12 z-50">
                <div
                    style={{ gridTemplateColumns: "repeat(3, 1fr) repeat(2, 0.5fr)" }}
                    className="grid grid-rows-6 gap-3 w-full h-full"
                >
                    <div style={{ gridArea: "1 / 1 / 4 / 4" }} className="w-full h-full">
                        <Input
                            type="text"
                            name="plainText"
                            variant="faded"
                            className="w-full h-full"
                            ref={textAreaRef}
                            placeholder="Message"
                            spellCheck="false"
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
                                    "font-medium",
                                    "text-indigo-400",
                                    "placeholder:text-indigo-300/50",
                                    "tracking-tight",
                                    "truncate",
                                    "p-1",
                                ],
                            }}
                        />
                    </div>
                    <Card
                        style={{ gridArea: "4 / 1 / 7 / 4" }}
                        className={`h-full w-full grow-1 flex justify-center bg-indigo-100/30 p-4 border-indigo-200/40 text-3xl font-medium border-2 shadow-sm truncate ${
                            msg ? "text-indigo-400" : "text-indigo-300/50"
                        }`}
                    >
                        {msg ? msg : "Encrypted Message"}
                    </Card>
                    <Button
                        id="send-original"
                        type="submit"
                        style={{ gridArea: "1 / 4 / 3 / 6" }}
                        className="bg-indigo-500/80 hover:bg-indigo-600 text-white font-bold text-2xl h-full w-full p-0"
                        endContent={<Send />}
                    >
                        Send Original
                    </Button>
                    <div style={{ gridArea: "3 / 4 / 5 / 5" }} className="w-full h-full">
                        <Input
                            type="number"
                            name="keyOffset"
                            variant="faded"
                            className="w-full h-full"
                            placeholder="Key"
                            min={1}
                            max={25}
                            defaultValue={1}
                            onChange={onKeyChange}
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
                                    "text-2xl",
                                    "font-bold",
                                    "text-indigo-400",
                                    "placeholder:text-indigo-300/50",
                                    "tracking-tight",
                                    "text-center",
                                ],
                            }}
                        />
                    </div>
                    <Button
                        onClick={onEncrypt}
                        style={{ gridArea: "3 / 5 / 5 / 6" }}
                        className="bg-indigo-500/80 hover:bg-indigo-600 text-white font-bold text-2xl h-full w-full p-0"
                        startContent={<Encrypt />}
                    />
                    <Button
                        id="send-encrypted"
                        type="submit"
                        style={{ gridArea: "5 / 4 / 7 / 6" }}
                        className="bg-indigo-500/80 hover:bg-indigo-600 text-white font-bold text-2xl h-full w-full p-0"
                        endContent={<Send />}
                    >
                        Send Encrypted
                    </Button>
                </div>
            </form>
        </div>
    );
}
