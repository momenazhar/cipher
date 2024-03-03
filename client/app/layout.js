import { Inter } from "next/font/google";
import "./globals.css";
import { Providers } from "./providers";
import Image from "next/image";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
    title: "Caesar Cipher",
    description: "Symmetric-key encryption using Caesar Cipher",
};

export default function RootLayout({ children }) {
    return (
        <html lang="en" suppressHydrationWarning>
            <body className={inter.className} suppressHydrationWarning={true}>
                <div className="overflow-hidden">
                    <Image
                        src="/background.svg"
                        width={800}
                        height={800}
                        alt="Background Gradient"
                        className="absolute opacity-55 md:h-3/4 md:w-3/4 h-1/3 w-full"
                    />
                    <Image
                        src="/background2.png"
                        height={800}
                        width={800}
                        alt="Background Gradient"
                        className="absolute bottom-0 right-0 rotate-180 md:h-3/4 md:w-3/4 h-1/3 w-full"
                    />
                </div>
                <div className="absolute w-svw bottom-0 overflow-hidden bg-indigo-100/60 border-1 border-indigo-200/40 select-none flex flex-row items-center justify-around font-bold text-indigo-400/55 tracking-wider py-3 md:text-lg text-sm">
                    <p className="drop-shadow-md">Fatima Jamal</p>
                    <p className="drop-shadow-md">Momen Azhar</p>
                    <p className="drop-shadow-md">Zhir Salahaddin</p>
                </div>
                <Providers>{children}</Providers>
            </body>
        </html>
    );
}
