/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        border: "hsl(var(--border))",
        input: "hsl(var(--input))",
        ring: "hsl(var(--ring))",
        background: "hsl(var(--background))",
        foreground: "hsl(var(--foreground))",
        primary: {
          DEFAULT: "#3b5998",
          foreground: "#ffffff",
          blue: "#3b5998",
        },
        secondary: {
          DEFAULT: "#8b9dc3",
          foreground: "#ffffff",
          blue: "#8b9dc3",
        },
        destructive: {
          DEFAULT: "hsl(0 84% 60%)",
          foreground: "hsl(210 40% 98%)",
        },
        muted: {
          DEFAULT: "#dfe3ee",
          foreground: "#3b5998",
        },
        accent: {
          DEFAULT: "#f7f7f7",
          foreground: "#3b5998",
        },
        popover: {
          DEFAULT: "#ffffff",
          foreground: "#3b5998",
        },
        card: {
          DEFAULT: "#ffffff",
          foreground: "#3b5998",
        },
        light: {
          grey: "#dfe3ee",
          DEFAULT: "#dfe3ee",
        },
        lighter: {
          grey: "#f7f7f7",
          DEFAULT: "#f7f7f7",
        },
      },
      fontFamily: {
        sans: ["Inter", "system-ui", "sans-serif"],
        heading: ["Inter", "system-ui", "sans-serif"],
        paragraph: ["Inter", "system-ui", "sans-serif"],
      },
      borderRadius: {
        lg: "var(--radius)",
        md: "calc(var(--radius) - 2px)",
        sm: "calc(var(--radius) - 4px)",
      },
      keyframes: {
        "accordion-down": {
          from: { height: 0 },
          to: { height: "var(--radix-accordion-content-height)" },
        },
        "accordion-up": {
          from: { height: "var(--radix-accordion-content-height)" },
          to: { height: 0 },
        },
      },
      animation: {
        "accordion-down": "accordion-down 0.2s ease-out",
        "accordion-up": "accordion-up 0.2s ease-out",
      },
    },
  },
  plugins: [],
};
