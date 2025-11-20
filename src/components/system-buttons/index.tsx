import styles from './style.module.css';
import { GameBoyButton } from '../../hooks/use-game-controls';

type SystemButtonsProps = {
  onButtonPress?: (button: GameBoyButton.SELECT | GameBoyButton.START) => void;
  onButtonRelease?: (button: GameBoyButton.SELECT | GameBoyButton.START) => void;
};

export const SystemButtons = (props: SystemButtonsProps) => {
  const handlePress = (button: GameBoyButton.SELECT | GameBoyButton.START) => {
    if (props.onButtonPress) {
      props.onButtonPress(button);
    }
  };

  const handleRelease = (button: GameBoyButton.SELECT | GameBoyButton.START) => {
    if (props.onButtonRelease) {
      props.onButtonRelease(button);
    }
  };

  return (
    <div className={styles['system-buttons']}>
      <div className={styles['button-container']}>
        <span className={styles['button-label']}>SELECT</span>
        <button 
          className={styles['system-button']}
          onMouseDown={() => handlePress(GameBoyButton.SELECT)}
          onMouseUp={() => handleRelease(GameBoyButton.SELECT)}
          onMouseLeave={() => handleRelease(GameBoyButton.SELECT)}
          onTouchStart={(e) => {
            e.preventDefault();
            handlePress(GameBoyButton.SELECT);
          }}
          onTouchEnd={(e) => {
            e.preventDefault();
            handleRelease(GameBoyButton.SELECT);
          }}
          aria-label="SELECT"
        />
      </div>
      <div className={styles['button-container']}>
        <span className={styles['button-label']}>START</span>
        <button 
          className={styles['system-button']}
          onMouseDown={() => handlePress(GameBoyButton.START)}
          onMouseUp={() => handleRelease(GameBoyButton.START)}
          onMouseLeave={() => handleRelease(GameBoyButton.START)}
          onTouchStart={(e) => {
            e.preventDefault();
            handlePress(GameBoyButton.START);
          }}
          onTouchEnd={(e) => {
            e.preventDefault();
            handleRelease(GameBoyButton.START);
          }}
          aria-label="START"
        />
      </div>
    </div>
  );
};

