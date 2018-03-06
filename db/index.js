const fs = require('fs-extra')

module.exports = async function loadDatabase() {
    const weapons = await fs.readJSON('./db/weapons.json')
    const weaponTypeDefs = await fs.readJSON('./db/weaponTypeDefs.json')
    const skills = await fs.readJSON('./db/skills.json')
    return {
        weapons,
        weaponTypeDefs,
        skills
    }
}