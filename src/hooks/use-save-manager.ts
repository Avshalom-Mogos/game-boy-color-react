import { useEffect } from 'react';

// Helper to calculate a simple hash for change detection
const calculateHash = (data: Uint8Array): string => {
  let hash = 0;
  for (let i = 0; i < data.length; i++) {
    hash = ((hash << 5) - hash) + data[i];
    hash |= 0; // Convert to 32bit integer
  }
  return hash.toString();
};

// Helper to convert Uint8Array to Base64
const uint8ArrayToBase64 = (buffer: Uint8Array): string => {
  let binary = '';
  const len = buffer.byteLength;
  for (let i = 0; i < len; i++) {
    binary += String.fromCharCode(buffer[i]);
  }
  return window.btoa(binary);
};

// Helper to convert Base64 to Uint8Array
const base64ToUint8Array = (base64: string): Uint8Array => {
  const binary_string = window.atob(base64);
  const len = binary_string.length;
  const bytes = new Uint8Array(len);
  for (let i = 0; i < len; i++) {
    bytes[i] = binary_string.charCodeAt(i);
  }
  return bytes;
};

export const useSaveManager = () => {
  useEffect(() => {
    // Set up callback to run when game starts
    window.EJS_onGameStart = () => {
      console.log('Game started! Setting up features...');
      try {
        if (window.EJS_emulator?.gameManager) {
          // Fix Save Persistence
          // The emulator has FS.syncfs commented out, so we must do it manually
          console.log('Setting up manual save sync...');
          
          let lastSaveHash = ''; // Track content hash
          let isFirstSync = true; // Flag to skip the first sync on boot

          // Initialize hash with current file content to avoid first-sync false positive
          try {
            if (window.EJS_emulator?.gameManager?.FS) {
              const gm = window.EJS_emulator.gameManager;
              // Double check FS exists on gm just to satisfy TS
              if (gm.FS) {
                const path = gm.getSaveFilePath();
                
                // --- RESTORE FROM BACKUP IF NEEDED ---
                const backup = localStorage.getItem('GBC_SAVE_BACKUP');
                let fileExists = path && gm.FS.analyzePath(path).exists;
                let fileSize = fileExists ? gm.FS.stat(path).size : 0;

                if ((!fileExists || fileSize === 0) && backup) {
                  console.log('No active save found, but backup exists! Restoring from LocalStorage...');
                  try {
                    const saveData = base64ToUint8Array(backup);
                    // Write backup to virtual FS
                    // Ensure directory exists first (though usually does)
                    const dir = path.substring(0, path.lastIndexOf('/'));
                    if (!gm.FS.analyzePath(dir).exists) gm.FS.mkdir(dir);
                    
                    gm.FS.writeFile(path, saveData);
                    console.log(`✓ Backup restored to ${path} (${saveData.length} bytes). Reloading saves...`);
                    
                    // Force emulator to reload the save we just wrote
                    if (gm.loadSaveFiles) gm.loadSaveFiles();
                    
                    // Update flags
                    fileExists = true;
                    fileSize = saveData.length;
                  } catch (err) {
                    console.error('Failed to restore backup:', err);
                  }
                }
                // -------------------------------------

                if (fileExists && path) {
                  const content = gm.FS.readFile(path);
                  lastSaveHash = calculateHash(content);
                  console.log(`Initial save hash calculated: ${lastSaveHash}`);
                  isFirstSync = false; // We have a baseline, so next change is real
                }
              }
            }
          } catch (e) {
            console.warn('Could not calculate initial hash or restore backup:', e);
          }

          // Listen for save events
          if (window.EJS_emulator.on) {
            window.EJS_emulator.on('saveSaveFiles', () => {
              try {
                const gameManager = window.EJS_emulator?.gameManager;
                const fs = gameManager?.FS;
                
                if (!gameManager || !fs) return;

                const path = gameManager.getSaveFilePath();
                if (!path) return;

                // Validate file existence
                const analysis = fs.analyzePath(path);
                if (!analysis.exists) return;

                // Check file content
                const stats = fs.stat(path);
                if (stats.size <= 0) return;
                
                const content = fs.readFile(path);
                const currentHash = calculateHash(content);

                // Only sync if content has changed
                if (currentHash !== lastSaveHash) {
                  if (isFirstSync) {
                    console.log(`Initial save state detected (Hash: ${currentHash.substring(0, 8)}...). Ready for changes.`);
                    lastSaveHash = currentHash;
                    isFirstSync = false;
                  } else {
                    console.log(`New save data detected! (Hash changed, Size: ${stats.size} bytes). Syncing to LocalStorage...`);
                    
                    // Sync to LocalStorage ONLY (ignoring broken IndexedDB)
                    try {
                      const backupData = uint8ArrayToBase64(content);
                      localStorage.setItem('GBC_SAVE_BACKUP', backupData);
                      console.log('✓ Save persisted to LocalStorage');
                      lastSaveHash = currentHash; // Update last hash
                    } catch (e) {
                      console.error('LocalStorage save failed:', e);
                    }
                  }
                }
              } catch (error) {
                console.error('Error during save validation/sync:', error);
              }
            });
          }

          // Force a periodic sync every 10 seconds just to be safe
          setInterval(() => {
            // Trigger the save (which fires the event above)
            window.EJS_emulator?.gameManager?.saveSaveFiles();
          }, 10000);

          // --- SAFETY NET: Save on Exit/Hidden ---
          const handleUnload = () => {
            console.log('Page unloading/hiding! Forcing save sync...');
            window.EJS_emulator?.gameManager?.saveSaveFiles();
          };
          
          window.addEventListener('beforeunload', handleUnload);
          document.addEventListener('visibilitychange', () => {
             if (document.visibilityState === 'hidden') handleUnload();
          });
          // ----------------------------------------
          
        } else {
          console.error('EJS_emulator or gameManager not available');
        }
      } catch (error) {
        console.error('Error setting up emulator features:', error);
      }
    };

    return () => {
      // Cleanup if needed
      window.EJS_onGameStart = undefined;
      // Note: Can't easily remove the specific listeners created inside the callback 
      // without refactoring EJS_onGameStart to be outside useEffect or using refs.
      // But since this component is top-level, it's acceptable.
    };
  }, []);
};

