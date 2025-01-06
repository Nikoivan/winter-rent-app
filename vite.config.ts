import { defineConfig } from 'vite';
import { VitePWA } from 'vite-plugin-pwa';
import react from '@vitejs/plugin-react';

// https://vitejs.dev/config/
export default defineConfig({
  base: '/winter-rent-crm',
  plugins: [
    VitePWA({
      registerType: 'autoUpdate',
      devOptions: {
        enabled: true
      },

      outDir: 'dist',
      manifest: {
        name: 'Winter CRM Energy-Tour',
        short_name: 'WCRM-ET',
        description: 'Application for company Energy-Tour for Winter Rent CRM',
        display: 'fullscreen',
        theme_color: '#ffffff',
        icons: [
          {
            src: 'assets/images/android-icon-192x192.png',
            sizes: '192x192',
            type: 'image/png'
          },
          {
            src: 'assets/images/android-icon-144x144.png',
            sizes: '144x144',
            type: 'image/png'
          },
          {
            src: 'assets/images/apple-icon-180x180.png',
            sizes: '180x180',
            type: 'image/png'
          },
          {
            src: 'assets/images/apple-icon-152x152.png',
            sizes: '152x152',
            type: 'image/png'
          }
        ]
      }
    }),
    react()
  ]
});
