const { scrapePage } = require('./components/scraper');

// Urls om te scrapen
const urls = [
    'https://en.wikipedia.org/wiki/Web_scraping',
];

// Loop voor alle urls
urls.forEach(url => {
    scrapePage(url);
});
