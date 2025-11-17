import styles from './style.module.css';
import { useEmulator } from '../../hooks/use-emulator';

export const Screen = () => {
  useEmulator({
    core: 'gba',
    gameUrl: '/roms/Pokemon - FireRed Version (USA, Europe)/Pokemon - FireRed Version (USA, Europe).gba',
    containerId: 'emulator-container',
    color: '#8a9584',
  });

  return (
    <div className={styles.screen}>
      <div 
        id="emulator-container"
        className={styles['screen-content']}
      />
    </div>
  );
};
