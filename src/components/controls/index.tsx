import styles from './style.module.css';
import { ArrowButtons } from '../arrow-buttons';
import { ActionButtons } from '../action-buttons';

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

  return (
    <div className={styles.controls}>
      <ArrowButtons onDirectionChange={props.onDirectionChange} />
      <ActionButtons onButtonPress={handleActionPress} />
      {/* SystemButtons will be implemented here */}
    </div>
  );
};

