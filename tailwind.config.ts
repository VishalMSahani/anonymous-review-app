import type { Config } from "tailwindcss"

const config = {
  darkMode: ["class"],
  content: [
    './pages/**/*.{ts,tsx}',
    './components/**/*.{ts,tsx}',
    './app/**/*.{ts,tsx}',
    './src/**/*.{ts,tsx}',
	],
  prefix: "",
  theme: {
    container: {
      center: true,
      padding: "2rem",
      screens: {
        "2xl": "1400px",
      },
    },
    extend: {
      colors: {
        border: "hsl(var(--border))",
        input: "hsl(var(--input))",
        ring: "hsl(var(--ring))",
        background: "hsl(var(--background))",
        foreground: "hsl(var(--foreground))",
        primary: {
          DEFAULT: "hsl(var(--primary))",
          foreground: "hsl(var(--primary-foreground))",
        },
        secondary: {
          DEFAULT: "hsl(var(--secondary))",
          foreground: "hsl(var(--secondary-foreground))",
        },
        destructive: {
          DEFAULT: "hsl(var(--destructive))",
          foreground: "hsl(var(--destructive-foreground))",
        },
        muted: {
          DEFAULT: "hsl(var(--muted))",
          foreground: "hsl(var(--muted-foreground))",
        },
        accent: {
          DEFAULT: "hsl(var(--accent))",
          foreground: "hsl(var(--accent-foreground))",
        },
        popover: {
          DEFAULT: "hsl(var(--popover))",
          foreground: "hsl(var(--popover-foreground))",
        },
        card: {
          DEFAULT: "hsl(var(--card))",
          foreground: "hsl(var(--card-foreground))",
        },
        "sky-blue": "#00b4c5",
        "darker-sky-blue": "#0099a7",
        "medium-blue": "#0073e6",
        "darker-medium-blue": "#005bb3",
        "royal-blue": "#2546f0",
        "darker-royal-blue": "#1f3bcd",
        "purple": "#5928ed",
        "darker-purple": "#4b22c6",
        "turquoise": "#00bf7d",
        "darker-turquoise": "#009966",
        'gray-800': '#333333',  // Dark gray suitable for main text
        'gray-700': '#4d4d4d',  // Slightly lighter gray for secondary text
        'gray-600': '#666666',
        "light-green": "#cfebb6",
        "lighter-green-0": "#f3fde7",
        "lighter-green-1": "#d8f0c4",
        "lighter-green-2": "#e1f5d2",
        "lighter-green-3": "#eafae0",
        "lighter-green-4": "#c2e4a6",
        "lighter-purple-0": "#f3e7fd",
        "lighter-purple-1": "#d8c4f0",
        "lighter-purple-2": "#e1d2f5",
        "lighter-purple-3": "#eae0fa",
        "lighter-purple-4": "#c2a6e4"

      },
      borderRadius: {
        lg: "var(--radius)",
        md: "calc(var(--radius) - 2px)",
        sm: "calc(var(--radius) - 4px)",
      },
      keyframes: {
        "accordion-down": {
          from: { height: "0" },
          to: { height: "var(--radix-accordion-content-height)" },
        },
        "accordion-up": {
          from: { height: "var(--radix-accordion-content-height)" },
          to: { height: "0" },
        },
      },
      animation: {
        "accordion-down": "accordion-down 0.2s ease-out",
        "accordion-up": "accordion-up 0.2s ease-out",
      },
    
    },
  },
  plugins: [require("tailwindcss-animate")],
} satisfies Config

export default config