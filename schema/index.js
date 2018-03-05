module.exports = function generateSchema(db) {
    return {
        weapon({ wep_id }) {
            return db.weapons.find((wep) => wep.wep_id === wep_id)
        },

        allWeapons() {
            return db.weapons
        },

        filterWeapons({ filter }) {
            return db.weapons.filter((wep) => wep[filter.field_name] == filter.field_value)
        },

        weaponTypeDefs() {
            return db.weaponTypeDefs
        }
    }
}