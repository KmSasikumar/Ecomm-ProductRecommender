// services/apiConfig.ts
// Single source of truth for the backend API address.
//
// Resolution order:
//   1. EXPO_PUBLIC_API_URL environment variable (set it to your machine's LAN
//      IP when testing on a physical device, e.g. http://192.168.1.10:8000)
//   2. "apiUrl" in app.json -> expo.extra
//   3. http://localhost:8000 (works for web and simulators)
//
// The backend address used to be a hardcoded private LAN IP copied into seven
// files, so the app could only ever reach the API from the original author's
// home network. Never hardcode a machine-specific IP in a call site again.
import Constants from 'expo-constants';

const extra = Constants.expoConfig?.extra as { apiUrl?: string } | undefined;

export const API_BASE_URL: string = (
  process.env.EXPO_PUBLIC_API_URL ||
  extra?.apiUrl ||
  'http://localhost:8000'
).replace(/\/+$/, '');
