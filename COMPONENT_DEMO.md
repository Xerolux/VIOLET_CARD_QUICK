# Components Demo - Session 2

This file demonstrates how to use the newly created components.

## Status Badge Component

```html
<status-badge state="auto" pulse></status-badge>
<status-badge state="on"></status-badge>
<status-badge state="off"></status-badge>
<status-badge state="blocked" label="FROST"></status-badge>
<status-badge state="error"></status-badge>
```

### States
- `off` - Gray, power-off icon
- `on` - Green, power-on icon
- `auto` - Blue, autorenew icon (with rotation animation)
- `manual` - Orange, hand icon
- `blocked` - Amber, block helper icon
- `error` - Red, alert circle icon
- `idle` - Gray, sleep icon
- `heat`/`heating` - Red-orange, fire icon (with breathing animation)
- `cool`/`cooling` - Cyan, snowflake icon (with breathing animation)

### Properties
- `state` (required) - BadgeState
- `label` - Custom label text (overrides default)
- `icon` - Custom icon (overrides default)
- `pulse` - Boolean, enable pulse animation
- `showIcon` - Boolean, show/hide icon (default: true)

## Value Display Component

```html
<!-- Simple temperature display -->
<value-display
  value="24.5"
  unit="°C"
  label="Pool Temperature">
</value-display>

<!-- With target and range -->
<value-display
  value="7.8"
  unit=""
  label="pH Value"
  target="7.2"
  min="7.0"
  max="7.4"
  decimals="2"
  showRange>
</value-display>

<!-- Large display with status -->
<value-display
  value="650"
  unit="mV"
  label="ORP"
  status="low"
  large>
</value-display>
```

### Properties
- `value` - Number value to display
- `unit` - Unit suffix (°C, mV, etc.)
- `label` - Label above value
- `status` - ValueStatus: 'normal' | 'low' | 'high' | 'critical' | 'ok' | 'warning' | 'error'
- `min` - Minimum value for range display
- `max` - Maximum value for range display
- `target` - Target value to show
- `decimals` - Number of decimal places (default: 1)
- `showStatus` - Show status icon (default: true)
- `showRange` - Show min/max range (default: false)
- `large` - Large text size (default: false)

## Detail Status Component

```html
<!-- Parse pipe-separated status -->
<detail-status raw="3|PUMP_ANTI_FREEZE"></detail-status>
<!-- Output: Level 3: Pump Anti Freeze -->

<!-- Parse array of statuses -->
<detail-status .raw="${['BLOCKED_BY_TRESHOLDS', 'TRESHOLDS_REACHED']}"></detail-status>

<!-- Compact mode -->
<detail-status raw="2|SOLAR_ANTI_FREEZE" compact></detail-status>

<!-- Custom icon -->
<detail-status raw="HEATER_BLOCKED_BY_OUTSIDE_TEMP" icon="mdi:thermometer-alert"></detail-status>
```

### Parsing
- **Pipe-separated**: `"3|PUMP_ANTI_FREEZE"` → `{ level: 3, status: "Pump Anti Freeze" }`
- **SNAKE_CASE formatting**: `"PUMP_ANTI_FREEZE"` → `"Pump Anti Freeze"`
- **Array**: `["BLOCKED", "THRESHOLD"]` → Multiple status items

### Auto-icons based on content
- Contains "freeze/frost" → `mdi:snowflake-alert`
- Contains "blocked/block" → `mdi:block-helper`
- Contains "threshold/limit" → `mdi:speedometer`
- Contains "temp" → `mdi:thermometer-alert`
- Contains "error" → `mdi:alert-circle`
- Contains "ok/normal" → `mdi:check-circle`
- Default → `mdi:information`

### Auto-colors based on severity
- Contains "error/critical" → Red
- Contains "blocked/freeze" → Orange
- Contains "ok/normal" → Green
- Default → Blue

### Properties
- `raw` - String or string[] to parse
- `icon` - Custom icon (overrides auto-detection)
- `compact` - Smaller padding and font (default: false)

## Warning Chips Component

```html
<!-- Simple warnings from array -->
<warning-chips .warnings="${['BLOCKED_BY_TRESHOLDS', 'TRESHOLDS_REACHED']}"></warning-chips>

<!-- Custom warning objects -->
<warning-chips .warnings="${[
  { text: 'ORP too low', type: 'warning' },
  { text: 'System error', type: 'error', icon: 'mdi:alert' },
  { text: 'Dosing complete', type: 'success' }
]}"></warning-chips>

<!-- Dismissable warnings -->
<warning-chips
  .warnings="${['WARNING_1', 'WARNING_2']}"
  dismissable>
</warning-chips>

<!-- Custom default type -->
<warning-chips
  .warnings="${['Info message']}"
  defaultType="info">
</warning-chips>
```

### Warning Types
- `info` - Blue background, information icon
- `warning` - Orange background, alert icon (default)
- `error` - Red background, alert-circle icon (with pulse animation)
- `success` - Green background, check-circle icon

### Auto-detection from text
- Contains "error/critical/failed" → error
- Contains "blocked/threshold/limit" → warning
- Contains "ok/success/complete" → success
- Default → info

### Warning Object Interface
```typescript
interface Warning {
  text: string;          // Warning text (will be formatted from SNAKE_CASE)
  type?: ChipType;       // 'info' | 'warning' | 'error' | 'success'
  icon?: string;         // Custom MDI icon
  dismissable?: boolean; // Can be dismissed
}
```

### Properties
- `warnings` - Array of Warning objects or strings
- `defaultType` - Default ChipType for string warnings (default: 'warning')
- `dismissable` - Enable dismiss button on all warnings (default: false)

### Events
- `warning-dismissed` - Fired when a warning is dismissed
  ```javascript
  detail: { warning: Warning }
  ```

## Integration Examples

### Pump Card with Components
```typescript
<ha-card>
  <div class="header">
    <ha-icon icon="mdi:pump"></ha-icon>
    <span class="name">Pool Pump</span>
    <status-badge state="auto" pulse></status-badge>
  </div>

  <detail-status raw="3|PUMP_ANTI_FREEZE"></detail-status>

  <value-display
    value="2"
    unit=""
    label="Speed Level"
    max="3">
  </value-display>
</ha-card>
```

### Dosing Card with Warning Chips
```typescript
<ha-card>
  <div class="header">
    <ha-icon icon="mdi:flask-outline"></ha-icon>
    <span class="name">Chlorine Dosing</span>
    <status-badge state="blocked"></status-badge>
  </div>

  <warning-chips .warnings="${[
    'BLOCKED_BY_TRESHOLDS',
    'TRESHOLDS_REACHED'
  ]}"></warning-chips>

  <value-display
    value="650"
    unit="mV"
    label="ORP"
    target="700"
    min="650"
    max="750"
    status="low"
    showRange>
  </value-display>
</ha-card>
```

### Heater Card with Temperature
```typescript
<ha-card>
  <div class="header">
    <ha-icon icon="mdi:radiator"></ha-icon>
    <span class="name">Pool Heater</span>
    <status-badge state="heating"></status-badge>
  </div>

  <detail-status raw="BLOCKED_BY_OUTSIDE_TEMP"></detail-status>

  <value-display
    value="24.5"
    unit="°C"
    label="Current"
    target="26.0"
    large>
  </value-display>

  <value-display
    value="14.0"
    unit="°C"
    label="Outside Temp"
    status="critical">
  </value-display>
</ha-card>
```

## Styling Integration

All components use CSS custom properties for theming:

```css
:host {
  /* Status badge colors are defined internally */

  /* Value display uses */
  --primary-text-color
  --secondary-text-color
  --disabled-text-color
  --info-color
  --warning-color
  --success-color
  --error-color

  /* Detail status uses */
  --card-background-color

  /* Warning chips use inline styles for colors */
}
```

## Responsive Behavior

- **Warning Chips**: Stacks vertically on screens < 600px
- **All Components**: Flexible layouts that adapt to container width
- **Status Badge**: Maintains minimum size for touch targets

## Accessibility

- All icons use `ha-icon` component
- Proper color contrast ratios
- Semantic HTML structure
- Hover states for interactive elements
- Focus states for keyboard navigation
