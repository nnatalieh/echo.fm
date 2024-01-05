import "./globals.css"

import { Poppins } from "next/font/google";

import NavBar from "./components/NavBar";
import Footer from "./components/Footer";

const font = Poppins({
  weight: ['400', '500', '600'],
  subsets: ['latin'] 
})

export const metadata = {
  title: "echo.fm",
  description: "Spotify music stats",
}

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={font.className}>
        <NavBar />
        {children}
        <Footer />
      </body>
    </html>
  )
}
