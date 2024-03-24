import react from "@vitejs/plugin-react";
import { defineConfig, splitVendorChunkPlugin } from "vite";
import { nodePolyfills } from "vite-plugin-node-polyfills";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react(), nodePolyfills(), splitVendorChunkPlugin()],
  define: {
    "process.env": {},
  },
  build: {
    rollupOptions: {
      output: {
        manualChunks(id) {
          if (id.includes('@thirdweb-dev') || id.includes('@eth-optimism')) {
            // Split @thirdweb-dev and @eth-optimism into separate chunks
            return id.toString().split('@')[1].split('.')[0].toString();
          } else if (id.includes('thirdweb-dev-wallets-evm-connectors-safe')) {
            // Split thirdweb-dev-wallets-evm-connectors-safe into separate chunk
            return 'thirdweb-dev-wallets-evm-connectors-safe';
          } else if (id.includes('vendor')) {
            // Split vendor into separate chunk
            return 'vendor';
          }
        }
      }
    }
    
  }
});
