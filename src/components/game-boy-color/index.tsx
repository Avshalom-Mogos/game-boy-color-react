import styles from './style.module.css';
import { ScreenArea } from '../screen-area';
import { NintendoLogo } from '../nintendo-logo';
import { Controls } from '../controls';
import { SpeakerGrille } from '../speaker-grille';

export type GameBoyColorProps = {
  onPowerToggle?: () => void;
  onDirectionChange?: (direction: 'up' | 'down' | 'left' | 'right' | null) => void;
  onButtonPress?: (button: 'A' | 'B' | 'SELECT' | 'START') => void;
};

export const GameBoyColor = (props: GameBoyColorProps) => {
  return (
    <div className={styles['game-boy-color']}>
      <ScreenArea isOn={true} />
      <NintendoLogo />
      <Controls 
        onDirectionChange={props.onDirectionChange}
        onButtonPress={props.onButtonPress}
      />
      <SpeakerGrille />
    </div>
  );
};

