/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/pages/**/*.{js,ts,jsx,tsx,mdx}", "./src/components/**/*.{js,ts,jsx,tsx,mdx}", "./src/app/**/*.{js,ts,jsx,tsx,mdx}"],
  theme: {
    extend: {
      colors: {
        primary: {
          50: "#0083D6",
          100: "#0F172A",
          150: "#FFFFFF",
          200: "#3DBC21",
        },
        secondary: {
          50: "#F4F4F4",
          100: "#D8D8D8",
          150: "#969696",
          200: "#646464",
          250: "#323232",
        },
        warm: {
          50: "#FED766",
          100: "#FF8B00",
          150: "#E33E38",
          200: "#FE4A49",
          250: "#0057DA",
          300: "#1BA2E8",
        },
      },
    },
  },
  plugins: [],
};
