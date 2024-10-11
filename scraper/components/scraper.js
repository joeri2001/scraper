const { checkRobotsTxt } = require('./robots');
const { saveToFile } = require('./fileHandler');
const axios = require('axios');
const cheerio = require('cheerio');

async function scrapePage(url) {
    try {
        // Kijk of je mag scrapen
        const isAllowed = await checkRobotsTxt(url);
        if (!isAllowed) {
            console.log(`Scraping is disallowed for ${url}`);
            return;
        }

        // Fetch en parse de HTML
        const response = await axios.get(url);
        const html = response.data;
        const $ = cheerio.load(html);
        const bodyText = $('p, h1, h2, h3, h4, h5, h6').map((i, el) => $(el).text().trim()).get().join('\n\n');

        const data = {
            url: url,
            content: bodyText,
            scrapedAt: new Date().toISOString()
        };

        // Schrijf de data naar een bestand
        saveToFile(data);
    } catch (error) {
        console.error('Error fetching the page:', error.message);
    }
}

// Functie export
module.exports = { scrapePage };
