// playerStatistics.js

const helperFunctions = require('./helperFunctions');

function getPlayerStatistics(gameData) {
    const players = {};

    gameData.forEach(game => {
        const gamePlayers = game.teams.flat(); // Flatten the teams array to get all players in the game
        gamePlayers.forEach(player => {
            const playerId = player.profile_id;
            if (!players[playerId]) {
                players[playerId] = {
                    id: playerId,
                    totalMatches: 0,
                    totalWon: 0,
                    winRate: 0,
                    highestMetValue: 0,
                    highestMetPercentage: 0,
                    averageMetValue: 0,
                    playersMet: {}
                };
            }
            players[playerId].totalMatches++;
            if (player.result === 'win') {
                players[playerId].totalWon++;
            }
            gamePlayers.forEach(enemy => {
                const enemyId = enemy.profile_id;
                if (enemyId !== playerId) {
                    players[playerId].playersMet[enemyId] = (players[playerId].playersMet[enemyId] || 0) + 1;
                    if (players[playerId].playersMet[enemyId] > players[playerId].highestMetValue) {
                        players[playerId].highestMetValue = players[playerId].playersMet[enemyId];
                    }
                }
            });
        });
    });

    // Calculate averageMetValue for each player
    Object.values(players).forEach(player => {
        const totalMetValue = Object.values(player.playersMet).reduce((acc, value) => acc + value, 0);
        player.averageMetValue = totalMetValue / Object.keys(player.playersMet).length;
    });

    return Object.values(players);
}


function fillPlayerStatistics(playerStatistics) {
    
    playerStatistics = assignPercentageToField(playerStatistics,'totalMatches','totalWon', 'winRate')
    playerStatistics = assignPercentageToField(playerStatistics,'totalMatches','highestMetValue', 'highestMetPercentage')
    playerStatistics = sortPlayerStatistics(playerStatistics);
    return playerStatistics;
}

function filterPlayerStatistics(playerStatistics, totalMatches, minimalMetPercentage) {
    playerStatistics = filterStats(playerStatistics, 'totalMatches', totalMatches)
    playerStatistics = filterStats(playerStatistics, 'highestMetPercentage', minimalMetPercentage)
    playerStatistics = truncatePlayersMet(playerStatistics, 2)
    return playerStatistics;
}


function sortPlayerStatistics(playerStatistics) {
    return playerStatistics.sort((a, b) => {
        // Sort by totalMatches in descending order
        if (b.highestMetPercentage !== a.highestMetPercentage) {
            return b.highestMetPercentage - a.highestMetPercentage;
        }
        // If totalMatches are the same, sort by highestMetValue in descending order

        return b.totalMatches - a.totalMatches;
    });
}
function filterStats(playerStatistics, byField, minimalValue) {
    return playerStatistics.filter(player => {
        return player[byField] >= minimalValue;
    });
}

function truncatePlayersMet(playerStatistics, minimalValue) {
    playerStatistics.forEach(player => {
        for (const enemyId in player.playersMet) {
            if (player.playersMet[enemyId] < minimalValue) {
                delete player.playersMet[enemyId];
            }
        }
    });
    return playerStatistics;
}



function assignPercentageToField(playerStatistics, totalField, fractionField, desiredFieldNameToFill) {
    playerStatistics.forEach(player => {
        // Calculate percentage
        const percentage = helperFunctions.calculatePercentage(player[totalField], player[fractionField]);
        // Assign percentage to desired field
        player[desiredFieldNameToFill] = percentage;
    });
    return playerStatistics;
}

module.exports = {
    getPlayerStatistics,
    filterPlayerStatistics,
    fillPlayerStatistics
};
