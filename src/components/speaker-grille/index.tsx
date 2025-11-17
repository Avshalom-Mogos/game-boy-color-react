import styles from './style.module.css';

export const SpeakerGrille = () => {
  return (
    <div className={styles['speaker-grille']}>
      {Array.from({ length: 8 }).map((_, rowIndex) => (
        <div key={rowIndex} className={styles['speaker-row']}>
          {Array.from({ length: 8 }).map((_, colIndex) => (
            <div key={colIndex} className={styles['speaker-hole']} />
          ))}
        </div>
      ))}
    </div>
  );
};

