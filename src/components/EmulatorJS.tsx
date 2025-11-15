import { useEffect, useRef, useImperativeHandle, forwardRef } from 'react';

declare global {
  interface Window {
    EJS_player: string;
    EJS_core: string;
    EJS_gameUrl: string;
    EJS_pathtodata: string;
    EJS_startOnLoaded?: boolean;
  }
}

interface EmulatorJSProps {
  gameUrl?: string;
  core?: 'gbc' | 'gb' | 'nes' | 'snes' | 'n64' | 'gba';
}

export interface EmulatorJSRef {
  pressButton: (key: string) => void;
  releaseButton: (key: string) => void;
  focus: () => void;
}

export const EmulatorJS = forwardRef<EmulatorJSRef, EmulatorJSProps>(
  ({ gameUrl, core = 'gbc' }, ref) => {
    const containerRef = useRef<HTMLDivElement>(null);
    const gameRef = useRef<HTMLDivElement>(null);
    const scriptLoadedRef = useRef(false);

    // Expose button press methods to parent
    useImperativeHandle(ref, () => ({
      pressButton: (key: string) => {
        gameRef.current?.focus();
        const event = new KeyboardEvent('keydown', {
          key,
          code: key,
          keyCode: getKeyCode(key),
          bubbles: true,
          cancelable: true,
        });
        gameRef.current?.dispatchEvent(event);
      },
      releaseButton: (key: string) => {
        const event = new KeyboardEvent('keyup', {
          key,
          code: key,
          keyCode: getKeyCode(key),
          bubbles: true,
          cancelable: true,
        });
        gameRef.current?.dispatchEvent(event);
        gameRef.current?.focus();
      },
      focus: () => {
        gameRef.current?.focus();
      },
    }));

  // Helper function to get keyCode from key string
  const getKeyCode = (key: string): number => {
    const keyMap: Record<string, number> = {
      'ArrowUp': 38,
      'ArrowDown': 40,
      'ArrowLeft': 37,
      'ArrowRight': 39,
      'Enter': 13,
      'z': 90,
      'x': 88,
      'q': 81,
      'e': 69,
      'v': 86,
      'Shift': 16,
      ' ': 32,
    };
    return keyMap[key] || key.toUpperCase().charCodeAt(0);
  };

  useEffect(() => {
    if (scriptLoadedRef.current || !containerRef.current) return;

    // Set EJS configuration
    window.EJS_player = '#game';
    window.EJS_core = core;
    window.EJS_gameUrl = gameUrl || '';
    window.EJS_pathtodata = 'https://cdn.emulatorjs.org/stable/data/';
    window.EJS_startOnLoaded = true;

    // Load EmulatorJS script
    const script = document.createElement('script');
    script.src = 'https://cdn.emulatorjs.org/stable/data/loader.js';
    script.async = true;
    
    script.onload = () => {
      scriptLoadedRef.current = true;
      // Auto-focus game after loading
      setTimeout(() => {
        gameRef.current?.focus();
      }, 1000);
    };

    document.body.appendChild(script);

    return () => {
      if (script.parentNode) {
        document.body.removeChild(script);
      }
    };
  }, [gameUrl, core]);

  // Refocus game when window regains focus
  useEffect(() => {
    const handleWindowFocus = () => {
      gameRef.current?.focus();
    };
    window.addEventListener('focus', handleWindowFocus);
    return () => window.removeEventListener('focus', handleWindowFocus);
  }, []);

  return (
    <div 
      ref={containerRef}
      style={{
        width: '100%',
        height: '100%',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
      }}
    >
      <div 
        ref={gameRef}
        id="game" 
        tabIndex={0}
        style={{ 
          width: '640px', 
          height: '480px',
          maxWidth: '100%',
          outline: 'none',
        }}
      />
    </div>
  );
});
