# Session 3 Complete - Slider Controls & Service Calls

## ✅ Was wurde erstellt

### Neue Dateien
```
src/components/
└── slider-control.ts        # ✅ Slider Control Component

src/utils/
├── service-caller.ts        # ✅ Service Caller Utility
└── entity-helper.ts         # ✅ Entity Helper Utility
```

## ✅ Component & Utility Features

### 1. Slider Control Component (`slider-control.ts`)
**Funktionen:**
- ✅ Range Slider (continuous values)
- ✅ Discrete Slider (snap-to-value)
- ✅ Touch-optimiert (größere Thumbs auf Touch-Geräten)
- ✅ Label Support (Array von Strings oder SliderLabel Objects)
- ✅ Value Change Events (debounced)
- ✅ Slider Input Events (live, no debounce)
- ✅ Min/Max Labels (optional)
- ✅ Vertical Mode Support
- ✅ Disabled State
- ✅ Custom Unit Support
- ✅ Dragging State Visualization
- ✅ Click-on-Label Navigation

**Code-Größe:** ~360 Zeilen

**Properties:**
- `min`, `max`, `step` - Range configuration
- `value` - Current value
- `unit` - Unit suffix (°C, etc.)
- `label` - Label above slider
- `labels` - Array of labels for discrete values
- `disabled` - Disable interaction
- `vertical` - Vertical orientation
- `showValue` - Show current value display
- `showMinMax` - Show min/max labels

**Events:**
- `value-changed` - Fired on change (debounced 300ms)
- `slider-input` - Fired on input (live, no debounce)

**Styling Features:**
- Gradient fill track
- Animated thumb on hover/active
- Smooth transitions
- Touch-optimized sizing
- Click labels to jump to value

### 2. Service Caller Utility (`service-caller.ts`)
**Funktionen:**
- ✅ Generic service call with error handling
- ✅ Toast notifications
- ✅ violet_pool_controller.control_pump
- ✅ climate.set_temperature
- ✅ climate.set_hvac_mode
- ✅ number.set_value
- ✅ switch.turn_on / turn_off / toggle
- ✅ violet_pool_controller.smart_dosing
- ✅ Manual dosing helper
- ✅ Pump speed setter
- ✅ Controller mode setter

**Code-Größe:** ~290 Zeilen

**Methods:**
```typescript
// Pump control
controlPump(entity, action, speed?, duration?)
setPumpSpeed(entity, speed)
setControllerMode(entity, mode)

// Climate control
setTemperature(entity, temperature)
setHvacMode(entity, mode)

// Switch control
turnOn(entity)
turnOff(entity)
toggle(entity)

// Number control
setNumberValue(entity, value)

// Dosing control
smartDosing(dosingType, duration, action)
manualDosing(entity, duration)
```

**Error Handling:**
- Catch service call exceptions
- Log to console
- Show toast notifications
- Return success/error status

**Toast Notifications:**
- Success messages with action details
- Error messages with error text
- Configurable duration

### 3. Entity Helper Utility (`entity-helper.ts`)
**Funktionen:**
- ✅ Parse PUMPSTATE ("3|PUMP_ANTI_FREEZE")
- ✅ Parse HEATERSTATE (same format)
- ✅ Parse SOLARSTATE (same format)
- ✅ Parse DOS_*_STATE (arrays)
- ✅ Format SNAKE_CASE to readable
- ✅ Get/parse entity attributes
- ✅ Temperature helpers (current, target, min, max)
- ✅ HVAC mode/action helpers
- ✅ Pump speed/RPM helpers
- ✅ Dosing state helpers
- ✅ Sensor value helpers
- ✅ Entity type detection
- ✅ Icon helpers
- ✅ Formatting helpers (temp, pH, ORP)

**Code-Größe:** ~260 Zeilen

**Key Methods:**
```typescript
// State parsing
parsePumpState(pumpState) -> { level, status, rawState }
parseHeaterState(heaterState)
parseSolarState(solarState)
parseDosingState(dosingState) -> { states, isBlocked, hasWarnings }

// Text formatting
formatSnakeCase(text)
formatTemperature(value, decimals)
formatPH(value, decimals)
formatORP(value)

// Entity attributes
getState(entity)
getAttribute(entity, attribute)
getFriendlyName(entity)
getCurrentTemperature(entity)
getTargetTemperature(entity)
getMinTemperature(entity)
getMaxTemperature(entity)
getHvacMode(entity)
getPumpSpeed(entity)
getPumpRPM(entity, level)
getDosingStateAttribute(entity)

// Entity checks
isAvailable(entity)
isOn(entity)
isOff(entity)
isPump(entity)
isClimate(entity)
isDosing(entity)
```

## ✅ Integration in Cards

### Updated Cards
- ✅ **Pump Card** - Slider für Speed (0-3 mit Labels: OFF/ECO/Normal/Boost)
- ✅ **Heater Card** - Value Display + Temperature Slider (18-35°C)

### Pump Card Features
```typescript
// Parse current speed from PUMPSTATE
const parsedState = EntityHelper.parsePumpState(pumpState);
const currentSpeed = parsedState.level;

// Slider with labels
<slider-control
  label="Pump Speed"
  min="0"
  max="3"
  step="1"
  value="${currentSpeed}"
  labels="${['OFF', 'ECO', 'Normal', 'Boost']}"
  @value-changed="${handlePumpSpeedChange}"
></slider-control>

// Service call
async _handlePumpSpeedChange(e) {
  const serviceCaller = new ServiceCaller(this.hass);
  await serviceCaller.setPumpSpeed(this.config.entity, e.detail.value);
}
```

### Heater Card Features
```typescript
// Get temperature values
const currentTemp = EntityHelper.getCurrentTemperature(entity);
const targetTemp = EntityHelper.getTargetTemperature(entity);
const minTemp = EntityHelper.getMinTemperature(entity) || 18;
const maxTemp = EntityHelper.getMaxTemperature(entity) || 35;

// Value display
<value-display
  value="${currentTemp}"
  unit="°C"
  label="Current Temperature"
  target="${targetTemp}"
  large
></value-display>

// Temperature slider
<slider-control
  label="Target Temperature"
  min="${minTemp}"
  max="${maxTemp}"
  step="0.5"
  value="${targetTemp}"
  unit="°C"
  showMinMax
  @value-changed="${handleTemperatureChange}"
></slider-control>

// Service call
async _handleTemperatureChange(e) {
  const serviceCaller = new ServiceCaller(this.hass);
  await serviceCaller.setTemperature(this.config.entity, e.detail.value);
}
```

## ✅ Build Status

### Build erfolgreich
```bash
npx rollup -c rollup.config.mjs
# created dist/violet-pool-card.js in 1.3s
```

### Bundle Size Progress
- **Session 1:** 24KB (Base)
- **Session 2:** 40KB (+16KB - 4 components)
- **Session 3:** 55KB (+15KB - 1 component + 2 utilities)
- **Total:** 55KB
- **Remaining Budget:** 45KB (target: <100KB)

### TypeScript
- ✅ No errors
- ✅ Fixed type issue in setControllerMode
- ✅ All types properly defined
- ✅ Strict mode enabled

## 📋 Usage Examples

### Slider Control

**Discrete Slider with Labels:**
```html
<slider-control
  label="Pump Speed"
  min="0"
  max="3"
  step="1"
  value="2"
  .labels="${['OFF', 'ECO', 'Normal', 'Boost']}"
  @value-changed="${handleChange}"
></slider-control>
```

**Continuous Slider with Unit:**
```html
<slider-control
  label="Target Temperature"
  min="18"
  max="35"
  step="0.5"
  value="26"
  unit="°C"
  showMinMax
  @value-changed="${handleChange}"
></slider-control>
```

**With SliderLabel Objects:**
```html
<slider-control
  min="0"
  max="100"
  step="25"
  .labels="${[
    { value: 0, label: 'OFF' },
    { value: 25, label: 'Low' },
    { value: 50, label: 'Medium' },
    { value: 75, label: 'High' },
    { value: 100, label: 'MAX' }
  ]}"
></slider-control>
```

### Service Caller

**Control Pump:**
```typescript
const serviceCaller = new ServiceCaller(this.hass);

// Set speed directly
await serviceCaller.setPumpSpeed('switch.violet_pool_pump', 2);

// Control with action and speed
await serviceCaller.controlPump('switch.violet_pool_pump', 'on', 3, 60);

// Set mode
await serviceCaller.setControllerMode('switch.violet_pool_pump', 'auto');
```

**Control Climate:**
```typescript
// Set temperature
await serviceCaller.setTemperature('climate.violet_pool_heater', 26.5);

// Set HVAC mode
await serviceCaller.setHvacMode('climate.violet_pool_heater', 'heat');
```

**Manual Dosing:**
```typescript
// By entity (auto-detects type)
await serviceCaller.manualDosing('switch.violet_pool_dos_1_cl', 30);

// By dosing type
await serviceCaller.smartDosing('cl', 30, 'on');
```

### Entity Helper

**Parse States:**
```typescript
// Parse pump state
const pumpState = EntityHelper.parsePumpState('3|PUMP_ANTI_FREEZE');
// { level: 3, status: 'Pump Anti Freeze', rawState: '3|PUMP_ANTI_FREEZE' }

// Parse dosing state
const dosingState = EntityHelper.parseDosingState(['BLOCKED_BY_TRESHOLDS', 'TRESHOLDS_REACHED']);
// { states: ['Blocked By Tresholds', ...], isBlocked: true, hasWarnings: true }
```

**Get Values:**
```typescript
const entity = this.hass.states['climate.violet_pool_heater'];

const currentTemp = EntityHelper.getCurrentTemperature(entity); // 24.5
const targetTemp = EntityHelper.getTargetTemperature(entity);   // 26.0
const minTemp = EntityHelper.getMinTemperature(entity);         // 18
const maxTemp = EntityHelper.getMaxTemperature(entity);         // 35
```

**Format Values:**
```typescript
EntityHelper.formatTemperature(24.5);  // "24.5°C"
EntityHelper.formatPH(7.234, 2);       // "7.23"
EntityHelper.formatORP(650);           // "650 mV"
```

## 🎯 Deliverables Check

### ✅ Session 3 Deliverables
- [x] Slider Control Component funktioniert
- [x] Touch-optimiert
- [x] Labels Support (String Array + Object Array)
- [x] Value Change Events (debounced)
- [x] Service Caller implementiert
- [x] Alle Violet Pool Services abgedeckt
- [x] Error Handling + Toast Notifications
- [x] Entity Helper implementiert
- [x] State Parsing (PUMPSTATE, DOS_*_STATE)
- [x] SNAKE_CASE Formatierung
- [x] Temperature/Climate Helpers
- [x] Integration in Pump Card
- [x] Integration in Heater Card
- [x] Build erfolgreich

## 📊 Fortschritt

**Session 3 von 10 abgeschlossen** (30%)

### Completed Sessions
- ✅ Session 1: Repository Setup
- ✅ Session 2: Status Components
- ✅ Session 3: Slider Controls & Service Calls

### Next Sessions
- 🔜 Session 4: Quick Actions
- ⏸️ Session 5-8: Card Types (Pump, Heater, Solar, Dosing)
- ⏸️ Session 9: Overview & Compact
- ⏸️ Session 10: Polish & Release

## 🚀 Nächste Schritte

### Session 4: Quick Actions
**Dauer**: ~2 Stunden

**Zu implementieren:**
1. **Quick Actions Component** (`src/components/quick-actions.ts`)
   - Button Grid Layout
   - Icon + Label
   - Click Handler
   - Active State
   - Disabled State
   - Loading State

2. **Action Types:**
   - State Actions: OFF / AUTO / ON
   - Speed Presets: ECO / Normal / Boost
   - Manual Dosing: "Dosieren (30s)" Button
   - Custom Actions (tap_action config)

3. **Confirmation Dialog** (optional)
   - Bei kritischen Aktionen
   - "Wirklich ausschalten?"

**Prompt für Session 4:**
```
Weiter mit Violet Pool Card - Session 4: Quick Actions

Bitte implementiere:
1. Quick Actions Component (src/components/quick-actions.ts)
2. Integration in Pump, Heater, Dosing Cards
3. Optional: Confirmation Dialog

Verwende die Code-Vorlagen aus VIOLET_CARD_ROADMAP.md!
```

## 💡 Technical Highlights

### Debouncing
Slider uses 300ms debounce for `value-changed` events to prevent excessive service calls while dragging.

### Entity Helper Architecture
All entity parsing logic is centralized, making it easy to:
- Add new parsing rules
- Maintain consistent formatting
- Test parsing logic independently

### Service Call Error Handling
All service calls return `{ success, error? }` allowing cards to react to failures.

### Toast Notifications
Service calls automatically show feedback to users via toast notifications.

## 🔍 Code Quality

### Component Count
- **Session 1:** 1 main card
- **Session 2:** +4 components (badge, value, detail, chips)
- **Session 3:** +1 component (slider), +2 utilities
- **Total:** 6 components + 2 utilities

### Lines of Code
- slider-control.ts: ~360 lines
- service-caller.ts: ~290 lines
- entity-helper.ts: ~260 lines
- **Session 3 Total:** ~910 lines
- **Project Total:** ~1690 lines

### Type Safety
- All utilities fully typed
- No `any` types in public APIs
- Proper interface definitions
- Generic error handling types

---

**Erstellt**: 2026-01-04
**Session**: 3/10
**Status**: ✅ Complete
**Nächste Session**: Quick Actions
**Bundle Size**: 55KB / 100KB (55%)
