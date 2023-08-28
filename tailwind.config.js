/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        "cerulean-blue": '#35c2f1', //text-color
        "navy-blue"  : "#0d2841",
        "dark-navy-blue" : "#07092c", //start challenge button //bg-theme-1
        "deep-indigo": "#0f112e", //input // bg-theme-2
        "deep-blue-violet" : "#101345", //boxes color  //bg-card-custom  // bg-theme-3
        "light-blue" : "#69c5ff",
        "columbia-blue" : "#7f9eb9",  //placeholder
        "deep-blue" :  "#3151bc", //button-reset-filters , tags-bg- // bg-theme-4 // theme-btn-bg-color
        "valencia-red"  : "#e53e3e", // diificulty
        "hot-cinnamon" : "#dd6b20", //difficulty-medium
        "dark-imperial-blue" : "#313a55" // modal-background
      },
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'gradient-conic':
          'conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))',
      },
      
    },
  },
  plugins: [],
}
