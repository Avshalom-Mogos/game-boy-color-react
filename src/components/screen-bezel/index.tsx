import styles from './style.module.css';
import { PowerIndicator } from '../power-indicator';
import { BrandingText } from '../branding-text';
import { Screen } from '../screen';

export type ScreenBezelProps = {
  isOn?: boolean;
};

export const ScreenBezel = (props: ScreenBezelProps) => {
  return (
    <div className={styles['screen-bezel']}>
      <PowerIndicator isOn={props.isOn ?? false} />
      <Screen />
      <BrandingText />
    </div>
  );
};



