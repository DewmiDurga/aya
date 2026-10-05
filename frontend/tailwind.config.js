/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./lib/**/*.{js,ts,jsx,tsx,mdx}"
  ],
  theme: {
    extend: {
      colors: {
        aya: {
          purple: "#5B3FD3",
          "purple-hover": "#4C32C2",
          "purple-light": "#EDE8FC",
          "purple-soft": "#F5F1FD",
          "purple-tag": "#7A63E0",
          lavender: "#E0D7F8",
          peach: "#FADBD2",
          "peach-soft": "#FFF2EE",
          coral: "#E67357",
          dark: "#1B1E28",
          gray: "#7D8497",
          "gray-light": "#9BA1B4",
          "gray-bg": "#F8F8FC",
          card: "#FFFFFF",
          border: "#EAE7F3",
        },
        brand: {
          50: "#fff1f2",
          100: "#ffe4e6",
          200: "#fecdd3",
          300: "#fda4af",
          400: "#fb7185",
          500: "#f43f5e",
          600: "#e11d48",
          700: "#be123c",
          800: "#9f1239",
          900: "#881337"
        }
      },
      fontFamily: {
        sans: ["'Plus Jakarta Sans'", "system-ui", "-apple-system", "sans-serif"]
      },
      boxShadow: {
        soft: "0 4px 20px -2px rgba(91, 63, 211, 0.08), 0 2px 6px -1px rgba(0, 0, 0, 0.04)",
        card: "0 2px 14px 0 rgba(40, 30, 80, 0.04)",
        float: "0 10px 30px -4px rgba(91, 63, 211, 0.16)",
      }
    }
  },
  plugins: []
};
