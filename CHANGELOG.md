# Changelog

All notable changes to this project will be documented in this file.

## [1.0.0] - 2026-01-04

### Added (Sessions 9-10 - 2026-01-04)
- **Overview Card:** Water chemistry dashboard with traffic light indicators
- **Overview Card:** Active devices list with color-coded states
- **Overview Card:** Warnings section with frost protection alerts
- **Overview Card:** "All systems normal" indicator
- **Compact Card:** Auto-detected icons based on entity type
- **Compact Card:** Current value display (temp, level, pH, ORP)
- **Compact Card:** Enhanced detail status parsing
- **Compact Card:** Color-coded active/inactive icons
- **Compact Card:** Hover effect for better UX
- Responsive design with mobile optimizations (@media queries)
- Complete theme support (dark/light mode)
- ~220 lines of new CSS for overview and compact cards
- Full documentation update (README, examples)
- Final bundle size: 84KB (under 100KB target)

### Added (Sessions 5-8 - 2026-01-04)
- **Pump Card:** Runtime counter with h/min formatting
- **Pump Card:** RPM display for current speed level
- **Pump Card:** Icon animation (rotating) when pump is running
- **Pump Card:** Level badge showing current speed
- **Heater Card:** Outside temperature indicator
- **Heater Card:** Blockage warning when outside temp too low
- **Heater Card:** Icon animation (pulsing) when heating
- **Solar Card:** Pool temperature display
- **Solar Card:** Absorber temperature display
- **Solar Card:** Temperature delta calculation
- **Solar Card:** Color-coded delta hints (too cold/heating possible/ideal)
- **Dosing Card:** Current value display (pH/ORP)
- **Dosing Card:** Target value display
- **Dosing Card:** Min/Max threshold display
- **Dosing Card:** Auto-detect dosing type from entity ID
- **Dosing Card:** Icon selection based on dosing type
- **Dosing Card:** Dosing history (24h volume)
- Enhanced CSS animations (rotate, pulse-glow)
- Card-specific styling for all card types
- ~230 lines of new CSS for visual enhancements

### Added (Session 4 - 2026-01-04)
- Quick Actions Component with button grid layout
- Pump Card: 5 quick actions (OFF, AUTO, ECO, Normal, Boost)
- Heater Card: 3 quick actions (OFF, AUTO, HEAT)
- Dosing Card: 4 quick actions (OFF, AUTO, Dose 30s, Dose 60s)
- Confirmation dialogs for manual dosing
- Loading states with spinner animation
- Ripple effect on button clicks
- Touch-optimized buttons (min 48px)

### Added (Session 3 - 2026-01-04)
- Slider Control Component with touch optimization
- Service Caller Utility for all HA service calls
- Entity Helper Utility for state parsing and formatting
- Pump Card: Speed slider (0-3 with labels)
- Heater Card: Temperature slider with value display
- Debounced value changes (300ms)
- Toast notification support
- Error handling for service calls

### Added (Session 2 - 2026-01-04)
- Status Badge Component with 11 states and animations
- Value Display Component with status indicators and ranges
- Detail Status Component with auto-parsing and formatting
- Warning Chips Component with dismissable warnings
- Component integration in Pump, Dosing, and Compact cards
- Comprehensive component documentation (COMPONENT_DEMO.md)

### Added (Session 1 - 2026-01-04)
- Initial release
- Basic card structure with all card types
- Pump card (placeholder with status badge)
- Heater card (placeholder)
- Solar card (placeholder)
- Dosing card (placeholder with warning chips)
- Overview card (placeholder)
- Compact card (basic implementation with status badge)
- HACS compatibility
- TypeScript + Lit Element setup
- Rollup build system
- Full documentation (README.md, ROADMAP.md, QUICK_START.md)
