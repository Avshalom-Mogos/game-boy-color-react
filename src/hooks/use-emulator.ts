import { useEffect, useRef, useState } from 'react';
import { useSaveManager } from './use-save-manager';

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
    EJS_autosaveInterval?: number;
    EJS_onGameStart?: () => void;
    EJS_emulator?: {
      on: (event: string, callback: (data: any) => void) => void;
      gameManager?: {
        setFastForwardRatio: (ratio: number) => void;
        toggleFastForward: (active: number) => void;
        saveSaveFiles: () => void;
        loadSaveFiles?: () => void;
        getSaveFilePath: () => string;
        FS?: {
          syncfs: (populate: boolean, callback: (err?: Error) => void) => void;
          analyzePath: (path: string) => { exists: boolean };
          stat: (path: string) => { size: number; mtime: Date };
          readFile: (path: string) => Uint8Array;
          writeFile: (path: string, data: Uint8Array) => void;
          mkdir: (path: string) => void;
        };
      };
    };
  }
}

export type UseEmulatorOptions = {
  core: string;
  gameUrl: string;
  containerId: string;
  color?: string;
  autoStart?: boolean;
};

export type UseEmulatorResult = {
  containerId: string;
  isLoading: boolean;
  isInitialized: boolean;
  initEmulator: () => void;
};

export const useEmulator = (options: UseEmulatorOptions): UseEmulatorResult => {
  const scriptLoadedRef = useRef(false);
  const [isLoading, setIsLoading] = useState(true);
  const [isInitialized, setIsInitialized] = useState(false);
  const [shouldInit, setShouldInit] = useState(options.autoStart ?? true);

  useSaveManager();

  const initEmulator = () => {
    if (!isInitialized) {
      setShouldInit(true);
      setIsInitialized(true);
    }
  };

  useEffect(() => {
    if (!shouldInit) {
      setIsLoading(false);
      return;
    }

    setIsLoading(true);
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
      
      // Poll for canvas element to detect when emulator is ready
      const checkReady = setInterval(() => {
        const container = document.getElementById(options.containerId);
        const canvas = container?.querySelector('canvas');
        if (canvas) {
          setIsLoading(false);
          clearInterval(checkReady);
        }
      }, 100);
      
      // Timeout after 30 seconds
      setTimeout(() => {
        clearInterval(checkReady);
        setIsLoading(false);
      }, 30000);
    };
    script.onerror = (error) => {
      console.error('Error loading EmulatorJS loader.js:', error);
      setIsLoading(false);
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
      setIsLoading(true);
    };
  }, [shouldInit, options.containerId, options.core, options.gameUrl, options.color]);

  return { containerId: options.containerId, isLoading, isInitialized, initEmulator };
};


