import { Card, CardBody, CardFooter } from "@nextui-org/react";
import Link from "next/link";

export default function Home() {
    return (
        <div className="h-svh flex flex-col gap-8 justify-center items-center">
            <div className="w-svw text-center flex md:gap-5 gap-2 flex-col">
                <h1 className="md:text-5xl text-2xl font-extrabold text-slate-500 select-none drop-shadow-md">
                    Caesar Cipher Encryption
                </h1>
                <p className="md:text-2xl text-md px-2 text-slate-400 select-none drop-shadow-sm">
                    Presentation of Caesar Cipher encryption method using symmetric key between users
                </p>
            </div>
            <div className="h-1/2 w-svw flex md:flex-row flex-col justify-center items-center md:gap-24 gap-3 p-4">
                <Link href="/sender">
                    <Card className="md:max-w-[250px] md:h-[300px] h-[80px] md:w-[250px] w-[250px] bg-white/50 cursor-pointer hover:translate-y-[-16px] hover:shadow-large hover:transition-all hover:bg-white/95">
                        <CardBody className="flex flex-col items-center justify-center md:mt-5">
                            <p className="md:text-3xl text-xl font-bold text-slate-500 drop-shadow-md select-none">
                                Sender
                            </p>
                        </CardBody>
                        <CardFooter className="bg-slate-200/70 md:flex hidden">
                            <p className="text-md font-regular text-slate-400 text-center drop-shadow-sm select-none">
                                Encrypt and send a message with a symmetric key
                            </p>
                        </CardFooter>
                    </Card>
                </Link>
                <Link href="/receiver">
                    <Card className="md:max-w-[250px] md:h-[300px] h-[80px] md:w-[250px] w-[250px] bg-white/50 cursor-pointer hover:translate-y-[-16px] hover:shadow-large hover:transition-all hover:bg-white/95">
                        <CardBody className="flex flex-col items-center justify-center md:mt-5">
                            <p className="md:text-3xl text-xl font-bold text-slate-500 drop-shadow-md select-none">
                                Receiver
                            </p>
                        </CardBody>
                        <CardFooter className="bg-slate-200/70 md:flex hidden">
                            <p className="text-md font-regular text-slate-400 text-center drop-shadow-sm select-none">
                                Receive and decrypt with a symmetric key
                            </p>
                        </CardFooter>
                    </Card>
                </Link>
                <Link href="attacker">
                    <Card className="md:max-w-[250px] md:h-[300px] h-[80px] md:w-[250px] w-[250px] bg-white/50 cursor-pointer hover:translate-y-[-16px] hover:shadow-large hover:transition-all hover:bg-white/95">
                        <CardBody className="flex flex-col items-center justify-center md:mt-5">
                            <p className="md:text-3xl text-xl font-bold text-slate-500 drop-shadow-md select-none">
                                Attacker
                            </p>
                        </CardBody>
                        <CardFooter className="bg-slate-200/70 md:flex hidden">
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
