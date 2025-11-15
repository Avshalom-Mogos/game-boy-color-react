import { GameBoyColor } from '../game-boy-color'
import styles from './style.module.css'

export const App = () => {
  return (
    <div className={styles.container}>
      <GameBoyColor />
    </div>
  )
}

