import styles from './style.module.css';
import { useEmulator } from '../../hooks/use-emulator';

export const Screen = () => {
  const { containerId, isLoading } = useEmulator({
    core: 'gba',
    gameUrl: '/roms/Pokemon - FireRed Version (USA, Europe)/Pokemon - FireRed Version (USA, Europe).gba',
    containerId: 'emulator-container',
    color: '#8a9584',
  });

  return (
    <div className={styles.screen}>
      {isLoading && (
        <div className={styles['loading-overlay']}>
          <img 
            src="/loading.gif" 
            alt="Loading..." 
            className={styles['loading-gif']}
          />
        </div>
      )}
      <div 
        id={containerId}
        className={styles['screen-content']}
      />
    </div>
  );
};
