import styles from './style.module.css';
import { ScreenBezel } from '../screen-bezel';

export type ScreenAreaProps = {
  isOn?: boolean;
  onEmulatorReady?: (initEmulator: () => void) => void;
};

export const ScreenArea = (props: ScreenAreaProps) => {
  return (
    <div className={styles['screen-area']}>
      <ScreenBezel isOn={props.isOn} onEmulatorReady={props.onEmulatorReady} />
    </div>
  );
};

