import { type Config } from "tailwindcss";
import { fontFamily } from "tailwindcss/defaultTheme";
import { withUt } from "uploadthing/tw";

export default withUt({
  // Your existing Tailwind config
  content: ["./src/**/*.{ts,tsx,mdx}"],
    theme: {
    extend: {
      fontFamily: {
        sans: ["var(--font-geist-sans)", ...fontFamily.sans],
      },
    },
  },
  plugins: [],
}) satisfies Config;