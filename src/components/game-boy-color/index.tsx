import styles from './style.module.css';
import { ScreenArea } from '../screen-area';
import { NintendoLogo } from '../nintendo-logo';
import { Controls } from '../controls';
import { SpeakerGrille } from '../speaker-grille';
import { useGameControls, GameBoyButton } from '../../hooks/use-game-controls';

export type GameBoyColorProps = {
  onPowerToggle?: () => void;
  onDirectionChange?: (direction: GameBoyButton | null) => void;
  onButtonPress?: (button: GameBoyButton) => void;
};

export const GameBoyColor = (props: GameBoyColorProps) => {
  const { handleDirectionChange, handleButtonPress, handleButtonRelease } = useGameControls('emulator-container');

  const onDirectionChange = (direction: GameBoyButton | null) => {
    handleDirectionChange(direction);
    props.onDirectionChange?.(direction);
  };

  const onButtonPress = (button: GameBoyButton) => {
    handleButtonPress(button);
    props.onButtonPress?.(button);
  };

  const onButtonRelease = (button: GameBoyButton) => {
    handleButtonRelease(button);
  };

  return (
    <div className={styles['game-boy-color']}>
      <ScreenArea isOn={true} />
      <NintendoLogo />
      <Controls 
        onDirectionChange={onDirectionChange}
        onButtonPress={onButtonPress}
        onButtonRelease={onButtonRelease}
      />
      <SpeakerGrille />
    </div>
  );
};

