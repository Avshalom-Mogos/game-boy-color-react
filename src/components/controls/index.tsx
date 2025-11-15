import styles from './style.module.css';

type Direction = 'up' | 'down' | 'left' | 'right' | null;

type ControlsProps = {
  onDirectionChange?: (direction: Direction) => void;
  onButtonPress?: (button: 'A' | 'B' | 'SELECT' | 'START') => void;
};

export const Controls = (props: ControlsProps) => {
  return (
    <div className={styles.controls}>
      {/* ArrowButtons will be implemented here */}
      {/* ActionButtons will be implemented here */}
      {/* SystemButtons will be implemented here */}
    </div>
  );
};

