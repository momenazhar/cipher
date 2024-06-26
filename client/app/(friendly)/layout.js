import { Logo } from "@/public/logo";
import Image from "next/image";

export default function FriendlyLayout({ children }) {
    return (
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
            <div className="flex-grow w-svw flex items-center justify-center">{children}</div>
            <div className="w-svw relative bg-indigo-100/60 border-1 border-indigo-200/40 select-none flex flex-row items-center justify-around font-bold text-indigo-400/55 tracking-wider py-3 md:text-lg text-sm">
                <p className="drop-shadow-md">Fatima Jamal</p>
                <p className="drop-shadow-md">Momen Azhar</p>
                <p className="drop-shadow-md">Zhir Salahaddin</p>
                <div className="absolute bottom-4 right-4">
                    <Logo size={20} />
                </div>
            </div>
        </div>
    );
}
