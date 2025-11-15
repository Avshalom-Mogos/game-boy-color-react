import styles from './style.module.css';

type ActionButtonsProps = {
  onButtonPress?: (button: 'A' | 'B') => void;
}

export const ActionButtons = (props: ActionButtonsProps) => {
  const handlePress = (button: 'A' | 'B') => {
    if (props.onButtonPress) {
      props.onButtonPress(button);
    }
  };

  return (
    <div className={styles['action-buttons']}>
      <button 
        className={styles['button-b']}
        onMouseDown={() => handlePress('B')}
        onMouseUp={() => {}}
        onMouseLeave={() => {}}
        aria-label="B button"
      >
        <span className={styles['button-label']}>B</span>
      </button>
      <button 
        className={styles['button-a']}
        onMouseDown={() => handlePress('A')}
        onMouseUp={() => {}}
        onMouseLeave={() => {}}
        aria-label="A button"
      >
        <span className={styles['button-label']}>A</span>
      </button>
    </div>
  );
};

