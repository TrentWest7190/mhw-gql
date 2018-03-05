const express = require('express')
const graphqlHTTP = require('express-graphql')
const { buildSchema } = require('graphql')
const loadDatabase = require('./db')

const schema = buildSchema(`
    type Query {
        weapon(wep_id: Int!): Weapon
        allWeapons: [Weapon]
        filterWeapons(filter: filterType!): [Weapon]
        weaponTypeDefs: [WeaponTypeDef]
    }

    type Weapon {
        "Unique identifier for a weapon"
        wep_id: Int

        "Unique identifier for the weapon's type"
        wep_type_id: Int

        "Weapon name"
        name: String

        "Weapon attack as is displayed in game, after being multiplied by the class multiplier"
        attack: Int

        "Weapon attack without the class multiplier"
        true_attack: Int

        "Weapon elemental attack type"
        element_type: String

        "Weapon elemental attack value"
        element_value: Int

        "Weapon status attack type"
        status_type: String

        "Weapon status attack value"
        status_value: Int

        "Weapon affinity (crit rate)"
        affinity: Int

        "Weapon requires free element/awakening skill to unlock elemental or status damage"
        needs_awakening: Boolean

        "Weapon rarity"
        rarity: Int

        "Weapon type as a string"
        weapon_type: String

        "Weapon sharpness values"
        sharpness_data: [Sharpness]
    }

    type WeaponTypeDef {
        wep_type_id: Int
        name: String
    }

    type Sharpness {
        "Weapon unique identifer"
        wep_id: Int

        "Level of handicraft corresponding to sharpness values"
        handicraft_level: Int

        "Hits of red sharpness"
        red: Int

        "Hits of orange sharpness"
        orange: Int

        "Hits of yellow sharpness"
        yellow: Int

        "Hits of green sharpness"
        green: Int

        "Hits of blue sharpness"
        blue: Int

        "Hits of white sharpness"
        white: Int
    }

    input filterType {
        field_name: String!
        field_value: String!
    }
`)

loadDatabase()
.then((db) => {
    const app = express()
    app.use('/graphql', graphqlHTTP({
        schema,
        rootValue: require('./schema')(db),
        graphiql: true
    }))
    app.listen(4000)
    console.log('Running a GraphQL API server at localhost:4000/graphql')
})



const root = {
    weapon ({ wep_id }) {

    }
}



