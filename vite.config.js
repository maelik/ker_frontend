import { fileURLToPath, URL } from 'node:url'

import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import { VitePWA } from 'vite-plugin-pwa';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    vue(),
    VitePWA({
      registerType: 'autoUpdate', // Gère automatiquement les mises à jour du Service Worker
      manifest: {
        name: 'Application Ker',
        short_name: 'Ker',
        start_url: '/',
        display: 'standalone',
        background_color: '#ffffff',
        theme_color: '#000000',
        icons: [
          {
            src: '/icons/icon-192x192.png',
            sizes: '192x192',
            type: 'image/png'
          },
          {
            src: '/icons/icon-512x512.png',
            sizes: '512x512',
            type: 'image/png'
          }
        ]
      },
      devOptions: {
        enabled: true, // Active le mode PWA en développement
        type: 'module' // Utilise le type "module" pour le service worker
      }
    })
  ],
  server: {
    host: '0.0.0.0', // Écoute sur toutes les interfaces réseau
    port: 5173,      // Changez ce port si nécessaire
  },
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url))
    }
  }
})
