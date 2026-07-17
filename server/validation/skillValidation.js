import makeKoaValidator from "../middleware/validation.js";
import skillJson from "../schemas/skill.json" with { type: "json" };

const getSkillsSchema = skillJson.definitions.getSkills
const createSkillSchema = skillJson.definitions.createSkill
const putSkillSchema = skillJson.definitions.putSkill
const deleteSkillSchema = skillJson.definitions.deleteSkill

export const getSkillsValidation = makeKoaValidator(getSkillsSchema, "getSkills")
export const createSkillValidation = makeKoaValidator(createSkillSchema, "createSkill")
export const putSkillValidation = makeKoaValidator(putSkillSchema, "putSkill")
export const deleteSkillValidation = makeKoaValidator(deleteSkillSchema, "deleteSkill")
