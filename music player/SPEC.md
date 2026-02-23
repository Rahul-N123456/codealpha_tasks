# Music Player - Specification Document

## 1. Project Overview

**Project Name:** Sonic Wave Music Player  
**Project Type:** Single-page Web Application  
**Core Functionality:** A feature-rich music player with playlist management, audio controls, and visual feedback  
**Target Users:** Music enthusiasts who want a visually appealing, functional web-based music player

---

## 2. UI/UX Specification

### Layout Structure

**Main Container:**
- Centered card-style player (max-width: 420px)
- Fixed position on page with subtle shadow
- Border-radius: 24px for smooth, modern feel

**Sections (top to bottom):**
1. **Header** - App title and close/minimize buttons
2. **Album Art Area** - Large circular album artwork with spinning animation when playing
3. **Track Info** - Song title, artist name, album
4. **Progress Section** - Time display and progress bar
5. **Controls** - Main playback buttons
6. **Secondary Controls** - Volume, playlist, shuffle, repeat
7. **Playlist Panel** - Slide-in playlist from bottom

**Responsive Breakpoints:**
- Mobile: < 480px (full width with padding)
- Desktop: 420px fixed width

### Visual Design

**Color Palette:**
- Background (page): `#0a0a0f` (deep black)
- Player background: `#16161f` (dark charcoal)
- Primary accent: `#ff3366` (vibrant coral pink)
- Secondary accent: `#00d4aa` (teal green)
- Text primary: `#ffffff`
- Text secondary: `#8a8a9a`
- Progress bar background: `#2a2a3a`
- Progress bar fill: Linear gradient from `#ff3366` to `#ff6b35`

**Typography:**
- Font family: `'Outfit', sans-serif` (from Google Fonts)
- Song title: 24px, font-weight 600
- Artist name: 16px, font-weight 400, secondary color
- Time labels: 12px, monospace feel
- Buttons: 20px for main controls

**Spacing System:**
- Player padding: 32px
- Section gaps: 24px
- Control button gaps: 16px
- Inner element padding: 12px

**Visual Effects:**
- Album art: Circular with 8px border in accent color
- Playing state: Pulsing glow effect on album art
- Hover states: Scale 1.1 with 0.2s ease transition
- Active states: Scale 0.95
- Progress bar: Smooth gradient with rounded ends
- Volume slider: Vertical orientation
- Background: Subtle animated gradient orbs

### Components

**1. Album Art Display**
- Size: 240px × 240px
- Border: 4px solid accent color
- Border-radius: 50%
- Animation: Rotate 360deg when playing (20s linear infinite)
- Box shadow: Colored glow matching accent

**2. Track Information**
- Song title: Single line, ellipsis overflow
- Artist name: Single line, ellipsis overflow
- Text align: Center

**3. Progress Bar**
- Height: 6px
- Background: `#2a2a3a`
- Fill: Gradient from `#ff3366` to `#ff6b35`
- Thumb: 14px circle, appears on hover
- Clickable for seeking
- Time display: Current / Total format (0:00 / 0:00)

**4. Main Controls**
- Previous: `|◀` or skip-back icon
- Play/Pause: Large centered button (56px)
- Next: `▶|` or skip-forward icon
- Button style: Circular, outlined with accent color

**5. Secondary Controls**
- Volume: Speaker icon + horizontal slider (0-100%)
- Shuffle: Toggle button
- Repeat: Toggle button (off, all, one)
- Playlist: Toggle button to show/hide playlist

**6. Playlist Panel**
- Slide up from bottom (max-height: 300px)
- Scrollable list of tracks
- Each item: Track number, title, artist, duration
- Active track: Highlighted with accent color
- Click to play specific track

---

## 3. Functionality Specification

### Core Features

**Audio Playback:**
- Play/Pause toggle
- Next track (loops to first at end)
- Previous track (loops to last at beginning)
- Seek via progress bar click/drag

**Progress Tracking:**
- Real-time progress update (every 100ms)
- Display current time and total duration
- Clickable/draggable progress bar for seeking
- Format: MM:SS

**Volume Control:**
- Range: 0% to 100%
- Default: 70%
- Mute toggle (click speaker icon)
- Visual feedback on icon (different icons for levels)

**Playlist Management:**
- Display list of available tracks
- Show track number, title, artist, duration
- Highlight currently playing track
- Click track to play
- Auto-advance to next track

**Bonus Features:**
- Shuffle mode: Randomize play order
- Repeat modes: Off → All → One
- Autoplay: Automatically play next track when current ends

### User Interactions

1. **Click Play/Pause** → Toggle audio playback, update button icon, start/stop album rotation
2. **Click Next** → Load and play next track in playlist
3. **Click Previous** → Load and play previous track
4. **Click Progress Bar** → Seek to clicked position
5. **Drag Progress Thumb** → Seek while dragging
6. **Click Volume Icon** → Toggle mute
7. **Drag Volume Slider** → Adjust volume level
8. **Click Shuffle** → Toggle shuffle mode
9. **Click Repeat** → Cycle through repeat modes
10. **Click Playlist Button** → Toggle playlist visibility
11. **Click Playlist Track** → Play selected track
12. **Track Ends** → Auto-play next track (if autoplay enabled)

### Data Handling

**Track Data Structure:**
```
javascript
{
  title: "Song Title",
  artist: "Artist Name",
  duration: "3:45",
  src: "path/to/audio.mp3",
  cover: "path/to/cover.jpg"
}
```

**Sample Tracks (using free audio sources):**
- Use placeholder/sample audio files or royalty-free URLs

### Edge Cases
- Handle missing album art (show default image)
- Handle audio load errors gracefully
- Handle empty playlist
- Prevent multiple rapid clicks on controls
- Handle very long song titles (ellipsis)

---

## 4. Acceptance Criteria

### Visual Checkpoints
- [ ] Player is centered on page with dark theme
- [ ] Album art is circular and displays correctly
- [ ] Album art rotates when music is playing
- [ ] Progress bar shows gradient fill
- [ ] All buttons have hover/active states
- [ ] Playlist slides in/out smoothly
- [ ] Current track is highlighted in playlist
- [ ] Volume slider works correctly

### Functional Checkpoints
- [ ] Play/Pause toggles audio and UI state
- [ ] Next/Previous navigate through playlist
- [ ] Progress bar updates in real-time
- [ ] Clicking progress bar seeks to position
- [ ] Volume slider adjusts audio volume
- [ ] Mute button works
- [ ] Shuffle randomizes play order
- [ ] Repeat cycles through modes
- [ ] Playlist displays all tracks
- [ ] Clicking playlist track plays it
- [ ] Autoplay plays next track when current ends
- [ ] All text displays correctly

---

## 5. Technical Implementation

**Files:**
1. `index.html` - Main HTML structure
2. `style.css` - All styling
3. `script.js` - All JavaScript logic

**External Resources:**
- Google Fonts: Outfit
- Font Awesome (for icons)
- Sample audio files (royalty-free)

**Browser Support:**
- Modern browsers (Chrome, Firefox, Safari, Edge)
- ES6+ JavaScript
