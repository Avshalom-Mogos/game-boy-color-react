import styles from './style.module.css';
import { ArrowButtons } from '../arrow-buttons';
import { ActionButtons } from '../action-buttons';
import { SystemButtons } from '../system-buttons';

type Direction = 'up' | 'down' | 'left' | 'right' | null;

type ControlsProps = {
  onDirectionChange?: (direction: Direction) => void;
  onButtonPress?: (button: 'A' | 'B' | 'SELECT' | 'START') => void;
};

export const Controls = (props: ControlsProps) => {
  const handleActionPress = (button: 'A' | 'B') => {
    if (props.onButtonPress) {
      props.onButtonPress(button);
    }
  };

  const handleSystemPress = (button: 'SELECT' | 'START') => {
    if (props.onButtonPress) {
      props.onButtonPress(button);
    }
  };

  return (
    <div className={styles.controls}>
      <div className={styles['buttons-row']}>
        <ArrowButtons onDirectionChange={props.onDirectionChange} />
        <ActionButtons onButtonPress={handleActionPress} />
      </div>
      <img 
        src="/pokemon-logo.png" 
        alt="Pokemon" 
        className={styles['pokemon-logo']} 
      />
      <SystemButtons onButtonPress={handleSystemPress} />
    </div>
  );
};

