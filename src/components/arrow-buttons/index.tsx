import styles from './style.module.css';

type Direction = 'up' | 'down' | 'left' | 'right' | null;

type ArrowButtonsProps = {
  onDirectionChange?: (direction: Direction) => void;
  isPressed?: boolean;
}

export const ArrowButtons = (props: ArrowButtonsProps) => {
  const handlePress = (direction: Direction) => {
    if (props.onDirectionChange) {
      props.onDirectionChange(direction);
    }
  };

  return (
    <div className={`${styles['arrow-buttons']} ${props.isPressed ? styles.pressed : ''}`}>
      <button 
        className={styles['arrow-button-up']}
        onMouseDown={() => handlePress('up')}
        onMouseUp={() => handlePress(null)}
        onMouseLeave={() => handlePress(null)}
        aria-label="Up"
      >
        <span className={styles['arrow-icon']}>▲</span>
      </button>
      <button 
        className={styles['arrow-button-down']}
        onMouseDown={() => handlePress('down')}
        onMouseUp={() => handlePress(null)}
        onMouseLeave={() => handlePress(null)}
        aria-label="Down"
      >
        <span className={styles['arrow-icon']}>▼</span>
      </button>
      <button 
        className={styles['arrow-button-left']}
        onMouseDown={() => handlePress('left')}
        onMouseUp={() => handlePress(null)}
        onMouseLeave={() => handlePress(null)}
        aria-label="Left"
      >
        <span className={styles['arrow-icon']}>◀</span>
      </button>
      <button 
        className={styles['arrow-button-right']}
        onMouseDown={() => handlePress('right')}
        onMouseUp={() => handlePress(null)}
        onMouseLeave={() => handlePress(null)}
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

