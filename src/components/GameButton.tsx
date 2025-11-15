import type { CSSProperties } from 'react';

interface GameButtonProps {
  label: string;
  keyCode: string;
  onPress: (key: string) => void;
  onRelease: (key: string) => void;
  style?: CSSProperties;
}

export const GameButton = ({ label, keyCode, onPress, onRelease, style }: GameButtonProps) => {
  const handleMouseDown = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    onPress(keyCode);
  };

  const handleMouseUp = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    onRelease(keyCode);
  };

  const handleMouseLeave = () => {
    onRelease(keyCode);
  };

  const handleTouchStart = (e: React.TouchEvent) => {
    e.preventDefault();
    e.stopPropagation();
    onPress(keyCode);
  };

  const handleTouchEnd = (e: React.TouchEvent) => {
    e.preventDefault();
    e.stopPropagation();
    onRelease(keyCode);
  };

  return (
    <button
      onMouseDown={handleMouseDown}
      onMouseUp={handleMouseUp}
      onMouseLeave={handleMouseLeave}
      onTouchStart={handleTouchStart}
      onTouchEnd={handleTouchEnd}
      style={{
        padding: '15px 25px',
        fontSize: '16px',
        fontWeight: 'bold',
        border: '2px solid #333',
        borderRadius: '8px',
        backgroundColor: '#f0f0f0',
        cursor: 'pointer',
        userSelect: 'none',
        touchAction: 'none',
        ...style,
      }}
    >
      {label}
    </button>
  );
};

