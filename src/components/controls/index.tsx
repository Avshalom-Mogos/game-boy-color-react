import styles from './style.module.css';
import { ArrowButtons } from '../arrow-buttons';

type Direction = 'up' | 'down' | 'left' | 'right' | null;

type ControlsProps = {
  onDirectionChange?: (direction: Direction) => void;
  onButtonPress?: (button: 'A' | 'B' | 'SELECT' | 'START') => void;
};

export const Controls = (props: ControlsProps) => {
  return (
    <div className={styles.controls}>
      <ArrowButtons onDirectionChange={props.onDirectionChange} />
      {/* ActionButtons will be implemented here */}
      {/* SystemButtons will be implemented here */}
    </div>
  );
};

