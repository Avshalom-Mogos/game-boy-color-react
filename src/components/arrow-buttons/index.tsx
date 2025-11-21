import styles from './style.module.css';
import { GameBoyButton } from '../../hooks/use-game-controls';

type ArrowButtonsProps = {
  onDirectionChange?: (direction: GameBoyButton | null) => void;
  isPressed?: boolean;
}

export const ArrowButtons = (props: ArrowButtonsProps) => {
  const handlePress = (direction: GameBoyButton | null) => {
    if (props.onDirectionChange) {
      props.onDirectionChange(direction);
    }
  };

  return (
    <div className={`${styles['arrow-buttons']} ${props.isPressed ? styles.pressed : ''}`}>
      <button 
        className={styles['arrow-button-up']}
        onMouseDown={() => handlePress(GameBoyButton.UP)}
        onMouseUp={() => handlePress(null)}
        onMouseLeave={() => handlePress(null)}
        onTouchStart={(e) => {
          e.preventDefault();
          handlePress(GameBoyButton.UP);
        }}
        onTouchEnd={(e) => {
          e.preventDefault();
          handlePress(null);
        }}
        onTouchCancel={(e) => {
          e.preventDefault();
          handlePress(null);
        }}
        aria-label="Up"
      >
        <span className={styles['arrow-icon']}>▲</span>
      </button>
      <button 
        className={styles['arrow-button-down']}
        onMouseDown={() => handlePress(GameBoyButton.DOWN)}
        onMouseUp={() => handlePress(null)}
        onMouseLeave={() => handlePress(null)}
        onTouchStart={(e) => {
          e.preventDefault();
          handlePress(GameBoyButton.DOWN);
        }}
        onTouchEnd={(e) => {
          e.preventDefault();
          handlePress(null);
        }}
        onTouchCancel={(e) => {
          e.preventDefault();
          handlePress(null);
        }}
        aria-label="Down"
      >
        <span className={styles['arrow-icon']}>▼</span>
      </button>
      <button 
        className={styles['arrow-button-left']}
        onMouseDown={() => handlePress(GameBoyButton.LEFT)}
        onMouseUp={() => handlePress(null)}
        onMouseLeave={() => handlePress(null)}
        onTouchStart={(e) => {
          e.preventDefault();
          handlePress(GameBoyButton.LEFT);
        }}
        onTouchEnd={(e) => {
          e.preventDefault();
          handlePress(null);
        }}
        onTouchCancel={(e) => {
          e.preventDefault();
          handlePress(null);
        }}
        aria-label="Left"
      >
        <span className={styles['arrow-icon']}>◀</span>
      </button>
      <button 
        className={styles['arrow-button-right']}
        onMouseDown={() => handlePress(GameBoyButton.RIGHT)}
        onMouseUp={() => handlePress(null)}
        onMouseLeave={() => handlePress(null)}
        onTouchStart={(e) => {
          e.preventDefault();
          handlePress(GameBoyButton.RIGHT);
        }}
        onTouchEnd={(e) => {
          e.preventDefault();
          handlePress(null);
        }}
        onTouchCancel={(e) => {
          e.preventDefault();
          handlePress(null);
        }}
        aria-label="Right"
      >
        <span className={styles['arrow-icon']}>►</span>
      </button>
      <div className={styles['arrow-buttons-center']}>
        <span className={styles['center-icon']}>●</span>
      </div>
    </div>
  );
};

