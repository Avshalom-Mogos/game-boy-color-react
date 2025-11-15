import styles from './style.module.css';

export const NintendoLogo = () => {
  return (
    <div className={styles['nintendo-logo']}>
      <span className={styles['nintendo-text']}>Nintendo<sup className={styles['registered']}>®</sup></span>
    </div>
  );
};

