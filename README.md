# 🎯 Dart Score Tracker

A professional, mobile-optimized dart scoring web application designed for tracking 301 and 501 dart games. Built with pure HTML, CSS, and JavaScript - no frameworks required.

## ✨ Features

### Game Management
- **Multiple Game Types**: Support for classic 301 and 501 dart games
- **Multi-Player Support**: Play with 2-5 players in a single game
- **Smart Player History**: Auto-saves player names for quick selection in future games
- **Real-Time Scoring**: Instant score updates with animated feedback

### Simplified Input System
- **One-Click Entry**: Click a number for single, select mode first for double/triple
- **Auto-Reset Modes**: Automatically returns to single mode after each dart to prevent accidental inputs
- **Special Buttons**: Dedicated buttons for Single Bull (25), Double Bull (50), and Miss
- **Undo Function**: Easily correct mistakes with the undo button
- **Auto-Advance**: Turn automatically ends after 3 darts (with manual override)

### Game Logic
- **Bust Detection**: Prevents invalid scores (below 0 or ending at 1)
- **Winning Validation**: Must finish exactly on double or double bull
- **Turn Management**: Automatic player rotation
- **Complete Turn History**: Visual display of all darts thrown in current turn

### Visual Feedback
- **Animated Progress Bars**: Each player has a shimmer-animated progress bar
- **Score Animations**: Bounce effect when scores update
- **Active Player Highlighting**: Blue glow effect on current player
- **Win Probability**: Real-time calculation based on:
  - Historical win rate (40% weight)
  - Current position among players (30% weight)
  - Current game performance (30% weight)
- **Finishing Options**: Shows possible checkout combinations when score ≤170

### Toast Notifications
- **Witty Comments**: Context-aware messages appear after each dart
- **Smart Categories**:
  - High scores (60+): Enthusiastic encouragement
  - Triples (40-59): Positive reinforcement
  - Close to win (≤50): Victory motivation
  - Getting close (≤170): Strategic encouragement
  - Low scores: Supportive messages
  - Misses: Motivational recovery
- **Non-Intrusive**: Auto-dismiss after 3 seconds with smooth animations

### Statistics & History
- **Player Statistics**: Track wins, games played, win rate, and average darts
- **Complete Game History**: View all past games with dates, players, and scores
- **Sortable Stats**: Player stats sorted by number of wins
- **Persistent Storage**: All data saved in browser localStorage

## 🎨 Design

### Dark Theme
- Optimized for low-light environments (pubs, bars)
- Material Design color palette
- Glass morphism effects with frosted backgrounds
- Deep shadows for visual depth
- High contrast for readability

### Mobile-First
- Optimized for iPhone 17 Pro Max and similar devices
- Single-screen layout (no scrolling needed)
- Safe area support for notches and home indicators
- Touch-optimized with minimum 44px touch targets
- Dynamic viewport height (dvh) for iOS Safari
- Responsive grid layouts

## 🚀 Getting Started

### Option 1: Quick Start (No Installation)
1. Download all files to a folder
2. Open `index.html` in any modern web browser
3. Start playing!

### Option 2: Deploy to GitHub Pages (Recommended for Mobile)
Follow the detailed guide in [GITHUB_SETUP.md](GITHUB_SETUP.md) to deploy your app to GitHub Pages and access it from anywhere.

### Option 3: Add to iPhone Home Screen
1. Open the app in Safari on your iPhone
2. Tap the Share button (box with arrow pointing up)
3. Scroll down and tap "Add to Home Screen"
4. Tap "Add" in the top right
5. The app will now appear as an icon on your home screen

## 📖 How to Play

### Game Setup
1. **Select Game Type**: Choose between 301 or 501
2. **Choose Players**: Select 2-5 players from dropdown (2-5)
3. **Enter Names**: Type player names or select from previous players
4. **Start Game**: Click "Start Game" to begin

### During the Game
1. **Throwing Darts**:
   - Click a number for a single dart
   - Click Double/Triple first, then click the number
   - Use special buttons for Bull, Double Bull, or Miss
   - Mode automatically resets to Single after each dart

2. **Turn Management**:
   - Each player gets 3 darts per turn
   - Turn ends automatically after 3 darts
   - Use "End Turn" button to manually end early
   - Use "Undo" to correct the last dart

3. **Scoring**:
   - Score decreases with each successful dart
   - Bust: Going below 0 or landing on 1 ends your turn with no score change
   - Win: Reach exactly 0 by finishing on a double

4. **Visual Indicators**:
   - Active player has blue glow and enlarged card
   - Progress bar shows percentage to completion
   - Win probability updates in real-time
   - Finishing options appear when score ≤170

### Winning the Game
- Must reach exactly 0 points
- Must finish on a double (including double bull)
- Game automatically detects winner and shows statistics
- Winner is saved to game history

## 🎯 Game Rules

### Scoring
- **Single**: Face value (1-20)
- **Double**: 2 × face value
- **Triple**: 3 × face value
- **Single Bull**: 25 points
- **Double Bull**: 50 points (also counts as double for winning)
- **Miss**: 0 points

### Bust Rules
A throw is a "bust" and the turn ends if:
- The score would go below 0
- The score would end at exactly 1 (impossible to finish)
- You reach 0 without a double

When a bust occurs:
- The turn ends immediately
- The score remains unchanged from the start of the turn
- Play passes to the next player

### Winning
- Must reach exactly 0 points
- The final dart MUST be a double (or double bull)
- Game ends immediately when a player wins

## 🔧 Technical Details

### Technology Stack
- Pure HTML5 (semantic markup)
- CSS3 (Material Design, Flexbox, Grid, Animations)
- Vanilla JavaScript (ES6+ classes)
- No frameworks or libraries required
- No build process needed

### Browser Compatibility
- Chrome 90+
- Firefox 88+
- Safari 14+
- Edge 90+
- Mobile Safari (iOS 14+)
- Mobile Chrome (Android)

### Features
- **Progressive Web App**: Can be added to home screen
- **Offline Capable**: Works without internet after initial load
- **Local Storage**: All data persists in browser
- **Touch Optimized**: Designed for touch interfaces
- **Responsive**: Adapts to all screen sizes

### File Structure
```
dart-tracker/
├── index.html          # Main HTML structure
├── style.css           # All styles (Material Design dark theme)
├── app.js              # Complete game logic
├── README.md           # This file
└── GITHUB_SETUP.md     # Deployment guide
```

### Data Storage
All game data is stored in browser localStorage:
- **dartGameHistory**: Array of completed games
- **dartPlayerList**: Array of unique player names

Data persists between sessions and survives browser restarts.

## 📱 Mobile Optimization

### iPhone Specifics
- Optimized for iPhone 17 Pro Max (1320 × 2868 pixels)
- Safe area insets for Dynamic Island
- Status bar styling (black translucent)
- Browser UI compensation (60-70px bottom padding)
- Viewport fit: cover for edge-to-edge display

### Performance
- Single-screen layout minimizes scrolling
- CSS animations use hardware acceleration
- Smooth 60fps transitions
- Instant touch feedback
- Efficient DOM updates

### Touch Interactions
- Minimum 44px touch targets (Apple guidelines)
- No accidental zoom on double-tap
- Fast tap response times
- Smooth scrolling with momentum
- Visual feedback on all interactions

## 🎨 Customization

### Changing Colors
Edit CSS variables in `style.css`:
```css
:root {
    --primary-color: #42A5F5;    /* Main accent color */
    --success-color: #4CAF50;    /* Win/success color */
    --warning-color: #FF9800;    /* Bull buttons */
    --danger-color: #F44336;     /* Danger/bust color */
}
```

### Modifying Witty Comments
Edit the `showWittyComment` method in `app.js`:
```javascript
const comments = {
    high: ['Your message here', ...],
    triple: ['Your message here', ...],
    // ... more categories
};
```

### Adding Finishing Options
Edit the `getFinishingOptions` method in `app.js` to add more checkout combinations.

## 🐛 Troubleshooting

### Game Not Loading
- Ensure all files (index.html, style.css, app.js) are in the same folder
- Check browser console for errors (F12 or Cmd+Option+I)
- Try a different browser

### Styles Not Appearing
- Verify internet connection (needed for Google Fonts)
- Check that style.css path is correct in index.html
- Clear browser cache and reload

### Scores Not Saving
- Ensure browser allows localStorage
- Check if private/incognito mode is enabled (may block storage)
- Verify browser doesn't have storage restrictions

### Mobile Issues
- Use Safari on iOS for best experience
- Ensure latest browser version
- Check if JavaScript is enabled
- Try adding to home screen

## 🎯 Future Enhancements

Potential features for future versions:
- Cricket game mode
- Sound effects and haptic feedback
- More detailed statistics and charts
- Export game history
- Multiplayer sync across devices
- Tournament mode
- Custom game types
- Theme customization
- Multiple language support

## 📄 License

This project is open source and available for personal and commercial use. Feel free to modify and distribute as needed.

## 🙏 Credits

Developed with ❤️ for dart enthusiasts everywhere.

Fonts: Roboto by Google Fonts
Design: Material Design Guidelines
Icons: Unicode Emoji

## 📧 Support

For issues, questions, or suggestions:
1. Check this README first
2. Review GITHUB_SETUP.md for deployment help
3. Check browser console for error messages
4. Ensure all files are present and properly linked

## 🎮 Happy Darting!

Enjoy tracking your dart games with style. May your throws be straight and your doubles be true! 🎯
