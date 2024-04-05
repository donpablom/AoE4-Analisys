// main.js
const {parseJSON, exportDataToJSON} = require('./dataHandler');
const calculateMapStatistics = require('./mapStatistics');
const {getCivilizationData, calculatePickRate} = require('./civilizationData');
const helperFunctions = require('./helperFunctions');
const {getPlayerStatistics, filterPlayerStatistics, fillPlayerStatistics } = require('./playerStatistics');



// File path of your JSON data
const test_filePath = 'data/games_qm_ffa_2024_q1_pretty.json';
const filePath = 'data/games_qm_ffa_2024_q1.json';

// Parse the JSON data
const gameData = parseJSON(filePath);
// Calculate map statistics
const mapStatistics = calculateMapStatistics(gameData);
console.log('Map Statistics:');
console.log(mapStatistics);
const civPicks = getCivilizationData(gameData);
console.log('civs civPicks:');
console.log(civPicks);


const totalGames = gameData.length;
const pickRateData = calculatePickRate(civPicks, totalGames);
console.log('civs civPercentage:');
console.log(pickRateData);
// Get player statistics
let playerStatistics = getPlayerStatistics(gameData);
 playerStatistics = fillPlayerStatistics(playerStatistics);
 console.log(``);
 playerStatistics =  createGroupAndPrintGroupStatistics(playerStatistics, 1, 1);
// createGroupAndPrintGroupStatistics(playerStatistics, 7, 1);
let notSmallPlayerGroup = createGroupAndPrintGroupStatistics(playerStatistics, 5, 0);
   //notSmallPlayerGroup = createGroupAndPrintGroupStatistics(playerStatistics, 3, 70);
//let smallerPlayerGroup = createGroupAndPrintGroupStatistics(playerStatistics, 7, 14);
//let evenSmallerPlayerGroup = createGroupAndPrintGroupStatistics(playerStatistics, 14, 28 );
// evenSmallerPlayerGroup = createGroupAndPrintGroupStatistics(playerStatistics, 2, 80 );

 let top500MetPercentage = helperFunctions.findTopPlayers(notSmallPlayerGroup, 'highestMetPercentage', 500);
let top250MetPercentage = helperFunctions.findTopPlayers(notSmallPlayerGroup, 'winRate', 250);
console.log('Stats for top 500 met percentage at least 3 matches')
printGroupStatistics(top250MetPercentage);
const playerProfileURLs = top250MetPercentage.map(player => `https://aoe4world.com/players/${player.id}`);
exportDataToJSON(playerProfileURLs);
console.log(playerProfileURLs);
 console.log(``);

 //printTopStatistics(playerStatistics, 50);
exportDataToJSON(playerStatistics);

function createGroupAndPrintGroupStatistics(playerStatistics, totalMatches, minimalMetPercentage) {

    let playersGroup = filterPlayerStatistics(playerStatistics, totalMatches, minimalMetPercentage);
    console.log(`# ${playersGroup.length} players with at least ${totalMatches} matches and at least ${minimalMetPercentage} % of matches with same enemy`);
    printGroupStatistics(playersGroup);
    return playersGroup;
}

function printGroupStatistics(playerStatistics) {
    
    console.log(`   Average winRate : ${helperFunctions.getAverageFieldValue(playerStatistics,'winRate')}`);
    console.log(`   Average highestMetPercentage : ${helperFunctions.getAverageFieldValue(playerStatistics,'highestMetPercentage')}`);
    //console.log(`   Average averageMetValue : ${helperFunctions.getAverageFieldValue(playerStatistics,'averageMetValue')}`);
    
    console.log(`   Total number of players with at least 12.5 winRate = ${helperFunctions.totalNumberOfOccurrences(playerStatistics, 'winRate', 12.5, 'bigger')}`);
    console.log(`   Total number of players with at least 16.67 winRate = ${helperFunctions.totalNumberOfOccurrences(playerStatistics, 'winRate', 16.67, 'bigger')}`);
    console.log(`   Total number of players with at least 25 winRate = ${helperFunctions.totalNumberOfOccurrences(playerStatistics, 'winRate', 25, 'bigger')}`);
    console.log(`   Total number of players with at least 33.33 winRate = ${helperFunctions.totalNumberOfOccurrences(playerStatistics, 'winRate', 33.33, 'bigger')}`);

    console.log(`   Total number of players with at least 40% highestMetPercentage = ${helperFunctions.totalNumberOfOccurrences(playerStatistics, 'highestMetPercentage', 40, 'bigger')}`);
    console.log(`   Total number of players with at least 60% highestMetPercentage = ${helperFunctions.totalNumberOfOccurrences(playerStatistics, 'highestMetPercentage', 60, 'bigger')}`);
    console.log(`   Total number of players with at least 80% highestMetPercentage = ${helperFunctions.totalNumberOfOccurrences(playerStatistics, 'highestMetPercentage', 80, 'bigger')}`);

    console.log(``);
}

function printTopStatistics(playerStatistics, sizeForTop) {

    console.log(`Top ${sizeForTop} players for highestMetValue:`);
    console.log(helperFunctions.findTopPlayers(playerStatistics, 'highestMetValue', sizeForTop));
    console.log(`Top ${sizeForTop} players for highestMetPercentage:`);
    console.log(helperFunctions.findTopPlayers(playerStatistics, 'highestMetPercentage', sizeForTop));
    console.log(`Top ${sizeForTop} players for winRate:`);
    console.log(helperFunctions.findTopPlayers(playerStatistics, 'winRate', sizeForTop));
}

