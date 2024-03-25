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
          if (id.includes('@thirdweb-dev') || id.includes('@eth-optimism') || id.includes('thirdweb-dev-wallets-evm-connectors-safe') || id.includes('vendor')) {
            // Split @thirdweb-dev and @eth-optimism into separate chunks
            return id.toString().split('@')[1].split('.')[0].toString();
          }
        }
      }
    }
    
  }
});
