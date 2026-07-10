import makeKoaValidator from "../middleware/validation.js";
import skillJson from "../schemas/skill.json" with { type: "json" };

const getSkillsSchema = skillJson.definitions.getSkills
const createSkillSchema = skillJson.definitions.createSkill
const patchSkillSchema = skillJson.definitions.patchSkill
const deleteSkillSchema = skillJson.definitions.deleteSkill

export const getSkillsValidation = makeKoaValidator(getSkillsSchema, "getSkills")
export const createSkillValidation = makeKoaValidator(createSkillSchema, "createSkill")
export const patchSkillValidation = makeKoaValidator(patchSkillSchema, "patchSkill")
export const deleteSkillValidation = makeKoaValidator(deleteSkillSchema, "deleteSkill")
