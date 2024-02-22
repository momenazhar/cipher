import { Card, CardBody, CardFooter, CardHeader, Divider } from "@nextui-org/react";

export default function Home() {
    return (
        <div className="h-svh w-svw flex flex-row justify-center items-center gap-10 p-4">
            <Card className="max-w-[250px] h-[300px] bg-white/50">
                <CardBody className="flex flex-col items-center justify-center  mt-5">
                    <p className="text-3xl font-bold text-slate-500  drop-shadow-md">Sender</p>
                </CardBody>
                <CardFooter className="bg-slate-200/80">
                    <p className="text-md font-regular text-slate-400 text-center drop-shadow-sm">
                        Encrypt and send a message with a symmetric key
                    </p>
                </CardFooter>
            </Card>
            <Card className="max-w-[250px] h-[300px] bg-white/50">
                <CardBody className="flex flex-col items-center justify-center mt-5">
                    <p className="text-3xl font-bold text-slate-500  drop-shadow-md">Receiver</p>
                </CardBody>
                <CardFooter className="bg-slate-200/80">
                    <p className="text-md font-regular text-slate-400 text-center drop-shadow-sm">
                        Receive and decrypt with a symmetric key
                    </p>
                </CardFooter>
            </Card>
            <Card className="max-w-[250px] h-[300px] bg-white/50">
                <CardBody className="flex flex-col items-center justify-center  mt-5">
                    <p className="text-3xl font-bold text-slate-500  drop-shadow-md">Attacker</p>
                </CardBody>
                <CardFooter className="bg-slate-200/80">
                    <p className="text-md font-regular text-slate-400 text-center drop-shadow-sm">
                        Receive a cipher text and break it
                    </p>
                </CardFooter>
            </Card>
        </div>
    );
}
