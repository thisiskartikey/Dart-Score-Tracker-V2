// Dart Score Tracker - Complete Game Logic

class DartGame {
    constructor() {
        this.gameType = 301;
        this.players = [];
        this.currentPlayerIndex = 0;
        this.currentTurn = [];
        this.dartsRemaining = 3;
        this.currentMode = 'single';
        this.gameActive = false;
        this.gameHistory = this.loadGameHistory();
        this.playerList = this.loadPlayerList();
        this.availablePersonas = this.getAvailablePersonas();

        this.initEventListeners();
        this.updatePlayerInputs();
    }

    // Initialization
    initEventListeners() {
        // Setup screen
        document.querySelectorAll('.game-type-btn').forEach(btn => {
            btn.addEventListener('click', (e) => this.selectGameType(e));
        });

        document.getElementById('num-players').addEventListener('change', () => {
            this.updatePlayerInputs();
        });

        document.getElementById('start-game-btn').addEventListener('click', () => {
            this.startGame();
        });

        document.getElementById('view-history-btn').addEventListener('click', () => {
            this.showHistory();
        });

        // Game screen
        document.querySelectorAll('.mode-btn').forEach(btn => {
            btn.addEventListener('click', (e) => this.selectMode(e));
        });

        document.querySelectorAll('.number-btn').forEach(btn => {
            btn.addEventListener('click', (e) => this.addDart(parseInt(e.target.dataset.value)));
        });

        document.querySelectorAll('.special-btn').forEach(btn => {
            btn.addEventListener('click', (e) => this.addSpecialDart(e));
        });

        document.getElementById('undo-btn').addEventListener('click', () => {
            this.undoLastDart();
        });

        document.getElementById('end-turn-btn').addEventListener('click', () => {
            this.endTurn();
        });

        document.getElementById('end-game-btn').addEventListener('click', () => {
            if (confirm('Are you sure you want to end this game?')) {
                this.returnToSetup();
            }
        });

        // History screen
        document.getElementById('back-to-setup-btn').addEventListener('click', () => {
            this.returnToSetup();
        });

        // Win modal
        document.getElementById('new-game-btn').addEventListener('click', () => {
            this.returnToSetup();
        });

        document.getElementById('view-stats-btn').addEventListener('click', () => {
            this.closeModal();
            this.showHistory();
        });
    }

    // Game Type Selection
    selectGameType(e) {
        document.querySelectorAll('.game-type-btn').forEach(btn => {
            btn.classList.remove('active');
        });
        e.target.classList.add('active');
        this.gameType = parseInt(e.target.dataset.type);
    }

    // Player Input Management
    updatePlayerInputs() {
        const numPlayers = parseInt(document.getElementById('num-players').value);
        const container = document.getElementById('player-inputs');
        container.innerHTML = '';

        for (let i = 0; i < numPlayers; i++) {
            const group = document.createElement('div');
            group.className = 'player-input-group';

            const label = document.createElement('label');
            label.textContent = `Player ${i + 1}`;

            const input = document.createElement('input');
            input.type = 'text';
            input.placeholder = `Enter name for Player ${i + 1}`;
            input.dataset.playerIndex = i;

            // Add datalist for autocomplete
            if (this.playerList.length > 0) {
                const datalistId = `player-list-${i}`;
                input.setAttribute('list', datalistId);

                const datalist = document.createElement('datalist');
                datalist.id = datalistId;

                this.playerList.forEach(name => {
                    const option = document.createElement('option');
                    option.value = name;
                    datalist.appendChild(option);
                });

                group.appendChild(datalist);
            }

            group.appendChild(label);
            group.appendChild(input);
            container.appendChild(group);
        }
    }

    // Start Game
    startGame() {
        const inputs = document.querySelectorAll('.player-input-group input');
        const playerNames = [];

        inputs.forEach(input => {
            const name = input.value.trim();
            if (name) {
                playerNames.push(name);
            }
        });

        if (playerNames.length !== inputs.length) {
            this.showToast('Please enter names for all players');
            return;
        }

        // Check for duplicate names
        const uniqueNames = new Set(playerNames);
        if (uniqueNames.size !== playerNames.length) {
            this.showToast('Player names must be unique');
            return;
        }

        // Initialize players
        this.players = playerNames.map(name => ({
            name,
            score: this.gameType,
            dartsThrown: 0,
            turnHistory: [],
            winRate: this.getPlayerWinRate(name)
        }));

        // Update player list
        playerNames.forEach(name => {
            if (!this.playerList.includes(name)) {
                this.playerList.push(name);
            }
        });
        this.savePlayerList();

        this.currentPlayerIndex = 0;
        this.currentTurn = [];
        this.dartsRemaining = 3;
        this.gameActive = true;

        this.showScreen('game-screen');
        this.updateGameUI();
    }

    // Dart Input
    addDart(value) {
        if (!this.gameActive || this.dartsRemaining === 0) return;

        let score = 0;
        let dartType = '';

        switch (this.currentMode) {
            case 'single':
                score = value;
                dartType = 'Single';
                break;
            case 'double':
                score = value * 2;
                dartType = 'Double';
                break;
            case 'triple':
                score = value * 3;
                dartType = 'Triple';
                break;
        }

        this.processDart(score, dartType, value);
    }

    addSpecialDart(e) {
        if (!this.gameActive || this.dartsRemaining === 0) return;

        const value = parseInt(e.target.dataset.value);
        let dartType = '';

        if (value === 25) {
            dartType = 'Bull';
        } else if (value === 50) {
            dartType = 'Double Bull';
        } else if (value === 0) {
            dartType = 'Miss';
        }

        this.processDart(value, dartType, value);
    }

    processDart(score, dartType, baseValue) {
        const player = this.players[this.currentPlayerIndex];
        const newScore = player.score - score;
        let busted = false;

        // Bust detection
        if (newScore < 0 || newScore === 1) {
            busted = true;
            this.showToast('Bust! Turn ended.');
        }

        // Check for win
        if (newScore === 0) {
            // Must finish on double
            const isDouble = dartType.includes('Double');
            if (isDouble) {
                this.currentTurn.push({ score, dartType, baseValue, busted: false });
                player.score = 0;
                player.dartsThrown += 1;
                this.winGame();
                return;
            } else {
                busted = true;
                this.showToast('Must finish on a double!');
            }
        }

        // Add dart to turn
        this.currentTurn.push({ score, dartType, baseValue, busted });

        if (!busted) {
            player.score = newScore;
            player.dartsThrown += 1;
            this.dartsRemaining--;

            // Show witty comment
            this.showWittyComment(score, player.score);
        } else {
            // Bust ends turn immediately
            this.dartsRemaining = 0;
        }

        // Reset mode to single
        this.currentMode = 'single';
        document.querySelectorAll('.mode-btn').forEach(btn => {
            btn.classList.remove('active');
        });
        document.querySelector('.mode-btn[data-mode="single"]').classList.add('active');

        // Auto-end turn if no darts remaining
        if (this.dartsRemaining === 0) {
            setTimeout(() => this.endTurn(), 1000);
        }

        this.updateGameUI();
    }

    undoLastDart() {
        if (this.currentTurn.length === 0) return;

        const lastDart = this.currentTurn.pop();
        const player = this.players[this.currentPlayerIndex];

        if (!lastDart.busted) {
            player.score += lastDart.score;
            player.dartsThrown--;
            this.dartsRemaining++;
        } else {
            // If last dart was a bust, restore darts remaining
            this.dartsRemaining = 3 - this.currentTurn.length;
        }

        this.updateGameUI();
        this.showToast('Last dart undone');
    }

    endTurn() {
        const player = this.players[this.currentPlayerIndex];

        // Save turn to history
        if (this.currentTurn.length > 0) {
            const turnScore = this.currentTurn
                .filter(d => !d.busted)
                .reduce((sum, d) => sum + d.score, 0);

            player.turnHistory.push({
                darts: [...this.currentTurn],
                score: turnScore
            });
        }

        // Move to next player
        this.currentPlayerIndex = (this.currentPlayerIndex + 1) % this.players.length;
        this.currentTurn = [];
        this.dartsRemaining = 3;

        this.updateGameUI();
    }

    selectMode(e) {
        document.querySelectorAll('.mode-btn').forEach(btn => {
            btn.classList.remove('active');
        });
        e.target.classList.add('active');
        this.currentMode = e.target.dataset.mode;
    }

    // Win Game
    winGame() {
        this.gameActive = false;
        const winner = this.players[this.currentPlayerIndex];

        // Save game to history
        this.saveGameToHistory(winner);

        // Show win modal
        const modal = document.getElementById('win-modal');
        const details = document.getElementById('win-details');

        details.innerHTML = `
            <div class="win-player">${winner.name} Wins!</div>
            <div class="win-stats">
                <div>Final Score: 0</div>
                <div>Darts Thrown: ${winner.dartsThrown}</div>
                <div>Game Type: ${this.gameType}</div>
            </div>
        `;

        modal.classList.add('active');
        this.showToast(`🎉 ${winner.name} wins!`);
    }

    closeModal() {
        document.getElementById('win-modal').classList.remove('active');
    }

    // UI Updates
    updateGameUI() {
        this.updateGameHeader();
        this.updatePlayerCards();
        this.updateTurnHistory();
        this.updateDartsRemaining();
    }

    updateGameHeader() {
        document.getElementById('game-type-display').textContent = this.gameType;
    }

    updatePlayerCards() {
        const container = document.getElementById('player-cards');
        container.innerHTML = '';

        this.players.forEach((player, index) => {
            const card = document.createElement('div');
            card.className = `player-card ${index === this.currentPlayerIndex ? 'active' : ''}`;

            const winProb = this.calculateWinProbability(player, index);
            const progress = ((this.gameType - player.score) / this.gameType) * 100;

            card.innerHTML = `
                <div class="player-card-header">
                    <span class="player-name">${player.name}</span>
                    <span class="win-probability">${winProb}% Win</span>
                </div>
                <div class="player-score ${index === this.currentPlayerIndex ? 'score-bounce' : ''}">${player.score}</div>
                <div class="progress-container">
                    <div class="progress-bar">
                        <div class="progress-fill" style="width: ${progress}%"></div>
                    </div>
                    <div class="progress-text">${progress.toFixed(1)}% complete</div>
                </div>
                <div class="player-stats">
                    <span>Darts: ${player.dartsThrown}</span>
                    <span>Win Rate: ${player.winRate}%</span>
                </div>
                ${player.score <= 170 ? this.getFinishingOptions(player.score) : ''}
            `;

            container.appendChild(card);
        });
    }

    updateTurnHistory() {
        const dartsContainer = document.getElementById('turn-darts');
        const totalContainer = document.getElementById('turn-total');

        if (this.currentTurn.length === 0) {
            dartsContainer.innerHTML = '<span style="color: var(--text-secondary); font-size: 0.75rem;">No darts thrown yet</span>';
            totalContainer.textContent = 'Total: 0';
            return;
        }

        dartsContainer.innerHTML = '';
        let total = 0;

        this.currentTurn.forEach(dart => {
            const entry = document.createElement('span');
            entry.className = `dart-entry ${dart.busted ? 'busted' : ''}`;
            entry.textContent = `${dart.dartType} ${dart.baseValue} (${dart.score})`;
            dartsContainer.appendChild(entry);

            if (!dart.busted) {
                total += dart.score;
            }
        });

        totalContainer.textContent = `Total: ${total}`;
    }

    updateDartsRemaining() {
        document.getElementById('darts-count').textContent = this.dartsRemaining;
    }

    // Win Probability Calculation
    calculateWinProbability(player, index) {
        // Factor 1: Historical win rate (40% weight)
        const historicalWeight = player.winRate * 0.4;

        // Factor 2: Current position among players (30% weight)
        const scores = this.players.map(p => p.score);
        const minScore = Math.min(...scores);
        const scoreDiff = player.score - minScore;
        const positionScore = scoreDiff > 0 ? (1 - (scoreDiff / this.gameType)) * 100 : 100;
        const positionWeight = positionScore * 0.3;

        // Factor 3: Current performance vs. historical average (30% weight)
        const pointsScored = this.gameType - player.score;
        let performanceWeight = 50 * 0.3; // Default 50% performance score if no darts thrown
        
        if (pointsScored > 0 && player.dartsThrown > 0) {
            const avgDartsPerPoint = player.dartsThrown / pointsScored;
            const performanceScore = Math.max(0, Math.min(100, 100 - (avgDartsPerPoint * 20)));
            performanceWeight = performanceScore * 0.3;
        }

        const totalProbability = historicalWeight + positionWeight + performanceWeight;
        return Math.round(Math.max(1, Math.min(99, totalProbability)));
    }

    // Finishing Options - Calculate ALL valid finishing combinations
    getFinishingOptions(score) {
        if (score <= 1) {
            return `<div class="finishing-options">Invalid score - cannot finish</div>`;
        }

        const combinations = this.calculateAllFinishes(score);
        
        if (combinations.length === 0) {
            if (score % 2 === 1) {
                // Odd score - need to make it even first
                return `<div class="finishing-options">Score is odd - need to reduce by 1 first, then finish on D${Math.floor((score - 1) / 2)}</div>`;
            }
            return `<div class="finishing-options">No valid finishes available - need to reduce score first</div>`;
        }

        // Format and display all combinations (show up to 6 options)
        const displayCombos = combinations.slice(0, 6);
        const optionsHtml = displayCombos.map(combo => {
            const darts = combo.darts.join(' → ');
            return darts;
        }).join(' | ');

        const moreText = combinations.length > 6 ? ` (+${combinations.length - 6} more)` : '';
        
        return `<div class="finishing-options">Finish: ${optionsHtml}${moreText}</div>`;
    }

    // Calculate all valid finishing combinations
    calculateAllFinishes(score) {
        const combinations = [];
        
        // Available dart values: singles (1-20), doubles (2-40), triples (3-60), bulls (25, 50)
        const dartValues = [];
        
        // Singles 1-20
        for (let i = 1; i <= 20; i++) {
            dartValues.push({ type: 'S', value: i, score: i, display: `S${i}` });
        }
        
        // Doubles 1-20
        for (let i = 1; i <= 20; i++) {
            dartValues.push({ type: 'D', value: i, score: i * 2, display: `D${i}` });
        }
        
        // Triples 1-20
        for (let i = 1; i <= 20; i++) {
            dartValues.push({ type: 'T', value: i, score: i * 3, display: `T${i}` });
        }
        
        // Bulls
        dartValues.push({ type: 'B', value: 25, score: 25, display: 'Bull' });
        dartValues.push({ type: 'DB', value: 50, score: 50, display: 'Double Bull' });

        // Try 1-dart finishes (must be a double that equals the score)
        for (const dart of dartValues) {
            if (dart.score === score && (dart.type === 'D' || dart.type === 'DB')) {
                combinations.push({
                    darts: [dart.display],
                    dartCount: 1
                });
            }
        }

        // Try 2-dart finishes (first dart can be anything, second must be double that finishes)
        for (const dart1 of dartValues) {
            const remaining = score - dart1.score;
            if (remaining === 50) {
                // Can finish with Double Bull
                combinations.push({
                    darts: [dart1.display, 'Double Bull'],
                    dartCount: 2
                });
            } else if (remaining > 0 && remaining <= 40 && remaining % 2 === 0) {
                // Remaining is a valid double (2-40)
                const doubleValue = remaining / 2;
                if (doubleValue >= 1 && doubleValue <= 20) {
                    combinations.push({
                        darts: [dart1.display, `D${doubleValue}`],
                        dartCount: 2
                    });
                }
            }
        }

        // Try 3-dart finishes
        for (const dart1 of dartValues) {
            for (const dart2 of dartValues) {
                const remaining = score - dart1.score - dart2.score;
                if (remaining === 50) {
                    // Can finish with Double Bull
                    combinations.push({
                        darts: [dart1.display, dart2.display, 'Double Bull'],
                        dartCount: 3
                    });
                } else if (remaining > 0 && remaining <= 40 && remaining % 2 === 0) {
                    // Last dart must be a double that equals remaining
                    const doubleValue = remaining / 2;
                    if (doubleValue >= 1 && doubleValue <= 20) {
                        combinations.push({
                            darts: [dart1.display, dart2.display, `D${doubleValue}`],
                            dartCount: 3
                        });
                    }
                }
            }
        }

        // Remove duplicates (preserve order - dart order matters!)
        const uniqueCombos = [];
        const seen = new Set();
        
        for (const combo of combinations) {
            // Use the exact order of darts as key (order matters - must finish on double)
            const key = combo.darts.join('|');
            if (!seen.has(key)) {
                seen.add(key);
                uniqueCombos.push(combo);
            }
        }

        // Sort by dart count, then by preference (triples first, then doubles, then singles)
        uniqueCombos.sort((a, b) => {
            if (a.dartCount !== b.dartCount) {
                return a.dartCount - b.dartCount;
            }
            // Prefer combinations with triples/higher scores
            const aScore = a.darts.reduce((sum, d) => {
                if (d.startsWith('T')) return sum + 60;
                if (d.startsWith('D')) return sum + 40;
                return sum + 20;
            }, 0);
            const bScore = b.darts.reduce((sum, d) => {
                if (d.startsWith('T')) return sum + 60;
                if (d.startsWith('D')) return sum + 40;
                return sum + 20;
            }, 0);
            return bScore - aScore;
        });

        return uniqueCombos;
    }

    // Persona Management - Get available personas for shuffling
    getAvailablePersonas() {
        if (typeof PERSONAS === 'undefined') {
            return ['default'];
        }
        
        // Exclude trashTalker (it's opponent-aware and not suitable for general use)
        const personas = Object.keys(PERSONAS);
        return personas.filter(key => key !== 'trashTalker');
    }

    // Get random persona
    getRandomPersona() {
        const available = this.availablePersonas;
        if (available.length === 0) return 'default';
        return available[Math.floor(Math.random() * available.length)];
    }

    // Get persona image URL
    getPersonaImage(personaKey) {
        const avatars = {
            // Character-specific personas
            jesse: { bg: '#1e293b', fg: '#f8fafc', label: 'JESSE', sub: 'HYPE' },
            sheldon: { bg: '#0f766e', fg: '#ecfeff', label: 'SHELDON', sub: 'SCI' },
            pirate: { bg: '#7c2d12', fg: '#fff7ed', label: 'PIRATE', sub: 'CREW' },
            shakespeare: { bg: '#4c1d95', fg: '#f5f3ff', label: 'BARD', sub: 'VERSE' },
            // Style / role avatars
            coach: { bg: '#14532d', fg: '#f0fdf4', label: 'COACH', sub: 'DRIVE' },
            stoic: { bg: '#111827', fg: '#f9fafb', label: 'STOIC', sub: 'CALM' },
            announcer: { bg: '#9a3412', fg: '#fff7ed', label: 'ANN', sub: 'CAST' },
            britishPub: { bg: '#7f1d1d', fg: '#fff1f2', label: 'PUB', sub: 'CHEER' },
            anime: { bg: '#1d4ed8', fg: '#eff6ff', label: 'ANIME', sub: 'SPARK' },
            dataAnalyst: { bg: '#1f2937', fg: '#e5e7eb', label: 'DATA', sub: 'METRIC' },
            trashTalker: { bg: '#991b1b', fg: '#fee2e2', label: 'TRASH', sub: 'TALK' },
            default: { bg: '#0f172a', fg: '#e2e8f0', label: 'DART', sub: 'VIBE' }
        };

        const entry = avatars[personaKey] || avatars.default;
        if (!entry.dataUri) {
            entry.dataUri = this.buildPersonaAvatar(entry);
        }
        return entry.dataUri;
    }

    buildPersonaAvatar({ bg, fg, label, sub }) {
        const svg = `
            <svg xmlns="http://www.w3.org/2000/svg" width="96" height="96" viewBox="0 0 96 96">
                <defs>
                    <linearGradient id="g" x1="0" y1="0" x2="1" y2="1">
                        <stop offset="0" stop-color="${bg}"/>
                        <stop offset="1" stop-color="#020617"/>
                    </linearGradient>
                </defs>
                <rect width="96" height="96" rx="18" fill="url(#g)"/>
                <circle cx="70" cy="26" r="12" fill="${fg}" opacity="0.12"/>
                <circle cx="22" cy="72" r="10" fill="${fg}" opacity="0.12"/>
                <text x="50%" y="52%" text-anchor="middle" dominant-baseline="middle"
                    font-family="Arial, sans-serif" font-size="18" fill="${fg}" font-weight="700"
                    letter-spacing="1">${label}</text>
                <text x="50%" y="70%" text-anchor="middle" dominant-baseline="middle"
                    font-family="Arial, sans-serif" font-size="10" fill="${fg}" opacity="0.85"
                    letter-spacing="1">${sub}</text>
            </svg>
        `.trim();

        return `data:image/svg+xml;utf8,${encodeURIComponent(svg)}`;
    }

    // Witty Comments - Uses random persona with getComment function
    showWittyComment(score, remainingScore) {
        if (typeof getComment === 'undefined') {
            // Fallback if personas.js not loaded
            this.showToast('Great shot!', 'default');
            return;
        }

        // Get random persona
        const personaKey = this.getRandomPersona();
        
        // Determine category
        let category;
        if (score === 0) {
            category = 'miss';
        } else if (score >= 60) {
            category = 'high';
        } else if (score >= 40 && score <= 59) {
            category = 'triple';
        } else if (remainingScore <= 50) {
            category = 'closeToWin';
        } else if (remainingScore <= 170) {
            category = 'gettingClose';
        } else {
            category = 'low';
        }

        // Get comment using getComment function from personas.js
        const comment = getComment({
            personaKey: personaKey,
            category: category,
            context: { scoreDelta: score },
            settings: {}
        });

        // Show toast with persona
        this.showToast(comment, personaKey);
    }

    // Toast Notifications with Persona Image and Speech Bubble
    showToast(message, personaKey = 'default') {
        const container = document.getElementById('toast-container');
        const toast = document.createElement('div');
        toast.className = 'toast';
        
        const personaImage = this.getPersonaImage(personaKey);
        const personaName = typeof PERSONAS !== 'undefined' && PERSONAS[personaKey] ? PERSONAS[personaKey].name : 'Comment';
        const fallbackImage = this.getPersonaImage('default');
        
        toast.innerHTML = `
            <div class="toast-content">
                <div class="toast-avatar">
                    <img src="${personaImage}" alt="${personaName}" class="toast-avatar-img" onerror="this.src='${fallbackImage}'">
                </div>
                <div class="toast-speech-bubble">
                    <div class="toast-message">${message}</div>
                </div>
            </div>
        `;

        container.appendChild(toast);

        setTimeout(() => {
            toast.classList.add('removing');
            setTimeout(() => {
                if (container.contains(toast)) {
                    container.removeChild(toast);
                }
            }, 300);
        }, 4000);
    }

    // Screen Management
    showScreen(screenId) {
        document.querySelectorAll('.screen').forEach(screen => {
            screen.classList.remove('active');
        });
        document.getElementById(screenId).classList.add('active');
    }

    returnToSetup() {
        this.closeModal();
        this.gameActive = false;
        this.showScreen('setup-screen');
    }

    // History Management
    showHistory() {
        this.showScreen('history-screen');
        this.updatePlayerStats();
        this.updateGameHistoryDisplay();
    }

    updatePlayerStats() {
        const container = document.getElementById('player-stats');
        const stats = this.calculatePlayerStats();

        if (stats.length === 0) {
            container.innerHTML = '<div class="empty-state">No player statistics yet. Play some games to see stats!</div>';
            return;
        }

        // Sort by wins
        stats.sort((a, b) => b.wins - a.wins);

        container.innerHTML = '';
        stats.forEach(stat => {
            const card = document.createElement('div');
            card.className = 'stat-card';
            card.innerHTML = `
                <div class="stat-name">${stat.name}</div>
                <div class="stat-values">
                    <div class="stat-value">
                        <div class="stat-value-number">${stat.wins}</div>
                        <div class="stat-value-label">Wins</div>
                    </div>
                    <div class="stat-value">
                        <div class="stat-value-number">${stat.games}</div>
                        <div class="stat-value-label">Games</div>
                    </div>
                    <div class="stat-value">
                        <div class="stat-value-number">${stat.winRate}%</div>
                        <div class="stat-value-label">Win Rate</div>
                    </div>
                    <div class="stat-value">
                        <div class="stat-value-number">${stat.avgDarts}</div>
                        <div class="stat-value-label">Avg Darts</div>
                    </div>
                </div>
            `;
            container.appendChild(card);
        });
    }

    updateGameHistoryDisplay() {
        const container = document.getElementById('game-history');

        if (this.gameHistory.length === 0) {
            container.innerHTML = '<div class="empty-state">No game history yet. Start playing to build your history!</div>';
            return;
        }

        container.innerHTML = '';
        // Show most recent first
        [...this.gameHistory].reverse().forEach(game => {
            const card = document.createElement('div');
            card.className = 'history-card';

            const date = new Date(game.date).toLocaleDateString();
            const playerList = game.players.map(p => `${p.name} (${p.score})`).join(', ');

            card.innerHTML = `
                <div class="history-header-row">
                    <span class="history-date">${date}</span>
                    <span class="history-game-type">${game.gameType}</span>
                </div>
                <div class="history-winner">Winner: ${game.winner} - ${game.winnerDarts} darts</div>
                <div class="history-players">Players: ${playerList}</div>
            `;
            container.appendChild(card);
        });
    }

    calculatePlayerStats() {
        const stats = {};

        this.gameHistory.forEach(game => {
            game.players.forEach(player => {
                if (!stats[player.name]) {
                    stats[player.name] = {
                        name: player.name,
                        wins: 0,
                        games: 0,
                        totalDarts: 0
                    };
                }

                stats[player.name].games++;
                stats[player.name].totalDarts += player.darts;

                if (player.name === game.winner) {
                    stats[player.name].wins++;
                }
            });
        });

        return Object.values(stats).map(stat => ({
            ...stat,
            winRate: stat.games > 0 ? Math.round((stat.wins / stat.games) * 100) : 0,
            avgDarts: stat.games > 0 ? Math.round(stat.totalDarts / stat.games) : 0
        }));
    }

    getPlayerWinRate(playerName) {
        const stats = this.calculatePlayerStats();
        const playerStat = stats.find(s => s.name === playerName);
        return playerStat ? playerStat.winRate : 50; // Default to 50% for new players
    }

    // LocalStorage Management
    saveGameToHistory(winner) {
        const game = {
            date: new Date().toISOString(),
            gameType: this.gameType,
            numPlayers: this.players.length,
            winner: winner.name,
            winnerScore: 0,
            winnerDarts: winner.dartsThrown,
            players: this.players.map(p => ({
                name: p.name,
                score: p.score,
                darts: p.dartsThrown
            }))
        };

        this.gameHistory.push(game);
        this.saveGameHistory();
    }

    loadGameHistory() {
        const data = localStorage.getItem('dartGameHistory');
        return data ? JSON.parse(data) : [];
    }

    saveGameHistory() {
        localStorage.setItem('dartGameHistory', JSON.stringify(this.gameHistory));
    }

    loadPlayerList() {
        const data = localStorage.getItem('dartPlayerList');
        return data ? JSON.parse(data) : [];
    }

    savePlayerList() {
        localStorage.setItem('dartPlayerList', JSON.stringify(this.playerList));
    }
}

// Initialize the game when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    new DartGame();
});
