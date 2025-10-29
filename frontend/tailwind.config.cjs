/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./index.html", "./src/**/*.{ts,tsx,js,jsx}"],
  theme: {
    container: { center: true, padding: { DEFAULT: "1rem", lg: "2rem" } },
    extend: {
      colors: {
        primary: {
          50: "#EEF2FF",
          100: "#E6EDFF",
          200: "#C6D6FF",
          300: "#9FB7FF",
          400: "#7A98FF",
          500: "#5B7CFD", // primary used for actions
          600: "#4965E6",
          700: "#374FC0",
          800: "#243A99",
          900: "#142672",
        },
        neutral: {
          50: "#FAFAFB",
          100: "#F5F6F8",
          200: "#ECEEF2",
          300: "#E0E3EA",
          400: "#BBC4D6",
          500: "#8793A7",
          600: "#6B778A",
          700: "#4D5966",
          800: "#2F3940",
          900: "#0f1724",
        },
        success: "#0F9D58",
        danger: "#E53E3E",
      },
      fontFamily: {
        sans: ["Inter", "ui-sans-serif", "system-ui"],
        heading: ["Poppins", "Inter", "sans-serif"],
      },
      boxShadow: {
        card: "0 8px 24px rgba(18, 25, 40, 0.06)",
        inset: "inset 0 -1px 0 rgba(255,255,255,0.04)",
      },
      borderRadius: {
        xl: "14px",
      },
      spacing: {
        9: "2.25rem",
        15: "3.75rem",
      },
      fontSize: {
        "2xs": ["0.65rem", { lineHeight: "0.9rem" }],
      },
    },
  },
  plugins: [],
};
