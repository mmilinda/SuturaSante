/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: "#902e2a",
        "primary-container": "#b0453f",
        "on-primary": "#ffffff",
        "on-primary-container": "#ffe2de",
        "primary-fixed": "#ffdad6",
        "on-primary-fixed": "#410003",
        "on-primary-fixed-variant": "#832421",

        secondary: "#2c694e",
        "secondary-container": "#aeeecb",
        "on-secondary": "#ffffff",
        "on-secondary-container": "#316e52",
        "secondary-fixed": "#b1f0ce",
        "secondary-fixed-dim": "#95d4b3",

        tertiary: "#724600",
        "tertiary-container": "#905d10",
        "on-tertiary": "#ffffff",
        "on-tertiary-container": "#ffe3c7",
        "tertiary-fixed": "#ffddb8",
        "tertiary-fixed-dim": "#fcba67",
        "on-tertiary-fixed": "#2a1700",

        surface: "#f8f9ff",
        "surface-bright": "#f8f9ff",
        "surface-dim": "#d6dae4",
        "surface-container-lowest": "#ffffff",
        "surface-container-low": "#f0f4fd",
        "surface-container": "#eaeef8",
        "surface-container-high": "#e4e8f2",
        "surface-container-highest": "#dee2ec",

        "on-surface": "#171c23",
        "on-surface-variant": "#574240",
        outline: "#8a716f",
        "outline-variant": "#ddc0bd",

        error: "#ba1a1a",
        "error-container": "#ffdad6",
        "on-error": "#ffffff",
        "on-error-container": "#93000a"
      },
      fontFamily: {
        headline: ["Newsreader", "serif"],
        body: ["Manrope", "sans-serif"],
        sans: ["Manrope", "system-ui", "sans-serif"],
      },
      spacing: {
        gutter: "1rem",
        margin: "1rem",
        "space-xs": "0.25rem",
        "space-sm": "0.5rem",
        "space-md": "1rem",
        "space-lg": "1.5rem",
        "space-xl": "2rem",
      }
    },
  },
  plugins: [],
}
