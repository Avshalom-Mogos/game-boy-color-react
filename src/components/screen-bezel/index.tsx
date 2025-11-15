import styles from './style.module.css';

export type ScreenBezelProps = {
  isOn?: boolean;
};

export const ScreenBezel = (props: ScreenBezelProps) => {
  return (
    <div className={styles['screen-bezel']}>
      {/* Placeholder for screen - will be replaced with PowerIndicator and Screen */}
      <div className={styles['screen-placeholder']} />
    </div>
  );
};


