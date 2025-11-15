import styles from './style.module.css';
import { PowerIndicator } from '../power-indicator';

export type ScreenBezelProps = {
  isOn?: boolean;
};

export const ScreenBezel = (props: ScreenBezelProps) => {
  return (
    <div className={styles['screen-bezel']}>
      <PowerIndicator isOn={props.isOn ?? false} />
      {/* Placeholder for screen - will be replaced with Screen component */}
      <div className={styles['screen-placeholder']} />
    </div>
  );
};



