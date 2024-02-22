"use client";

import { caesar } from "../caesar";
import { socket } from "../socket";
import { useState, useEffect } from "react";
import { Button, Input } from "@nextui-org/react";

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
        <div>
            <form onSubmit={onSubmit} className="flex items-center justify-center flex-row gap-4 p-4">
                <Input isRequired type="text" name="plainText" label="Message" />
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
                />
                <Button type="submit" color="primary">
                    Send
                </Button>
            </form>
        </div>
    );
}
