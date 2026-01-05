# ⚙️ Konfiguration / Configuration

## 🇩🇪 Deutsche Konfiguration

### Basis-Konfiguration

| Name | Typ | Standard | Beschreibung |
|------|-----|----------|--------------|
| `type` | string | **Erforderlich** | `custom:violet-pool-card` |
| `entity` | string | **Erforderlich** | Entity ID (außer für overview) |
| `card_type` | string | **Erforderlich** | `pump`, `heater`, `solar`, `dosing`, `overview`, `compact`, oder `system` |
| `name` | string | Optional | Benutzerdefinierter Name für die Karte |
| `icon` | string | Optional | Benutzerdefiniertes Icon (MDI) |

### Entitäts-Konfiguration (Neu)

Für `system` und `overview` Kartentypen können Sie spezifische Entitäten definieren, falls diese von den Standardwerten abweichen:

| Name | Typ | Standard | Beschreibung |
|------|-----|----------|--------------|
| `pump_entity` | string | `switch.violet_pool_pump` | Die Entität für die Poolpumpe |
| `heater_entity` | string | `climate.violet_pool_heater` | Die Entität für die Heizung |
| `solar_entity` | string | `climate.violet_pool_solar` | Die Entität für die Solarsteuerung |
| `chlorine_entity` | string | `switch.violet_pool_dos_1_cl` | Die Entität für die Chlordosierung |
| `ph_minus_entity` | string | `switch.violet_pool_dos_2_phm` | Die Entität für pH-Minus |
| `ph_plus_entity` | string | - | Die Entität für pH-Plus (optional) |
| `pool_temp_entity` | string | `sensor.violet_pool_temperature` | Sensor für Pooltemperatur |
| `ph_value_entity` | string | `sensor.violet_pool_ph_value` | Sensor für pH-Wert |
| `orp_value_entity` | string | `sensor.violet_pool_orp_value` | Sensor für ORP/Redox-Wert |
| `entities` | list | - | Alternative Liste von Entitäten (wird positionsbasiert verwendet) |

### Design-Optionen

| Name | Typ | Standard | Beschreibung |
|------|-----|----------|--------------|
| `size` | string | `medium` | Kartengröße: `small`, `medium`, `large`, oder `fullscreen` |
| `theme` | string | `luxury` | Design-Theme: `luxury`, `modern`, `minimalist`, `glass`, `neon`, `premium` |
| `animation` | string | `smooth` | Animations-Level: `none`, `subtle`, `smooth`, oder `energetic` |

### Anzeige-Optionen

| Name | Typ | Standard | Beschreibung |
|------|-----|----------|--------------|
| `show_state` | boolean | `true` | Status-Badge anzeigen |
| `show_detail_status` | boolean | `true` | Detaillierte Status-Info anzeigen |
| `show_controls` | boolean | `true` | Kontroll-Slider/Buttons anzeigen |
| `show_runtime` | boolean | `false` | Laufzeit-Zähler anzeigen (nur Pumpe) |
| `show_history` | boolean | `false` | Dosier-Historie anzeigen (nur Dosierung) |

### Dosier-Optionen

| Name | Typ | Standard | Beschreibung |
|------|-----|----------|--------------|
| `dosing_type` | string | Auto-Erkennung | `chlorine`, `ph_minus`, `ph_plus`, oder `flocculant` |

### Erweiterte Anpassung

| Name | Typ | Standard | Beschreibung |
|------|-----|----------|--------------|
| `blur_intensity` | number | `10` | Intensität des Blur-Effekts (0-30) |
| `accent_color` | string | - | Benutzerdefinierte Akzentfarbe (HEX Code) |
| `icon_color` | string | - | Benutzerdefinierte Iconfarbe (HEX Code) |
| `gradient` | string | - | Benutzerdefinierter CSS Gradient für den Hintergrund |

---

## 🇬🇧 English Configuration

### Basic Configuration

| Name | Type | Default | Description |
|------|------|---------|-------------|
| `type` | string | **Required** | `custom:violet-pool-card` |
| `entity` | string | **Required** | Entity ID (except for overview) |
| `card_type` | string | **Required** | `pump`, `heater`, `solar`, `dosing`, `overview`, `compact`, or `system` |
| `name` | string | Optional | Custom name for the card |
| `icon` | string | Optional | Custom icon (MDI) |

### Entity Configuration (New)

For `system` and `overview` card types, you can define specific entities if they differ from the defaults:

| Name | Type | Default | Description |
|------|------|---------|-------------|
| `pump_entity` | string | `switch.violet_pool_pump` | The entity for the pool pump |
| `heater_entity` | string | `climate.violet_pool_heater` | The entity for the heater |
| `solar_entity` | string | `climate.violet_pool_solar` | The entity for solar control |
| `chlorine_entity` | string | `switch.violet_pool_dos_1_cl` | The entity for chlorine dosing |
| `ph_minus_entity` | string | `switch.violet_pool_dos_2_phm` | The entity for pH minus |
| `ph_plus_entity` | string | - | The entity for pH plus (optional) |
| `pool_temp_entity` | string | `sensor.violet_pool_temperature` | Sensor for pool temperature |
| `ph_value_entity` | string | `sensor.violet_pool_ph_value` | Sensor for pH value |
| `orp_value_entity` | string | `sensor.violet_pool_orp_value` | Sensor for ORP/Redox value |
| `entities` | list | - | Alternative list of entities (used positionally) |

### Design Options

| Name | Type | Default | Description |
|------|------|---------|-------------|
| `size` | string | `medium` | Card size: `small`, `medium`, `large`, or `fullscreen` |
| `theme` | string | `luxury` | Design theme: `luxury`, `modern`, `minimalist`, `glass`, `neon`, `premium` |
| `animation` | string | `smooth` | Animation level: `none`, `subtle`, `smooth`, or `energetic` |

### Display Options

| Name | Type | Default | Description |
|------|------|---------|-------------|
| `show_state` | boolean | `true` | Show state badge |
| `show_detail_status` | boolean | `true` | Show detailed status info |
| `show_controls` | boolean | `true` | Show control sliders/buttons |
| `show_runtime` | boolean | `false` | Show runtime counter (pump only) |
| `show_history` | boolean | `false` | Show dosing history (dosing only) |

### Dosing Options

| Name | Type | Default | Description |
|------|-----|---------|-------------|
| `dosing_type` | string | Auto-detect | `chlorine`, `ph_minus`, `ph_plus`, or `flocculant` |

### Advanced Customization

| Name | Type | Default | Description |
|------|-----|---------|-------------|
| `blur_intensity` | number | `10` | Blur effect intensity (0-30) |
| `accent_color` | string | - | Custom accent color (HEX Code) |
| `icon_color` | string | - | Custom icon color (HEX Code) |
| `gradient` | string | - | Custom CSS gradient for background |
