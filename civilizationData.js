// civilizationData.js

function getCivilizationData(gameData) {
    const civilizationCounts = {};

    gameData.forEach(game => {
        game.teams.flat().forEach(player => {
            const { civilization, civilization_randomized } = player;
            if (!civilization_randomized) {
                civilizationCounts[civilization] = (civilizationCounts[civilization] || 0) + 1;
            }else{
                civilizationCounts.random = (civilizationCounts.random || 0) + 1;
            }
        });
    });

    return civilizationCounts;
}

function calculatePickRate(civilizationData, totalGames) {
    const pickRateData = {};

    for (const civilization in civilizationData) {
        const count = civilizationData[civilization];
        const pickRate = (count / (totalGames*8)) * 100;
        pickRateData[civilization] = pickRate.toFixed(2) + '%';
    }

    return pickRateData;
}

module.exports = {
    getCivilizationData,
    calculatePickRate
};
