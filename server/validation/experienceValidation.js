import makeKoaValidator from "../middleware/validation.js";
import experienceJson from "../schemas/experience.json"

const getAllExperiencesSchema = experienceJson.definitions.getAllExperiences
const createExperienceSchema = experienceJson.definitions.createExperience
const patchExperienceSchema = experienceJson.definitions.patchExperience
const deleteExperienceSchema = experienceJson.definitions.deleteExperience

export const getAllExperiencesValidation = makeKoaValidator(getAllExperiencesSchema, "getAllExperiences")
export const createExperienceValidation = makeKoaValidator(createExperienceSchema, "createExperience")
export const patchExperienceValidation = makeKoaValidator(patchExperienceSchema, "patchExperience")
export const deleteExperienceValidation = makeKoaValidator(deleteExperienceSchema, "deleteExperience")
