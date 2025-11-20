import { useCallback } from 'react';

export enum GameBoyButton {
  UP = 'UP',
  DOWN = 'DOWN',
  LEFT = 'LEFT',
  RIGHT = 'RIGHT',
  A = 'A',
  B = 'B',
  SELECT = 'SELECT',
  START = 'START',
}

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

// Mapping from GameBoy buttons to keyboard keys
const BUTTON_KEY_MAP: Record<GameBoyButton, string> = {
  [GameBoyButton.UP]: 'ArrowUp',
  [GameBoyButton.DOWN]: 'ArrowDown',
  [GameBoyButton.LEFT]: 'ArrowLeft',
  [GameBoyButton.RIGHT]: 'ArrowRight',
  [GameBoyButton.A]: 'z',
  [GameBoyButton.B]: 'x',
  [GameBoyButton.SELECT]: 'v',
  [GameBoyButton.START]: 'Enter',
};

export type GameControls = {
  handleDirectionChange: (direction: GameBoyButton | null) => void;
  handleButtonPress: (button: GameBoyButton) => void;
  handleButtonRelease: (button: GameBoyButton) => void;
};

export const useGameControls = (containerId: string): GameControls => {
  const pressButton = useCallback((key: string) => {
    const container = document.getElementById(containerId);
    if (!container) return;
    
    const event = new KeyboardEvent('keydown', {
      key,
      code: key,
      keyCode: getKeyCode(key),
      bubbles: true,
      cancelable: true,
    });
    container.dispatchEvent(event);
  }, [containerId]);

  const releaseButton = useCallback((key: string) => {
    const container = document.getElementById(containerId);
    if (!container) return;
    
    const event = new KeyboardEvent('keyup', {
      key,
      code: key,
      keyCode: getKeyCode(key),
      bubbles: true,
      cancelable: true,
    });
    container.dispatchEvent(event);
  }, [containerId]);

  const handleDirectionChange = useCallback((direction: GameBoyButton | null) => {
    // Release all direction keys first
    [GameBoyButton.UP, GameBoyButton.DOWN, GameBoyButton.LEFT, GameBoyButton.RIGHT].forEach(dir => {
      releaseButton(BUTTON_KEY_MAP[dir]);
    });
    
    // Press the new direction if not null
    if (direction) {
      pressButton(BUTTON_KEY_MAP[direction]);
    }
  }, [pressButton, releaseButton]);

  const handleButtonPress = useCallback((button: GameBoyButton) => {
    pressButton(BUTTON_KEY_MAP[button]);
  }, [pressButton]);

  const handleButtonRelease = useCallback((button: GameBoyButton) => {
    releaseButton(BUTTON_KEY_MAP[button]);
  }, [releaseButton]);

  return {
    handleDirectionChange,
    handleButtonPress,
    handleButtonRelease,
  };
};

