const fs = require('fs');
const path = require('path');

function saveToFile(data) {
    // Folder om alle json bestanden in op te slaan
    const folderName = path.join(__dirname, '../scraped_data');

    // Kijk of deze folder bestaat zo nee maak 'm aan
    if (!fs.existsSync(folderName)) {
        fs.mkdirSync(folderName);
    }

    // Definieer de bestandsnaam en het path
    const fileName = path.join(folderName, `scraped_data_${Date.now()}.json`);

    // Schrijf de data in de file
    fs.writeFileSync(fileName, JSON.stringify(data, null, 2), 'utf-8');
    console.log(`Data successfully saved to ${fileName}`);
}

module.exports = { saveToFile };
