# Game Boy Color Component Breakdown

## Component Hierarchy

```
GameBoyColor
├── Shell (main container)
│   ├── ScreenArea
│   │   ├── ScreenBezel
│   │   │   ├── PowerIndicator (LED)
│   │   │   └── Screen (LCD display)
│   │   └── BrandingText ("GAME BOY COLOR")
│   ├── NintendoLogo
│   ├── Controls
│   │   ├── DPad (directional pad)
│   │   ├── ActionButtons
│   │   │   ├── ActionButton (B)
│   │   │   └── ActionButton (A)
│   │   └── SystemButtons
│   │       ├── SystemButton (SELECT)
│   │       └── SystemButton (START)
│   └── SpeakerGrille
```

## Component Descriptions

### GameBoyColor
- **Purpose**: Root container component
- **Props**: `onPowerToggle`, `children` (emulator screen)
- **Styling**: Yellow background (#FFD700), rounded corners, device proportions

```typescript
type GameBoyColorProps = {
  onPowerToggle?: () => void;
  children?: React.ReactNode;
}

export const GameBoyColor: React.FC<GameBoyColorProps> = ({ 
  onPowerToggle, 
  children 
}) => {
  return (
    <div className="game-boy-color">
      <Shell>
        <ScreenArea>
          <ScreenBezel>
            <PowerIndicator isOn={true} />
            <Screen>{children}</Screen>
          </ScreenBezel>
          <BrandingText />
        </ScreenArea>
        <NintendoLogo />
        <Controls>
          <DPad onDirectionChange={handleDirection} />
          <ActionButtons>
            <ActionButton label="B" onPress={handleB} />
            <ActionButton label="A" onPress={handleA} />
          </ActionButtons>
          <SystemButtons>
            <SystemButton label="SELECT" onPress={handleSelect} />
            <SystemButton label="START" onPress={handleStart} />
          </SystemButtons>
        </Controls>
        <SpeakerGrille />
      </Shell>
    </div>
  );
};
```

### Shell
- **Purpose**: Main body container
- **Styling**: Yellow matte plastic texture, device dimensions

```typescript
type ShellProps = {
  children: React.ReactNode;
}

export const Shell: React.FC<ShellProps> = ({ children }) => {
  return (
    <div className="shell">
      {children}
    </div>
  );
};
```

### ScreenArea
- **Purpose**: Contains screen and branding elements
- **Layout**: Upper half of device

```typescript
type ScreenAreaProps = {
  children: React.ReactNode;
}

export const ScreenArea: React.FC<ScreenAreaProps> = ({ children }) => {
  return (
    <div className="screen-area">
      {children}
    </div>
  );
};
```

### ScreenBezel
- **Purpose**: Black glossy frame around screen
- **Styling**: Glossy black border, rounded corners
- **Contains**: Power indicator and screen

```typescript
type ScreenBezelProps = {
  children: React.ReactNode;
}

export const ScreenBezel: React.FC<ScreenBezelProps> = ({ children }) => {
  return (
    <div className="screen-bezel">
      {children}
    </div>
  );
};
```

### PowerIndicator
- **Purpose**: Red LED power light
- **Props**: `isOn` (boolean)
- **Styling**: Small red LED dot, positioned left of screen

```typescript
type PowerIndicatorProps = {
  isOn: boolean;
}

export const PowerIndicator: React.FC<PowerIndicatorProps> = ({ isOn }) => {
  return (
    <div className={`power-indicator ${isOn ? 'on' : 'off'}`}>
      <div className="power-led" />
      <span className="power-label">POWER</span>
    </div>
  );
};
```

### Screen
- **Purpose**: LCD display area
- **Props**: `content` (emulator canvas)
- **Styling**: Light gray/silver background, pixel grid pattern, 160x144 viewport (scaled)

```typescript
type ScreenProps = {
  children?: React.ReactNode;
}

export const Screen: React.FC<ScreenProps> = ({ children }) => {
  return (
    <div className="screen">
      <div className="screen-content">
        {children}
      </div>
    </div>
  );
};
```

### BrandingText
- **Purpose**: "GAME BOY COLOR" text
- **Styling**: 
  - "GAME BOY": Black text
  - "COLOR": Multi-colored (C=red, O=orange, L=green, O=blue, R=purple)

```typescript
export const BrandingText: React.FC = () => {
  return (
    <div className="branding-text">
      <span className="game-boy-text">GAME BOY</span>
      <span className="color-text">
        <span className="c-red">C</span>
        <span className="o-orange">O</span>
        <span className="l-green">L</span>
        <span className="o-blue">O</span>
        <span className="r-purple">R</span>
      </span>
    </div>
  );
};
```

### NintendoLogo
- **Purpose**: Embossed Nintendo branding
- **Styling**: Embossed/debossed effect on yellow plastic

```typescript
export const NintendoLogo: React.FC = () => {
  return (
    <div className="nintendo-logo">
      <span>Nintendo</span>
    </div>
  );
};
```

### Controls
- **Purpose**: Container for all control elements
- **Layout**: Lower section of device

```typescript
type ControlsProps = {
  children: React.ReactNode;
}

export const Controls: React.FC<ControlsProps> = ({ children }) => {
  return (
    <div className="controls">
      {children}
    </div>
  );
};
```

### DPad
- **Purpose**: Directional input control
- **Props**: `onDirectionChange`, `isPressed`
- **Styling**: Black cross-shaped pad, positioned lower-left
- **States**: Pressed/unpressed with visual feedback

```typescript
type Direction = 'up' | 'down' | 'left' | 'right' | null;

type DPadProps = {
  onDirectionChange: (direction: Direction) => void;
  isPressed?: boolean;
}

export const DPad: React.FC<DPadProps> = ({ onDirectionChange, isPressed }) => {
  const handlePress = (direction: Direction) => {
    onDirectionChange(direction);
  };

  return (
    <div className={`d-pad ${isPressed ? 'pressed' : ''}`}>
      <button 
        className="d-pad-up"
        onMouseDown={() => handlePress('up')}
        onMouseUp={() => handlePress(null)}
      >
        ↑
      </button>
      <button 
        className="d-pad-down"
        onMouseDown={() => handlePress('down')}
        onMouseUp={() => handlePress(null)}
      >
        ↓
      </button>
      <button 
        className="d-pad-left"
        onMouseDown={() => handlePress('left')}
        onMouseUp={() => handlePress(null)}
      >
        ←
      </button>
      <button 
        className="d-pad-right"
        onMouseDown={() => handlePress('right')}
        onMouseUp={() => handlePress(null)}
      >
        →
      </button>
    </div>
  );
};
```

### ActionButtons
- **Purpose**: Container for A and B buttons
- **Layout**: Lower-right area

```typescript
type ActionButtonsProps = {
  children: React.ReactNode;
}

export const ActionButtons: React.FC<ActionButtonsProps> = ({ children }) => {
  return (
    <div className="action-buttons">
      {children}
    </div>
  );
};
```

### ActionButton
- **Purpose**: Action button (A or B)
- **Props**: `label` ("A" or "B"), `onPress`, `isPressed`
- **Styling**: Circular black glossy button, labeled in white

```typescript
type ActionButtonProps = {
  label: 'A' | 'B';
  onPress: () => void;
  isPressed?: boolean;
}

export const ActionButton: React.FC<ActionButtonProps> = ({ 
  label, 
  onPress, 
  isPressed 
}) => {
  return (
    <button 
      className={`button-${label.toLowerCase()} ${isPressed ? 'pressed' : ''}`}
      onMouseDown={onPress}
      onMouseUp={() => {}}
    >
      {label}
    </button>
  );
};
```

### SystemButtons
- **Purpose**: Container for Select and Start buttons
- **Layout**: Centered below Nintendo logo

```typescript
type SystemButtonsProps = {
  children: React.ReactNode;
}

export const SystemButtons: React.FC<SystemButtonsProps> = ({ children }) => {
  return (
    <div className="system-buttons">
      {children}
    </div>
  );
};
```

### SystemButton
- **Purpose**: System button (SELECT or START)
- **Props**: `label` ("SELECT" or "START"), `onPress`, `isPressed`
- **Styling**: Small oval recessed black button, label text below

```typescript
type SystemButtonProps = {
  label: 'SELECT' | 'START';
  onPress: () => void;
  isPressed?: boolean;
}

export const SystemButton: React.FC<SystemButtonProps> = ({ 
  label, 
  onPress, 
  isPressed 
}) => {
  const labelLower = label.toLowerCase();
  return (
    <div className={`${labelLower}-button-container`}>
      <button 
        className={`${labelLower}-button ${isPressed ? 'pressed' : ''}`}
        onMouseDown={onPress}
        onMouseUp={() => {}}
      />
      <span className={`${labelLower}-label`}>{label}</span>
    </div>
  );
};
```

### SpeakerGrille
- **Purpose**: Visual speaker element
- **Styling**: Circular pattern of small black holes, positioned lower-right

```typescript
export const SpeakerGrille: React.FC = () => {
  return (
    <div className="speaker-grille">
      {Array.from({ length: 20 }).map((_, i) => (
        <div key={i} className="speaker-hole" />
      ))}
    </div>
  );
};
```

## Styling Notes

- **Colors**:
  - Shell: Yellow (#FFD700 or similar)
  - Buttons/Bezel: Black (#000000)
  - Screen: Light gray (#C0C0C0)
  - Text: White on black, black on yellow

- **Effects**:
  - Matte plastic texture on shell
  - Glossy finish on buttons and bezel
  - Embossed effect on Nintendo logo
  - Button press animations (slight depression)

- **Dimensions**: 
  - Device: 133.5 mm (height) × 78 mm (width) × 27.4 mm (depth)
  - Device aspect ratio: ~1.71:1 (approximately 5:3)
  - Screen resolution: 160×144 pixels (10:9 aspect ratio)
  - Screen size: 2.3-inch diagonal

