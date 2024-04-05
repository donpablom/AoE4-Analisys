// mapStatistics.js
function calculateMapStatistics(gameData) {
    const mapCounts = {};
    const totalGames = gameData.length;

    gameData.forEach(game => {
        const mapName = game.map;
        if (!mapCounts[mapName]) {
            mapCounts[mapName] = 1;
        } else {
            mapCounts[mapName]++;
        }
    });

    const mapStatistics = {};
    for (const mapName in mapCounts) {
        const count = mapCounts[mapName];
        const percentage = (count / totalGames) * 100;
        mapStatistics[mapName] = { count, percentage };
    }

    return mapStatistics;
}

module.exports = calculateMapStatistics;
