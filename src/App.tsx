import { useState, useRef } from 'react'
import { EmulatorJS, type EmulatorJSRef } from './components/EmulatorJS'
import { GameButton } from './components/GameButton'
import './App.css'

type CoreType = 'gbc' | 'gb' | 'gba' | 'nes' | 'snes' | 'n64';

function App() {
  const [romUrl, setRomUrl] = useState('')
  const [core, setCore] = useState<CoreType>('gbc')
  const [isLoaded, setIsLoaded] = useState(false)
  const emulatorRef = useRef<EmulatorJSRef>(null)

  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0]
    if (file) {
      const url = URL.createObjectURL(file)
      const extension = file.name.split('.').pop()?.toLowerCase()
      
      // Auto-detect core based on file extension
      let detectedCore: CoreType = 'gbc'
      if (extension === 'gba') detectedCore = 'gba'
      else if (extension === 'gb') detectedCore = 'gb'
      else if (extension === 'gbc') detectedCore = 'gbc'
      else if (extension === 'nes') detectedCore = 'nes'
      else if (extension === 'snes' || extension === 'sfc') detectedCore = 'snes'
      else if (extension === 'n64' || extension === 'z64') detectedCore = 'n64'
      
      setRomUrl(url)
      setCore(detectedCore)
      setIsLoaded(true)
    }
  }

  const handleButtonPress = (key: string) => {
    emulatorRef.current?.pressButton(key);
  };

  const handleButtonRelease = (key: string) => {
    emulatorRef.current?.releaseButton(key);
  };

  return (
    <div style={{ padding: '20px', maxWidth: '1200px', margin: '0 auto' }}>
      <h1>EmulatorJS POC</h1>
      
      <div style={{ marginBottom: '20px' }}>
        <label 
          htmlFor="rom-upload" 
          onMouseDown={(e) => e.preventDefault()}
          style={{ 
            display: 'inline-block',
            padding: '10px 20px',
            backgroundColor: '#4CAF50',
            color: 'white',
            borderRadius: '4px',
            cursor: 'pointer',
            marginBottom: '10px'
          }}
        >
          Upload ROM File
        </label>
        <input 
          id="rom-upload"
          type="file" 
          accept=".gbc,.gb,.gba,.nes,.snes,.sfc,.n64,.z64" 
          onChange={handleFileUpload}
          onMouseDown={(e) => e.preventDefault()}
          style={{ display: 'none' }}
        />
        <p style={{ fontSize: '14px', color: '#666' }}>
          Supported: Game Boy (.gb), Game Boy Color (.gbc), Game Boy Advance (.gba), NES, SNES, N64
        </p>
      </div>

      {isLoaded ? (
        <div style={{ 
          display: 'flex', 
          flexDirection: 'column', 
          alignItems: 'center',
          maxWidth: '800px',
          margin: '0 auto',
          gap: '0',
        }}>
          {/* Game Screen */}
          <div style={{ 
            backgroundColor: '#222', 
            padding: '20px', 
            borderRadius: '8px 8px 0 0',
            width: '100%',
            minHeight: '500px',
          }}>
            <p style={{ color: '#fff', marginBottom: '10px', textAlign: 'center' }}>
              Loaded: <strong>{core.toUpperCase()}</strong> game
            </p>
            <div style={{ height: '480px' }}>
              <EmulatorJS ref={emulatorRef} gameUrl={romUrl} core={core} />
            </div>
          </div>

          {/* Game Boy Controls */}
          <div style={{
            backgroundColor: '#e0e0e0',
            padding: '30px 40px',
            width: '100%',
            display: 'flex',
            justifyContent: 'space-between',
            gap: '40px',
          }}>
            {/* Left Side: D-Pad */}
            <div style={{ flex: '1', display: 'flex', justifyContent: 'center' }}>
              <div>
                <h4 style={{ textAlign: 'center', marginBottom: '10px' }}>D-Pad</h4>
                <div style={{ 
                  display: 'grid', 
                  gridTemplateColumns: 'repeat(3, 60px)', 
                  gridTemplateRows: 'repeat(3, 60px)',
                  gap: '0px',
                }}>
                  <div></div>
                  <GameButton 
                    label="↑" 
                    keyCode="ArrowUp" 
                    onPress={handleButtonPress} 
                    onRelease={handleButtonRelease}
                    style={{ 
                      padding: '15px',
                      backgroundColor: '#555',
                      color: 'white',
                      fontSize: '20px',
                      borderRadius: '8px 8px 0 0',
                    }}
                  />
                  <div></div>
                  <GameButton 
                    label="←" 
                    keyCode="ArrowLeft" 
                    onPress={handleButtonPress} 
                    onRelease={handleButtonRelease}
                    style={{ 
                      padding: '15px',
                      backgroundColor: '#555',
                      color: 'white',
                      fontSize: '20px',
                      borderRadius: '8px 0 0 8px',
                    }}
                  />
                  <div style={{ backgroundColor: '#666', border: '2px solid #333' }}></div>
                  <GameButton 
                    label="→" 
                    keyCode="ArrowRight" 
                    onPress={handleButtonPress} 
                    onRelease={handleButtonRelease}
                    style={{ 
                      padding: '15px',
                      backgroundColor: '#555',
                      color: 'white',
                      fontSize: '20px',
                      borderRadius: '0 8px 8px 0',
                    }}
                  />
                  <div></div>
                  <GameButton 
                    label="↓" 
                    keyCode="ArrowDown" 
                    onPress={handleButtonPress} 
                    onRelease={handleButtonRelease}
                    style={{ 
                      padding: '15px',
                      backgroundColor: '#555',
                      color: 'white',
                      fontSize: '20px',
                      borderRadius: '0 0 8px 8px',
                    }}
                  />
                  <div></div>
                </div>
              </div>
            </div>

            {/* Right Side: Action Buttons */}
            <div style={{ flex: '1', display: 'flex', justifyContent: 'center' }}>
              <div>
                <h4 style={{ textAlign: 'center', marginBottom: '10px' }}>Buttons</h4>
                <div style={{ display: 'flex', gap: '20px', marginBottom: '20px' }}>
                  <GameButton 
                    label="B" 
                    keyCode="x" 
                    onPress={handleButtonPress} 
                    onRelease={handleButtonRelease}
                    style={{ 
                      width: '70px',
                      height: '70px',
                      borderRadius: '50%',
                      backgroundColor: '#ffeb3b',
                      color: '#333',
                      fontSize: '24px',
                      fontWeight: 'bold',
                      border: '3px solid #333',
                    }}
                  />
                  <GameButton 
                    label="A" 
                    keyCode="z" 
                    onPress={handleButtonPress} 
                    onRelease={handleButtonRelease}
                    style={{ 
                      width: '70px',
                      height: '70px',
                      borderRadius: '50%',
                      backgroundColor: '#f44336',
                      color: 'white',
                      fontSize: '24px',
                      fontWeight: 'bold',
                      border: '3px solid #333',
                    }}
                  />
                </div>
                
                {/* Shoulder Buttons */}
                <div style={{ display: 'flex', gap: '10px', marginBottom: '10px' }}>
                  <GameButton 
                    label="L" 
                    keyCode="q" 
                    onPress={handleButtonPress} 
                    onRelease={handleButtonRelease}
                    style={{ 
                      flex: 1,
                      padding: '10px 20px',
                      backgroundColor: '#999',
                      fontSize: '16px',
                    }}
                  />
                  <GameButton 
                    label="R" 
                    keyCode="e" 
                    onPress={handleButtonPress} 
                    onRelease={handleButtonRelease}
                    style={{ 
                      flex: 1,
                      padding: '10px 20px',
                      backgroundColor: '#999',
                      fontSize: '16px',
                    }}
                  />
                </div>
              </div>
            </div>
          </div>

          {/* Center: Start/Select */}
          <div style={{ 
            backgroundColor: '#c0c0c0',
            padding: '20px 40px',
            borderRadius: '0 0 8px 8px',
            width: '100%',
            display: 'flex',
            justifyContent: 'center',
            gap: '30px',
          }}>
            <GameButton 
              label="SELECT" 
              keyCode="v" 
              onPress={handleButtonPress} 
              onRelease={handleButtonRelease}
              style={{ 
                padding: '8px 20px',
                backgroundColor: '#666',
                color: 'white',
                fontSize: '12px',
                borderRadius: '20px',
              }}
            />
            <GameButton 
              label="START" 
              keyCode="Enter" 
              onPress={handleButtonPress} 
              onRelease={handleButtonRelease}
              style={{ 
                padding: '8px 20px',
                backgroundColor: '#666',
                color: 'white',
                fontSize: '12px',
                borderRadius: '20px',
              }}
            />
          </div>
        </div>
      ) : (
        <div style={{ 
          backgroundColor: '#f5f5f5', 
          padding: '40px', 
          borderRadius: '8px',
          textAlign: 'center',
          color: '#666'
        }}>
          <p>No ROM loaded. Upload a ROM file to start.</p>
        </div>
      )}
    </div>
  )
}

export default App
