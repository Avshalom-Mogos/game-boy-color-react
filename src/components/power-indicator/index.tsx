import styles from "./style.module.css";

type PowerIndicatorProps = {
  isOn: boolean;
};

export const PowerIndicator = (props: PowerIndicatorProps) => {
  return (
    <div className={styles['power-indicator']}>
      <div className={styles['pokeball-container']}>
        <div className={styles.pokeball}>
          <div className={styles['pokeball-top']} />
          <div className={styles['pokeball-middle']}>
            <div className={`${styles['pokeball-led']} ${props.isOn ? styles.on : ''}`} />
          </div>
          <div className={styles['pokeball-bottom']} />
        </div>
      </div>
      <span className={styles['power-label']}>POWER</span>
    </div>
  );
};

