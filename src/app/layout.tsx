import type { Metadata } from "next";
import { Karla } from "next/font/google";
import "./globals.css";
import { ReduxProvider } from "@/redux/provider";
import StyledComponentsRegistry from "@/utils/AntdRegistry";

const karla = Karla({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "User Management",
  description: "User Management app",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={karla.className}>
        <ReduxProvider>
          <StyledComponentsRegistry>{children}</StyledComponentsRegistry>
        </ReduxProvider>
      </body>
    </html>
  );
}
