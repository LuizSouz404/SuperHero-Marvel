module.exports = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx}",
    "./src/components/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      backgroundImage: {
        'marvel-background': "url('/marvel.png')",
      },
      aspectRatio: {
        '2/1': '6 / 10',
      },
    },
  },
  plugins: [],
}
