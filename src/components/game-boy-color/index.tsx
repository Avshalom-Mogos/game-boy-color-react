import styles from './style.module.css';

export type GameBoyColorProps = {
  onPowerToggle?: () => void;
};

export const GameBoyColor = (props: GameBoyColorProps) => {
  return (
    <div className={styles['game-boy-color']}>
      {/* TODO: Add child components here */}
    </div>
  );
};

