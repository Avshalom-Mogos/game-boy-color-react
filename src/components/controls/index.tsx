import styles from './style.module.css';
import { ArrowButtons } from '../arrow-buttons';
import { ActionButtons } from '../action-buttons';
import { SystemButtons } from '../system-buttons';
import { GameBoyButton } from '../../hooks/use-game-controls';

type ControlsProps = {
  onDirectionChange?: (direction: GameBoyButton | null) => void;
  onButtonPress?: (button: GameBoyButton) => void;
  onButtonRelease?: (button: GameBoyButton) => void;
};

export const Controls = (props: ControlsProps) => {
  const handleActionPress = (button: GameBoyButton.A | GameBoyButton.B) => {
    if (props.onButtonPress) {
      props.onButtonPress(button);
    }
  };

  const handleActionRelease = (button: GameBoyButton.A | GameBoyButton.B) => {
    if (props.onButtonRelease) {
      props.onButtonRelease(button);
    }
  };

  const handleSystemPress = (button: GameBoyButton.SELECT | GameBoyButton.START) => {
    if (props.onButtonPress) {
      props.onButtonPress(button);
    }
  };

  const handleSystemRelease = (button: GameBoyButton.SELECT | GameBoyButton.START) => {
    if (props.onButtonRelease) {
      props.onButtonRelease(button);
    }
  };

  return (
    <div className={styles.controls}>
      <div className={styles['buttons-row']}>
        <ArrowButtons onDirectionChange={props.onDirectionChange} />
        <ActionButtons 
          onButtonPress={handleActionPress}
          onButtonRelease={handleActionRelease}
        />
      </div>
      <img 
        src="/pokemon-logo.png" 
        alt="Pokemon" 
        className={styles['pokemon-logo']} 
      />
      <SystemButtons 
        onButtonPress={handleSystemPress}
        onButtonRelease={handleSystemRelease}
      />
    </div>
  );
};

