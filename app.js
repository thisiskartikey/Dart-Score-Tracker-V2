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
        const positionScore = (1 - ((player.score - minScore) / this.gameType)) * 100;
        const positionWeight = positionScore * 0.3;

        // Factor 3: Current performance vs. historical average (30% weight)
        const avgDartsPerPoint = player.dartsThrown / (this.gameType - player.score);
        const performanceScore = Math.max(0, Math.min(100, 100 - (avgDartsPerPoint * 20)));
        const performanceWeight = performanceScore * 0.3;

        const totalProbability = historicalWeight + positionWeight + performanceWeight;
        return Math.round(Math.max(1, Math.min(99, totalProbability)));
    }

    // Finishing Options
    getFinishingOptions(score) {
        const finishes = {
            170: ['T20', 'T20', 'Bull'],
            167: ['T20', 'T19', 'Bull'],
            164: ['T20', 'T18', 'Bull'],
            161: ['T20', 'T17', 'Bull'],
            160: ['T20', 'T20', 'D20'],
            157: ['T20', 'T19', 'D20'],
            156: ['T20', 'T20', 'D18'],
            154: ['T20', 'T18', 'D20'],
            153: ['T20', 'T19', 'D18'],
            152: ['T20', 'T20', 'D16'],
            151: ['T20', 'T17', 'D20'],
            150: ['T20', 'T18', 'D18'],
            149: ['T20', 'T19', 'D16'],
            148: ['T20', 'T16', 'D20'],
            147: ['T20', 'T17', 'D18'],
            146: ['T20', 'T18', 'D16'],
            145: ['T20', 'T15', 'D20'],
            144: ['T20', 'T20', 'D12'],
            143: ['T20', 'T17', 'D16'],
            142: ['T20', 'T14', 'D20'],
            141: ['T20', 'T19', 'D12'],
            140: ['T20', 'T20', 'D10'],
            139: ['T20', 'T13', 'D20'],
            138: ['T20', 'T18', 'D12'],
            137: ['T20', 'T19', 'D10'],
            136: ['T20', 'T20', 'D8'],
            135: ['T20', 'T17', 'D12'],
            134: ['T20', 'T14', 'D16'],
            133: ['T20', 'T19', 'D8'],
            132: ['T20', 'T16', 'D12'],
            131: ['T20', 'T13', 'D16'],
            130: ['T20', 'T20', 'D5'],
            129: ['T19', 'T16', 'D12'],
            128: ['T18', 'T14', 'D16'],
            127: ['T20', 'T17', 'D8'],
            126: ['T19', 'T19', 'D6'],
            125: ['T18', 'T13', 'D16'],
            124: ['T20', 'T14', 'D11'],
            123: ['T19', 'T16', 'D9'],
            122: ['T18', 'T20', 'D7'],
            121: ['T20', 'T11', 'D14'],
            120: ['T20', 'S20', 'D20'],
            110: ['T20', 'S18', 'D16'],
            100: ['T20', 'D20'],
            90: ['T18', 'D18'],
            80: ['T20', 'D10'],
            70: ['T10', 'D20'],
            60: ['S20', 'D20'],
            50: ['S10', 'D20'],
            40: ['D20'],
            32: ['D16']
        };

        // Find the best finish option
        let bestFinish = null;
        for (let targetScore = score; targetScore >= 2; targetScore--) {
            if (finishes[targetScore]) {
                bestFinish = finishes[targetScore];
                break;
            }
        }

        if (bestFinish) {
            return `<div class="finishing-options">Finish: ${bestFinish.join(' → ')}</div>`;
        }

        return '';
    }

    // Witty Comments
    showWittyComment(score, remainingScore) {
        const comments = {
            high: [
                '🎯 Bullseye! That\'s how you do it!',
                '🎯 On fire! Keep it going!',
                '🎯 Outstanding throw!',
                '🎯 Now that\'s precision!',
                '🎯 Crushing it!'
            ],
            triple: [
                '🎯 Nice triple! Getting closer!',
                '🎯 Triple trouble for the opponents!',
                '🎯 That\'s what we\'re talking about!',
                '🎯 Smooth sailing!',
                '🎯 You\'re in the zone!'
            ],
            closeToWin: [
                '🎯 Almost there! Finish strong!',
                '🎯 Victory is within reach!',
                '🎯 One good throw away!',
                '🎯 Can you taste the victory?',
                '🎯 Time to close this out!'
            ],
            gettingClose: [
                '🎯 Getting into finishing range!',
                '🎯 Setting up for the win!',
                '🎯 Position yourself for victory!',
                '🎯 Looking good!',
                '🎯 Steady progress!'
            ],
            low: [
                '🎯 Every point counts!',
                '🎯 Keep chipping away!',
                '🎯 One dart at a time!',
                '🎯 Steady as she goes!',
                '🎯 Building momentum!'
            ],
            miss: [
                '🎯 Shake it off! Next one!',
                '🎯 Nobody\'s perfect!',
                '🎯 Refocus and fire!',
                '🎯 Miss happens to the best!',
                '🎯 Reset and reload!'
            ]
        };

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

        const categoryComments = comments[category];
        const comment = categoryComments[Math.floor(Math.random() * categoryComments.length)];
        this.showToast(comment);
    }

    // Toast Notifications
    showToast(message) {
        const container = document.getElementById('toast-container');
        const toast = document.createElement('div');
        toast.className = 'toast';
        toast.textContent = message;

        container.appendChild(toast);

        setTimeout(() => {
            toast.classList.add('removing');
            setTimeout(() => {
                container.removeChild(toast);
            }, 300);
        }, 3000);
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
