import styles from './style.module.css';
import { GameBoyButton } from '../../hooks/use-game-controls';

type ActionButtonsProps = {
  onButtonPress?: (button: GameBoyButton.A | GameBoyButton.B) => void;
  onButtonRelease?: (button: GameBoyButton.A | GameBoyButton.B) => void;
}

export const ActionButtons = (props: ActionButtonsProps) => {
  const handlePress = (button: GameBoyButton.A | GameBoyButton.B) => {
    if (props.onButtonPress) {
      props.onButtonPress(button);
    }
  };

  const handleRelease = (button: GameBoyButton.A | GameBoyButton.B) => {
    if (props.onButtonRelease) {
      props.onButtonRelease(button);
    }
  };

  return (
    <div className={styles['action-buttons']}>
      <button 
        className={styles['button-b']}
        onMouseDown={() => handlePress(GameBoyButton.B)}
        onMouseUp={() => handleRelease(GameBoyButton.B)}
        onMouseLeave={() => handleRelease(GameBoyButton.B)}
        onTouchStart={(e) => {
          e.preventDefault();
          handlePress(GameBoyButton.B);
        }}
        onTouchEnd={(e) => {
          e.preventDefault();
          handleRelease(GameBoyButton.B);
        }}
        aria-label="B button"
      >
        <span className={styles['button-label']}>B</span>
      </button>
      <button 
        className={styles['button-a']}
        onMouseDown={() => handlePress(GameBoyButton.A)}
        onMouseUp={() => handleRelease(GameBoyButton.A)}
        onMouseLeave={() => handleRelease(GameBoyButton.A)}
        onTouchStart={(e) => {
          e.preventDefault();
          handlePress(GameBoyButton.A);
        }}
        onTouchEnd={(e) => {
          e.preventDefault();
          handleRelease(GameBoyButton.A);
        }}
        aria-label="A button"
      >
        <span className={styles['button-label']}>A</span>
      </button>
    </div>
  );
};

