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
            <body className={inter.className}>
                <div className="absolute">
                    <Image src="/background.svg" height={800} width={800} />
                </div>
                <Providers>{children}</Providers>
            </body>
        </html>
    );
}
