import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

// https://vite.dev/config/
// En build (GitHub Pages = site « projet »), les assets sont servis sous
// /yazid-ichemrahen-site/. En dev, on reste à la racine.
export default defineConfig(({ command }) => ({
  base: command === 'build' ? '/yazid-ichemrahen-site/' : '/',
  plugins: [react(), tailwindcss()],
}))
