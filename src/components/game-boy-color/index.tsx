import styles from './style.module.css';
import { ScreenArea } from '../screen-area';

export type GameBoyColorProps = {
  onPowerToggle?: () => void;
};

export const GameBoyColor = (props: GameBoyColorProps) => {
  return (
    <div className={styles['game-boy-color']}>
      <ScreenArea isOn={true} />
    </div>
  );
};

