import styles from './style.module.css';

type SystemButtonsProps = {
  onButtonPress?: (button: 'SELECT' | 'START') => void;
};

export const SystemButtons = (props: SystemButtonsProps) => {
  const handlePress = (button: 'SELECT' | 'START') => {
    if (props.onButtonPress) {
      props.onButtonPress(button);
    }
  };

  return (
    <div className={styles['system-buttons']}>
      <div className={styles['button-container']}>
        <span className={styles['button-label']}>SELECT</span>
        <button 
          className={styles['system-button']}
          onMouseDown={() => handlePress('SELECT')}
          aria-label="SELECT"
        />
      </div>
      <div className={styles['button-container']}>
        <span className={styles['button-label']}>START</span>
        <button 
          className={styles['system-button']}
          onMouseDown={() => handlePress('START')}
          aria-label="START"
        />
      </div>
    </div>
  );
};

