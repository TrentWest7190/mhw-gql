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
        skill(skill_id: Int!): Skill
        allSkills: [Skill]
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
        "Weapon type unique identifier"
        wep_type_id: Int

        "Weapon type corresponding name"
        name: String

        "Value used to bloat true attack value"
        multiplier: Float
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

    type Skill {
        "Unique identifier for skill"
        skill_id: Int

        "Skill name"
        name: String

        "Skill description"
        description: String

        "Maximum number of levels for a skill"
        levels: Int

        "Changes to character stats per level of the skill"
        values: [SkillValue]
    }

    type SkillValue {
        "Level of skill"
        level: Int

        "Increase to true attack"
        attack: Int

        "Increase to weapon affinity"
        affinity: Int

        "Sets the critical hit multiplier to the value"
        critMulti: Float

        "Adds an attack multiplier to your true attack"
        attackMulti: Float
    }

    input filterType {
        field_name: String!
        field_value: String!
    }
`)

loadDatabase()
.then((db) => {
    const app = express()
    app.use('/mhw-gql', graphqlHTTP({
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



