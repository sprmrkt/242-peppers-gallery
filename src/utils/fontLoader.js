import localFont from "next/font/local";

export const anconaEx = localFont({
  display: "swap",
  fallback: ["sans-serif"],
  preload: true,
  src: [
    {
      path: "../assets/fonts/Ancona-Ex-Light-Regular.ttf",
      weight: "400",
      style: "normal",
    },
  ],
});

export const tfArrow = localFont({
  display: "swap",
  fallback: ["sans-serif"],
  preload: true,
  src: [
    {
      path: "../assets/fonts/TFArrow-Light.ttf",
      weight: "400",
      style: "normal",
    },
    {
      path: "../assets/fonts/TFArrow-Medium.ttf",
      weight: "700",
      style: "normal",
    },
  ],
});