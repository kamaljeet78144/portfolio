import { Great_Vibes, Playfair_Display, Quicksand } from "next/font/google";
import "./globals.css";

const script = Great_Vibes({ subsets: ["latin"], weight: "400", variable: "--font-script" });
const serif = Playfair_Display({
  subsets: ["latin"],
  style: ["normal", "italic"],
  variable: "--font-serif",
});
const sans = Quicksand({ subsets: ["latin"], variable: "--font-sans" });

export const metadata = {
  title: "Kamaljeet Kaur — MERN Stack Web Developer",
  description:
    "Portfolio of Kamaljeet Kaur, a MERN stack web developer building responsive websites with HTML, CSS, JavaScript, Bootstrap, React, Node.js, Express and MongoDB.",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" className={`${script.variable} ${serif.variable} ${sans.variable}`}>
      <body>{children}</body>
    </html>
  );
}
