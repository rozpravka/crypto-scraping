const express = require('express');
const axios = require('axios');
const cheerio = require('cheerio');

async function getHTML() {
    try {
        const axiosResponse = await axios.get(removeUnnecessaryData('https://www.coingecko.com/'));
        return axiosResponse.data;
    } catch (error) {
        console.error(error);
    }
}

const tempCategories = [
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
const tempObjects = [];

function removeUnnecessaryData(data) {
    for (let i = 0; i < data.length; i++) {
        if (data[i] == '\n' && data[i + 1] == '\n') {
            data = data.substring(0, i);
        }
    }
    return data;
}

async function getCryptoData() {
    const html = await getHTML();
    const $ = cheerio.load(html);
    const selector = 'body > div.container > div.gecko-table-container > div.coingecko-table > div.position-relative > div > table > tbody > tr'
    $(selector).each((index, element) => {
        categoryIndex = 0;
        if (index < 20) {
            $(element).children().each((childIndex, childElement) => {
                if (childIndex != 0 && childIndex < 9) {
                    let data = $(childElement).text().trim()
                    if (childIndex == 2) { 
                        data = removeUnnecessaryData(data);
                    }
                    tempObjects[tempCategories[categoryIndex]] = data;
                    categoryIndex++;
                }
            })
            console.log(tempObjects);
        }
    })
}


getCryptoData();