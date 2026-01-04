/**
 * Entity Helper Utility
 * Parse and extract information from Home Assistant entity states and attributes
 */

export interface EntityState {
  entity_id: string;
  state: string;
  attributes: Record<string, any>;
  last_changed: string;
  last_updated: string;
}

export interface PumpState {
  level?: number;
  status: string;
  rawState: string;
}

export interface DosingState {
  states: string[];
  isBlocked: boolean;
  hasWarnings: boolean;
}

export class EntityHelper {
  /**
   * Parse PUMPSTATE attribute
   * Format: "3|PUMP_ANTI_FREEZE" -> { level: 3, status: "Pump Anti Freeze", rawState: "..." }
   */
  static parsePumpState(pumpState: string): PumpState {
    if (!pumpState || typeof pumpState !== 'string') {
      return { status: '', rawState: '' };
    }

    const parts = pumpState.split('|');
    if (parts.length === 2) {
      const level = parseInt(parts[0], 10);
      const status = this.formatSnakeCase(parts[1]);
      return {
        level: isNaN(level) ? undefined : level,
        status,
        rawState: pumpState,
      };
    }

    return {
      status: this.formatSnakeCase(pumpState),
      rawState: pumpState,
    };
  }

  /**
   * Parse HEATERSTATE attribute
   * Similar to PUMPSTATE
   */
  static parseHeaterState(heaterState: string): PumpState {
    return this.parsePumpState(heaterState);
  }

  /**
   * Parse SOLARSTATE attribute
   * Similar to PUMPSTATE
   */
  static parseSolarState(solarState: string): PumpState {
    return this.parsePumpState(solarState);
  }

  /**
   * Parse DOS_*_STATE attribute (array of states)
   * Format: ["BLOCKED_BY_TRESHOLDS", "TRESHOLDS_REACHED"]
   */
  static parseDosingState(dosingState: string[] | string): DosingState {
    if (!dosingState) {
      return { states: [], isBlocked: false, hasWarnings: false };
    }

    // Convert to array if string
    const statesArray = Array.isArray(dosingState) ? dosingState : [dosingState];

    // Check for blocked/warning states
    const isBlocked = statesArray.some(
      (s) =>
        s.includes('BLOCKED') ||
        s.includes('THRESHOLD') ||
        s.includes('LIMIT') ||
        s.includes('REACHED')
    );

    const hasWarnings = statesArray.length > 0;

    return {
      states: statesArray.map((s) => this.formatSnakeCase(s)),
      isBlocked,
      hasWarnings,
    };
  }

  /**
   * Format SNAKE_CASE to readable text
   * Example: "PUMP_ANTI_FREEZE" -> "Pump Anti Freeze"
   */
  static formatSnakeCase(text: string): string {
    if (!text) return '';

    return text
      .split('_')
      .map((word) => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())
      .join(' ');
  }

  /**
   * Get entity state value
   */
  static getState(entity: EntityState): string {
    return entity?.state || 'unknown';
  }

  /**
   * Get entity attribute
   */
  static getAttribute(entity: EntityState, attribute: string): any {
    return entity?.attributes?.[attribute];
  }

  /**
   * Get friendly name
   */
  static getFriendlyName(entity: EntityState): string {
    return this.getAttribute(entity, 'friendly_name') || entity?.entity_id || '';
  }

  /**
   * Get current temperature (for climate entities)
   */
  static getCurrentTemperature(entity: EntityState): number | undefined {
    const temp = this.getAttribute(entity, 'current_temperature');
    return temp !== undefined ? Number(temp) : undefined;
  }

  /**
   * Get target temperature (for climate entities)
   */
  static getTargetTemperature(entity: EntityState): number | undefined {
    const temp = this.getAttribute(entity, 'temperature');
    return temp !== undefined ? Number(temp) : undefined;
  }

  /**
   * Get min temperature (for climate entities)
   */
  static getMinTemperature(entity: EntityState): number | undefined {
    const temp = this.getAttribute(entity, 'min_temp');
    return temp !== undefined ? Number(temp) : undefined;
  }

  /**
   * Get max temperature (for climate entities)
   */
  static getMaxTemperature(entity: EntityState): number | undefined {
    const temp = this.getAttribute(entity, 'max_temp');
    return temp !== undefined ? Number(temp) : undefined;
  }

  /**
   * Get HVAC mode (for climate entities)
   */
  static getHvacMode(entity: EntityState): string {
    return this.getAttribute(entity, 'hvac_mode') || 'off';
  }

  /**
   * Get HVAC action (for climate entities)
   */
  static getHvacAction(entity: EntityState): string {
    return this.getAttribute(entity, 'hvac_action') || 'idle';
  }

  /**
   * Check if entity is available
   */
  static isAvailable(entity: EntityState): boolean {
    return entity?.state !== 'unavailable' && entity?.state !== 'unknown';
  }

  /**
   * Check if entity is on
   */
  static isOn(entity: EntityState): boolean {
    const state = this.getState(entity);
    return state === 'on' || state === 'heat' || state === 'heating' || state === 'cool' || state === 'cooling';
  }

  /**
   * Check if entity is off
   */
  static isOff(entity: EntityState): boolean {
    return this.getState(entity) === 'off';
  }

  /**
   * Get pump speed level from PUMPSTATE
   */
  static getPumpSpeed(entity: EntityState): number | undefined {
    const pumpState = this.getAttribute(entity, 'PUMPSTATE');
    const parsed = this.parsePumpState(pumpState);
    return parsed.level;
  }

  /**
   * Get pump RPM values
   */
  static getPumpRPM(entity: EntityState, level: number): number | undefined {
    const rpmKey = `PUMP_RPM_${level}`;
    const rpm = this.getAttribute(entity, rpmKey);
    return rpm !== undefined ? Number(rpm) : undefined;
  }

  /**
   * Get all pump RPM values (0-3)
   */
  static getAllPumpRPMs(entity: EntityState): Record<number, number> {
    const rpms: Record<number, number> = {};
    for (let i = 0; i <= 3; i++) {
      const rpm = this.getPumpRPM(entity, i);
      if (rpm !== undefined) {
        rpms[i] = rpm;
      }
    }
    return rpms;
  }

  /**
   * Get dosing state for specific dosing entity
   */
  static getDosingStateAttribute(entity: EntityState): string[] {
    // Find DOS_*_STATE attribute
    const attributes = entity?.attributes || {};
    const stateKey = Object.keys(attributes).find(
      (key) => key.includes('DOS_') && key.includes('_STATE')
    );

    if (!stateKey) {
      return [];
    }

    const stateValue = attributes[stateKey];
    return Array.isArray(stateValue) ? stateValue : [];
  }

  /**
   * Get sensor value with unit
   */
  static getSensorValue(entity: EntityState): { value: number | null; unit: string } {
    const state = this.getState(entity);
    const value = !isNaN(Number(state)) ? Number(state) : null;
    const unit = this.getAttribute(entity, 'unit_of_measurement') || '';

    return { value, unit };
  }

  /**
   * Format temperature value
   */
  static formatTemperature(value: number | undefined, decimals = 1): string {
    if (value === undefined || value === null) return '--';
    return `${value.toFixed(decimals)}°C`;
  }

  /**
   * Format pH value
   */
  static formatPH(value: number | undefined, decimals = 2): string {
    if (value === undefined || value === null) return '--';
    return value.toFixed(decimals);
  }

  /**
   * Format ORP value
   */
  static formatORP(value: number | undefined): string {
    if (value === undefined || value === null) return '--';
    return `${Math.round(value)} mV`;
  }

  /**
   * Get icon for entity
   */
  static getIcon(entity: EntityState): string {
    return this.getAttribute(entity, 'icon') || this.getDefaultIcon(entity);
  }

  /**
   * Get default icon based on entity domain
   */
  static getDefaultIcon(entity: EntityState): string {
    const domain = entity.entity_id.split('.')[0];

    const iconMap: Record<string, string> = {
      switch: 'mdi:toggle-switch',
      climate: 'mdi:thermostat',
      sensor: 'mdi:chart-line',
      number: 'mdi:numeric',
      binary_sensor: 'mdi:radiobox-marked',
    };

    return iconMap[domain] || 'mdi:help-circle';
  }

  /**
   * Check if entity is a pump
   */
  static isPump(entity: EntityState): boolean {
    return entity.entity_id.includes('pump') || this.getAttribute(entity, 'PUMPSTATE') !== undefined;
  }

  /**
   * Check if entity is a climate device
   */
  static isClimate(entity: EntityState): boolean {
    return entity.entity_id.split('.')[0] === 'climate';
  }

  /**
   * Check if entity is a dosing system
   */
  static isDosing(entity: EntityState): boolean {
    return entity.entity_id.includes('dos_') || this.getDosingStateAttribute(entity).length > 0;
  }
}
