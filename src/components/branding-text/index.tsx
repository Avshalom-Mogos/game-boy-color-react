import styles from './style.module.css';

export const BrandingText = () => {
  return (
    <div className={styles['branding-text']}>
      <span className={styles['game-boy-text']}>GAME BOY</span>
      <span className={styles['color-text']}>
        <span className={styles['c-red']}>C</span>
        <span className={styles['o-orange']}>o</span>
        <span className={styles['l-green']}>L</span>
        <span className={styles['o-blue']}>o</span>
        <span className={styles['r-purple']}>R</span>
      </span>
    </div>
  );
};

