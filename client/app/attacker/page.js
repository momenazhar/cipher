"use client";

import { caesar } from "../caesar";
import { socket } from "../socket";
import { useState, useEffect } from "react";

export default function Sender() {
    const [mounted, setMounted] = useState(false);

    useEffect(() => {
        setMounted(true);
        function onMessage(message) {
            for (let i = 1; i <= 26; i++) {
                console.log(caesar(message, i));
            }
        }
        socket.on("message", onMessage);

        return () => {
            socket.off("message", onMessage);
        };
    }, []);

    if (!mounted) return null;
    return <div></div>;
}
