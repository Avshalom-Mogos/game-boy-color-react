import { useEffect, useRef } from 'react';

// Declare EmulatorJS global variables for TypeScript
declare global {
  interface Window {
    EJS_player: string;
    EJS_core: string;
    EJS_gameUrl: string;
    EJS_pathtodata: string;
    EJS_startOnLoaded?: boolean;
    EJS_color: string;
    EJS_VirtualGamepadSettings: string;
    EJS_disableSettings?: boolean;
    EJS_gamepadSettings?: string;
  }
}

export type UseEmulatorOptions = {
  core: string;
  gameUrl: string;
  containerId: string;
  color?: string;
};

export const useEmulator = (options: UseEmulatorOptions): string => {
  const scriptLoadedRef = useRef(false);

  useEffect(() => {
    // Configure EmulatorJS
    window.EJS_player = `#${options.containerId}`;
    window.EJS_core = options.core;
    window.EJS_gameUrl = options.gameUrl;
    window.EJS_pathtodata = 'https://cdn.emulatorjs.org/stable/data/';
    window.EJS_startOnLoaded = true;
    window.EJS_color = options.color ?? '#8a9584';
    window.EJS_VirtualGamepadSettings = 'disabled';
    window.EJS_gamepadSettings = 'disabled';
    window.EJS_disableSettings = true;
    
    // Load EmulatorJS from CDN
    const script = document.createElement('script');
    script.src = 'https://cdn.emulatorjs.org/stable/data/loader.js';
    script.async = true;
    
    script.onload = () => {
      scriptLoadedRef.current = true;
      console.log('EmulatorJS loader.js loaded.');
    };
    script.onerror = (error) => {
      console.error('Error loading EmulatorJS loader.js:', error);
    };

    document.body.appendChild(script);

    return () => {
      // Clean up the container to stop the emulator instance
      const container = document.getElementById(options.containerId);
      if (container) {
        container.innerHTML = '';
      }
      
      // Remove the script
      if (document.body.contains(script)) {
        document.body.removeChild(script);
      }
      
      scriptLoadedRef.current = false;
    };
  }, [options.containerId, options.core, options.gameUrl, options.color]);

  return options.containerId;
};

