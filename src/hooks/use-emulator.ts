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
  }
}

export type UseEmulatorOptions = {
  core: string;
  gameUrl: string;
  containerId: string;
  color?: string;
};

export const useEmulator = (options: UseEmulatorOptions) => {
  const scriptLoadedRef = useRef(false);

  useEffect(() => {
    if (scriptLoadedRef.current) return;

    // Configure EmulatorJS
    window.EJS_player = `#${options.containerId}`;
    window.EJS_core = options.core;
    window.EJS_gameUrl = options.gameUrl;
    window.EJS_pathtodata = 'https://cdn.emulatorjs.org/stable/data/';
    window.EJS_startOnLoaded = true;
    window.EJS_color = options.color ?? '#8a9584';
    window.EJS_VirtualGamepadSettings = 'disabled';
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
      if (document.body.contains(script)) {
        document.body.removeChild(script);
      }
    };
  }, [options.containerId, options.core, options.gameUrl, options.color]);
};

