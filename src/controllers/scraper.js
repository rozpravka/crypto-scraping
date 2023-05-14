const axios = require('axios');
const cheerio = require('cheerio');
const PopularCrypto = require('../models/popularCrypto.mongo');
const OtherCrypto = require('../models/otherCrypto.mongo');

async function getHTML() {
    try {
        const axiosResponse = await axios.get('https://coinmarketcap.com/');
        return axiosResponse.data;
    } catch (error) {
        console.error(error);
    }
}

const popularCategories = [
    'rank',
    'name',
    'price',
    'hourChange',
    'dayChange',
    'weekChange',
    'marketCap',
    'dayVolume',
    'circulatingSupply',
];

const otherCategories = [
    'rank',
    'name',
    'price',
];

const cryptos = [];

async function getCryptoData() {
    const html = await getHTML();
    const $ = cheerio.load(html);
    const selector = '#__next > div > div.main-content > div.cmc-body-wrapper > div > div:nth-child(1) > div.sc-beb003d5-2.bkNrIb > table > tbody > tr'
    $(selector).each((index, element) => {
        let cryptoObj = {};
        categoryNum = 0;
        $(element).children().each((subIndex, subElement) => {
            if (index < 10) {
                if (subIndex == 0) {
                    cryptoObj = new PopularCrypto();
                    categoryNum--;
                }
                else if (subIndex == 2) {
                    cryptoObj[popularCategories[categoryNum]] = $(('p:first-child'), $(subElement).html()).text().trim();
                }
                else if (subIndex == 7) {
                    cryptoObj[popularCategories[categoryNum]] = $(('span:nth-child(2)'), $(subElement).html()).text().trim();
                }
                else {
                    if (subIndex >= 1 && subIndex <= 9) cryptoObj[popularCategories[categoryNum]] = $(subElement).text().trim();
                }
            }
            else {
                if (subIndex == 0) {
                    cryptoObj = new OtherCrypto();
                    cryptoObj[otherCategories[0]] = (index + 1);
                }
                else {
                    if ($(subElement).text() == '') categoryNum--;
                    else cryptoObj[otherCategories[categoryNum]] = $(subElement).text().trim();
                }
            }
            categoryNum++;
        })
        cryptoObj.save();
        console.log(cryptoObj);
        cryptos.push(cryptoObj);
    })
    return cryptos;
}

module.exports = {
    getCryptoData,
};
