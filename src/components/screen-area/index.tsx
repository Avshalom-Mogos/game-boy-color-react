import styles from './style.module.css';

export type ScreenAreaProps = {
  isOn?: boolean;
};

export const ScreenArea = (props: ScreenAreaProps) => {
  return (
    <div className={styles['screen-area']}>
      {/* ScreenArea content - sub-components will be added later */}
    </div>
  );
};

