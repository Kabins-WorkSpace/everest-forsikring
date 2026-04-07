import localFont from "next/font/local";

export const appSans = localFont({
  src: [
    {
      path: "../assets/fonts/Profilfont-Regular-Web.woff2",
      weight: "400",
      style: "normal",
    },
    {
      path: "../assets/fonts/Profilfont-Regular-Web.woff",
      weight: "400",
      style: "normal",
    },
  ],
  variable: "--font-app-sans",
  display: "swap",
});
