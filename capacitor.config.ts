
import type { CapacitorConfig } from '@capacitor/cli';

const config: CapacitorConfig = {
  appId: 'app.lovable.88a8ba480cce463582e15882f5bf826c',
  appName: 'Talking Friend - A Lovable Game',
  webDir: 'dist',
  server: {
    url: 'https://88a8ba48-0cce-4635-82e1-5882f5bf826c.lovableproject.com?forceHideBadge=true',
    cleartext: true
  },
  plugins: {
    Haptics: {
      enabled: true
    }
  }
};

export default config;
