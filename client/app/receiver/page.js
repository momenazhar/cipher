"use client";

import { caesar } from "../caesar";
import { socket } from "../socket";
import { useState, useEffect } from "react";
import { Card, Input } from "@nextui-org/react";

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
        <div>
            <Card>
                {caesar(message, 26 - key)} {key}
            </Card>
            <Input
                isRequired
                type="number"
                name="keyOffset"
                color="primary"
                className="w-24"
                min={1}
                max={26}
                label="Key"
                defaultValue={1}
                onChange={onSubmit}
            />
        </div>
    );
}
