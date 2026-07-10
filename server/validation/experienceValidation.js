import makeKoaValidator from "../middleware/validation.js";
import experienceJson from "../schemas/experience.json"

const getExperiencesSchema = experienceJson.definitions.getExperiences
const createExperienceSchema = experienceJson.definitions.createExperience
const patchExperienceSchema = experienceJson.definitions.patchExperience
const deleteExperienceSchema = experienceJson.definitions.deleteExperience

export const getExperiencesValidation = makeKoaValidator(getExperiencesSchema, "getExperiences")
export const createExperienceValidation = makeKoaValidator(createExperienceSchema, "createExperience")
export const patchExperienceValidation = makeKoaValidator(patchExperienceSchema, "patchExperience")
export const deleteExperienceValidation = makeKoaValidator(deleteExperienceSchema, "deleteExperience")
