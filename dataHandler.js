const fs = require('fs');
const path = require('path');

// Global variable to hold the number of printed files
let fileIndex = 1;

// Function to generate timestamp
function generateTimestamp() {
    const date = new Date();
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');
    const hours = String(date.getHours()).padStart(2, '0');
    const minutes = String(date.getMinutes()).padStart(2, '0');
    const seconds = String(date.getSeconds()).padStart(2, '0');
    return `${year}${month}${day}_${hours}${minutes}${seconds}`;
}

// Function to export data to JSON and save it to a file with timestamp
function exportDataToJSON(data, filePath, defaultFilePath = './exportedData/results.json') {
    // Use default file path if filePath is not provided
    if (!filePath) {
        filePath = defaultFilePath;
    }

    // Ensure the directory path exists
    const directoryPath = path.dirname(filePath);
    fs.mkdirSync(directoryPath, { recursive: true });

    // Generate timestamp
    const timestamp = generateTimestamp();

    // Append timestamp and file index to file name
    const extension = path.extname(filePath);
    const baseName = path.basename(filePath, extension);
    const timestampedFilePath = `${directoryPath}/${baseName}_${timestamp}_${fileIndex}${extension}`;
    
    // Increment file index for next use
    fileIndex++;

    // Convert data to JSON format
    const jsonData = JSON.stringify(data, null, 2);

    // Write JSON data to file
    fs.writeFileSync(timestampedFilePath, jsonData);

    console.log(`Data exported to ${timestampedFilePath}`);
}

// Function to parse JSON file
function parseJSON(filePath) {
    const jsonData = fs.readFileSync(filePath, 'utf8');
    return JSON.parse(jsonData);
}

module.exports = {
    parseJSON,
    exportDataToJSON
};
