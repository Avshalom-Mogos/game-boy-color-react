import { useEffect } from 'react';
import styles from './style.module.css';
import { useEmulator } from '../../hooks/use-emulator';
import { ROM_URL } from '../../constants/rom';

export type ScreenProps = {
  onEmulatorReady?: (initEmulator: () => void) => void;
};

export const Screen = (props: ScreenProps) => {
  const { containerId, isLoading, isInitialized, initEmulator } = useEmulator({
    core: 'gba',
    gameUrl: ROM_URL,
    containerId: 'emulator-container',
    color: '#8a9584',
    autoStart: false,
  });

  // Notify parent when emulator is ready to be initialized
  useEffect(() => {
    if (props.onEmulatorReady) {
      props.onEmulatorReady(initEmulator);
    }
  }, [props.onEmulatorReady, initEmulator]);

  return (
    <div className={styles.screen}>
      {!isInitialized && (
        <div className={styles['loading-overlay']}>
          <div className={styles['start-message']}>
            Press START to begin
          </div>
        </div>
      )}
      {isInitialized && isLoading && (
        <div className={styles['loading-overlay']}>
          <img 
            src={`${import.meta.env.BASE_URL}loading.gif`}
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
