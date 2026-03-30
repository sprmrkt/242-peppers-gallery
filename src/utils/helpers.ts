export const randomIntFromInterval = (min: number, max: number) => {
  // min and max included
  return Math.floor(Math.random() * (max - min + 1) + min);
};

export const convertToId = (text: string) => {
  return text
    .toLowerCase()
    .replace(/ /g, "-")
    .replace(/[^\w-]+/g, "");
};

export const bgNameToClass = (bg: "Default" | "Variation 1" | "Variation 2") => {
  const classes = {
    "Default": "",
    "Variation 1": "color-variation-1",
    "Variation 2": "color-variation-2",
  }
  return classes[bg];
};
