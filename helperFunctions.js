// helperfunctions.js

// Function to calculate percentage
function calculatePercentage(total, fraction) {
    return parseFloat(((fraction / total) * 100).toFixed(36)); // Round to 0 decimal places and parse as integer
}


// Function to find top 3 items based on a specified field
function findTop(data, fieldToDecideTopFrom, numOfItems) {
    // Sort the data based on the specified field
    data.sort((a, b) => b[fieldToDecideTopFrom] - a[fieldToDecideTopFrom]);

    // Return the top 3 items
    data.slice(0,numOfItems);
    
    return data.slice(0,numOfItems);
}

function findTopPlayers(data, fieldToDecideTopFrom, numOfItems){
    data = findTop(data, fieldToDecideTopFrom, numOfItems);

    let returnData = [];
    data.forEach(element => {
        let player = {
            playerID : element.id,
            [fieldToDecideTopFrom] : element[fieldToDecideTopFrom]

        }
        returnData.push(player);
       
    });
    //console.log(data);
    return data;
}
function getAverageFieldValue(playerStatistics, field) {
    // Ensure there are players in the statistics
    if (playerStatistics.length === 0) {
        return 0;
    }

    // Calculate total field values
    const totalFieldValues = playerStatistics.reduce((acc, player) => acc + parseFloat(player[field]), 0); // Initialize accumulator with 0

    // Calculate average field value
    const averageFieldValue = totalFieldValues / playerStatistics.length;
    //console.log(`field ${field} `)
    //console.log(`totalFieldValues  ${totalFieldValues} `)
    //console.log(` playerStatistics.length ${playerStatistics.length}`)

    return parseFloat(averageFieldValue.toFixed(2)); // Round to 2 decimal places and return as a string
}

function totalNumberOfOccurrences(data, field, value, type) {
    type = type.toLowerCase();
    switch (type){
    case 'equals':
        return data.reduce((total, element) => total + (element[field] == value ? 1 : 0), 0);
    case 'smaller':
        return data.reduce((total, element) => total + (element[field] <= value ? 1 : 0), 0);
    case 'bigger':
        return data.reduce((total, element) => total + (element[field] >= value ? 1 : 0), 0);
    default:
            throw new Error('Invalid comparison operator');
    }
}
// Export functions for use in other modules
module.exports = {
    getAverageFieldValue,
    calculatePercentage,
    findTop,
    findTopPlayers,
    totalNumberOfOccurrences
};
