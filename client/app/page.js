import { Card, CardBody, CardFooter } from "@nextui-org/react";
import Link from "next/link";
import Image from "next/image";

export default function Home() {
    return (
        <>
            <div className="h-svh flex flex-col">
                <div className="overflow-hidden select-none pointer-events-none">
                    <Image
                        src="/background.svg"
                        width={800}
                        height={800}
                        alt="Background Gradient"
                        className="absolute opacity-55 md:h-3/4 md:w-3/4 h-1/3 w-full"
                    />
                    <Image
                        src="/background2.png"
                        priority="true"
                        height={800}
                        width={800}
                        alt="Background Gradient"
                        className="absolute bottom-0 right-0 rotate-180 md:h-3/4 md:w-3/4 h-1/3 w-full"
                    />
                </div>
                <div className="flex-grow w-svw flex items-center justify-center">
                    <div className="h-full flex flex-col gap-8 justify-center items-center">
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
                                <Card className="md:max-w-[250px] md:h-[300px] h-[80px] md:w-[250px] w-[250px] bg-white/30 cursor-pointer hover:translate-y-[-16px] hover:shadow-large hover:transition-all hover:bg-white/65">
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
                                <Card className="md:max-w-[250px] md:h-[300px] h-[80px] md:w-[250px] w-[250px] bg-white/30 cursor-pointer hover:translate-y-[-16px] hover:shadow-large hover:transition-all hover:bg-white/65">
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
                                <Card className="md:max-w-[250px] md:h-[300px] h-[80px] md:w-[250px] w-[250px] bg-white/30 cursor-pointer hover:translate-y-[-16px] hover:shadow-large hover:transition-all hover:bg-white/65">
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
                </div>
                <div className="w-svw bg-indigo-100/60 border-1 border-indigo-200/40 select-none flex flex-row items-center justify-around font-bold text-indigo-400/55 tracking-wider py-3 md:text-lg text-sm">
                    <p className="drop-shadow-md">Fatima Jamal</p>
                    <p className="drop-shadow-md">Momen Azhar</p>
                    <p className="drop-shadow-md">Zhir Salahaddin</p>
                </div>
            </div>
        </>
    );
}
