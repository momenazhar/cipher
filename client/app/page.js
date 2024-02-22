import { Card, CardBody, CardFooter } from "@nextui-org/react";
import Link from "next/link";

export default function Home() {
    return (
        <div className="h-svh flex flex-col gap-8 justify-center items-center">
            <div className="w-svw text-center flex gap-5 flex-col">
                <h1 className="text-5xl font-extrabold text-slate-500 select-none drop-shadow-md">
                    Caesar Cipher Encryption
                </h1>
                <p className="text-2xl text-slate-400 select-none drop-shadow-sm">
                    Presentation of Caesar Cipher encryption method using symmetric key between users
                </p>
            </div>
            <div className="h-1/2 w-svw flex flex-row justify-center items-center gap-24 p-4">
                <Link href="/sender">
                    <Card className="max-w-[250px] h-[300px] bg-white/50 cursor-pointer hover:translate-y-[-16px] hover:shadow-large hover:transition-all hover:bg-white/95">
                        <CardBody className="flex flex-col items-center justify-center mt-5">
                            <p className="text-3xl font-bold text-slate-500  drop-shadow-md select-none">Sender</p>
                        </CardBody>
                        <CardFooter className="bg-slate-200/70">
                            <p className="text-md font-regular text-slate-400 text-center drop-shadow-sm select-none">
                                Encrypt and send a message with a symmetric key
                            </p>
                        </CardFooter>
                    </Card>
                </Link>
                <Link href="/receiver">
                    <Card className="max-w-[250px] h-[300px] bg-white/50 cursor-pointer hover:translate-y-[-16px] hover:shadow-large hover:transition-all hover:bg-white/95">
                        <CardBody className="flex flex-col items-center justify-center mt-5">
                            <p className="text-3xl font-bold text-slate-500  drop-shadow-md select-none">Receiver</p>
                        </CardBody>
                        <CardFooter className="bg-slate-200/70">
                            <p className="text-md font-regular text-slate-400 text-center drop-shadow-sm select-none">
                                Receive and decrypt with a symmetric key
                            </p>
                        </CardFooter>
                    </Card>
                </Link>
                <Link href="attacker">
                    <Card className="max-w-[250px] h-[300px] bg-white/50 cursor-pointer hover:translate-y-[-16px] hover:shadow-large hover:transition-all hover:bg-white/95">
                        <CardBody className="flex flex-col items-center justify-center mt-5">
                            <p className="text-3xl font-bold text-slate-500  drop-shadow-md select-none">Attacker</p>
                        </CardBody>
                        <CardFooter className="bg-slate-200/70">
                            <p className="text-md font-regular text-slate-400 text-center drop-shadow-sm select-none">
                                Receive a cipher text and break it
                            </p>
                        </CardFooter>
                    </Card>
                </Link>
            </div>
        </div>
    );
}
