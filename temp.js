import * as skills from './skillfolder'
const fs = require('fs-extra')

const skillArray = Object.keys(skills).map((skill) => {
  
  skills[skill].values = skills[skill].values.map((x, i) => Object.assign({}, x, { level: i+1 }))
  skills[skill].skill_id = skills[skill].id
  delete skills[skill].id
  return skills[skill]
})

fs.writeJson('./db/skills.json', skillArray, {
  spaces: 2
})