const cheerio = require('cheerio')
const axios = require('axios')
const fs = require('fs-extra')
axios.get('https://mhworld.kiranico.com/monster')
.then(({data}) => {
    const $ = cheerio.load(data)

    const promises = $('.col-lg-9 .card .card-body p')
    .map(async (i, elem) => {
        const link = $(elem).find('a').attr('href')
        const name = $(elem).find('a').text().trim()
        const { data: individualMonsterData } = await axios.get(link)
        const context = cheerio.load(individualMonsterData)
        const hitzone_data = extractMonsterHitData(context)
        //const main_data = extractMonsterMainData(context)
        //console.log(main_data)
        return {
            name,
            //...main_data,
            monster_id: i+1,
            hitzone_data
        }
    })
    .get()
    Promise.all(promises)
    .then((allData) => {
        fs.writeJsonSync('./db/monsters.json', allData, { spaces: 2 })
    })
})

function extractMonsterHitRow (index, element) {
    const columns = [
        "Part",
        "Sever",
        "Blunt",
        "Shot",
        "Fire",
        "Water",
        "Thunder",
        "Ice",
        "Dragon",
        "Stun"
    ]
    return {
        [columns[index]]: cheerio.load(element).text()
    }
}

function extractMonsterHitData ($) {
    return $('.col-lg-9 div:nth-child(8) .card-body .row .col-sm-8 tbody')
    .find('tr')
    .map((i, elem) => {
        return $(elem).find('td')
        .map(extractMonsterHitRow)
        .get()
        .reduce(combineArrayOfObjects, {})
    }).get()
}

async function extractMonsterMainData ($) {
    const values = [
        'base_hp',
        'capture_percent',
        'small_crown',
        'silver_crown',
        'gold_crown'
    ]

    return $('.col-lg-9 div:nth-child(3) .card-footer div').children()
    .map((i, elem) => {
        const value = $(elem).find('div').text()
        return {
            [values[i]]: Number(value)
        }
    })
    .get()
    .reduce(combineArrayOfObjects, {})
}

function combineArrayOfObjects (a,v) {
    return {
        ...a,
        ...v
    }
}