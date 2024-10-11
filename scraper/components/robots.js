const axios = require('axios');
const robotsParser = require('robots-parser');

async function checkRobotsTxt(url) {
    try {
        const robotsUrl = new URL('/robots.txt', url).href;
        const robotsResponse = await axios.get(robotsUrl);
        const robotsTxt = robotsResponse.data;
        const robots = robotsParser(robotsUrl, robotsTxt);
        return robots.isAllowed(url, 'MyScraperBot');
    } catch (error) {
        if (error.response && error.response.status === 404) {
            console.log('No robots.txt found');
            return true; // Toestaan
        } else {
            console.error('Error fetching robots.txt:', error.message);
            return false; // Weigeren
        }
    }
}

module.exports = { checkRobotsTxt };
