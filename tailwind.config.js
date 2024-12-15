export default {
  content: [
    "./src/**/*.{html,js,ts,jsx,tsx,astro}", // Archivos en la carpeta src
    "./components/**/*.{astro,html,js,ts,jsx,tsx}", // Componentes
  ],
  theme: {
    extend: {
      colors: {
        yellow: {
          500: "#F7C948", // Amarillo cálido
          600: "#F0B429", // Amarillo oscuro
        },
        gray: {
          900: "#1A202C", // Gris oscuro
          800: "#2D3748", // Gris intermedio
          600: "#718096", // Gris claro
        },
        beige: {
          100: "#f5f5dc", // Beige claro para fondos
          300: "#d8c8a5", // Beige intermedio
        },
      },
    },
  },
  plugins: [],
};
