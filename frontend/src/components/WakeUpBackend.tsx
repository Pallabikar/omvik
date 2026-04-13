"use client";

import { useEffect } from 'react';
import api from '../utils/api';

/**
 * Silent component that pings the backend on load.
 * This helps "wake up" Render's free tier instances while the user is browsing the landing page.
 */
export default function WakeUpBackend() {
  useEffect(() => {
    const wakeUp = async () => {
      try {
        // Simple ping to the root endpoint
        await api.get('/');
        console.log('Backend wake-up signal sent successfully.');
      } catch (err) {
        // Silently fail, it might just be the first cold start attempt
        console.log('Backend wake-up attempt in progress...');
      }
    };

    wakeUp();
  }, []);

  return null; // Invisible component
}
